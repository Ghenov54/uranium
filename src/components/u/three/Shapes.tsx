"use client";
import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { mountStage, easeOut, type Stage } from "./stage";

export type ShapeVariant = "cubes" | "spheres" | "twist" | "discs" | "cards";

type Built = { update: (t: number, s: Stage) => void };

/**
 * Stylised 3D still-lifes for the finance pages, in the spirit of Clay's crypto page:
 * floating glass-and-ink cubes, porcelain spheres, a violet twisted form, stacked discs
 * and floating payment cards. Each drifts slowly and leans toward the pointer.
 */
export function Shapes({ variant, className = "u-scene" }: { variant: ShapeVariant; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    let built: Built;

    mountStage(canvas, {
      fov: 30,
      z: variant === "cubes" ? 12 : 9,
      setup: async (s) => {
        const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js");
        built = BUILDERS[variant](s, RoundedBoxGeometry);
      },
      frame: (t, s) => built.update(t, s),
    }).then((d) => (cancelled ? d() : (dispose = d)));

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [variant]);

  return <canvas ref={ref} className={className} aria-hidden />;
}

type RBG = typeof import("three/examples/jsm/geometries/RoundedBoxGeometry.js").RoundedBoxGeometry;

const lights = ({ THREE, scene }: Stage, violet = 20, green = 6) => {
  const v = new THREE.PointLight(0x9b5cff, violet, 14, 2);
  v.position.set(-3.5, 2.5, 3);
  const g = new THREE.PointLight(0x62e05a, green, 14, 2);
  g.position.set(3.5, -2.2, 2.5);
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(-2, 5, 6);
  scene.add(v, g, key);
};

