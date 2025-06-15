import React from 'react';

const Title = ({title}) => {
    return (
        <div className='text-xl font-bold text-[#333333] relative before:absolute before:w-[40px] before:bg=[#5271ff] before:h-full before:-left-0 pl-3'>
            <span className='absolute inset-y-0 left-0 w-1 bg-blue-600 rounded-sm'></span>
            {title}
        </div>
    );
};

export default Title;