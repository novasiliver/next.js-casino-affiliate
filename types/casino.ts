export interface BankingMethod {
  name: string;
  type: string;
  time: string;
  fee: string;
  icon?: string;
}

export interface GameSelection {
  slots: number;
  liveTables: number;
  jackpots: number;
  liveAction: string;
  providers: string[];
}

export interface RatingBreakdown {
  fairness: number;
  bonuses: number;
  gameVariety: number;
  supportSpeed: number;
}

export interface ProsCons {
  pros: string[];
  cons: string[];
}

export interface Casino {
  slug: string;
  name: string;
  logo: string;
  rating: number;
  votes?: number;
  established?: number;
  region?: string;
  payoutSpeed?: string;
  rtp?: string;
  bonus: {
    title: string;
    amount: string;
    details?: string;
    code?: string;
    wagering?: string;
    minDeposit?: string;
    expiry?: string;
  };
  tags?: string[];
  description?: string;
  template: string; // "template1", "template2", etc.
  
  // Review-specific data
  verdict?: string;
  prosCons?: ProsCons;
  banking?: BankingMethod[];
  gameSelection?: GameSelection;
  ratingBreakdown?: RatingBreakdown;
  casinoInfo?: {
    established: number;
    license: string;
    owner: string;
    minDeposit: string;
    vpnFriendly: boolean;
  };
  reviewContent?: {
    userExperience?: string;
    customerSupport?: string;
  };
  alternatives?: Array<{
    slug: string;
    name: string;
    logo: string;
    bonus: string;
  }>;
}

