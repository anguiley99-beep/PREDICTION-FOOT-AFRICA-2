
import React from 'react';
import type { User } from '../types';
import { Page } from '../App';
import { ArrowLeftOnRectangleIcon, ChartBarIcon, ClipboardDocumentListIcon, Cog6ToothIcon, QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, InformationCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface DashboardProps {
  navigate: (page: Page) => void;
  onLogout: () => void;
  currentUser: User;
}

interface MenuItem {
  label: string;
  icon: React.ElementType;
  page: Page;
  color: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ navigate, onLogout, currentUser }) => {
  const menuItems: MenuItem[] = [
    { label: 'Prédictions', icon: ClipboardDocumentListIcon, page: Page.PREDICTIONS, color: 'from-green-600 to-green-400' },
    { label: 'Classement', icon: ChartBarIcon, page: Page.LEADERBOARD, color: 'from-yellow-500 to-amber-400' },
    { label: 'Règlement', icon: QuestionMarkCircleIcon, page: Page.RULES, color: 'from-green-500 to-yellow-400' },
    { label: 'Informations', icon: InformationCircleIcon, page: Page.INFORMATION, color: 'from-yellow-600 to-green-500' },
    { label: 'Forum', icon: UserGroupIcon, page: Page.FORUM, color: 'from-green-700 to-yellow-600' },
    { label: 'Contact', icon: ChatBubbleLeftRightIcon, page: Page.CONTACT, color: 'from-yellow-700 to-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 flex justify-between items-center bg-gray-800 shadow-md">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-10 h-10 text-yellow-400 mr-2">
              <path fill="currentColor" d="M493.1 319.4c-4.2-1.4-8.6.2-11.4 3.7L405 419.4V84.3c0-3.3-1.8-6.3-4.6-7.9c-2.8-1.6-6.2-1.5-8.9.2L249.3 154.4l-31-38.9c-3.4-4.3-9.5-5.2-13.9-1.8L120.5 174c-4.3 3.4-5.2 9.5-1.8 13.9l43.2 54.2L41.3 222c-4.3-3-10.1-2.2-13.4 2.1l-25.2 32.5c-3.3 4.3-2.5 10.2 1.8 13.6L129.2 355c4.3 3.3 10.1 2.5 13.4-1.8l16.1-20.2l82.6 62.8c4.3 3.3 10.1 2.5 13.4-1.8l1.8-2.2l132.8-173.8c3.4-4.3 2.5-10.2-1.8-13.6zm-193.4 53.2L182.8 285.2l-32.1 40.2l128.2-97.1l-22.9 28.7c-3.4 4.3-2.5 10.2 1.8 13.6l42.6 33.1z"/>
            </svg>
            <h1 className="text-xl font-bold">PREDICTION FOOT AFRICA</h1>
        </div>
        <div className="flex items-center space-x-4">
          <img src={currentUser.profilePictureUrl} alt="Profil" className="w-10 h-10 rounded-full border-2 border-yellow-400" />
           <button onClick={onLogout} className="p-2 rounded-full hover:bg-gray-700 transition">
            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Bienvenue, {currentUser.name} !</h2>
            <p className="text-gray-400 mt-1">Prêt à faire vos pronostics ?</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.page)}
              className={`bg-gradient-to-br ${item.color} p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center aspect-square transform hover:scale-105 transition-transform duration-300`}
            >
              <item.icon className="w-10 h-10 sm:w-12 sm:h-12 mb-2" />
              <span className="font-semibold text-base sm:text-lg">{item.label}</span>
            </button>
          ))}
        </div>
        {currentUser.isAdmin && (
            <div className="mt-6">
                 <button
                    onClick={() => navigate(Page.ADMIN)}
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-600 p-4 rounded-2xl shadow-lg flex items-center justify-center text-center transform hover:scale-102 transition-transform duration-300"
                >
                    <Cog6ToothIcon className="w-8 h-8 mr-3" />
                    <span className="font-semibold text-xl">Panneau d'Administration</span>
                </button>
            </div>
        )}
      </main>
    </div>
  );
};