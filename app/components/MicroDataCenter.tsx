"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function MicroDataCenter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(3, 2, 3);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x4080ff, 0.3);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.6;
    ground.receiveShadow = true;
    scene.add(ground);

    // Pallet base (standard pallet: 1.2m x 1.0m x 0.15m)
    const palletGroup = new THREE.Group();

    // Pallet slats
    const slatsGroup = new THREE.Group();
    const slotGeometry = new THREE.BoxGeometry(1.2, 0.02, 0.1);
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.9
    });

    for (let i = 0; i < 5; i++) {
      const slat = new THREE.Mesh(slotGeometry, woodMaterial);
      slat.position.z = -0.4 + i * 0.2;
      slat.castShadow = true;
      slat.receiveShadow = true;
      slatsGroup.add(slat);
    }
    slatsGroup.position.y = -0.5;
    palletGroup.add(slatsGroup);

    // Main enclosure (sits on pallet)
    const enclosureGroup = new THREE.Group();

    // Enclosure dimensions: height 1.8m to fit on pallet
    const enclosureHeight = 1.8;
    const enclosureWidth = 1.0;
    const enclosureDepth = 1.0;

    // Create semi-transparent enclosure frame
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.3,
      metalness: 0.8
    });

    // Frame edges
    const frameThickness = 0.03;
    const verticalFrameGeo = new THREE.BoxGeometry(frameThickness, enclosureHeight, frameThickness);

    const corners = [
      [-enclosureWidth/2, 0, -enclosureDepth/2],
      [enclosureWidth/2, 0, -enclosureDepth/2],
      [-enclosureWidth/2, 0, enclosureDepth/2],
      [enclosureWidth/2, 0, enclosureDepth/2]
    ];

    corners.forEach(([x, y, z]) => {
      const frame = new THREE.Mesh(verticalFrameGeo, frameMaterial);
      frame.position.set(x, y, z);
      frame.castShadow = true;
      enclosureGroup.add(frame);
    });

    // Glass panels (semi-transparent)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.15,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      thickness: 0.5
    });

    // Front panel (glass)
    const frontPanel = new THREE.Mesh(
      new THREE.BoxGeometry(enclosureWidth, enclosureHeight, 0.01),
      glassMaterial
    );
    frontPanel.position.z = enclosureDepth / 2;
    enclosureGroup.add(frontPanel);

    // Side panels
    const sidePanel1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.01, enclosureHeight, enclosureDepth),
      glassMaterial
    );
    sidePanel1.position.x = -enclosureWidth / 2;
    enclosureGroup.add(sidePanel1);

    const sidePanel2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.01, enclosureHeight, enclosureDepth),
      glassMaterial
    );
    sidePanel2.position.x = enclosureWidth / 2;
    enclosureGroup.add(sidePanel2);

    // Back panel (solid with vents)
    const backMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.5,
      metalness: 0.7
    });
    const backPanel = new THREE.Mesh(
      new THREE.BoxGeometry(enclosureWidth, enclosureHeight, 0.02),
      backMaterial
    );
    backPanel.position.z = -enclosureDepth / 2;
    backPanel.castShadow = true;
    enclosureGroup.add(backPanel);

    // Top with ventilation
    const topPanel = new THREE.Mesh(
      new THREE.BoxGeometry(enclosureWidth, 0.02, enclosureDepth),
      backMaterial
    );
    topPanel.position.y = enclosureHeight / 2;
    topPanel.castShadow = true;
    enclosureGroup.add(topPanel);

    enclosureGroup.position.y = enclosureHeight / 2 - 0.4;
    palletGroup.add(enclosureGroup);

    // Server racks inside
    const serverGroup = new THREE.Group();
    const serverHeight = 0.08;
    const serverCount = 8;

    const serverMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.4,
      metalness: 0.6
    });

    const servers: THREE.Mesh[] = [];
    for (let i = 0; i < serverCount; i++) {
      const serverGeo = new THREE.BoxGeometry(0.85, serverHeight, 0.35);
      const server = new THREE.Mesh(serverGeo, serverMaterial);
      server.position.y = -0.6 + i * (serverHeight + 0.03);
      server.position.z = -0.2;
      server.castShadow = true;

      // LED indicators on servers
      const ledGeo = new THREE.SphereGeometry(0.01, 8, 8);
      const ledMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.8
      });

      for (let j = 0; j < 3; j++) {
        const led = new THREE.Mesh(ledGeo, ledMaterial.clone());
        led.position.set(-0.35 + j * 0.05, 0, 0.18);
        server.add(led);
      }

      servers.push(server);
      serverGroup.add(server);
    }

    enclosureGroup.add(serverGroup);

    // Network switch (top of rack)
    const switchGeo = new THREE.BoxGeometry(0.85, 0.1, 0.35);
    const switchMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.3,
      metalness: 0.8
    });
    const networkSwitch = new THREE.Mesh(switchGeo, switchMaterial);
    networkSwitch.position.set(0, 0.2, -0.2);
    networkSwitch.castShadow = true;

    // Port lights on switch
    const portLights: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const portLight = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.02, 0.01),
        new THREE.MeshBasicMaterial({
          color: 0xff8800,
          transparent: true,
          opacity: 0.8
        })
      );
      portLight.position.set(-0.35 + i * 0.1, 0, 0.18);
      networkSwitch.add(portLight);
      portLights.push(portLight);
    }

    enclosureGroup.add(networkSwitch);

    // Cooling fans at top
    const fanGroup = new THREE.Group();
    const fanCount = 2;

    for (let i = 0; i < fanCount; i++) {
      const fanHousing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.05, 16),
        new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.8 })
      );
      fanHousing.rotation.x = Math.PI / 2;
      fanHousing.position.set(-0.25 + i * 0.5, 0.75, 0);

      // Fan blades
      const bladeGroup = new THREE.Group();
      for (let j = 0; j < 4; j++) {
        const blade = new THREE.Mesh(
          new THREE.BoxGeometry(0.18, 0.03, 0.01),
          new THREE.MeshStandardMaterial({ color: 0x444444 })
        );
        blade.rotation.z = (Math.PI / 2) * j;
        bladeGroup.add(blade);
      }
      bladeGroup.position.copy(fanHousing.position);
      bladeGroup.rotation.copy(fanHousing.rotation);
      bladeGroup.userData.rotationSpeed = 0.1;

      fanGroup.add(fanHousing);
      fanGroup.add(bladeGroup);
      fanGroup.userData.blades = fanGroup.userData.blades || [];
      fanGroup.userData.blades.push(bladeGroup);
    }

    enclosureGroup.add(fanGroup);

    // Particle system for airflow
    const particleCount = 200;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { y: number; wobble: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Start particles at bottom, flowing up
      particlePositions[i * 3] = (Math.random() - 0.5) * 0.8;
      particlePositions[i * 3 + 1] = -0.8 + Math.random() * 0.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;

      particleVelocities.push({
        y: 0.005 + Math.random() * 0.01,
        wobble: Math.random() * Math.PI * 2
      });
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ddff,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    enclosureGroup.add(particleSystem);

    // Data flow lines
    const dataFlowLines: THREE.Line[] = [];
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.6
    });

    for (let i = 0; i < 10; i++) {
      const points = [];
      const startY = -0.6 + Math.random() * 1.2;
      points.push(new THREE.Vector3(-0.4, startY, -0.2));
      points.push(new THREE.Vector3(0, 0.2, -0.2));

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial.clone());
      line.userData.offset = Math.random() * Math.PI * 2;
      dataFlowLines.push(line);
      enclosureGroup.add(line);
    }

    scene.add(palletGroup);
    setIsLoaded(true);

    // Animation loop
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Rotate fan blades
      if (fanGroup.userData.blades) {
        fanGroup.userData.blades.forEach((bladeGroup: THREE.Group) => {
          bladeGroup.rotation.z += 0.1;
        });
      }

      // Animate particles (airflow)
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const velocity = particleVelocities[i];

        // Move up
        positions[idx + 1] += velocity.y;

        // Add wobble
        positions[idx] += Math.sin(elapsed + velocity.wobble) * 0.001;
        positions[idx + 2] += Math.cos(elapsed + velocity.wobble) * 0.001;

        // Reset if particle reaches top
        if (positions[idx + 1] > 0.8) {
          positions[idx + 1] = -0.8;
          positions[idx] = (Math.random() - 0.5) * 0.8;
          positions[idx + 2] = (Math.random() - 0.5) * 0.8;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Pulse server LEDs
      servers.forEach((server, idx) => {
        server.children.forEach((led) => {
          if (led instanceof THREE.Mesh && led.material instanceof THREE.MeshBasicMaterial) {
            const intensity = 0.5 + 0.5 * Math.sin(elapsed * 3 + idx);
            led.material.opacity = intensity;
          }
        });
      });

      // Animate port lights on network switch
      portLights.forEach((light, idx) => {
        const intensity = 0.3 + 0.3 * Math.sin(elapsed * 5 + idx * 0.5);
        if (light.material instanceof THREE.MeshBasicMaterial) {
          light.material.opacity = intensity;
        }
      });

      // Pulse data flow lines
      dataFlowLines.forEach((line, idx) => {
        const opacity = 0.3 + 0.3 * Math.sin(elapsed * 2 + line.userData.offset);
        (line.material as THREE.LineBasicMaterial).opacity = opacity;
      });

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full" />
      {isLoaded && (
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Micro Data Center</h2>
          <ul className="text-sm space-y-1">
            <li>🔵 Blue particles = Cool air intake</li>
            <li>🟢 Green LEDs = Server activity</li>
            <li>🟠 Orange lights = Network traffic</li>
            <li>💨 Spinning fans = Active cooling</li>
            <li>🟢 Green lines = Data flow to switch</li>
          </ul>
          <p className="text-xs mt-2 opacity-75">
            Use mouse to rotate • Scroll to zoom
          </p>
        </div>
      )}
    </div>
  );
}
