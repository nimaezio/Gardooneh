
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, Mission, HistoryEvent } from '../../types';

interface Props {
  user: UserProfile;
  updateBalance: (xp: number, coins: number) => void;
  addHistory: (event: Omit<HistoryEvent, 'id'>) => void;
}

const MissionsScreen: React.FC<Props> = ({ user, updateBalance, addHistory }) => {
  const navigate = useNavigate();
  const [claimedIds, setClaimedIds] = useState<string[]>([]);
  const [weeklyClaimed, setWeeklyClaimed] = useState(false);

  const missions: Mission[] = [
    { id: 'm1', title: 'ورود روزانه', description: 'هر روز سر بزن و XP بگیر.', rewardXp: 20, rewardCoins: 0, progress: 1, total: 1, category: 'daily', isClaimed: false },
    { id: 'm2', title: 'خرید از میوه‌فروشی', description: 'اولین خرید میوه در هفته.', rewardXp: 50, rewardCoins: 0, progress: 0, total: 1, category: 'shopping', isClaimed: false },
    { id: 'm3', title: 'ثبت نظر', description: 'نظرت رو بنویس و لول‌آپ کن.', rewardXp: 30, rewardCoins: 0, progress: 1, total: 1, category: 'social', isClaimed: false },
    { id: 'm4', title: 'سفارش بالای ۵۰۰ت', description: 'یک سبد خرید حرفه‌ای بچین.', rewardXp: 100, rewardCoins: 0, progress: 0, total: 1, category: 'shopping', isClaimed: false },
  ];

  const handleClaim = (m: Mission) => {
    if (claimedIds.includes(m.id)) return;
    setClaimedIds([...claimedIds, m.id]);
    updateBalance(m.rewardXp, 0);
    addHistory({ type: 'earn', title: `ماموریت: ${m.title}`, subtitle: 'جایزه تجربه', value: `+${m.rewardXp} XP`, timestamp: 'امروز', icon: 'bolt' });
  };

  const handleWeekly = () => {
    if (claimedIds.length < 3 || weeklyClaimed) return;
    setWeeklyClaimed(true);
    updateBalance(0, 500);
    addHistory({ type: 'earn', title: 'پاداش ۳ ماموریت', subtitle: 'جایزه هفتگی', value: '+۵۰۰ سکه', timestamp: 'الان', icon: 'redeem' });
  };

  return (
    <div className="pb-32 px-4 pt-6 max-w-md mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full glass-card shadow-soft flex items-center justify-center text-slate-800">
           <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h1 className="text-xl font-black text-slate-800">ماموریت‌های فعال</h1>
      </header>

      {/* Weekly Goal Progress */}
      <div className="glass-card rounded-[2rem] p-6 shadow-soft mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
             <div>
               <h3 className="text-sm font-black text-slate-800">هدف این هفته 🎯</h3>
               <p className="text-[10px] text-slate-400 font-bold">۳ ماموریت برو، ۵۰۰ سکه لوت کن!</p>
             </div>
             <div className="bg-primary/10 text-primary px-3 py-1 rounded-xl text-[10px] font-black">۵۰۰ سکه</div>
          </div>
          <div className="flex gap-2 mb-6">
             {[1, 2, 3].map(i => (
               <div key={i} className={`flex-1 h-2 rounded-full transition-all duration-500 ${claimedIds.length >= i ? 'bg-primary shadow-glow' : 'bg-slate-100'}`}></div>
             ))}
          </div>
          {claimedIds.length >= 3 && !weeklyClaimed ? (
            <button onClick={handleWeekly} className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-glow animate-pulse">دریافت جایزه ویژه</button>
          ) : weeklyClaimed ? (
            <div className="text-center text-xs font-bold text-green-500 py-2 flex items-center justify-center gap-2">
               <span>جایزه دریافت شد</span>
               <span className="material-symbols-outlined text-sm">check_circle</span>
            </div>
          ) : (
             <div className="text-center text-[10px] font-bold text-slate-300 italic">هنوز {3 - claimedIds.length} ماموریت باقی‌مانده...</div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {missions.map(m => {
          const isDone = claimedIds.includes(m.id);
          const canClaim = m.progress >= m.total && !isDone;
          return (
            <div key={m.id} className={`glass-card p-4 rounded-2xl shadow-soft transition-all duration-300 ${isDone ? 'opacity-50 grayscale scale-95' : 'hover:scale-[1.02]'}`}>
              <div className="flex gap-4">
                <div className="size-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined">{m.category === 'shopping' ? 'shopping_basket' : 'task'}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-slate-800">{m.title}</h4>
                    <span className="text-[10px] font-black text-blue-500">+{m.rewardXp} XP</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">{m.description}</p>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-slate-300 tracking-widest">{m.progress}/{m.total}</span>
                     {canClaim ? (
                       <button onClick={() => handleClaim(m)} className="px-4 py-1.5 bg-blue-500 text-white text-[10px] font-bold rounded-lg shadow-md hover:bg-blue-600">دریافت XP</button>
                     ) : isDone ? (
                       <span className="text-[10px] font-bold text-green-500 uppercase">انجام شد</span>
                     ) : (
                       <span className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">قفل</span>
                     )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionsScreen;
