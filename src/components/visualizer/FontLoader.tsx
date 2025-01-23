import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { createCubeText } from './CubeText';

export const loadFont = (scene: THREE.Scene) => {
  const fontLoader = new FontLoader();
  const fontPath = '/fonts/helvetiker_regular.typeface.json';
  console.log('Loading font from:', fontPath);
  
  fontLoader.load(
    fontPath,
    (font) => {
      console.log('Font loaded successfully');
      try {
        const { textMesh, strokeMesh } = createCubeText(
          font,
          new THREE.Vector3(0, 2, 0),
          new THREE.Euler(0, 0, 0)
        );
        scene.add(textMesh);
        scene.add(strokeMesh);
      } catch (error) {
        console.error('Error creating text meshes:', error);
      }
    },
    (progress) => {
      console.log('Font loading progress:', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('Error loading font:', error);
      console.error('Font path attempted:', fontPath);
    }
  );
};