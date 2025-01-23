import * as THREE from 'three';

export class ParticleSystem {
  private particles: THREE.Points;
  private particleCount: number;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;

  constructor(scene: THREE.Scene, count: number = 1000) {
    this.particleCount = count;
    this.geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 5;

      colors[i] = Math.random();
      colors[i + 1] = Math.random();
      colors[i + 2] = Math.random();
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    this.particles = new THREE.Points(this.geometry, this.material);
    scene.add(this.particles);
  }

  update(audioData?: Uint8Array) {
    if (!audioData) return;

    const positions = this.geometry.attributes.position.array as Float32Array;
    const colors = this.geometry.attributes.color.array as Float32Array;

    for (let i = 0; i < this.particleCount * 3; i += 3) {
      const audioIndex = Math.floor(i / 3) % audioData.length;
      const amplitude = audioData[audioIndex] / 255;

      positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01 * amplitude;
      
      colors[i] = amplitude;
      colors[i + 1] = 0.5 * amplitude;
      colors[i + 2] = 1.0 - amplitude;
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}