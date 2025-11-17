
import React from 'react';
import type { User, Info } from '../types';
import { Page } from '../App';
import { Header } from './common/Header';
import { AdBanner } from './common/AdBanner';

interface InformationProps {
  navigate: (page: Page) => void;
  currentUser: User;
  info: Info[];
}

export const Information: React.FC<InformationProps> = ({ navigate, currentUser, info }) => {
  const currentInfo = info.length > 0 ? info[0] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Informations" currentUser={currentUser} navigate={navigate} backPage={Page.DASHBOARD} />
      <main className="flex-grow container mx-auto p-4 sm:p-6">
        <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {currentInfo ? (
            <>
              {currentInfo.imageUrl && (
                <img src={currentInfo.imageUrl} alt="Info" className="w-full h-48 sm:h-64 object-cover" />
              )}
              <div className="p-6">
                <div className="prose prose-invert max-w-none prose-p:text-gray-300">
                  <p>{currentInfo.text}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="p-6 text-gray-400">Aucune information disponible pour le moment.</p>
          )}
        </div>
        <AdBanner pageName="Informations" />
      </main>
    </div>
  );
};
