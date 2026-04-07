import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      (async () => {
        try {
          const encryptedBlob = await decryptFile(
            "/models/character.enc",
            "Character3D#@"
          );
          const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

          loader.load(
            blobUrl,
            async (gltf) => {
              const character = gltf.scene;
              await renderer.compileAsync(character, camera, scene);
              character.traverse((child: THREE.Object3D) => {
                if ((child as THREE.Mesh).isMesh) {
                  const mesh = child as THREE.Mesh;
                  child.castShadow = true;
                  child.receiveShadow = true;
                  mesh.frustumCulled = true;
                }
              });
              resolve(gltf);
              setCharTimeline(character, camera);
              setAllTimeline();
              // Revoking the blob URL frees the raw model bytes from memory
              URL.revokeObjectURL(blobUrl);
              dracoLoader.dispose();
              // Guard getObjectByName: non-null assertion would crash on wrong bone names
              const footR = character.getObjectByName("footR");
              const footL = character.getObjectByName("footL");
              if (footR) footR.position.y = 3.36;
              else console.warn("Bone 'footR' not found in character model");
              if (footL) footL.position.y = 3.36;
              else console.warn("Bone 'footL' not found in character model");
            },
            undefined,
            (error) => {
              console.error("Error loading GLTF model:", error);
              reject(error);
            }
          );
        } catch (err) {
          reject(err);
          console.error(err);
        }
      })();
    });
  };

  return { loadCharacter };
};

export default setCharacter;
