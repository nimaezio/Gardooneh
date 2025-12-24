
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import GameCenterScreen from './components/screens/GameCenter';
import LeaderboardScreen from './components/screens/Leaderboard';
import MissionsScreen from './components/screens/Missions';
import RewardsScreen from './components/screens/Rewards';
import HistoryScreen from './components/screens/History';
import { UserProfile, HistoryEvent } from './types';

const INITIAL_USER: UserProfile = {
  id: 'me',
  name: 'امیرعلی',
  xp: 1450,
  coins: 2450,
  rank: 12,
  level: 'gold',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amir'
};

const INITIAL_HISTORY: HistoryEvent[] = [
  {
    id: 'e1',
    type: 'earn',
    title: 'خرید سوپرمارکتی',
    subtitle: 'سفارش #۴۸۲۹۲۰ • ۱۲:۳۰ ب.ظ',
    value: '+ ۱۵۰ سکه',
    timestamp: 'امروز',
    icon: 'shopping_cart'
  }
];

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [history, setHistory] = useState<HistoryEvent[]>(INITIAL_HISTORY);

  const addHistory = (event: Omit<HistoryEvent, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setHistory(prev => [newEvent, ...prev]);
  };

  const updateBalance = (xpDiff: number, coinDiff: number) => {
    setUser(prev => ({
      ...prev,
      xp: Math.max(0, prev.xp + xpDiff),
      coins: Math.max(0, prev.coins + coinDiff)
    }));
  };

  return (
    <HashRouter>
      <div className="font-display bg-transparent text-text-main min-h-screen pb-20 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<GameCenterScreen user={user} updateBalance={updateBalance} addHistory={addHistory} />} />
          <Route path="/leaderboard" element={<LeaderboardScreen user={user} />} />
          <Route path="/missions" element={<MissionsScreen user={user} updateBalance={updateBalance} addHistory={addHistory} />} />
          <Route path="/rewards" element={<RewardsScreen user={user} updateBalance={updateBalance} addHistory={addHistory} />} />
          <Route path="/history" element={<HistoryScreen user={user} history={history} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <NavigationBar />
      </div>
    </HashRouter>
  );
};

export default App;
