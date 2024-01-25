import React from 'react';

const CommunityInfo = ({community}) => {


    return (
        <div className='mx-10'>
            <p className='text-2xl text-bold'>{community.writer.name}</p>
            <p className='text-2xl text-bold'>{community.contents}</p>
        </div>
    )
}

export default CommunityInfo;