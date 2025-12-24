
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, RewardItem, HistoryEvent } from '../../types';

interface Props {
  user: UserProfile;
  updateBalance: (xp: number, coins: number) => void;
  addHistory: (event: Omit<HistoryEvent, 'id'>) => void;
}

const RewardsScreen: React.FC<Props> = ({ user, updateBalance, addHistory }) => {
  const navigate = useNavigate();

  const rewards: RewardItem[] = [
    {
      id: 'r1',
      title: 'کد تخفیف ۲۰٪',
      description: 'خرید بالای ۲۰۰ هزار تومان',
      cost: 500,
      image: 'shopping_bag',
      type: 'discount',
      isPopular: true
    },
    {
      id: 'r2',
      title: 'ارسال رایگان',
      description: 'یک سفارش بدون محدودیت',
      cost: 350,
      image: 'local_shipping',
      type: 'shipping'
    },
    {
      id: 'r3',
      title: 'بن خرید ۵۰ هزار تومانی',
      description: 'قابل استفاده در تمامی بخش‌ها',
      cost: 1000,
      image: 'payments',
      type: 'discount'
    },
    {
      id: 'r4',
      title: 'بسته سوپرایز میوه',
      description: 'شامل ۵ نوع میوه فصل',
      cost: 1500,
      image: 'nutrition',
      type: 'physical'
    }
  ];

  const handleRedeem = (reward: RewardItem) => {
    if (user.coins < reward.cost) return;
    
    updateBalance(0, -reward.cost);
    addHistory({
      type: 'spend',
      title: `دریافت جایزه: ${reward.title}`,
      subtitle: reward.description,
      value: `- ${reward.cost} سکه`,
      timestamp: 'امروز',
      icon: 'redeem'
    });
    alert(`تبریک! ${reward.title} با موفقیت دریافت شد. کد تخفیف در تاریخچه شما موجود است.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light pb-20 animate-in fade-in duration-500">
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50 transition-colors text-text-main">
            <span className="material-symbols-outlined text-2xl">arrow_forward</span>
          </button>
          <h1 className="text-lg font-bold text-text-main">فروشگاه جوایز</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto">
        <div className="bg-surface rounded-b-[2rem] shadow-soft px-6 py-8 mb-6 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
               <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
            </div>
            <div>
              <p className="text-sm text-text-sub font-medium">موجودی سکه‌های شما</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-3xl font-black text-primary">{user.coins.toLocaleString('fa-IR')}</span>
                <span className="text-primary/70 text-xs font-bold mb-1">سکه</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 grid grid-cols-2 gap-4 mb-8">
          {rewards.map((reward) => (
            <div key={reward.id} className="bg-surface p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:border-primary transition-all group">
              <div className="aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <span className="material-symbols-outlined text-5xl text-primary group-hover:scale-110 transition-transform duration-500">{reward.image}</span>
                {reward.isPopular && <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">محبوب</div>}
              </div>
              <h3 className="font-bold text-text-main text-sm mb-1">{reward.title}</h3>
              <p className="text-[10px] text-text-sub mb-4 h-6 line-clamp-2">{reward.description}</p>
              <button 
                onClick={() => handleRedeem(reward)}
                disabled={user.coins < reward.cost}
                className={`mt-auto w-full py-2.5 rounded-xl text-xs font-bold transition-all ${user.coins >= reward.cost ? 'bg-primary text-white shadow-md active:scale-95' : 'bg-gray-100 text-gray-400'}`}
              >
                {user.coins >= reward.cost ? `${reward.cost} سکه` : `کسری: ${reward.cost - user.coins}`}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RewardsScreen;
