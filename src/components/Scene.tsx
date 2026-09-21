import "./r3f-extend-tsl";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type RendererParameters, WebGPURenderer } from "three/webgpu";

type SceneProps = {
  engine: "webgl" | "webgpu";
};

function getGl(engine: SceneProps["engine"]) {
  if (engine === "webgl") return undefined;
  return async (props: RendererParameters) => {
    const renderer = new WebGPURenderer(props);
    await renderer.init();
    return renderer;
  };
}

export function Scene({ engine }: SceneProps) {
  return (
    <div className="container">
      <Canvas camera={{ position: [2.5, 2.5, 5.0] }} gl={getGl(engine)}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight />
        <Box engine={engine} />
      </Canvas>
    </div>
  );
}

type BoxProps = Pick<SceneProps, "engine">;

function Box({ engine }: BoxProps) {
  return (
    <mesh>
      <boxGeometry />
      {engine === "webgl" && <meshPhysicalMaterial color={0xcc1122} />}
      {engine === "webgpu" && <meshPhysicalNodeMaterial color={0x1122cc} />}
    </mesh>
  );
}
