
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile, HistoryEvent } from '../../types';
import { GoogleGenAI } from "@google/genai";
import confetti from 'canvas-confetti';

interface Props {
  user: UserProfile;
  updateBalance: (xp: number, coins: number) => void;
  addHistory: (event: Omit<HistoryEvent, 'id'>) => void;
}

const GameCenterScreen: React.FC<Props> = ({ user, updateBalance, addHistory }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [aiTip, setAiTip] = useState<string>("در حال تحلیل شانس شما...");
  const [rewardModal, setRewardModal] = useState<{isOpen: boolean, title: string, value: string, icon: string} | null>(null);
  
  // Daily Streak State (Mocked logic for 7 days)
  const [currentDay, setCurrentDay] = useState(3); // Assume user is on day 3
  const [claimedDays, setClaimedDays] = useState<number[]>([1, 2]);

  const currentVersion = "v1.5.0 (Streak Edition)";

  const streakRewards = [
    { day: 1, type: 'xp', value: 20, icon: 'bolt' },
    { day: 2, type: 'coins', value: 50, icon: 'monetization_on' },
    { day: 3, type: 'xp', value: 40, icon: 'bolt' },
    { day: 4, type: 'coins', value: 100, icon: 'monetization_on' },
    { day: 5, type: 'xp', value: 60, icon: 'bolt' },
    { day: 6, type: 'coins', value: 150, icon: 'monetization_on' },
    { day: 7, type: 'mega', value: 500, icon: 'redeem' }, // Big reward
  ];

  useEffect(() => {
    const fetchAiTip = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `کاربر در روز ${currentDay} از استریک ۷ روزه است. یک جمله کوتاه و انگیزشی برای ادامه دادن استریک بنویس.`,
        });
        setAiTip(response.text || "فقط ۴ روز دیگه تا جایزه بزرگ!");
      } catch (e) {
        setAiTip("ادامه بده! جایزه بزرگ در انتظارته.");
      }
    };
    fetchAiTip();
  }, [currentDay]);

  const handleClaimStreak = (day: number, reward: any) => {
    if (day !== currentDay || claimedDays.includes(day)) return;

    setClaimedDays([...claimedDays, day]);
    const xpReward = reward.type === 'xp' ? reward.value : (reward.type === 'mega' ? 100 : 0);
    const coinReward = reward.type === 'coins' ? reward.value : (reward.type === 'mega' ? 500 : 0);
    
    updateBalance(xpReward, coinReward);
    addHistory({ 
      type: 'earn', 
      title: `هدیه روز ${day} استریک`, 
      subtitle: 'ورود روزانه متوالی', 
      value: `+${reward.value} ${reward.type === 'xp' ? 'XP' : 'سکه'}`, 
      timestamp: 'الان', 
      icon: 'calendar_today' 
    });

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.3 },
      colors: ['#FF600A', '#EAB308']
    });
  };

  const handleSpin = () => {
    if (isSpinning || user.coins < 100) return;
    setIsSpinning(true);
    
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (360 * 6) + extraDegrees;
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      confetti({ 
        particleCount: 150, 
        spread: 80, 
        origin: { y: 0.6 },
        colors: ['#FF600A', '#FFD700', '#FFFFFF']
      });
      
      setRewardModal({ isOpen: true, title: 'هوراااا!', value: '۲۵۰ سکه برنده شدی!', icon: 'military_tech' });
      updateBalance(0, 150);
      addHistory({ type: 'earn', title: 'برد در گردونه', subtitle: 'جایزه ویژه', value: '+۲۵۰ سکه', timestamp: 'الان', icon: 'casino' });
    }, 4000);
  };

  return (
    <div className="pb-28 px-4 pt-6 max-w-md mx-auto">
      {/* Version Info */}
      <div className="flex justify-between items-center mb-6 px-1">
        <div className="bg-slate-800/5 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200">
          <span className="text-[9px] font-black text-slate-500 tracking-tighter uppercase">{currentVersion}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[9px] font-bold text-slate-400">سیستم آنلاین</span>
        </div>
      </div>

      {/* Profile Header */}
      <div className="flex items-center justify-between mb-8 glass-card p-3 rounded-3xl border-white shadow-soft">
        <div className="flex items-center gap-3">
           <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-soft overflow-hidden">
             <img src={user.avatar} className="w-full h-full object-cover" alt="avatar" />
           </div>
           <div>
             <h2 className="text-xs font-black text-slate-800">سلام، {user.name}</h2>
             <div className="flex items-center gap-1">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
               <span className="text-[10px] text-slate-400 font-bold">رتبه {user.rank} • لول {Math.floor(user.xp / 500)}</span>
             </div>
           </div>
        </div>
        <div className="bg-primary/5 px-4 py-2 rounded-2xl flex items-center gap-2 border border-primary/10">
           <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
           <span className="text-sm font-black text-slate-800">{user.coins.toLocaleString('fa-IR')}</span>
        </div>
      </div>

      {/* 7-Day Daily Streak Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-sm font-black text-slate-800">هدیه ۷ روزه</h3>
          <span className="text-[10px] text-primary font-bold">{3 - claimedDays.length} روز تا جایزه بزرگ</span>
        </div>
        <div className="flex justify-between gap-2 overflow-x-auto no-scrollbar pb-2">
          {streakRewards.map((reward) => {
            const isClaimed = claimedDays.includes(reward.day);
            const isCurrent = reward.day === currentDay;
            const isFuture = reward.day > currentDay;

            return (
              <div 
                key={reward.day}
                onClick={() => handleClaimStreak(reward.day, reward)}
                className={`flex-1 min-w-[54px] aspect-[4/5] rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border
                  ${isClaimed ? 'bg-green-50 border-green-100 opacity-60' : 
                    isCurrent ? 'bg-white border-primary shadow-glow scale-110 z-10 animate-pulse cursor-pointer' : 
                    'bg-white border-slate-100 opacity-80'}`}
              >
                <span className="text-[9px] font-black text-slate-400">روز {reward.day}</span>
                <div className={`size-8 rounded-full flex items-center justify-center 
                  ${isClaimed ? 'bg-green-500 text-white' : 
                    isCurrent ? 'bg-primary text-white' : 
                    'bg-slate-100 text-slate-400'}`}>
                  <span className="material-symbols-outlined text-lg">
                    {isClaimed ? 'check' : reward.icon}
                  </span>
                </div>
                <span className={`text-[10px] font-black ${isCurrent ? 'text-primary' : 'text-slate-600'}`}>
                  {reward.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lucky Wheel Card */}
      <div className="glass-card rounded-[3.5rem] p-8 shadow-soft mb-8 relative flex flex-col items-center overflow-hidden border-white/60">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-8 relative z-10">
          <h3 className="text-2xl font-black text-slate-800 mb-1">گردونه شانس</h3>
          <p className="text-slate-400 text-[11px] font-medium italic">"{aiTip}"</p>
        </div>

        {/* Improved Large Wheel */}
        <div className="relative mb-12 group scale-110">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 drop-shadow-xl">
            <div className="w-6 h-8 bg-slate-800 rounded-full flex items-center justify-center p-1 shadow-2xl">
              <div className="w-full h-full bg-white rounded-full"></div>
            </div>
          </div>

          <div 
            className="w-56 h-56 rounded-full border-[8px] border-white shadow-[0_15px_45px_rgba(0,0,0,0.15)] spin-wheel relative overflow-hidden"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              background: 'conic-gradient(from 0deg, #FF600A 0deg 45deg, #3B82F6 45deg 90deg, #8B5CF6 90deg 135deg, #10B981 135deg 180deg, #F59E0B 180deg 225deg, #EC4899 225deg 270deg, #6366F1 270deg 315deg, #94A3B8 315deg 360deg)'
            }}
          >
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]"></div>
            <div className="absolute inset-0 m-auto w-14 h-14 bg-white rounded-full shadow-2xl border-[6px] border-slate-50 flex items-center justify-center z-20">
               <span className="material-symbols-outlined text-slate-200 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            </div>
          </div>
        </div>

        {/* The Requested CTA Button */}
        <button 
          onClick={handleSpin}
          disabled={isSpinning || user.coins < 100}
          className="w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:shadow-glow active:scale-95 transition-all disabled:opacity-50 flex flex-col items-center gap-0.5 relative z-10 overflow-hidden group"
        >
          {isSpinning ? (
             <span className="text-lg animate-pulse">در حال چرخش...</span>
          ) : (
            <>
              <span className="text-lg group-hover:scale-105 transition-transform">بزن بریم!</span>
              <span className="text-[10px] text-white/50 font-bold">هر چرخش = ۱۰۰ سکه</span>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/missions" className="glass-card p-5 rounded-3xl shadow-soft flex flex-col gap-3 group active:scale-95 transition-all border-white">
          <div className="size-11 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <div>
            <span className="text-sm font-bold text-slate-800 block">ماموریت‌ها</span>
            <span className="text-[9px] text-slate-400">کسب XP رایگان</span>
          </div>
        </Link>
        <Link to="/rewards" className="glass-card p-5 rounded-3xl shadow-soft flex flex-col gap-3 group active:scale-95 transition-all border-white">
          <div className="size-11 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-2xl">storefront</span>
          </div>
          <div>
            <span className="text-sm font-bold text-slate-800 block">فروشگاه</span>
            <span className="text-[9px] text-slate-400">جوایز واقعی</span>
          </div>
        </Link>
      </div>

      {/* Reward Modal */}
      {rewardModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setRewardModal(null)}></div>
          <div className="relative bg-white rounded-[3rem] p-8 w-full text-center shadow-2xl animate-in zoom-in-90 duration-300">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-primary/10 flex items-center justify-center mb-6 text-primary rotate-12 shadow-inner">
              <span className="material-symbols-outlined text-5xl">redeem</span>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">{rewardModal.title}</h3>
            <p className="text-primary font-black text-xl mb-10">{rewardModal.value}</p>
            <button onClick={() => setRewardModal(null)} className="w-full py-5 bg-primary text-white rounded-2xl font-black shadow-glow active:scale-95 transition-all text-lg">ایول!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCenterScreen;
