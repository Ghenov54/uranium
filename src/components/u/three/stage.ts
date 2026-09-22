import type * as THREE from "three";

export type Three = typeof import("three");

export type Stage = {
  THREE: Three;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** Pointer position in -1..1, eased toward the real pointer each frame. */
  pointer: { x: number; y: number };
  dispose: () => void;
};

type Options = {
  fov?: number;
  z?: number;
  /** Image-based lighting from a RoomEnvironment. Scenes lit only by their own lights can skip it. */
  env?: boolean;
  /** Called every frame with elapsed seconds; return nothing. */
  frame: (t: number, s: Stage) => void;
  setup: (s: Stage) => void | Promise<void>;
};

/** Resolves when the canvas comes within a screen and a half of the viewport. */
const whenNear = (el: Element) =>
  new Promise<void>((resolve) => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        resolve();
      },
      { rootMargin: "150% 0px" }
    );
    io.observe(el);
  });

/** Resolves on the next idle moment of the main thread (or after a short timeout). */
const whenIdle = () =>
  new Promise<void>((resolve) => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout: 1200 });
    else setTimeout(resolve, 60);
  });

/**
 * Scenes are set up one at a time, in page order, each on an idle moment or as soon as it nears
 * the viewport. Setting up several WebGL scenes at once (environment maps, shader compilation)
 * is what makes scrolling stutter on weaker graphics, so the heavy work is spread out.
 */
let queue: Promise<unknown> = Promise.resolve();
const inTurn = <T,>(el: Element, work: () => Promise<T>): Promise<T> => {
  const run = queue.then(() => Promise.race([whenIdle(), whenNear(el)])).then(work);
  queue = run.catch(() => undefined);
  return run;
};

const MAX_DPR = 1.75;
const MIN_DPR = 1;

/**
 * One WebGL canvas: loads three when the canvas nears the viewport, compiles its shaders
 * before it scrolls into view, renders only while visible and not covered (data-paused),
 * lowers its resolution on devices that cannot hold the frame rate, follows the pointer softly,
 * and draws a single still frame under reduced motion.
 */
export function mountStage(canvas: HTMLCanvasElement, opts: Options): Promise<() => void> {
  return inTurn(canvas, () => build(canvas, opts));
}

async function build(canvas: HTMLCanvasElement, opts: Options): Promise<() => void> {
  // The page may have navigated away while this scene waited its turn.
  if (!canvas.isConnected) return () => {};
  const THREE = await import("three");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  let dpr = Math.min(window.devicePixelRatio, MAX_DPR);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  // Glass (transmission) renders the scene a second time; half resolution is invisible through frosted glass.
  renderer.transmissionResolutionScale = 0.5;

  const scene = new THREE.Scene();
  let pmrem: THREE.PMREMGenerator | undefined;
  let envTex: THREE.Texture | undefined;
  if (opts.env !== false) {
    const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
    pmrem = new THREE.PMREMGenerator(renderer);
    envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
  }

  const camera = new THREE.PerspectiveCamera(opts.fov ?? 30, 1, 0.1, 100);
  camera.position.set(0, 0, opts.z ?? 6);

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const stage: Stage = { THREE, renderer, scene, camera, pointer, dispose: () => {} };
  await opts.setup(stage);
  // Compile every material now, off the scroll, so the first visible frame does not stall.
  try {
    await renderer.compileAsync(scene, camera);
  } catch {
    renderer.compile(scene, camera);
  }

  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const onPointer = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clock = new THREE.Clock();
  let visible = true;
  let raf = 0;

  // Adaptive resolution: if frames run long, step the pixel ratio down (never below 1).
  let last = 0;
  let slow = 0;
  let samples = 0;
  const adapt = (now: number) => {
    const dt = last ? now - last : 16;
    last = now;
    if (dt > 250) return; // tab switch or first frame after a pause, not a real measurement
    samples++;
    if (dt > 24) slow++;
    if (samples < 45) return;
    if (slow > 20 && dpr > MIN_DPR) {
      dpr = Math.max(MIN_DPR, dpr - 0.25);
      renderer.setPixelRatio(dpr);
      resize();
    }
    samples = 0;
    slow = 0;
  };

  const tick = (now: number) => {
    raf = 0;
    if (!visible || document.hidden) {
      last = 0;
      return;
    }
    if (canvas.dataset.paused !== undefined) {
      // Covered by another panel: keep the loop alive cheaply, draw nothing.
      last = 0;
      raf = requestAnimationFrame(tick);
      return;
    }
    adapt(now);
    pointer.x += (target.x - pointer.x) * 0.05;
    pointer.y += (target.y - pointer.y) * 0.05;
    opts.frame(clock.getElapsedTime(), stage);
    renderer.render(scene, camera);
    if (!reduce) raf = requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(tick);
  });
  io.observe(canvas);
  const onVis = () => !document.hidden && visible && !raf && (raf = requestAnimationFrame(tick));
  document.addEventListener("visibilitychange", onVis);

  canvas.dataset.ready = "";
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", onVis);
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose?.();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
    });
    envTex?.dispose();
    pmrem?.dispose();
    renderer.dispose();
  };
}

/** Exponential ease-out for entrance progress (0..1). */
export const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4);
