import * as THREE from 'three';

export class ParticleSystem {
  private particles: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;

  constructor(scene: THREE.Scene) {
    this.geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 1000; i++) {
      vertices.push(
        THREE.MathUtils.randFloatSpread(100),
        THREE.MathUtils.randFloatSpread(100),
        THREE.MathUtils.randFloatSpread(100)
      );
    }

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.material = new THREE.PointsMaterial({ size: 0.1, color: 0xffffff });
    this.particles = new THREE.Points(this.geometry, this.material);
    
    scene.add(this.particles);
  }

  update(audioData: Uint8Array) {
    const positions = this.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const amp = audioData[i / 3] / 255;
      positions[i + 1] += Math.sin(amp) * 0.1;
    }
    this.geometry.attributes.position.needsUpdate = true;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}