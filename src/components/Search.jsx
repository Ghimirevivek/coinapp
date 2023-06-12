import React, { useState } from 'react';
import searchIcon from '../assets/search-icon.svg';
import debounce from 'lodash.debounce';
import { useCryptoValue } from '../context/CryptoProvider';

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearrchText] = useState('');
  const { searchData, setCoinSearch, setSearchData } = useCryptoValue();

  const handleInputChange = (e) => {
    setSearrchText(e.target.value);
    handleSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearrchText(e.target.value);
    handleSearch(searchText);
  };
  const selectSearch = (val) => {
    setCoinSearch(val);
    setSearchData([]);
    setSearrchText('');
  };
  return (
    <>
      <form
        className='xl:w-96 lg:w-60 w-full relative flex items-center  lg:ml-7  font-nunito
    '
      >
        <input
          type='text'
          placeholder='search here...'
          onChange={handleInputChange}
          value={searchText}
          className='w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border-transparent border focus:border-cyan'
        />
        <button onClick={handleSubmit} className='absolute right-1'>
          <img src={searchIcon} alt='searchIcon' className='w-full h-auto' />
        </button>
      </form>
      {searchText.length > 0 ? (
        <ul className='absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200'>
          {searchData.length > 0 ? (
            searchData.map((coin) => (
              <li
                key={coin.id}
                className='flex items-center ml-4 my-2 cursor-pointer'
                onClick={() => {
                  selectSearch(coin.id);
                }}
              >
                <img
                  src={coin.thumb}
                  alt={coin.name}
                  className='w-[1rem h-1rem mx-1.5'
                />
                <span>{coin.name}</span>
              </li>
            ))
          ) : (
            <div className='w-full h-full flex justify-center items-center'>
              <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin'></div>
              <span className='ml-2'>Searching...</span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};
const Search = () => {
  const { getSearchData } = useCryptoValue();
  const debounceFunc = debounce(function (val) {
    getSearchData(val);
  }, 2000);

  return (
    <div className='relative'>
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
};

export default Search;
