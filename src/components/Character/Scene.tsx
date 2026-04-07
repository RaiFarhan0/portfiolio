import { useEffect, useRef, memo } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../utils/setProgress";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  // The character model state is handled internally now
  useEffect(() => {
    let isMounted = true;
    if (canvasDiv.current) {
      const rect = canvasDiv.current.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.innerWidth > 768,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      // Cast to Mesh because setPointLight accesses .material — Object3D doesn't have it
      let screenLight: THREE.Mesh | null = null;
      let mixer: THREE.AnimationMixer;
      let resizeHandlerFunc: (() => void) | null = null;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (!isMounted) return;
        if (gltf) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          const character = gltf.scene;
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = (character.getObjectByName("screenlight") as THREE.Mesh) || null;
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          resizeHandlerFunc = () => handleResize(renderer, camera, canvasDiv, character);
          window.addEventListener("resize", resizeHandlerFunc);
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };

      const onTouchMove = (e: TouchEvent) => {
        handleTouchMove(e, (x, y) => (mouse = { x, y }));
      };

      let debounce: number | undefined;
      const onTouchStart = () => {
        clearTimeout(debounce);
        debounce = window.setTimeout(() => {
          landingDiv?.addEventListener("touchmove", onTouchMove, { passive: true });
        }, 200);
      };

      const onTouchEnd = () => {
        clearTimeout(debounce);
        landingDiv?.removeEventListener("touchmove", onTouchMove);
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart, { passive: true });
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      
      let isVisible = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.1 }
      );
      if (canvasDiv.current) observer.observe(canvasDiv.current);

      let animationFrameId: number;
      const animate = () => {
        if (!isVisible) {
          animationFrameId = requestAnimationFrame(animate);
          return;
        }
        animationFrameId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        if (mixer) {
          mixer.update(delta);
        }
        
        renderer.render(scene, camera);
      };
      animate();
      const currentCanvasDiv = canvasDiv.current;
      return () => {
        isMounted = false;
        progress.clear();
        cancelAnimationFrame(animationFrameId);
        clearTimeout(debounce);
        if (currentCanvasDiv && renderer.domElement.parentNode === currentCanvasDiv) {
          currentCanvasDiv.removeChild(renderer.domElement);
        }
        
        scene.traverse((object: THREE.Object3D) => {
          const mesh = object as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.Material) {
              mesh.material.dispose();
            } else if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat: THREE.Material) => mat.dispose());
            }
          }
        });
        
        scene.clear();
        renderer.dispose();
        if (resizeHandlerFunc) window.removeEventListener("resize", resizeHandlerFunc);
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchmove", onTouchMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, [setLoading]);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default memo(Scene);
