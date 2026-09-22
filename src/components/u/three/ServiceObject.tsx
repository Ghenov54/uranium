"use client";
import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { mountStage } from "./stage";

/**
 * A dark matte object for a service card, lit by a violet and a green light
 * so only its edges catch colour. Each service gets its own form.
 */
/** Object body colour per card, a lighter step of that card's ground so the form reads against it. */
const BODY = [0x3b3f4c, 0x5a3fd0, 0x1f6b4a, 0x3552c8, 0x8a3470];

export function ServiceObject({ variant }: { variant: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    let obj: THREE.Object3D;

    mountStage(canvas, {
      fov: 30,
      z: 6.5,
      setup: async ({ THREE, scene }) => {
        const mat = new THREE.MeshPhysicalMaterial({ color: BODY[variant % BODY.length], roughness: 0.5, metalness: 0.05, clearcoat: 0.3, clearcoatRoughness: 0.6 });
        const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js");
        const group = new THREE.Group();
        switch (variant % 5) {
          case 0: {
            // Web: a rounded window frame
            const frame = new THREE.Mesh(new RoundedBoxGeometry(2.4, 1.6, 0.35, 8, 0.18), mat);
            const cut = new THREE.Mesh(new RoundedBoxGeometry(2.0, 1.1, 0.4, 8, 0.1), new THREE.MeshPhysicalMaterial({ color: 0x14161c, roughness: 0.8 }));
            cut.position.set(0, -0.12, 0.05);
            group.add(frame, cut);
            break;
          }
          case 1: {
            // Apps: a phone-like capsule
            group.add(new THREE.Mesh(new RoundedBoxGeometry(1.1, 2.1, 0.3, 10, 0.26), mat));
            const dot = new THREE.Mesh(new THREE.SphereGeometry(0.12, 32, 32), new THREE.MeshPhysicalMaterial({ color: 0x8a4dff, emissive: 0x5b2bd6, emissiveIntensity: 0.6 }));
            dot.position.set(0, 0.72, 0.18);
            group.add(dot);
            break;
          }
          case 2:
            // Marketing: a torus, reach in every direction
            group.add(new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.38, 64, 160), mat));
            break;
          case 3: {
            // Business: a cross of capsules, connected systems
            const a = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 1.7, 16, 48), mat);
            const b = a.clone();
            b.rotation.z = Math.PI / 2;
            const c = a.clone();
            c.rotation.x = Math.PI / 2;
            group.add(a, b, c);
            break;
          }
          default:
            // Design: a smooth knot
            group.add(new THREE.Mesh(new THREE.TorusKnotGeometry(0.72, 0.26, 220, 32, 2, 3), mat));
        }
        group.scale.setScalar(0.82);
        obj = group;
        scene.add(obj);

        const violet = new THREE.PointLight(0x9b5cff, 24, 8, 2);
        violet.position.set(-2.2, 1.8, 1.5);
        const green = new THREE.PointLight(0x62e05a, 5, 8, 2);
        green.position.set(2.4, -1.6, 1.2);
        scene.add(violet, green, new THREE.HemisphereLight(0xc4c9dc, 0x0b0c10, 1.6));
        const key = new THREE.DirectionalLight(0xffffff, 0.9);
        key.position.set(-3, 4, 5);
        scene.add(key);
        scene.environment = null;
      },
      frame: (t, { pointer }) => {
        obj.rotation.set(0.35 + Math.sin(t * 0.4) * 0.15 + pointer.y * 0.25, t * 0.25 + pointer.x * 0.4, 0.15);
        obj.position.y = Math.sin(t * 0.7) * 0.08;
      },
    }).then((d) => (cancelled ? d() : (dispose = d)));

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [variant]);

  return <canvas ref={ref} className="u-scene" aria-hidden />;
}
