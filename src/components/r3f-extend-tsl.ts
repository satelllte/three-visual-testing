import { extend, type ThreeElement } from "@react-three/fiber";
import * as THREE from "three/webgpu";

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshPhysicalNodeMaterial: ThreeElement<
      typeof THREE.MeshPhysicalNodeMaterial
    >;
  }
}

extend({
  MeshPhysicalNodeMaterial: THREE.MeshPhysicalNodeMaterial,
});
