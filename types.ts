
export interface UserProfile {
  id: string;
  name: string;
  xp: number;
  coins: number;
  rank: number;
  level: 'bronze' | 'silver' | 'gold' | 'diamond';
  avatar: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  rewardCoins: number;
  progress: number;
  total: number;
  category: 'shopping' | 'social' | 'daily';
  isClaimed: boolean;
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  image: string;
  type: 'discount' | 'shipping' | 'physical';
  isPopular?: boolean;
}

export interface HistoryEvent {
  id: string;
  type: 'earn' | 'spend' | 'reward';
  title: string;
  subtitle: string;
  value: string;
  timestamp: string;
  icon: string;
}
