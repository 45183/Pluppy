import React from 'react';

const CheckBox = ({categories, checkedCategories, onFilters}) => {

  const handleToggle = (categoryId) => {
    // 현재 누른 checkbox가 이미 누른 checkbox인지 체크
    const currentIndex = checkedCategories.indexOf(categoryId);
  
    const newChecked = [...checkedCategories];
  
    if(currentIndex === -1){
      newChecked.push(categoryId);
    } else{
      newChecked.splice(currentIndex, 1);
    };
    onFilters(newChecked);
  };
  
  return (
    <div className='flex gap-10 p-2 mb-3 bg-gray-100 rounded-md justify-center'>
      {categories?.map(category => (
        <div key={category._id}>
          <input type='checkbox' onChange={()=>handleToggle(category._id)} 
          checked={checkedCategories.indexOf(category._id) === -1 ? false : true} 
          />
          {" "}
          <label>{category.name}</label>
        </div>
      ))}
    </div>
  )
}

export default CheckBox;