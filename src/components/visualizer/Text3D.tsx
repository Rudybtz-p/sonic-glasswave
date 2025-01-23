import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

interface Text3DProps {
  text: string;
  color: string;
  size?: number;
  position?: [number, number, number];
}

export class Text3D extends THREE.Object3D {
  constructor({ text, color, size = 1, position = [0, 0, 0] }: Text3DProps) {
    super();
    
    console.log('Initializing 3D Text with:', { text, color, size });
    
    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: size,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });

      const textMaterial = new THREE.MeshPhongMaterial({
        color: color,
        specular: 0xffffff,
        shininess: 100,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(...position);
      textGeometry.center();
      
      this.add(textMesh);
    });
  }
}