import "./r3f-extend-tsl";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three/webgpu";

export function SceneTsl() {
  return (
    <div className="container">
      <Canvas
        camera={{ position: [2.5, 2.5, 5.0] }}
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(
            props as THREE.RendererParameters,
          );
          await renderer.init();
          return renderer;
        }}
      >
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight />
        <mesh>
          <boxGeometry />
          <meshPhysicalNodeMaterial color={0x1122cc} />
        </mesh>
      </Canvas>
    </div>
  );
}
