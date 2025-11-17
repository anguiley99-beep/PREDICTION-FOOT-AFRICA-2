
import React from 'react';
import type { User, Rule } from '../types';
import { Page } from '../App';
import { Header } from './common/Header';
import { AdBanner } from './common/AdBanner';

interface RulesProps {
  navigate: (page: Page) => void;
  currentUser: User;
  rules: Rule[];
}

export const Rules: React.FC<RulesProps> = ({ navigate, currentUser, rules }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Règlement" currentUser={currentUser} navigate={navigate} backPage={Page.DASHBOARD} />
      <main className="flex-grow container mx-auto p-4 sm:p-6">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white">
            {rules.map(rule => (
                <p key={rule.id}>{rule.content}</p>
            ))}
          </div>
        </div>
        <AdBanner pageName="Règlement" />
      </main>
    </div>
  );
};
