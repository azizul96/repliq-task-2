import React from 'react';

const Button = ({value}) => {
  return (
    <button className='mt-1.5 inline-block bg-[#C70039] px-5 py-2 text-xs font-medium uppercase tracking-wide text-white rounded-sm'>
      {value}
    </button>
  );
};

export default Button;