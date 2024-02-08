import React from 'react';
import jsonLogo from '../assets/jsonLogo.png';

interface UploadJsonProps {
  onClick: () => void;
}

const UploadJson: React.FC<UploadJsonProps> = ({ onClick }) => {
  return (
    <div className="upload-json" onClick={onClick}>
      <img src={jsonLogo} alt="Upload JSON" title="Upload de .json" style={{cursor: 'pointer'}} />
    </div>
  );
};

export default UploadJson;