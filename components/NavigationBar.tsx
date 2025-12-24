
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'خانه', icon: 'grid_view' },
    { path: '/leaderboard', label: 'رتبه', icon: 'military_tech' },
    { path: '/missions', label: 'ماموریت', icon: 'auto_awesome' },
    { path: '/rewards', label: 'جوایز', icon: 'storefront' },
    { path: '/history', label: 'تاریخچه', icon: 'database' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 py-3 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-primary scale-105' : 'text-slate-400'}`}
            >
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationBar;
