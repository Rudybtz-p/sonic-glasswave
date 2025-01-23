import React from 'react';
import * as THREE from 'three';

interface CubeImageUploaderProps {
  cube: THREE.Mesh | null;
  onImageUpload: (face: string, file: File) => void;
}

export const CubeImageUploader: React.FC<CubeImageUploaderProps> = ({ cube, onImageUpload }) => {
  const handleImageUpload = (face: string, file: File) => {
    if (!cube) {
      console.error('Cube not initialized');
      return;
    }

    const faceIndex = ['right', 'left', 'top', 'bottom', 'front', 'back'].indexOf(face);
    if (faceIndex === -1) {
      console.error('Invalid face:', face);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result || !cube) return;

      const texture = new THREE.TextureLoader().load(event.target.result as string);
      const materials = Array.isArray(cube.material) 
        ? cube.material 
        : [cube.material];

      if (materials[faceIndex] && materials[faceIndex] instanceof THREE.MeshPhongMaterial) {
        materials[faceIndex].map = texture;
        console.log(`Updated texture for ${face} face at index ${faceIndex}`);
      } else {
        console.error('Invalid material at index:', faceIndex);
      }
    };

    console.log(`Handling image upload for ${face} face`);
    reader.readAsDataURL(file);
  };

  return (
    <div className="absolute top-4 right-4">
      <CubeUploader onImageUpload={handleImageUpload} />
    </div>
  );
};