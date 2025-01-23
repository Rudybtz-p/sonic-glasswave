import * as THREE from 'three';
import { useEffect, useRef } from 'react';

interface Text3DProps {
  text: string;
  color: string;
  size?: number;
  position?: [number, number, number];
}

export const Text3D = ({ text, color, size = 1, position = [0, 0, 0] }: Text3DProps) => {
  const textRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    console.log('Initializing 3D Text with:', { text, color, size });
    
    const loader = new THREE.FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new THREE.TextGeometry(text, {
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

      if (textRef.current) {
        textRef.current.geometry = textGeometry;
        textRef.current.material = textMaterial;
        textRef.current.position.set(...position);
        textGeometry.center();
      }
    });
  }, [text, color, size, position]);

  return <mesh ref={textRef} />;
};