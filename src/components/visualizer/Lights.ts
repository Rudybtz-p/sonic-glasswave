import * as THREE from 'three';

export const setupLights = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  if (scene.userData.neonEnabled) {
    const pointLight = new THREE.PointLight(0x8B5CF6, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);
  }
};