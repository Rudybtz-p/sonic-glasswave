import * as THREE from 'three';

export const createCubeGeometry = () => {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  
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

  const cube = new THREE.Mesh(geometry, materials);
  
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ 
    color: 0xD946EF,
    linewidth: 2,
  });
  const wireframe = new THREE.LineSegments(edges, lineMaterial);
  cube.add(wireframe);
  
  return cube;
};