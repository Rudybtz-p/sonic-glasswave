import * as THREE from 'three';

export const createCubeGeometry = () => {
  console.log('Creating cube geometry with materials');
  
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  
  // Create materials with proper initialization
  const materials = Array(6).fill(null).map(() => 
    new THREE.MeshPhongMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      specular: 0xffffff,
      shininess: 100,
      reflectivity: 1,
    })
  );

  // Create mesh with geometry and materials array
  const cube = new THREE.Mesh(geometry, materials);
  
  // Add neon edges
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ 
    color: 0xD946EF,
    linewidth: 2,
  });
  const wireframe = new THREE.LineSegments(edges, lineMaterial);
  cube.add(wireframe);
  
  console.log('Cube created with materials array:', materials);
  return cube;
};