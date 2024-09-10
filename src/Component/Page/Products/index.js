import axios from 'axios';
import React, { useState } from 'react';
import ImageDisplay from './ImageLoad';
const ImageUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Image uploaded successfully');
        } catch (error) {
            console.error('Failed to upload image', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
            <button onClick={handleUpload}>Upload Image</button>
            <div>
            <ImageDisplay imageId={5} />
            </div>
        </div>
    );
};

export default ImageUpload;

