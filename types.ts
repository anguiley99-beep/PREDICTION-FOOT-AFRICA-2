
export interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  country: {
    name: string;
    code: string;
  };
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  isAdmin: boolean;
}

export type PredictionValue = '1' | 'X' | '2' | '1X' | 'X2';

export interface Match {
  id: string;
  betNumber: number;
  homeTeam: {
    name: string;
    flagUrl: string;
  };
  awayTeam: {
    name: string;
    flagUrl: string;
  };
  date: string;
  competition: string;
  country: string;
  result?: {
    homeScore: number;
    awayScore: number;
  };
}

export interface Prediction {
  userId: string;
  matchId: string;
  prediction: PredictionValue;
}

export interface LeaderboardEntry {
  user: User;
  points: number;
  rank: number;
  rankChange: 'up' | 'down' | 'same';
}

export interface Rule {
  id: string;
  content: string;
}

export interface Info {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface ForumMessage {
  id: string;
  user: User;
  message: string;
  timestamp: string;
}

export interface ContactMessage {
  id: string;
  user: User;
  message: string;
  timestamp: string;
  isFromAdmin: boolean;
}

export interface Ad {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  url: string;
}
