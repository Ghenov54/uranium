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
  /** Called every frame with elapsed seconds; return nothing. */
  frame: (t: number, s: Stage) => void;
  setup: (s: Stage) => void | Promise<void>;
};

/**
 * One WebGL canvas: loads three lazily, renders only while visible,
 * follows the pointer softly, and draws a single still frame under reduced motion.
 */
export async function mountStage(canvas: HTMLCanvasElement, opts: Options): Promise<() => void> {
  const THREE = await import("three");
  const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(opts.fov ?? 30, 1, 0.1, 100);
  camera.position.set(0, 0, opts.z ?? 6);

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const stage: Stage = { THREE, renderer, scene, camera, pointer, dispose: () => {} };
  await opts.setup(stage);

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

  const tick = () => {
    raf = 0;
    if (!visible || document.hidden) return;
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
    envTex.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
}

/** Exponential ease-out for entrance progress (0..1). */
export const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4);
