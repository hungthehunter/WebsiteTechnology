import React, { useEffect, useState } from 'react';

const ImageDisplay = ({ imageId }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Fetch image data from the Spring Boot API
        fetch(`http://localhost:8080/${imageId}`)
            .then(response => response.arrayBuffer())
            .then(data => {
                const blob = new Blob([data], { type: 'image/jpeg' });
                setImage(URL.createObjectURL(blob));
            })
            .catch(error => console.error('Error fetching image:', error));
    }, [imageId]);

    return (
        <div>
            <h2>Image Display</h2>
            <div style={{ width: '300px', height: '200px', border: '1px solid #ddd', overflow: 'hidden' }}>
                {/* Render the image using an img tag */}
                {image && <img src={image} alt={`Image ${imageId}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
            {/* You can add additional content or styling as needed */}
            {image === null && <p>Loading...</p>}
        </div>
    );
};

export default ImageDisplay;
