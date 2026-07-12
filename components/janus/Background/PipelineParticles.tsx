'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollStore } from '@/hooks/janus/useScrollStore';

const PARTICLE_COUNT = 20000;

// Custom shader material source
const vertexShader = `
  uniform float uTransition;
  uniform float uActiveSection;
  uniform float uTime;
  uniform vec2 uMouse;

  attribute vec3 aPosHero;
  attribute vec3 aPosProduction;
  attribute vec3 aPosTransport;
  attribute vec3 aPosCooling;
  attribute vec3 aPosTrapping;
  attribute vec3 aPosOptimization;

  varying vec3 vColor;
  varying float vAlpha;

  // Simple pseudo-random helper
  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec3 posA = vec3(0.0);
    vec3 posB = vec3(0.0);

    // Color definitions
    vec3 colHero = vec3(0.3, 0.6, 0.9);         // Soft Cyan/Blue
    vec3 colProd = vec3(1.0, 0.35, 0.05);       // Orange Collision
    vec3 colTrans = vec3(0.0, 0.85, 0.7);       // Cyan Magnetic
    vec3 colCool = vec3(0.1, 0.4, 1.0);         // Ice Blue
    vec3 colTrap = vec3(0.6, 0.1, 1.0);         // Penning Violet
    vec3 colOpt = vec3(1.0, 0.75, 0.1);         // Amber Optimization Grid

    vec3 colorA = vec3(0.0);
    vec3 colorB = vec3(0.0);

    // Section selection
    if (uActiveSection < 1.0) {
      posA = aPosHero;
      posB = aPosProduction;
      colorA = colHero;
      colorB = colProd;
    } else if (uActiveSection < 2.0) {
      posA = aPosProduction;
      posB = aPosTransport;
      colorA = colProd;
      colorB = colTrans;
    } else if (uActiveSection < 3.0) {
      posA = aPosTransport;
      posB = aPosCooling;
      colorA = colTrans;
      colorB = colCool;
    } else if (uActiveSection < 4.0) {
      posA = aPosCooling;
      posB = aPosTrapping;
      colorA = colCool;
      colorB = colTrap;
    } else if (uActiveSection < 5.0) {
      posA = aPosTrapping;
      posB = aPosOptimization;
      colorA = colTrap;
      colorB = colOpt;
    } else {
      posA = aPosOptimization;
      posB = aPosOptimization;
      colorA = colOpt;
      colorB = colOpt;
    }

    // Blend coordinates and colors
    vec3 blendedPos = mix(posA, posB, uTransition);
    vColor = mix(colorA, colorB, uTransition);

    // Hero: Add noise-based drift
    if (uActiveSection == 0.0) {
      float noiseX = sin(uTime * 0.5 + blendedPos.y) * 0.15;
      float noiseY = cos(uTime * 0.4 + blendedPos.z) * 0.15;
      float noiseZ = sin(uTime * 0.6 + blendedPos.x) * 0.15;
      blendedPos += vec3(noiseX, noiseY, noiseZ) * (1.0 - uTransition);
    }

    // Production: Collide & Explode movement over time
    if (uActiveSection == 1.0 || (uActiveSection == 0.0 && uTransition > 0.5)) {
      float t = mod(uTime * 0.8, 3.0);
      // Exploding particles
      if (length(posA - aPosHero) > 0.1) {
        vec3 dir = normalize(posB);
        blendedPos += dir * sin(t) * 0.4;
      }
    }

    // Transport: Add flowing wave motion
    if (uActiveSection == 2.0) {
      float speed = uTime * 2.0;
      blendedPos.y += sin(blendedPos.x * 2.0 - speed) * 0.05;
      blendedPos.z += cos(blendedPos.x * 2.0 - speed) * 0.05;
    }

    // Cooling: Spiraling inward wave
    if (uActiveSection == 3.0) {
      float speed = uTime * 3.0;
      float angle = atan(blendedPos.y, blendedPos.x) - speed * 0.1;
      float radius = length(blendedPos.xy);
      blendedPos.x = radius * cos(angle);
      blendedPos.y = radius * sin(angle);
    }

    // Mouse parallax influence
    blendedPos.xy += uMouse * 0.25;

    // View calculations
    vec4 mvPosition = modelViewMatrix * vec4(blendedPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuating with distance and pulsation
    float sizePulse = 1.0 + 0.3 * sin(uTime * 3.0 + blendedPos.x * 10.0);
    gl_PointSize = (18.0 / -mvPosition.z) * sizePulse;

    // Fade out particles far away or very close
    vAlpha = smoothstep(-15.0, -2.0, mvPosition.z) * smoothstep(0.0, -10.0, mvPosition.z);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Make particles circular with soft edges
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;

    // Smooth glow falloff
    float glow = smoothstep(0.5, 0.0, dist);
    
    // Add bright core
    float core = smoothstep(0.15, 0.0, dist) * 0.8;
    
    vec3 finalColor = vColor + vec3(core);
    gl_FragColor = vec4(finalColor, glow * vAlpha * 0.9);
  }
`;

