"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeDLoginBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particleSphereRef = useRef<THREE.Points | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0015);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030712, 1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Build 3D Particle Sphere
    const particleCount = 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const radius = 180;
    const colorCore = new THREE.Color("#38bdf8");
    const colorOuter = new THREE.Color("#1e40af");

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixedColor = colorCore.clone().lerp(colorOuter, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Create Particle Texture
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Texture();

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(56, 189, 248, 0.8)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      map: createParticleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSphere = new THREE.Points(geometry, material);
    scene.add(particleSphere);
    particleSphereRef.current = particleSphere;

    // Mouse Interaction
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      mouseXRef.current = event.clientX - windowHalfX;
      mouseYRef.current = event.clientY - windowHalfY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      targetXRef.current += (mouseXRef.current - targetXRef.current) * 0.03;
      targetYRef.current += (mouseYRef.current - targetYRef.current) * 0.03;

      if (particleSphereRef.current) {
        particleSphereRef.current.rotation.y =
          elapsedTime * 0.1 + targetXRef.current * 0.001;
        particleSphereRef.current.rotation.x =
          elapsedTime * 0.05 + targetYRef.current * 0.001;

        const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
        particleSphereRef.current.scale.set(scale, scale, scale);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

export default ThreeDLoginBackground;
