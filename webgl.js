/**
 * WebGL 3D Metallic Wireframe Mesh Animation
 * Built with Three.js
 * 
 * Requirements:
 * - HTML canvas element: <canvas id="hero-canvas"></canvas>
 * - Three.js CDN script: https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
 */

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) {
    console.warn('WebGL Canvas element #hero-canvas not found in document.');
    return;
  }

  if (typeof THREE === 'undefined') {
    console.error('Three.js library is not loaded. Please include Three.js via CDN.');
    return;
  }

  // 1. THREE.JS SCENE CREATION
  const scene = new THREE.Scene();

  // 2. PERSPECTIVE CAMERA SETUP
  const camera = new THREE.PerspectiveCamera(
    75,                                    // Field of View (FOV)
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1,                                   // Near clipping plane
    1000                                   // Far clipping plane
  );
  camera.position.z = 4;

  // 3. RENDERER CONFIGURATION
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,    // Allows transparent background blending with CSS theme
    antialias: true // Smooths wireframe lines
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 4. GEOMETRY & MATERIAL DEFINITION
  // TorusKnotGeometry(radius, tube, tubularSegments, radialSegments)
  const geometry = new THREE.TorusKnotGeometry(1.4, 0.38, 128, 32);

  // Neon green wireframe material (#00ff87) matching site palette
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff87,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 5. INTERACTIVE MOUSE PARALLAX TRACKING
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (event) => {
    // Normalize mouse position relative to screen center
    mouseX = (event.clientX / window.innerWidth - 0.5) * 0.5;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 0.5;
  });

  // 6. DYNAMIC WINDOW RESIZING
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // 7. ANIMATION RENDER LOOP
  function animate() {
    requestAnimationFrame(animate);

    // Continuous background ambient rotation
    mesh.rotation.x += 0.003;
    mesh.rotation.y += 0.005;

    // Smooth physics-like mouse follow interpolation (easing)
    mesh.rotation.y += (mouseX - mesh.rotation.y) * 0.05;
    mesh.rotation.x += (mouseY - mesh.rotation.x) * 0.05;

    // Render updated frame
    renderer.render(scene, camera);
  }

  // Launch WebGL animation loop
  animate();
});