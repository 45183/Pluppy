import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

const CommunityImage = ({community}) => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        if(community?.images?.length > 0){
            let images = [];
            community.images.map(imageName => {
                return images.push({
                    original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`
                })
            })

            setImages(images);
        }
    }, [community]);


    return (
        <ImageGallery items={images} />
    )
}

export default CommunityImage