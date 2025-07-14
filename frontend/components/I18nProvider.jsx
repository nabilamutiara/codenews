'use client';
import { useEffect } from 'react';
import '../i18n'; 
import i18n from '../i18n';

const I18nProvider = ({ children }) => {
  useEffect(() => {
    i18n.changeLanguage('en'); 
  }, []);

  return children;
};

export default I18nProvider;