export default function PipelineParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Precompute geometries for all stages
  const attributes = useMemo(() => {
    const hero = new Float32Array(PARTICLE_COUNT * 3);
    const production = new Float32Array(PARTICLE_COUNT * 3);
    const transport = new Float32Array(PARTICLE_COUNT * 3);
    const cooling = new Float32Array(PARTICLE_COUNT * 3);
    const trapping = new Float32Array(PARTICLE_COUNT * 3);
    const optimization = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;

      // 0. Hero (Drifting dust sphere)
      const r = 0.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      hero[idx] = r * Math.sin(phi) * Math.cos(theta);
      hero[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      hero[idx + 2] = r * Math.cos(phi);

      // 1. Production (Colliding beams + center explosion)
      if (i < PARTICLE_COUNT * 0.15) {
        // Left incoming beam
        production[idx] = -6.0 + Math.random() * 5.0;
        production[idx + 1] = (Math.random() - 0.5) * 0.05;
        production[idx + 2] = (Math.random() - 0.5) * 0.05;
      } else if (i < PARTICLE_COUNT * 0.3) {
        // Right incoming beam
        production[idx] = 1.0 + Math.random() * 5.0;
        production[idx + 1] = (Math.random() - 0.5) * 0.05;
        production[idx + 2] = (Math.random() - 0.5) * 0.05;
      } else {
        // Explosion shrapnel
        const expR = Math.random() * 2.5;
        const expTheta = Math.random() * Math.PI * 2;
        const expPhi = Math.acos(2 * Math.random() - 1);
        production[idx] = expR * Math.sin(expPhi) * Math.cos(expTheta);
        production[idx + 1] = expR * Math.sin(expPhi) * Math.sin(expTheta);
        production[idx + 2] = expR * Math.cos(expPhi);
      }

      // 2. Transport (Magnetic beamlines - curved flow)
      const tX = -6 + 12 * (i / PARTICLE_COUNT);
      const angle = (i / PARTICLE_COUNT) * Math.PI * 6;
      const rad = 0.2 + Math.random() * 0.35;
      transport[idx] = tX;
      // S-curve magnetic bending
      const bendY = Math.sin(tX * 0.8) * 1.2;
      transport[idx + 1] = bendY + Math.sin(angle) * rad;
      transport[idx + 2] = Math.cos(angle) * rad;

      // 3. Cooling (Calm spiraling vortex)
      const coolingProgress = i / PARTICLE_COUNT;
      const cY = -3.5 + 7.0 * coolingProgress;
      // Vortex narrows down as Y decreases (towards confinement)
      const cRad = 0.25 + 2.0 * Math.pow(coolingProgress, 1.5);
      const cAngle = coolingProgress * Math.PI * 40.0;
      cooling[idx] = Math.cos(cAngle) * cRad;
      cooling[idx + 1] = cY;
      cooling[idx + 2] = Math.sin(cAngle) * cRad;

      // 4. Trapping (Penning trap orbits)
      if (i < PARTICLE_COUNT * 0.4) {
        // Central spherical trapped cloud
        const trapR = Math.random() * 0.6;
        const trapTheta = Math.random() * Math.PI * 2;
        const trapPhi = Math.acos(2 * Math.random() - 1);
        trapping[idx] = trapR * Math.sin(trapPhi) * Math.cos(trapTheta);
        trapping[idx + 1] = trapR * Math.sin(trapPhi) * Math.sin(trapTheta);
        trapping[idx + 2] = trapR * Math.cos(trapPhi);
      } else if (i < PARTICLE_COUNT * 0.7) {
        // Upper ring
        const trapAngle = Math.random() * Math.PI * 2;
        const rRing = 1.0 + (Math.random() - 0.5) * 0.15;
        trapping[idx] = Math.cos(trapAngle) * rRing;
        trapping[idx + 1] = 1.0 + (Math.random() - 0.5) * 0.1;
        trapping[idx + 2] = Math.sin(trapAngle) * rRing;
      } else {
        // Lower ring
        const trapAngle = Math.random() * Math.PI * 2;
        const rRing = 1.0 + (Math.random() - 0.5) * 0.15;
        trapping[idx] = Math.cos(trapAngle) * rRing;
        trapping[idx + 1] = -1.0 + (Math.random() - 0.5) * 0.1;
        trapping[idx + 2] = Math.sin(trapAngle) * rRing;
      }

      // 5. Optimization (Convergence Grid / Math Landscape)
      const gridSize = Math.floor(Math.sqrt(PARTICLE_COUNT)); // ~141
      const col = i % gridSize;
      const row = Math.floor(i / gridSize);
      
      const gridX = -4.0 + 8.0 * (col / gridSize);
      const gridY = -4.0 + 8.0 * (row / gridSize);
      
      // Compute mathematical landscape with convergence sink in center
      const distFromCenter = Math.sqrt(gridX * gridX + gridY * gridY);
      const gridZ = Math.sin(gridX * 2.0) * Math.cos(gridY * 2.0) * Math.exp(-distFromCenter * 0.15) * 0.8;

      optimization[idx] = gridX;
      optimization[idx + 1] = gridZ; // map landscape height to Y axis for 3D grid layout
      optimization[idx + 2] = gridY;
    }

    return { hero, production, transport, cooling, trapping, optimization };
  }, []);

  const uniforms = useMemo(() => ({
    uTransition: { value: 0 },
    uActiveSection: { value: 0 },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  // Frame tick updates
  useFrame((state) => {
    const { clock, camera } = state;
    const time = clock.getElapsedTime();

    // 1. Update shader uniforms from scroll store
    if (materialRef.current) {
      const activeSec = scrollStore.activeSection;
      const transitionVal = scrollStore.sectionProgress[activeSec] || 0;

      materialRef.current.uniforms.uActiveSection.value = activeSec;
      materialRef.current.uniforms.uTransition.value = transitionVal;
      materialRef.current.uniforms.uTime.value = time;

      // Mouse parallax smooth interpolation
      const targetMouseX = scrollStore.mouse.x;
      const targetMouseY = scrollStore.mouse.y;
      materialRef.current.uniforms.uMouse.value.x += (targetMouseX - materialRef.current.uniforms.uMouse.value.x) * 0.08;
      materialRef.current.uniforms.uMouse.value.y += (targetMouseY - materialRef.current.uniforms.uMouse.value.y) * 0.08;
    }

    // 2. Cinematic camera orbits based on the current section
    const activeSec = scrollStore.activeSection;
    const progress = scrollStore.sectionProgress[activeSec] || 0;

    let targetCamPos = new THREE.Vector3(0, 0, 8);
    let targetCamLookAt = new THREE.Vector3(0, 0, 0);

    if (activeSec === 0) {
      // Hero: slow pan/zoom
      targetCamPos.set(
        Math.sin(time * 0.05) * 0.5,
        Math.cos(time * 0.03) * 0.3,
        8.0 - progress * 1.5
      );
    } else if (activeSec === 1) {
      // Production: zoom in closer to see collisions
      const blend = progress;
      targetCamPos.set(0, 0, mix(6.5, 5.0, blend));
      targetCamLookAt.set(0, 0, 0);
    } else if (activeSec === 2) {
      // Transport: angle/sideways tracking along the x-axis pipe flow
      const blend = progress;
      targetCamPos.set(mix(0, 2.5, blend), mix(0, 1.2, blend), mix(5.0, 4.5, blend));
      targetCamLookAt.set(mix(0, 1.5, blend), 0, 0);
    } else if (activeSec === 3) {
      // Cooling: look down the spiral funnel (top-down angular view)
      const blend = progress;
      targetCamPos.set(mix(2.5, 0.5, blend), mix(1.2, 5.5, blend), mix(4.5, 1.5, blend));
      targetCamLookAt.set(mix(1.5, 0.0, blend), 0, 0);
    } else if (activeSec === 4) {
      // Trapping: zoom deep into Penning trap, slow orbit
      const blend = progress;
      const angle = time * 0.2;
      targetCamPos.set(
        Math.cos(angle) * mix(1.5, 2.5, blend),
        mix(5.5, 0.5, blend),
        Math.sin(angle) * mix(1.5, 2.5, blend)
      );
      targetCamLookAt.set(0, 0, 0);
    } else if (activeSec === 5 || activeSec === 6) {
      // Optimization: Isometric style grid overview
      const blend = activeSec === 6 ? 1.0 : progress;
      targetCamPos.set(
        mix(0, 5.0, blend),
        mix(0.5, 4.0, blend),
        mix(2.5, 6.0, blend)
      );
      targetCamLookAt.set(0, -0.5, 0);
    }

    // Smoothly interpolate camera position
    camera.position.lerp(targetCamPos, 0.05);
    
    // Smoothly update camera direction
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    currentLookAt.lerp(targetCamLookAt, 0.05);
    camera.lookAt(currentLookAt);

    // Subtle rotation of the point cloud as a whole
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.015;
    }
  });

  // Linear interpolation helper
  function mix(start: number, end: number, amt: number) {
    return (1 - amt) * start + amt * end;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[attributes.hero, 3]}
        />
        <bufferAttribute
          attach="attributes-aPosHero"
          args={[attributes.hero, 3]}
        />
        <bufferAttribute
          attach="attributes-aPosProduction"
          args={[attributes.production, 3]}
        />
        <bufferAttribute
          attach="attributes-aPosTransport"
          args={[attributes.transport, 3]}
        />
        <bufferAttribute
          attach="attributes-aPosCooling"
          args={[attributes.cooling, 3]}
        />
        <bufferAttribute
          attach="attributes-aPosTrapping"
          args={[attributes.trapping, 3]}
        />
        <bufferAttribute
          attach="attributes-aPosOptimization"
          args={[attributes.optimization, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
