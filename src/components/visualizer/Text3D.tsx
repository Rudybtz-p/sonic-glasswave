import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

interface Text3DProps {
  text: string;
  color: string;
  size?: number;
  position?: [number, number, number];
  glow?: boolean;
}

export class Text3D extends THREE.Object3D {
  private material: THREE.MeshPhongMaterial;
  private glowMaterial: THREE.MeshPhongMaterial | null = null;
  private glowMesh: THREE.Mesh | null = null;

  constructor({ text, color, size = 1, position = [0, 0, 0], glow = false }: Text3DProps) {
    super();
    
    console.log('Initializing enhanced 3D Text with:', { text, color, size, glow });
    
    this.material = new THREE.MeshPhongMaterial({
      color: color,
      specular: 0xffffff,
      shininess: 100,
    });

    if (glow) {
      this.glowMaterial = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.5,
      });
    }
    
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

      const textMesh = new THREE.Mesh(textGeometry, this.material);
      textMesh.position.set(...position);
      textGeometry.center();
      this.add(textMesh);

      if (this.glowMaterial) {
        this.glowMesh = new THREE.Mesh(textGeometry, this.glowMaterial);
        this.glowMesh.position.set(...position);
        this.glowMesh.scale.multiplyScalar(1.1);
        this.add(this.glowMesh);
      }
    });
  }

  updateColor(color: string) {
    this.material.color.set(color);
    if (this.glowMaterial) {
      this.glowMaterial.color.set(color);
      this.glowMaterial.emissive.set(color);
    }
  }

  setGlow(enabled: boolean) {
    if (this.glowMesh) {
      this.glowMesh.visible = enabled;
    }
  }
}