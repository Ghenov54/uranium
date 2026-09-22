"use client";
import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { mountStage } from "./stage";

/** A soft white ribbon folding slowly behind the footer, white on white, felt more than seen. */
export function Ribbon() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    let ribbon: THREE.Mesh;

    mountStage(canvas, {
      fov: 35,
      z: 9,
      setup: ({ THREE, scene }) => {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-4.5, 3.4, -1),
          new THREE.Vector3(-2.2, 1.2, 0.6),
          new THREE.Vector3(-0.4, 0.6, -0.4),
          new THREE.Vector3(0.6, -1.4, 0.8),
          new THREE.Vector3(-1.4, -2.6, 0),
          new THREE.Vector3(-3.6, -3.4, -0.8),
        ]);
        ribbon = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 240, 0.62, 48, false),
          new THREE.MeshPhysicalMaterial({ color: 0xf4f4f7, roughness: 0.5, sheen: 0.5, sheenColor: new THREE.Color(0xffffff) })
        );
        ribbon.scale.set(1, 1, 0.55);
        scene.add(ribbon);
        const key = new THREE.DirectionalLight(0xffffff, 1.2);
        key.position.set(3, 5, 6);
        scene.add(key, new THREE.HemisphereLight(0xffffff, 0xcfd0d8, 0.8));
      },
      frame: (t, { pointer }) => {
        ribbon.rotation.set(Math.sin(t * 0.18) * 0.12 + pointer.y * 0.05, Math.sin(t * 0.14) * 0.18 + pointer.x * 0.08, Math.sin(t * 0.1) * 0.05);
      },
    }).then((d) => (cancelled ? d() : (dispose = d)));

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return <canvas ref={ref} className="u-scene u-scene--ribbon" aria-hidden />;
}
