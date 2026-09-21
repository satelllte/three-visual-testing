import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export function Scene() {
  return (
    <div className="container">
      <Canvas camera={{ position: [2.5, 2.5, 5.0] }}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight />
        <mesh>
          <boxGeometry />
          <meshPhysicalMaterial color={0xcc1122} />
        </mesh>
      </Canvas>
    </div>
  );
}
