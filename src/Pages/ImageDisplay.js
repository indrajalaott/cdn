import React from 'react';
import { useParams } from 'react-router-dom';

const ImageDisplay = () => {
    const { imageName } = useParams(); // Get the image name from the URL parameters

    // Construct the full image URL (update the base URL if necessary)
    const imageUrl = `https://api.indrajala.in/movieImages/${imageName}`;

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>{imageName}</h2>
            <img src={imageUrl} alt={imageName} style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
    );
};

export default ImageDisplay;
