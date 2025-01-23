import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';

export const createCubeText = (font: Font, position: THREE.Vector3, rotation: THREE.Euler) => {
  const textGeometry = new TextGeometry('CUBEATZ', {
    font: font,
    size: 0.2,
    height: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.005,
    bevelOffset: 0,
    bevelSegments: 1
  });
  
  const textMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xF97316,
    emissive: 0xF97316,
    emissiveIntensity: 0.5,
  });

  const strokeMaterial = new THREE.LineBasicMaterial({
    color: 0xFFFFFF,
    linewidth: 1
  });
  
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  const strokeGeometry = new THREE.EdgesGeometry(textGeometry);
  const strokeMesh = new THREE.LineSegments(strokeGeometry, strokeMaterial);
  
  textMesh.position.copy(position);
  textMesh.rotation.copy(rotation);
  strokeMesh.position.copy(position);
  strokeMesh.rotation.copy(rotation);
  
  return { textMesh, strokeMesh };
};