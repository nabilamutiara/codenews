'use client'
import React from 'react';
import { useTranslation } from 'react-i18next';

const Title = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div className='text-xl font-bold text-[#333333] relative'>
      {t(title)} 
    </div>
  );
};

export default Title;
