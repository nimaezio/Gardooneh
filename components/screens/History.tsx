
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, HistoryEvent } from '../../types';

interface Props {
  user: UserProfile;
  history: HistoryEvent[];
}

const HistoryScreen: React.FC<Props> = ({ user, history }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light min-h-screen pb-20 animate-in slide-in-from-bottom duration-500">
      <header className="sticky top-0 z-50 flex items-center bg-white/90 backdrop-blur-md p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="text-[#181310] flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight flex-1 text-center pr-10">تاریخچه فعالیت‌ها</h2>
      </header>

      <div className="flex gap-3 p-4 max-w-md mx-auto">
        <div className="flex-1 bg-white rounded-2xl p-4 shadow-soft border border-slate-100">
          <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">موجودی سکه</p>
          <p className="text-slate-900 text-2xl font-black">{user.coins.toLocaleString('fa-IR')}</p>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-4 shadow-soft border border-slate-100">
          <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">امتیاز تجربه</p>
          <p className="text-slate-900 text-2xl font-black">{user.xp.toLocaleString('fa-IR')}</p>
        </div>
      </div>

      <div className="flex-1 bg-white max-w-md mx-auto rounded-t-[2rem] shadow-soft overflow-hidden mt-4">
        {history.length === 0 ? (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">history_toggle_off</span>
            <p className="text-slate-400 font-bold">هنوز تراکنشی ثبت نشده است</p>
          </div>
        ) : (
          history.map((event, idx) => (
            <div key={event.id} className={`flex items-center gap-4 p-4 ${idx !== history.length - 1 ? 'border-b border-slate-50' : ''}`}>
              <div className={`size-12 shrink-0 rounded-2xl flex items-center justify-center 
                ${event.type === 'earn' ? 'bg-green-50 text-green-600' : event.type === 'reward' ? 'bg-purple-50 text-purple-600' : 'bg-red-50 text-red-600'}`}>
                <span className="material-symbols-outlined">{event.icon}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <p className="text-slate-900 text-sm font-bold">{event.title}</p>
                <p className="text-slate-400 text-[10px]">{event.subtitle}</p>
              </div>
              <div className="text-left">
                <p className={`text-sm font-black ${event.type === 'earn' ? 'text-green-600' : 'text-slate-900'}`}>{event.value}</p>
                <p className="text-slate-400 text-[10px]">{event.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
