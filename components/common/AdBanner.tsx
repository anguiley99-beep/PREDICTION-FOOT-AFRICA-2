
import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface AdBannerProps {
  pageName: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ pageName }) => {
  return (
    <div className="bg-gray-700 text-gray-300 text-center p-4 my-4 rounded-lg flex items-center justify-center space-x-2">
      <InformationCircleIcon className="w-5 h-5"/>
      <span>Bannière publicitaire pour la page {pageName}</span>
    </div>
  );
};
