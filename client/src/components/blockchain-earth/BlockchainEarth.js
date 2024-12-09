import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./BlockchainEarth.css";

const BlockchainEarth = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let renderer, scene, camera, dots, dots_2, sphere, sphere_2;
    let density = 200;
    let density_2 = 100;
    let mouse = { x: 1, y: 1 };
    let coeff = 1;

    const width = canvas.width;
    const height = canvas.height;

    // Initialize the scene, camera, and renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0x000020, 0);
    renderer.setSize(width, height);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
    camera.position.z = 500;
    scene.add(camera);

    const color = "#0d7ffa"; // You can customize this color
    const colorInt = parseInt(color.replace(/#/g, ""), 16);

    // Create the dots using BufferGeometry
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(density * 3);
    for (let i = 0; i < density; i++) {
      vertices[i * 3] = 0;
      vertices[i * 3 + 1] = 0;
      vertices[i * 3 + 2] = 0;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
      color: colorInt,
      size: 4,
      transparent: true,
      opacity: 0.7,
    });
    dots = new THREE.Points(geometry, material);
    scene.add(dots);

    // Second dots for the second sphere
    const geometry_33 = new THREE.BufferGeometry();
    const vertices_33 = new Float32Array(density * 3);
    for (let i = 0; i < density; i++) {
      vertices_33[i * 3] = 0;
      vertices_33[i * 3 + 1] = 0;
      vertices_33[i * 3 + 2] = 0;
    }
    geometry_33.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices_33, 3)
    );
    dots_2 = new THREE.Points(geometry_33, material);
    scene.add(dots_2);

    // Create sphere
    const geometry_sphere = new THREE.IcosahedronGeometry(150, 2);
    const material_sphere = new THREE.MeshBasicMaterial({
      color: colorInt,
      transparent: true,
      opacity: 0.7,
      wireframe: true,
    });
    sphere = new THREE.Mesh(geometry_sphere, material_sphere);
    scene.add(sphere);

    // Create second sphere
    const geometry_sphere_2 = new THREE.IcosahedronGeometry(200, 1);
    const material_sphere_2 = new THREE.MeshBasicMaterial({
      color: colorInt,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    });
    sphere_2 = new THREE.Mesh(geometry_sphere_2, material_sphere_2);
    scene.add(sphere_2);

    const animate = () => {
      requestAnimationFrame(animate);

      dots.rotation.x += 0.002;
      dots.rotation.y += 0.002;
      dots.rotation.z -= 0.002;

      dots_2.rotation.x -= 0.001;
      dots_2.rotation.y -= 0.001;
      dots_2.rotation.z += 0.001;

      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.002;
      sphere.rotation.z -= 0.002;

      sphere_2.rotation.x -= 0.001;
      sphere_2.rotation.y -= 0.001;
      sphere_2.rotation.z += 0.001;

      createDots();
      createDots_2();

      renderer.render(scene, camera);
    };

    const createDots = () => {
      for (let i = 0; i < density_2; i++) {
        const theta = (i / density_2) * (mouse.x * 100);
        const delta = (i / density_2 - 0.5) * Math.PI * mouse.y;
        const x = 150 * Math.cos(delta) * Math.cos(theta);
        const y = 150 * Math.cos(delta) * Math.sin(theta);
        const z = 150 * Math.sin(delta);

        dots.geometry.attributes.position.setXYZ(i, x, y, z);
      }
      dots.geometry.attributes.position.needsUpdate = true;
    };

    const createDots_2 = () => {
      for (let i = 0; i < density; i++) {
        const theta = (i / density) * (mouse.x * 100);
        const delta = (i / density - 0.5) * Math.PI * mouse.y;
        const x = 200 * Math.cos(delta) * Math.cos(theta);
        const y = 200 * Math.cos(delta) * Math.sin(theta);
        const z = 200 * Math.sin(delta);

        dots_2.geometry.attributes.position.setXYZ(i, x, y, z);
      }
      dots_2.geometry.attributes.position.needsUpdate = true;
    };

    animate();

    // Handle resize
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      className="blockchain-canvas"
      ref={canvasRef}
      width={400}
      height={400}
    ></canvas>
  );
};

export default BlockchainEarth;
