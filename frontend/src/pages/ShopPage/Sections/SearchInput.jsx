import React from 'react'

const SearchInput = ({onSearch, searchTerm}) => {
  return (
    <input className='p-2 px-3 border border-gray-300 rounded-md' type='text' placeholder='검색어를 입력하세요.' onChange={onSearch} value={searchTerm} />
  )
}

export default SearchInput