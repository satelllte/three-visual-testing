import { Scene } from "./Scene";

export function Scenes() {
  return (
    <div className="container">
      <SceneView engine="webgl" title="WebGL" />
      <SceneView engine="webgpu" title="WebGPU" />
    </div>
  );
}

type SceneViewProps = {
  engine: "webgl" | "webgpu";
  title: string;
};

function SceneView({ engine, title }: SceneViewProps) {
  return (
    <div className="scene">
      <h2 className="scene-title">{title}</h2>
      <Scene engine={engine} />
    </div>
  );
}
