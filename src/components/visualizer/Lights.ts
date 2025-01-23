import * as THREE from 'three';

export const setupLights = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xD946EF, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const pointLight1 = new THREE.PointLight(0x8B5CF6, 1, 10);
  pointLight1.position.set(2, 2, 2);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xD946EF, 1, 10);
  pointLight2.position.set(-2, -2, -2);
  scene.add(pointLight2);

  return { pointLight1, pointLight2 };
};