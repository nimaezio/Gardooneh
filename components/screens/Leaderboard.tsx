
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../types';

interface Props {
  user: UserProfile;
}

interface Leader {
  rank: number;
  name: string;
  level: string;
  xp: number;
  img: string;
}

const LeaderboardScreen: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'weekly' | 'all-time'>('weekly');

  const weeklyLeaders: Leader[] = [
    { rank: 4, name: "رضا تهرانی", level: "طلایی", xp: 1900, img: "https://i.pravatar.cc/150?u=reza" },
    { rank: 5, name: "مریم حسینی", level: "نقره‌ای", xp: 1850, img: "https://i.pravatar.cc/150?u=maryam" },
    { rank: 6, name: "کیان پارسا", level: "برنزی", xp: 1720, img: "https://i.pravatar.cc/150?u=kian" },
  ];

  const allTimeLeaders: Leader[] = [
    { rank: 4, name: "سارا کریمی", level: "الماس", xp: 12400, img: "https://i.pravatar.cc/150?u=sara" },
    { rank: 5, name: "پویا راد", level: "طلایی", xp: 11200, img: "https://i.pravatar.cc/150?u=pouya" },
    { rank: 6, name: "نیلوفر", level: "طلایی", xp: 9800, img: "https://i.pravatar.cc/150?u=nilo" },
  ];

  const podiumWeekly = [
    { rank: 2, name: "سارا", xp: "۲,۳۰۰", img: "https://i.pravatar.cc/150?u=1" },
    { rank: 1, name: "امیرعلی (شما)", xp: "۲,۵۰۰", img: user.avatar },
    { rank: 3, name: "محمد", xp: "۲,۱۰۰", img: "https://i.pravatar.cc/150?u=3" }
  ];

  const podiumAllTime = [
    { rank: 2, name: "امیرعلی (شما)", xp: "۱۸,۴۰۰", img: user.avatar },
    { rank: 1, name: "آرش پیروز", xp: "۲۲,۱۵۰", img: "https://i.pravatar.cc/150?u=top1" },
    { rank: 3, name: "مریم حسینی", xp: "۱۵,۹۰۰", img: "https://i.pravatar.cc/150?u=top3" }
  ];

  const currentLeaders = activeTab === 'weekly' ? weeklyLeaders : allTimeLeaders;
  const currentPodium = activeTab === 'weekly' ? podiumWeekly : podiumAllTime;

  return (
    <div className="flex flex-col min-h-screen bg-background-light pb-40 animate-in slide-in-from-left duration-500">
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50 transition-colors text-text-main">
            <span className="material-symbols-outlined text-2xl">arrow_forward</span>
          </button>
          <h1 className="text-lg font-bold text-text-main">لیدربورد قهرمانان</h1>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50 transition-colors text-text-main">
            <span className="material-symbols-outlined text-2xl">workspace_premium</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full max-w-md mx-auto">
        {/* Tab Switcher - Fixed Position & Z-index */}
        <div className="px-4 py-4 relative z-[60]">
          <div className="bg-gray-100 p-1.5 rounded-xl flex relative">
            <button 
              onClick={() => setActiveTab('weekly')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 z-10 ${activeTab === 'weekly' ? 'bg-primary text-white shadow-md' : 'text-text-sub hover:text-text-main'}`}
            >
              هفتگی
            </button>
            <button 
              onClick={() => setActiveTab('all-time')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 z-10 ${activeTab === 'all-time' ? 'bg-primary text-white shadow-md' : 'text-text-sub hover:text-text-main'}`}
            >
              کل ادوار
            </button>
          </div>
        </div>

        {/* Podium Section - Increased Top Padding to avoid Crown Overlap */}
        <div className="px-4 pt-14 pb-8 relative">
          <div className="flex items-end justify-center gap-4 text-center">
            {/* Rank 2 */}
            <div className="flex flex-col items-center gap-2 w-1/3 order-1 animate-in slide-in-from-bottom duration-700 delay-100">
              <div className="relative">
                <div className="w-20 h-20 rounded-full p-1 podium-gradient-silver shadow-lg">
                  <div className="w-full h-full rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img alt="Rank 2" className="w-full h-full object-cover" src={currentPodium[0].img}/>
                  </div>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-gray-600 font-black text-sm w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 shadow-sm">2</div>
              </div>
              <p className="font-bold text-sm text-text-main mt-2 truncate w-full px-1">{currentPodium[0].name}</p>
              <span className="text-xs text-primary font-bold">{currentPodium[0].xp} XP</span>
            </div>

            {/* Rank 1 */}
            <div className="flex flex-col items-center gap-2 w-1/3 -mt-8 order-2 z-10 animate-in zoom-in duration-500">
              <div className="relative">
                <div className="absolute -top-11 left-1/2 text-[#FFD700] crown-icon z-20">
                  <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>crown</span>
                </div>
                <div className="w-24 h-24 rounded-full p-1 podium-gradient-gold shadow-glow">
                  <div className="w-full h-full rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                    <img alt="Rank 1" className="w-full h-full object-cover" src={currentPodium[1].img}/>
                  </div>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white font-black text-base px-3 py-0.5 rounded-full border-2 border-white shadow-md z-20">1</div>
              </div>
              <p className="font-black text-base text-text-main mt-4 truncate w-full px-1">{currentPodium[1].name}</p>
              <span className="text-sm text-primary font-black">{currentPodium[1].xp} XP</span>
            </div>

            {/* Rank 3 */}
            <div className="flex flex-col items-center gap-2 w-1/3 order-3 animate-in slide-in-from-bottom duration-700 delay-200">
              <div className="relative">
                <div className="w-20 h-20 rounded-full p-1 podium-gradient-bronze shadow-lg">
                  <div className="w-full h-full rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img alt="Rank 3" className="w-full h-full object-cover" src={currentPodium[2].img}/>
                  </div>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-gray-600 font-black text-sm w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 shadow-sm">3</div>
              </div>
              <p className="font-bold text-sm text-text-main mt-2 truncate w-full px-1">{currentPodium[2].name}</p>
              <span className="text-xs text-primary font-bold">{currentPodium[2].xp} XP</span>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="bg-surface rounded-t-[2.5rem] shadow-soft px-4 pt-8 pb-4 -mx-2 flex-1 border-t border-gray-100">
          <div className="flex justify-between items-center px-4 mb-5">
             <div className="text-xs text-text-muted font-bold uppercase tracking-wider">سایر قهرمانان</div>
             <div className="text-[10px] bg-slate-100 text-slate-500 font-black px-2 py-0.5 rounded-full">بروزرسانی: لحظه‌ای</div>
          </div>
          <div className="flex flex-col gap-1">
            {currentLeaders.map((leader, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-all rounded-2xl border-b border-slate-50 last:border-0 group">
                <div className="w-6 text-center text-text-sub font-black text-sm group-hover:text-primary transition-colors">{leader.rank}</div>
                <div className="w-11 h-11 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-slate-100 group-hover:border-primary/30 transition-all">
                  <img alt={leader.name} className="w-full h-full object-cover" src={leader.img}/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-text-main truncate text-sm">{leader.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-primary/80 bg-primary/5 px-2 py-0.5 rounded-full">{leader.level}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl group-hover:bg-primary/5 transition-colors">
                  <span className="text-text-main font-black text-sm">{leader.xp.toLocaleString('fa-IR')}</span>
                  <span className="text-[9px] text-text-muted font-bold">XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* User Status Footer - Persists Rank Info */}
      <div className="fixed bottom-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200 pb-20 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="w-full h-1 bg-gray-100">
          <div className="h-full bg-primary w-[75%] shadow-[0_0_12px_rgba(255,96,10,0.4)] relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md border-2 border-primary animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-4 px-5 py-4 max-w-md mx-auto">
          <div className="flex flex-col items-center justify-center min-w-[40px]">
            <span className="text-[10px] text-text-sub font-black uppercase mb-0.5">رتبه</span>
            <span className="text-primary font-black text-2xl leading-none">{activeTab === 'weekly' ? '۱' : '۲'}</span>
          </div>
          <div className="w-12 h-12 p-0.5 rounded-full border-2 border-primary shrink-0 shadow-sm">
            <img alt="Me" className="w-full h-full rounded-full object-cover" src={user.avatar}/>
          </div>
          <div className="flex-1">
            <p className="font-black text-text-main text-sm">امیرعلی (شما)</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] text-slate-500 font-bold">
                {activeTab === 'weekly' ? 'در صدر جدول هفتگی 🏆' : '۷۵۰ امتیاز تا صدر جدول کل'}
              </span>
            </div>
          </div>
          <div className="text-left flex flex-col items-end">
            <div className="flex items-center gap-1">
              <span className="text-primary font-black text-xl">{activeTab === 'weekly' ? '۲,۵۰۰' : '۱۸,۴۰۰'}</span>
              <span className="text-[10px] text-primary/70 font-black mb-1">XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
