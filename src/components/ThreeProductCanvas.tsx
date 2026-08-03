import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Eye, Sparkles, Layers } from 'lucide-react';

interface ThreeProductCanvasProps {
  modelType?: 'headphones' | 'earbuds' | 'speaker' | 'powerbank' | 'cable';
  activeColorHex?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  showControls?: boolean;
  className?: string;
}

export const ThreeProductCanvas: React.FC<ThreeProductCanvasProps> = ({
  modelType = 'headphones',
  activeColorHex = '#0B1F3A',
  autoRotate = true,
  interactive = true,
  showControls = true,
  className = 'h-[420px] w-full',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [explodedView, setExplodedView] = useState(false);

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const productGroupRef = useRef<THREE.Group | null>(null);
  const primaryMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const accentMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  
  // Mouse interaction variables
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationTargetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainDirectional = new THREE.DirectionalLight(0xffffff, 2.0);
    mainDirectional.position.set(5, 8, 5);
    mainDirectional.castShadow = true;
    scene.add(mainDirectional);

    const rimLight = new THREE.DirectionalLight(0xff7a00, 1.5); // Secondary orange rim
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffb347, 1.0, 10);
    fillLight.position.set(0, -2, 3);
    scene.add(fillLight);

    // 5. Materials
    const primaryColor = new THREE.Color(activeColorHex);
    const primaryMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      roughness: 0.25,
      metalness: 0.8,
      wireframe: wireframeMode,
    });
    primaryMaterialRef.current = primaryMat;

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xff7a00,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x331400,
    });
    accentMaterialRef.current = accentMat;

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.05,
    });

    // 6. Product Geometries Group
    const productGroup = new THREE.Group();
    productGroupRef.current = productGroup;

    // Build model based on modelType
    if (modelType === 'headphones') {
      // Headband
      const headbandGeo = new THREE.TorusGeometry(1.6, 0.12, 16, 50, Math.PI);
      const headbandMesh = new THREE.Mesh(headbandGeo, primaryMat);
      headbandMesh.rotation.x = Math.PI / 2;
      headbandMesh.position.y = 0.5;
      productGroup.add(headbandMesh);

      // Left Earcup
      const earcupGroupL = new THREE.Group();
      earcupGroupL.name = 'earcupL';
      const cupGeo = new THREE.CylinderGeometry(0.7, 0.75, 0.4, 32);
      const cupMeshL = new THREE.Mesh(cupGeo, primaryMat);
      cupMeshL.rotation.z = Math.PI / 2;
      
      const cushionGeo = new THREE.TorusGeometry(0.68, 0.12, 16, 32);
      const cushionMeshL = new THREE.Mesh(cushionGeo, accentMat);
      cushionMeshL.rotation.y = Math.PI / 2;
      
      earcupGroupL.add(cupMeshL);
      earcupGroupL.add(cushionMeshL);
      earcupGroupL.position.set(-1.6, 0.5, 0);
      productGroup.add(earcupGroupL);

      // Right Earcup
      const earcupGroupR = new THREE.Group();
      earcupGroupR.name = 'earcupR';
      const cupMeshR = new THREE.Mesh(cupGeo, primaryMat);
      cupMeshR.rotation.z = Math.PI / 2;

      const cushionMeshR = new THREE.Mesh(cushionGeo, accentMat);
      cushionMeshR.rotation.y = Math.PI / 2;

      earcupGroupR.add(cupMeshR);
      earcupGroupR.add(cushionMeshR);
      earcupGroupR.position.set(1.6, 0.5, 0);
      productGroup.add(earcupGroupR);

    } else if (modelType === 'earbuds') {
      // Charging Case
      const caseGeo = new THREE.BoxGeometry(2.0, 1.4, 1.0);
      const caseMesh = new THREE.Mesh(caseGeo, primaryMat);
      productGroup.add(caseMesh);

      const hingeGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.8, 16);
      const hingeMesh = new THREE.Mesh(hingeGeo, chromeMat);
      hingeMesh.rotation.z = Math.PI / 2;
      hingeMesh.position.set(0, 0.7, -0.4);
      productGroup.add(hingeMesh);

      // Left Bud
      const budGeo = new THREE.SphereGeometry(0.35, 32, 16);
      const budL = new THREE.Mesh(budGeo, accentMat);
      budL.name = 'budL';
      budL.position.set(-0.5, 1.2, 0);
      productGroup.add(budL);

      // Right Bud
      const budR = new THREE.Mesh(budGeo, accentMat);
      budR.name = 'budR';
      budR.position.set(0.5, 1.2, 0);
      productGroup.add(budR);

    } else if (modelType === 'speaker') {
      // Cylinder speaker
      const bodyGeo = new THREE.CylinderGeometry(1.0, 1.0, 2.6, 32);
      const bodyMesh = new THREE.Mesh(bodyGeo, primaryMat);
      productGroup.add(bodyMesh);

      // LED Ring Top
      const ringGeo = new THREE.TorusGeometry(0.95, 0.08, 16, 32);
      const ringMesh = new THREE.Mesh(ringGeo, accentMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 1.32;
      productGroup.add(ringMesh);

      // Bottom cap
      const capGeo = new THREE.CylinderGeometry(1.02, 1.02, 0.2, 32);
      const capMesh = new THREE.Mesh(capGeo, chromeMat);
      capMesh.position.y = -1.35;
      productGroup.add(capMesh);

    } else if (modelType === 'powerbank') {
      // Powerbank block
      const pbGeo = new THREE.BoxGeometry(1.8, 3.2, 0.5);
      const pbMesh = new THREE.Mesh(pbGeo, primaryMat);
      productGroup.add(pbMesh);

      // MagSafe Ring
      const magRingGeo = new THREE.TorusGeometry(0.55, 0.05, 16, 32);
      const magRingMesh = new THREE.Mesh(magRingGeo, accentMat);
      magRingMesh.position.set(0, 0.2, 0.26);
      productGroup.add(magRingMesh);

      // Display Screen
      const dispGeo = new THREE.PlaneGeometry(1.2, 0.4);
      const dispMesh = new THREE.Mesh(dispGeo, glassMat);
      dispMesh.position.set(0, 1.1, 0.26);
      productGroup.add(dispMesh);

    } else {
      // Cable spiral
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.8, -1.0, 0),
        new THREE.Vector3(-0.8, 1.2, 0.8),
        new THREE.Vector3(0.8, -1.2, -0.8),
        new THREE.Vector3(1.8, 1.0, 0),
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.1, 16, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, primaryMat);
      productGroup.add(tubeMesh);

      // Cable Heads
      const headGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.6, 16);
      const head1 = new THREE.Mesh(headGeo, chromeMat);
      head1.position.set(-1.8, -1.0, 0);
      productGroup.add(head1);

      const head2 = new THREE.Mesh(headGeo, chromeMat);
      head2.position.set(1.8, 1.0, 0);
      productGroup.add(head2);
    }

    scene.add(productGroup);

    // 7. Ambient Particle Field Ring
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.8 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff7a00,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 8. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (productGroupRef.current) {
        // Auto float
        productGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

        if (autoRotate && !isDraggingRef.current) {
          productGroupRef.current.rotation.y += 0.008;
        } else if (interactive) {
          // Smooth inertia drag dampening
          productGroupRef.current.rotation.y += (rotationTargetRef.current.x - productGroupRef.current.rotation.y) * 0.1;
          productGroupRef.current.rotation.x += (rotationTargetRef.current.y - productGroupRef.current.rotation.x) * 0.1;
        }
      }

      if (particleSystem) {
        particleSystem.rotation.y = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelType]);

  // Update material color dynamically when activeColorHex changes
  useEffect(() => {
    if (primaryMaterialRef.current) {
      primaryMaterialRef.current.color.set(activeColorHex);
    }
  }, [activeColorHex]);

  // Toggle wireframe mode
  useEffect(() => {
    if (primaryMaterialRef.current) {
      primaryMaterialRef.current.wireframe = wireframeMode;
    }
    if (accentMaterialRef.current) {
      accentMaterialRef.current.wireframe = wireframeMode;
    }
  }, [wireframeMode]);

  // Toggle exploded view displacement
  useEffect(() => {
    if (!productGroupRef.current) return;
    const group = productGroupRef.current;

    if (modelType === 'headphones') {
      const earcupL = group.getObjectByName('earcupL');
      const earcupR = group.getObjectByName('earcupR');
      if (earcupL && earcupR) {
        earcupL.position.x = explodedView ? -2.4 : -1.6;
        earcupR.position.x = explodedView ? 2.4 : 1.6;
      }
    } else if (modelType === 'earbuds') {
      const budL = group.getObjectByName('budL');
      const budR = group.getObjectByName('budR');
      if (budL && budR) {
        budL.position.y = explodedView ? 2.0 : 1.2;
        budR.position.y = explodedView ? 2.0 : 1.2;
      }
    }
  }, [explodedView, modelType]);

  // Mouse drag handlers for 3D rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !isDraggingRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    rotationTargetRef.current.x += deltaX * 0.01;
    rotationTargetRef.current.y += deltaY * 0.01;

    // Clamp X rotation to avoid flipping upside down
    rotationTargetRef.current.y = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationTargetRef.current.y));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUp();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div ref={mountRef} className="w-full h-full" />

      {/* Interactive Controls Overlay */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-2 pointer-events-auto bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-700 shadow-sm">
            <Rotate3d className="w-3.5 h-3.5 text-[#FF7A00] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Drag 360° to view</span>
          </div>

          <div className="flex items-center space-x-2 pointer-events-auto">
            <button
              onClick={() => setWireframeMode(!wireframeMode)}
              title="Toggle Wireframe CAD Mode"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm ${
                wireframeMode
                  ? 'bg-[#FF7A00] text-white'
                  : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200 backdrop-blur-md'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CAD Wireframe</span>
            </button>

            {(modelType === 'headphones' || modelType === 'earbuds') && (
              <button
                onClick={() => setExplodedView(!explodedView)}
                title="Explode Tech Components"
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm ${
                  explodedView
                    ? 'bg-[#0B1F3A] text-white'
                    : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200 backdrop-blur-md'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exploded Tech</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