const BUILDERS: Record<ShapeVariant, (s: Stage, R: RBG) => Built> = {
  // Floating cubes: ink, glass and a single green "block" — the chain.
  cubes: (s, R) => {
    const { THREE, scene } = s;
    lights(s, 30, 10);
    const ink = new THREE.MeshPhysicalMaterial({ color: 0x2a2d38, roughness: 0.35, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.2 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0xd9d4ff, roughness: 0.08, transmission: 0.9, thickness: 1.2, ior: 1.4, iridescence: 0.6, iridescenceIOR: 1.3 });
    const violet = new THREE.MeshPhysicalMaterial({ color: 0x7b4dff, roughness: 0.3, clearcoat: 1, emissive: 0x2a0e7a, emissiveIntensity: 0.4 });
    const green = new THREE.MeshPhysicalMaterial({ color: 0x62e05a, roughness: 0.3, clearcoat: 1, emissive: 0x1d6b19, emissiveIntensity: 0.5 });
    const geo = new R(1, 1, 1, 6, 0.14);
    const spots: [number, number, number, number, THREE.Material][] = [
      [-2.4, 1.1, 0, 1.25, ink],
      [-0.6, -0.4, 0.8, 1.6, glass],
      [1.5, 0.9, -0.4, 1.1, violet],
      [2.7, -1.2, 0.3, 0.8, ink],
      [0.4, 1.9, -1.2, 0.6, green],
      [-1.8, -1.7, -0.6, 0.75, violet],
      [3.4, 1.6, -1.6, 0.55, glass],
      [-3.4, -0.4, -1.4, 0.5, green],
    ];
    const cubes = spots.map(([x, y, z, k, m], i) => {
      const c = new THREE.Mesh(geo, m);
      c.position.set(x, y, z);
      c.scale.setScalar(k);
      c.rotation.set(i * 0.7, i * 1.1, i * 0.3);
      c.userData = { x, y, z, k, i };
      scene.add(c);
      return c;
    });
    return {
      update: (t, { pointer }) => {
        const intro = easeOut(t / 1.6);
        for (const c of cubes) {
          const { x, y, z, k, i } = c.userData as { x: number; y: number; z: number; k: number; i: number };
          c.scale.setScalar(k * (0.6 + 0.4 * intro));
          c.position.set(x + pointer.x * 0.25 * (1 + z * 0.2), y + Math.sin(t * 0.6 + i) * 0.18 + pointer.y * 0.2, z);
          c.rotation.x += 0.0025 * (1 + (i % 3));
          c.rotation.y += 0.003 * (1 + (i % 2));
        }
      },
    };
  },

  // Porcelain spheres of different sizes, softly bobbing.
  spheres: (s) => {
    const { THREE, scene } = s;
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(-3, 5, 6);
    scene.add(key, new THREE.HemisphereLight(0xffffff, 0xb9b4cc, 0.9));
    const white = new THREE.MeshPhysicalMaterial({ color: 0xf4f3f8, roughness: 0.28, clearcoat: 0.8, clearcoatRoughness: 0.25 });
    const lilac = new THREE.MeshPhysicalMaterial({ color: 0xc9bcff, roughness: 0.3, clearcoat: 0.8 });
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const spots: [number, number, number, number, THREE.Material][] = [
      [-1.6, 0.2, 0, 1.35, white],
      [1.1, -0.6, 0.6, 0.95, white],
      [1.7, 1.3, -0.8, 0.6, lilac],
      [-0.1, 1.6, -1, 0.42, white],
      [0.1, -1.7, -0.4, 0.5, white],
      [-3, -1.3, -1.2, 0.36, lilac],
    ];
    const balls = spots.map(([x, y, z, k, m], i) => {
      const b = new THREE.Mesh(geo, m);
      b.position.set(x, y, z);
      b.scale.setScalar(k);
      b.userData = { x, y, z, i };
      scene.add(b);
      return b;
    });
    return {
      update: (t, { pointer }) => {
        for (const b of balls) {
          const { x, y, z, i } = b.userData as { x: number; y: number; z: number; i: number };
          b.position.set(x + pointer.x * 0.2 * (1 + i * 0.1), y + Math.sin(t * 0.7 + i * 1.3) * 0.15 + pointer.y * 0.15, z);
        }
      },
    };
  },

  // A violet twisted ribbon-torus, slowly turning.
  twist: (s) => {
    const { THREE, scene } = s;
    lights(s, 40, 12);
    scene.add(new THREE.HemisphereLight(0xe8e0ff, 0x2a0e7a, 1));
    const mat = new THREE.MeshPhysicalMaterial({ color: 0x8a5cff, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.1, iridescence: 0.4, sheen: 0.6, sheenColor: new THREE.Color(0xd4c4ff) });
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.35, 0.46, 300, 48, 3, 2), mat);
    scene.add(knot);
    return {
      update: (t, { pointer }) => {
        const k = 0.75 + 0.25 * easeOut(t / 1.4);
        knot.scale.setScalar(k);
        knot.rotation.set(0.4 + pointer.y * 0.3, t * 0.22 + pointer.x * 0.5, Math.sin(t * 0.3) * 0.2);
      },
    };
  },

  // Stacked discs, like coins or layers of an interface, fanning open.
  discs: (s) => {
    const { THREE, scene } = s;
    lights(s, 18, 8);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xcfcbe0, 1.1));
    const mats = [
      new THREE.MeshPhysicalMaterial({ color: 0x14161d, roughness: 0.35, clearcoat: 1 }),
      new THREE.MeshPhysicalMaterial({ color: 0xf2f1f6, roughness: 0.3, clearcoat: 0.8 }),
      new THREE.MeshPhysicalMaterial({ color: 0x7b4dff, roughness: 0.3, clearcoat: 1 }),
      new THREE.MeshPhysicalMaterial({ color: 0x62e05a, roughness: 0.35, clearcoat: 1 }),
    ];
    const geo = new THREE.CylinderGeometry(1.5, 1.5, 0.22, 96, 1);
    const group = new THREE.Group();
    const discs = Array.from({ length: 7 }, (_, i) => {
      const d = new THREE.Mesh(geo, mats[i % mats.length]);
      d.userData = { i };
      group.add(d);
      return d;
    });
    group.rotation.set(0.55, 0, -0.35);
    scene.add(group);
    return {
      update: (t, { pointer }) => {
        const open = 0.5 + 0.5 * Math.sin(t * 0.6 - Math.PI / 2);
        for (const d of discs) {
          const i = d.userData.i as number;
          d.position.y = (i - 3) * (0.26 + open * 0.34);
          d.rotation.y = t * 0.2 + i * 0.12 * open;
        }
        group.rotation.x = 0.55 + pointer.y * 0.2;
        group.rotation.z = -0.35 + pointer.x * 0.2;
      },
    };
  },

  // Floating payment cards with a chip, one ink, one violet, one glass.
  cards: (s, R) => {
    const { THREE, scene } = s;
    lights(s, 26, 10);
    scene.add(new THREE.HemisphereLight(0xdcd8ee, 0x14161d, 1));
    const geo = new R(3.2, 2, 0.08, 6, 0.04);
    const chipGeo = new R(0.42, 0.32, 0.03, 4, 0.01);
    const chipMat = new THREE.MeshPhysicalMaterial({ color: 0xd6c48a, metalness: 1, roughness: 0.3 });
    const specs: [THREE.Material, number, number, number][] = [
      [new THREE.MeshPhysicalMaterial({ color: 0xd9d4ff, roughness: 0.06, transmission: 0.92, thickness: 0.4, ior: 1.45, iridescence: 0.8 }), 0.9, 0.7, 0.6],
      [new THREE.MeshPhysicalMaterial({ color: 0x7b4dff, roughness: 0.25, clearcoat: 1 }), 0, 0, 0],
      [new THREE.MeshPhysicalMaterial({ color: 0x1b1d26, roughness: 0.3, clearcoat: 1, metalness: 0.2 }), -0.9, -0.7, -0.6],
    ];
    const cards = specs.map(([m, x, y, z], i) => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(geo, m));
      const chip = new THREE.Mesh(chipGeo, chipMat);
      chip.position.set(-1.05, 0.25, 0.06);
      g.add(chip);
      g.position.set(x, y, z);
      g.userData = { x, y, z, i };
      scene.add(g);
      return g;
    });
    return {
      update: (t, { pointer }) => {
        for (const c of cards) {
          const { x, y, z, i } = c.userData as { x: number; y: number; z: number; i: number };
          c.position.set(x + pointer.x * 0.15 * (i + 1), y + Math.sin(t * 0.8 + i) * 0.12, z);
          c.rotation.set(-0.45 + pointer.y * 0.2 + Math.sin(t * 0.5 + i) * 0.05, 0.5 + pointer.x * 0.3 + Math.sin(t * 0.4 + i) * 0.08, 0.18);
        }
      },
    };
  },
};
