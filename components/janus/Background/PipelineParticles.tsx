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
    // Stage colors
    vec3 colHero = vec3(0.3, 0.6, 0.9);         // Soft Cyan/Blue
    vec3 colProd = vec3(1.0, 0.35, 0.05);       // Orange Collision
    vec3 colTrans = vec3(0.0, 0.85, 0.7);       // Cyan Magnetic
    vec3 colCool = vec3(0.1, 0.4, 1.0);         // Ice Blue
    vec3 colTrap = vec3(0.6, 0.1, 1.0);         // Penning Violet
    vec3 colOpt = vec3(1.0, 0.75, 0.1);         // Amber Optimization Grid

    vec3 colorA = vec3(0.0);
    vec3 colorB = vec3(0.0);

    vec3 posA_raw = vec3(0.0);
    vec3 posB_raw = vec3(0.0);

    // Section selection and initial attribute mapping
    if (uActiveSection < 1.0) {
      posA_raw = aPosHero;
      posB_raw = aPosProduction;
      colorA = colHero;
      colorB = colProd;
    } else if (uActiveSection < 2.0) {
      posA_raw = aPosProduction;
      posB_raw = aPosTransport;
      colorA = colProd;
      colorB = colTrans;
    } else if (uActiveSection < 3.0) {
      posA_raw = aPosTransport;
      posB_raw = aPosCooling;
      colorA = colTrans;
      colorB = colCool;
    } else if (uActiveSection < 4.0) {
      posA_raw = aPosCooling;
      posB_raw = aPosTrapping;
      colorA = colCool;
      colorB = colTrap;
    } else if (uActiveSection < 5.0) {
      posA_raw = aPosTrapping;
      posB_raw = aPosOptimization;
      colorA = colTrap;
      colorB = colOpt;
    } else {
      posA_raw = aPosOptimization;
      posB_raw = aPosOptimization;
      colorA = colOpt;
      colorB = colOpt;
    }

    vec3 posA_def = vec3(0.0);
    vec3 posB_def = vec3(0.0);

    // ==========================================
    // 0. Hero: Diffuse cloud converging to beam
    // ==========================================
    {
      float driftTime = uTime * 0.1;
      float factor = mix(1.0, 0.28, smoothstep(-0.5, 0.5, sin(driftTime * 2.0)));
      vec3 pos = aPosHero;
      pos.yz *= factor;
      pos.x += sin(uTime * 0.4 + aPosHero.y * 3.0) * 0.08;
      pos.y += cos(uTime * 0.3 + aPosHero.z * 3.0) * 0.08;
      pos.z += sin(uTime * 0.5 + aPosHero.x * 3.0) * 0.08;
      
      if (uActiveSection < 1.0) posA_def = pos;
    }

    // ==========================================
    // 1. Production: Forward target collision spray
    // ==========================================
    {
      float seed = fract(sin(aPosProduction.x * 12.9898 + aPosProduction.y * 78.233) * 43758.5453);
      float speed = 2.0 + 3.5 * seed;
      float angle = (1.0 / speed) * 0.32 * (fract(seed * 33.123) - 0.5);
      float theta = fract(seed * 99.99) * 6.28318;
      float t = mod(uTime * 1.4 + seed * 2.0, 2.5);

      vec3 pos = vec3(0.0);
      if (aPosProduction.x < 0.0) {
        // Incoming beam particle (moves left-to-right to target at x=0)
        float beamX = -5.0 + t * 2.0;
        if (beamX > 0.0) beamX = 0.0;
        pos = vec3(beamX, aPosProduction.y, aPosProduction.z);
      } else {
        // Forward secondary shower (sprays right x>0)
        float showerX = max(0.0, t - 1.0) * speed;
        float showerY = showerX * angle * cos(theta);
        float showerZ = showerX * angle * sin(theta);
        // Wide-angle secondary scattering background
        if (seed > 0.88) {
          float scatterAngle = 0.7 * (seed - 0.94) * 6.283;
          showerY += showerX * sin(scatterAngle) * 0.6;
          showerZ += showerX * cos(scatterAngle) * 0.6;
        }
        pos = vec3(showerX, showerY, showerZ);
      }

      if (uActiveSection < 1.0) posB_def = pos;
      if (uActiveSection >= 1.0 && uActiveSection < 2.0) posA_def = pos;
    }

    // ==========================================
    // 2. Transport: FODO lattice beam envelope
    // ==========================================
    {
      float x = -6.0 + 12.0 * fract((aPosTransport.x + uTime * 0.7 + 6.0) / 12.0);
      float bend = sin(x * 0.5) * 0.9;
      float envelopeY = 0.28 + 0.15 * sin(x * 1.8);
      float envelopeZ = 0.28 - 0.15 * sin(x * 1.8);
      float y = bend + aPosTransport.y * (envelopeY / 0.35);
      float z = aPosTransport.z * (envelopeZ / 0.35);
      vec3 pos = vec3(x, y, z);

      if (uActiveSection >= 1.0 && uActiveSection < 2.0) posB_def = pos;
      if (uActiveSection >= 2.0 && uActiveSection < 3.0) posA_def = pos;
    }

    // ==========================================
    // 3. Cooling: Phase-space compression
    // ==========================================
    {
      float y = -3.5 + 7.0 * fract((aPosCooling.y + uTime * 0.4 + 3.5) / 7.0);
      float progress = (y + 3.5) / 7.0;
      float compression = mix(2.2, 0.14, smoothstep(0.0, 0.8, progress));
      
      // Dampened betatron oscillation
      float oscAngle = y * 2.5;
      float cosA = cos(oscAngle);
      float sinA = sin(oscAngle);
      float x = (aPosCooling.x * cosA - aPosCooling.z * sinA) * compression;
      float z = (aPosCooling.x * sinA + aPosCooling.z * cosA) * compression;
      vec3 pos = vec3(x, y, z);

      if (uActiveSection >= 2.0 && uActiveSection < 3.0) posB_def = pos;
      if (uActiveSection >= 3.0 && uActiveSection < 4.0) posA_def = pos;
    }

    // ==========================================
    // 4. Trapping: Penning Trap orbits
    // ==========================================
    {
      float seed = fract(sin(aPosTrapping.x * 12.9898 + aPosTrapping.y * 78.233) * 43758.5453);
      float axialPeriod = 1.6 + 2.4 * seed;
      float y = aPosTrapping.y * sin(uTime * axialPeriod);
      
      // Fast cyclotron orbit
      float cyclotronFreq = 6.0 + 8.0 * seed;
      float cyclotronAngle = uTime * cyclotronFreq;
      float cyclotronRad = 0.08 * (seed + 0.2);
      
      // Slow magnetron drift
      float magnetronFreq = 0.3 + 0.4 * seed;
      float magnetronAngle = uTime * magnetronFreq;
      float magnetronRad = length(aPosTrapping.xz) * 0.85;
      
      float cx = magnetronRad * cos(magnetronAngle + seed * 6.283);
      float cz = magnetronRad * sin(magnetronAngle + seed * 6.283);
      
      float x = cx + cyclotronRad * cos(cyclotronAngle);
      float z = cz + cyclotronRad * sin(cyclotronAngle);
      vec3 pos = vec3(x, y, z);

      if (uActiveSection >= 3.0 && uActiveSection < 4.0) posB_def = pos;
      if (uActiveSection >= 4.0 && uActiveSection < 5.0) posA_def = pos;
    }

    // ==========================================
    // 5. Optimization: Parameter-space exploration landscape
    // ==========================================
    {
      float seed = rand(aPosOptimization.xz * 7.13);
      
      // Slow drift along exploration trajectories through the parameter space
      float driftPhase = uTime * 0.12 + seed * 6.283;
      float driftAmp = 0.15 + 0.1 * sin(seed * 41.3);
      
      float x = aPosOptimization.x + sin(driftPhase + aPosOptimization.z * 0.8) * driftAmp;
      float z = aPosOptimization.z + cos(driftPhase * 0.7 + aPosOptimization.x * 0.6) * driftAmp;
      
      // Multi-modal response surface: several regions of interest, no single minimum
      float r1 = length(vec2(x - 1.8, z - 1.2));
      float r2 = length(vec2(x + 2.0, z + 1.5));
      float r3 = length(vec2(x + 0.5, z - 2.5));
      float r4 = length(vec2(x - 2.5, z + 2.0));
      
      float surface = 0.0;
      surface += 0.6 * exp(-r1 * r1 * 0.3);
      surface -= 0.4 * exp(-r2 * r2 * 0.25);
      surface += 0.5 * exp(-r3 * r3 * 0.35);
      surface -= 0.3 * exp(-r4 * r4 * 0.2);
      surface += 0.15 * sin(x * 1.5) * cos(z * 1.2);
      
      float y = surface * 2.2;
      
      // Subtle per-particle jitter for organic feel
      x += sin(uTime * 0.8 + seed * 50.0) * 0.02;
      z += cos(uTime * 0.6 + seed * 37.0) * 0.02;
      
      vec3 pos = vec3(x, y, z);

      if (uActiveSection >= 4.0 && uActiveSection < 5.0) posB_def = pos;
      if (uActiveSection >= 5.0) {
        posA_def = pos;
        posB_def = pos;
      }
    }

    // Blend final deformed coordinates and colors
    vec3 blendedPos = mix(posA_def, posB_def, uTransition);
    vColor = mix(colorA, colorB, uTransition);

    // Mouse parallax influence
    blendedPos.xy += uMouse * 0.22;

    // Projection
    vec4 mvPosition = modelViewMatrix * vec4(blendedPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuating with distance
    float sizePulse = 1.0 + 0.2 * sin(uTime * 3.5 + blendedPos.x * 12.0);
    gl_PointSize = (19.0 / -mvPosition.z) * sizePulse;

    // Fade boundaries
    vAlpha = smoothstep(-15.0, -2.0, mvPosition.z) * smoothstep(0.0, -10.0, mvPosition.z);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;

    // Soft circle glow falloff
    float glow = smoothstep(0.5, 0.0, dist);
    
    // Core glow intensity
    float core = smoothstep(0.18, 0.0, dist) * 0.85;
    
    vec3 finalColor = vColor + vec3(core);
    gl_FragColor = vec4(finalColor, glow * vAlpha * 0.85);
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

      // 0. Hero: Spherical cloud seed
      const r = 0.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      hero[idx] = r * Math.sin(phi) * Math.cos(theta);
      hero[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      hero[idx + 2] = r * Math.cos(phi);

      // 1. Production: Target collision seeds (beam vs target distribution)
      if (i < PARTICLE_COUNT * 0.10) {
        // Proton beam incoming seeds (negative x)
        production[idx] = -5.0 + Math.random() * 4.9;
        production[idx + 1] = (Math.random() - 0.5) * 0.03;
        production[idx + 2] = (Math.random() - 0.5) * 0.03;
      } else {
        // Secondary shower generation center
        production[idx] = Math.random() * 0.05;
        production[idx + 1] = (Math.random() - 0.5) * 0.05;
        production[idx + 2] = (Math.random() - 0.5) * 0.05;
      }

      // 2. Transport: FODO lattice transverse offsets
      const tX = -6.0 + 12.0 * (i / PARTICLE_COUNT);
      const angle = (i / PARTICLE_COUNT) * Math.PI * 6.0;
      const rad = 0.2 + Math.random() * 0.35;
      transport[idx] = tX;
      transport[idx + 1] = Math.sin(angle) * rad;
      transport[idx + 2] = Math.cos(angle) * rad;

      // 3. Cooling: Normal circular betatron coordinates
      const coolingProgress = i / PARTICLE_COUNT;
      const cY = -3.5 + 7.0 * coolingProgress;
      const cAngle = coolingProgress * Math.PI * 30.0;
      const cRad = 0.3 + Math.random() * 0.7;
      cooling[idx] = Math.cos(cAngle) * cRad;
      cooling[idx + 1] = cY;
      cooling[idx + 2] = Math.sin(cAngle) * cRad;

      // 4. Trapping: Confinement boundary distributions
      if (i < PARTICLE_COUNT * 0.4) {
        const trapR = Math.random() * 0.6;
        const trapTheta = Math.random() * Math.PI * 2;
        const trapPhi = Math.acos(2 * Math.random() - 1);
        trapping[idx] = trapR * Math.sin(trapPhi) * Math.cos(trapTheta);
        trapping[idx + 1] = trapR * Math.sin(trapPhi) * Math.sin(trapTheta);
        trapping[idx + 2] = trapR * Math.cos(trapPhi);
      } else {
        const trapAngle = Math.random() * Math.PI * 2;
        const rRing = 0.9 + (Math.random() - 0.5) * 0.15;
        const sign = i % 2 === 0 ? 1.0 : -1.0;
        trapping[idx] = Math.cos(trapAngle) * rRing;
        trapping[idx + 1] = sign * (1.0 + (Math.random() - 0.5) * 0.1);
        trapping[idx + 2] = Math.sin(trapAngle) * rRing;
      }

      // 5. Optimization: Multi-cluster parameter-space exploration layout
      {
        const seed = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
        const seed2 = Math.abs(Math.sin(i * 39.346 + 11.135) * 21345.6789) % 1;
        
        // Define multiple regions of interest (clusters) in the parameter space
        const clusters = [
          { cx: 1.8, cz: 1.2, weight: 0.22, spread: 1.2 },
          { cx: -2.0, cz: -1.5, weight: 0.18, spread: 1.4 },
          { cx: 0.5, cz: -2.5, weight: 0.15, spread: 1.0 },
          { cx: -2.5, cz: 2.0, weight: 0.12, spread: 1.3 },
          { cx: 0.0, cz: 0.0, weight: 0.08, spread: 2.5 },  // Broad background
        ];
        // Remaining particles form connecting exploration trajectories
        const trajectoryWeight = 1.0 - clusters.reduce((s, c) => s + c.weight, 0);
        
        let ox: number, oz: number;
        let cumWeight = 0;
        let assigned = false;
        const particleFrac = i / PARTICLE_COUNT;
        
        for (const cl of clusters) {
          cumWeight += cl.weight;
          if (particleFrac < cumWeight && !assigned) {
            // Gaussian-ish distribution around cluster center
            const angle = seed * Math.PI * 2;
            const radius = cl.spread * Math.sqrt(-2.0 * Math.log(Math.max(seed2, 0.001))) * 0.4;
            ox = cl.cx + Math.cos(angle) * radius;
            oz = cl.cz + Math.sin(angle) * radius;
            assigned = true;
          }
        }
        
        if (!assigned) {
          // Trajectory / exploration particles: paths between clusters
          const trajIdx = (particleFrac - cumWeight) / trajectoryWeight;
          const pathSel = Math.floor(trajIdx * 4) % 4;
          const pathT = (trajIdx * 4) % 1;
          
          const paths = [
            { x0: 1.8, z0: 1.2, x1: -2.0, z1: -1.5 },
            { x0: -2.0, z0: -1.5, x1: 0.5, z1: -2.5 },
            { x0: 0.5, z0: -2.5, x1: -2.5, z1: 2.0 },
            { x0: -2.5, z0: 2.0, x1: 1.8, z1: 1.2 },
          ];
          const p = paths[pathSel];
          ox = p.x0 + (p.x1 - p.x0) * pathT + (seed - 0.5) * 0.8;
          oz = p.z0 + (p.z1 - p.z0) * pathT + (seed2 - 0.5) * 0.8;
        }
        
        // Compute response-surface height for this position
        const r1 = Math.sqrt((ox! - 1.8) ** 2 + (oz! - 1.2) ** 2);
        const r2 = Math.sqrt((ox! + 2.0) ** 2 + (oz! + 1.5) ** 2);
        const r3 = Math.sqrt((ox! - 0.5) ** 2 + (oz! + 2.5) ** 2);
        const r4 = Math.sqrt((ox! + 2.5) ** 2 + (oz! - 2.0) ** 2);
        
        let surface = 0;
        surface += 0.6 * Math.exp(-r1 * r1 * 0.3);
        surface -= 0.4 * Math.exp(-r2 * r2 * 0.25);
        surface += 0.5 * Math.exp(-r3 * r3 * 0.35);
        surface -= 0.3 * Math.exp(-r4 * r4 * 0.2);
        surface += 0.15 * Math.sin(ox! * 1.5) * Math.cos(oz! * 1.2);
        
        const oy = surface * 2.2;
        
        optimization[idx] = ox!;
        optimization[idx + 1] = oy;
        optimization[idx + 2] = oz!;
      }
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
      // Hero: Text Left, Camera looks slightly right
      targetCamPos.set(
        Math.sin(time * 0.05) * 0.5,
        Math.cos(time * 0.03) * 0.3,
        8.0 - progress * 1.5
      );
      targetCamLookAt.set(0.5, 0, 0);
    } else if (activeSec === 1) {
      // Production: Text Left, Camera shifts left & looks right
      const blend = progress;
      targetCamPos.set(-0.8, 0, mix(6.5, 5.0, blend));
      targetCamLookAt.set(0.8, 0, 0);
    } else if (activeSec === 2) {
      // Transport: Text Right, Camera shifts right & looks left
      const blend = progress;
      targetCamPos.set(mix(-0.8, 1.2, blend), mix(0, 1.2, blend), mix(5.0, 4.2, blend));
      targetCamLookAt.set(mix(0.8, -1.2, blend), 0, 0);
    } else if (activeSec === 3) {
      // Cooling: Text Left, Camera shifts left & looks right
      const blend = progress;
      targetCamPos.set(mix(1.2, -1.0, blend), mix(1.2, 5.0, blend), mix(4.2, 1.5, blend));
      targetCamLookAt.set(mix(-1.2, 1.0, blend), 0, 0);
    } else if (activeSec === 4) {
      // Trapping: Text Right, Camera shifts right & looks left
      const blend = progress;
      const angle = time * 0.2;
      targetCamPos.set(
        Math.cos(angle) * mix(1.5, 2.5, blend) + 0.8,
        mix(5.0, 0.5, blend),
        Math.sin(angle) * mix(1.5, 2.5, blend)
      );
      targetCamLookAt.set(-0.8, 0, 0);
    } else if (activeSec === 5 || activeSec === 6) {
      // Optimization: Text Left, Camera shifts left & looks right
      const blend = activeSec === 6 ? 1.0 : progress;
      targetCamPos.set(
        mix(0.8, 3.8, blend),
        mix(0.5, 3.8, blend),
        mix(2.5, 5.8, blend)
      );
      targetCamLookAt.set(mix(-0.8, 1.0, blend), -0.5, 0);
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
