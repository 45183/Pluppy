import React from 'react';

const LikeTable = ({products, onRemoveItem}) => {

    const renderLikeImage = (images) => {
        if(images.length > 0){
            let image = images[0];
            return `${import.meta.env.VITE_SERVER_URL}/${image}`
        } 
    };

    const renderItems = (
        products.length > 0 && products.map(product => (
            <tr>
                <td>
                    <img className='w-[70px]' alt='product' src={renderLikeImage(product.images)}/>
                </td>
                <td>
                    {product.price}원
                </td>
                <td>
                    <button onClick={() => onRemoveItem(product._id)}>
                        삭제
                    </button>
                </td>
            </tr>
        ))
    );

    return (
        <table className='w-full text-sm text-left text-gray-500'>
            <thead className='border-[1px]'>
                <tr>
                    <th>사진</th>
                    <th>가격</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                {renderItems}
            </tbody>
        </table>
    )
}

export default LikeTable