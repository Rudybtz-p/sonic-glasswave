import * as THREE from 'three';

export const createCubeGeometry = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x8B5CF6,
    shininess: 100,
  });
  
  return new THREE.Mesh(geometry, material);
};