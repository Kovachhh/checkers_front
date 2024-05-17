import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useRef } from "react";

import texture from "../../images/logo_texture.png";

export const Sphere = () => {
  const meshRef = useRef(null);
  const textureMap = useLoader(TextureLoader, texture);

  useFrame(() => (meshRef.current.rotation.z += 0.003));

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh ref={meshRef}>
            <sphereGeometry args={[2, 32]} />
            <meshStandardMaterial map={textureMap} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
