import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model(props: any) {
  const { nodes, materials }: any = useGLTF("/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.mesh_all1_Texture1_0.geometry}
            material={materials.Texture1}
          />
        </group>
      </group>
    </group>
  );
}
function Room() {
  const object3d = useRef<THREE.Object3D>(null!);
  useFrame((state, delta) => (object3d.current.rotation.y += 0.005));
  return (
    // object3D: 빈 지역 공간
    <object3D ref={object3d}>
      <OrbitControls />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </object3D>
  );
}

export default Room;
