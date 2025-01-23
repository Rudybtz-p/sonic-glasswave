import React from 'react';
import * as THREE from 'three';
import { CubeUploader } from './CubeUploader';

interface CubeImageUploaderProps {
  cube: THREE.Mesh | null;
  onImageUpload: (face: string, file: File) => void;
}

export const CubeImageUploader: React.FC<CubeImageUploaderProps> = ({ cube, onImageUpload }) => {
  const handleImageUpload = (face: string, file: File) => {
    console.log(`Handling image upload for ${face} face`);
    onImageUpload(face, file);
  };

  return (
    <div className="absolute top-4 right-4">
      <CubeUploader onImageUpload={handleImageUpload} />
    </div>
  );
};