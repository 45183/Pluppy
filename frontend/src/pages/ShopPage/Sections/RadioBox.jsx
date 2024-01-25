import React from 'react';

const RadioBox = ({prices, checkedPrice, onFilters}) => {
  return (
    <div className='flex gap-3 p-2 mb-3 bg-gray-100 rounded-md justify-center'>
      {prices?.map(price => (
        <div key={price._id}>
          <input type='radio' checked={checkedPrice === price.array} onChange={e => onFilters(e.target.value)} id={price._id} value={price._id} />
          {" "}
          <label htmlFor={price._id}>{price.name}</label>
        </div>
      ))}
    </div>
  )
}

export default RadioBox;