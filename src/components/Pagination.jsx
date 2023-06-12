import React, { useRef } from 'react';
import paginationArrow from '../assets/pagination-arrow.svg';
import { useCryptoValue } from '../context/CryptoProvider';
import submitIcon from '../assets/submit-icon.svg';

const PerPage = () => {
  const inputRef = useRef(null);
  const { setPerPage } = useCryptoValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };
  return (
    <form
      className='relative flex itemcenter font-nunuto mx-8'
      onSubmit={handleSubmit}
    >
      <label
        htmlFor='currency'
        className='flex relative items-center justify-center mr-2 font-bold'
      >
        per page:
      </label>
      <input
        type='number'
        name='perpage '
        min={1}
        max={250}
        placeholder='10'
        ref={inputRef}
        className='w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transperent focus:border-cyan leading-4'
      />

      <button className='ml-1'>
        <img src={submitIcon} alt='submitIcon' className='w-full h-auto' />
      </button>
    </form>
  );
};
const Pagination = () => {
  const { page, setPage, totalPages, perPage, cryptoData } = useCryptoValue();

  const totalPage = Math.ceil(totalPages / perPage);
  const next = () => {
    if (page >= totalPage) {
      return null;
    } else {
      setPage(page + 1);
    }
  };
  const prev = () => {
    if (page <= 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };
  const multiStepNext = () => {
    if (page + 3 >= totalPage) {
      setPage(totalPage - 1);
    } else {
      setPage(page + 3);
    }
  };
  const multiStepPrev = () => {
    if (page - 2 < 1) {
      setPage(totalPage + 1);
    } else {
      setPage(page - 2);
    }
  };
  if (cryptoData && cryptoData.length <= perPage) {
    return (
      <div className='flex items-center'>
        <PerPage />
        <ul className='flex items-center justify-end text-sm'>
          <li>
            <button className='outline-0 hover:text-cyan w-8' onClick={prev}>
              <img
                src={paginationArrow}
                alt='left'
                className='w-full h-auto rotate-180'
              />
            </button>
          </li>
          {page > 2 && (
            <li>
              <button
                onClick={page >= 1 && multiStepPrev}
                className='outline-0 hover:text-cyan text-lg flex items-center justify-center'
              >
                ...
              </button>
            </li>
          )}
          {page !== 1 && page !== 0 && (
            <li>
              <button
                onClick={prev}
                className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5'
              >
                {page - 1}
              </button>
            </li>
          )}
          <li>
            <button
              disabled
              className='outline-0 rounded-full w-8 h-8 flex items-center justify-center text-gray-300 bg-cyan mx-1.5'
            >
              {page}
            </button>
          </li>
          {page !== totalPage && (
            <li>
              <button
                onClick={next}
                className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5'
              >
                {page + 1}
              </button>
            </li>
          )}
          {page + 1 !== totalPage && page !== totalPage && (
            <li>
              <button
                onClick={multiStepNext}
                className='outline-0 hover:text-cyan text-lg flex items-center justify-center'
              >
                ...
              </button>
            </li>
          )}
          {page !== totalPage && page !== totalPage - 1 && (
            <li>
              <button
                onClick={() => setPage(totalPage)}
                className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5'
              >
                {totalPage}
              </button>
            </li>
          )}
          <li>
            <button className='outline-0 hover:text-cyan w-8' onClick={next}>
              <img
                src={paginationArrow}
                alt='right'
                className='w-full h-auto '
              />
            </button>
          </li>
        </ul>
      </div>
    );
  }
};

export default Pagination;
