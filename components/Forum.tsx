
import React, { useState, useRef, useEffect } from 'react';
import type { User, ForumMessage } from '../types';
import { Page } from '../App';
import { Header } from './common/Header';
import { AdBanner } from './common/AdBanner';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ForumProps {
  navigate: (page: Page) => void;
  currentUser: User;
  messages: ForumMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ForumMessage[]>>;
}

export const Forum: React.FC<ForumProps> = ({ navigate, currentUser, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: ForumMessage = {
      id: `fm${Date.now()}`,
      user: currentUser,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="h-screen flex flex-col">
      <Header title="Forum" currentUser={currentUser} navigate={navigate} backPage={Page.DASHBOARD} />
      <AdBanner pageName="Forum" />
      <main className="flex-grow container mx-auto p-4 flex flex-col overflow-hidden">
        <div className="flex-grow bg-gray-800 rounded-2xl shadow-lg p-4 space-y-4 overflow-y-auto">
          {messages.map(msg => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.user.id === currentUser.id ? 'flex-row-reverse' : ''}`}>
              <img src={msg.user.profilePictureUrl} alt={msg.user.name} className="w-10 h-10 rounded-full object-cover" />
              <div className={`p-3 rounded-xl max-w-xs md:max-w-md ${msg.user.id === currentUser.id ? 'bg-green-700' : 'bg-gray-700'}`}>
                <div className="flex items-center space-x-2 mb-1">
                   <span className="font-semibold text-sm">{msg.user.name}</span>
                   <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <p className="text-white">{msg.message}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="sticky bottom-0 bg-gray-900 p-4">
        <div className="container mx-auto flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Écrire un message..."
            className="flex-grow bg-gray-700 border border-gray-600 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-green-500 rounded-full text-white hover:bg-green-600 transition"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};