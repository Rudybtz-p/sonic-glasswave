import * as THREE from 'three';

export const createCubeGeometry = () => {
  console.log('Creating cube geometry with materials');
  
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  
  // Create an array of materials, one for each face
  const materials = [
    new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // right
    new THREE.MeshPhongMaterial({ color: 0xff0000 }), // left
    new THREE.MeshPhongMaterial({ color: 0x0000ff }), // top
    new THREE.MeshPhongMaterial({ color: 0xffff00 }), // bottom
    new THREE.MeshPhongMaterial({ color: 0xff00ff }), // front
    new THREE.MeshPhongMaterial({ color: 0x00ffff }), // back
  ];

  // Create mesh with geometry and materials
  const cube = new THREE.Mesh(geometry, materials);
  
  console.log('Cube created with materials:', materials);
  return cube;
};