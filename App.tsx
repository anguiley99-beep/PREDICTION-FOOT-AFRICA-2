import React, { useState, useCallback, useMemo } from 'react';
import { AuthView } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Predictions } from './components/Predictions';
import { Leaderboard } from './components/Leaderboard';
import { Rules } from './components/Rules';
import { Information } from './components/Information';
import { Forum } from './components/Forum';
import { Contact } from './components/Contact';
import { AdminPanel } from './components/admin/AdminPanel';
import { useMockData } from './hooks/useMockData';
import type { User, Match, Ad, ForumMessage, Rule, Info, ContactMessage, Prediction } from './types';

export enum Page {
  AUTH,
  DASHBOARD,
  PREDICTIONS,
  LEADERBOARD,
  RULES,
  INFORMATION,
  FORUM,
  CONTACT,
  ADMIN
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.AUTH);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const {
    users,
    matches, setMatches,
    predictions, setPredictions,
    leaderboard,
    rules, setRules,
    info, setInfo,
    forumMessages, setForumMessages,
    contactMessages, setContactMessages,
    ads, setAds
  } = useMockData();

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
    if (user.isAdmin) {
      setCurrentPage(Page.ADMIN);
    } else {
      setCurrentPage(Page.DASHBOARD);
    }
  }, []);
  
  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setCurrentPage(Page.AUTH);
  }, []);
  
  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const adminUser = useMemo(() => users.find(u => u.isAdmin), [users]);
  const regularUser = useMemo(() => users.find(u => !u.isAdmin), [users]);

  const renderPage = () => {
    if (!currentUser) {
      return <AuthView onLogin={handleLogin} adminUser={adminUser} regularUser={regularUser} />;
    }

    switch (currentPage) {
      case Page.DASHBOARD:
        return <Dashboard navigate={navigate} onLogout={handleLogout} currentUser={currentUser} />;
      case Page.PREDICTIONS:
        return <Predictions navigate={navigate} currentUser={currentUser} matches={matches} predictions={predictions} setPredictions={setPredictions} />;
      case Page.LEADERBOARD:
        return <Leaderboard navigate={navigate} currentUser={currentUser} leaderboard={leaderboard} />;
      case Page.RULES:
        return <Rules navigate={navigate} currentUser={currentUser} rules={rules} />;
      case Page.INFORMATION:
        return <Information navigate={navigate} currentUser={currentUser} info={info} />;
      case Page.FORUM:
        return <Forum navigate={navigate} currentUser={currentUser} messages={forumMessages} setMessages={setForumMessages} />;
      case Page.CONTACT:
        return <Contact navigate={navigate} currentUser={currentUser} messages={contactMessages} setMessages={setContactMessages} adminUser={adminUser!} />;
      case Page.ADMIN:
        if(currentUser.isAdmin) {
          return <AdminPanel 
            onLogout={handleLogout}
            matches={matches} setMatches={setMatches}
            rules={rules} setRules={setRules}
            info={info} setInfo={setInfo}
            forumMessages={forumMessages} setForumMessages={setForumMessages}
            contactMessages={contactMessages} setContactMessages={setContactMessages}
            ads={ads} setAds={setAds}
            users={users}
            predictions={predictions}
          />;
        }
        // Fallback for non-admin trying to access admin page
        setCurrentPage(Page.DASHBOARD);
        return <Dashboard navigate={navigate} onLogout={handleLogout} currentUser={currentUser} />;
      default:
        return <Dashboard navigate={navigate} onLogout={handleLogout} currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      {renderPage()}
    </div>
  );
};

export default App;