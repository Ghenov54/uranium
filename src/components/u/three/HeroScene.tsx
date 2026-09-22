"use client";
import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { easeOut, mountStage } from "./stage";

/**
 * The hero object: a white porcelain half-sphere seen in profile, its dome
 * turned to the lower right and its opening to the upper left. A violet sphere
 * floats above the rim; a uranium-green one rests on the dome and lights it.
 * The whole piece leans toward the pointer.
 */
export function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    let rig: THREE.Group;
    let violet: THREE.Mesh;
    let green: THREE.Mesh;
    let glow: THREE.PointLight;
    let domeDir: THREE.Vector3;

    mountStage(canvas, {
      fov: 26,
      z: 8.4,
      setup: ({ THREE, scene }) => {
        rig = new THREE.Group();
        scene.add(rig);

        const bowl = new THREE.Group();
        const R = 1.45;
        const porcelain = new THREE.MeshPhysicalMaterial({
          color: 0xf8f7fb,
          roughness: 0.38,
          clearcoat: 0.5,
          clearcoatRoughness: 0.4,
          sheen: 0.35,
          sheenColor: new THREE.Color(0xe8e3ff),
          side: THREE.DoubleSide,
        });
        bowl.add(new THREE.Mesh(new THREE.SphereGeometry(R, 160, 120, 0, Math.PI * 2, 0, Math.PI / 2), porcelain));
        // A thick lip so the cut edge reads as a solid rim.
        const lip = new THREE.Mesh(new THREE.TorusGeometry(R, 0.03, 24, 200), porcelain);
        lip.rotation.x = Math.PI / 2;
        bowl.add(lip);

        // Point the dome (local +Y) to the lower right and toward the viewer.
        domeDir = new THREE.Vector3(0.72, -0.6, -0.12).normalize();
        bowl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), domeDir);
        rig.add(bowl);

        green = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 48, 48),
          new THREE.MeshPhysicalMaterial({ color: 0x62e05a, emissive: 0x3cc437, emissiveIntensity: 0.6, roughness: 0.2, clearcoat: 1 })
        );
        rig.add(green);
        glow = new THREE.PointLight(0xb4ff8f, 3.2, 2.2, 1.8);
        rig.add(glow);

        violet = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 64, 64),
          new THREE.MeshPhysicalMaterial({ color: 0x8a4dff, emissive: 0x5a24d6, emissiveIntensity: 0.35, roughness: 0.14, clearcoat: 1, iridescence: 0.5 })
        );
        scene.add(violet);

        const key = new THREE.DirectionalLight(0xffffff, 1.5);
        key.position.set(-4, 5, 6);
        const rim = new THREE.DirectionalLight(0xdcd6ff, 0.6);
        rim.position.set(4, -2, -3);
        scene.add(key, rim, new THREE.HemisphereLight(0xffffff, 0xcfcbe0, 0.85));
      },
      frame: (t, { pointer }) => {
        const enter = easeOut(t / 1.8);
        rig.scale.setScalar(0.85 + 0.15 * enter);
        rig.rotation.set(pointer.y * 0.14 + Math.sin(t * 0.35) * 0.04, -0.25 + pointer.x * 0.22 + (1 - enter) * 0.6, Math.sin(t * 0.25) * 0.03);
        rig.position.set(0.2 + pointer.x * 0.08, Math.sin(t * 0.6) * 0.06 + pointer.y * 0.05, 0);

        // Green sits just off the dome's lower slope, bobbing slightly; its light paints the porcelain.
        const b = Math.sin(t * 0.9) * 0.03;
        green.position.set(domeDir.x * 1.25 - 0.05, domeDir.y * 1.25 - 0.15 + b, 1.05);
        glow.position.set(green.position.x - 0.12, green.position.y + 0.1, green.position.z - 0.05);
        green.scale.setScalar(enter);

        // Violet drifts above the opening on a slow figure-eight.
        violet.position.set(-0.75 + Math.sin(t * 0.4) * 0.3 + pointer.x * 0.2, 1.22 + Math.sin(t * 0.8) * 0.08 + pointer.y * 0.1, 0.6 + Math.cos(t * 0.4) * 0.25);
        violet.scale.setScalar(enter);
      },
    }).then((d) => (cancelled ? d() : (dispose = d)));

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return <canvas ref={ref} className="u-scene u-scene--hero" aria-hidden />;
}
