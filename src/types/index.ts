export type Player = {
  id: number;
  name: string;
  number: number;
  position: string;
};

export type Team = {
  id: number;
  name: string;
  players: Player[];
};

export type MatchData = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  location: string;
  status: "upcoming" | "live" | "completed";
  currentSet: number;
  sets: SetData[];
};

export type SetData = {
  id: number;
  homeScore: number;
  awayScore: number;
  status: "upcoming" | "live" | "completed";
  events: VolleyEvent[];
};

export type EventType = 
  | "serve" 
  | "receive" 
  | "set" 
  | "attack" 
  | "block" 
  | "dig" 
  | "timeout"
  | "substitution"
  | "point";

export type EventResult = 
  | "success" 
  | "error" 
  | "neutral";

export type VolleyEvent = {
  id: string;
  matchId: string;
  timestamp: string;
  type: EventType;
  playerId: number;
  teamId: number;
  setNumber: number;
  result: EventResult;
  homeScore: number;
  awayScore: number;
  details?: Record<string, any>;
};

export type PlayerStats = {
  playerId: number;
  playerName: string;
  playerNumber: number;
  teamId: number;
  serves: {
    total: number;
    aces: number;
    errors: number;
  };
  attacks: {
    total: number;
    kills: number;
    errors: number;
  };
  blocks: {
    total: number;
    points: number;
    touches: number;
  };
  digs: number;
  sets: number;
  receives: {
    total: number;
    perfect: number;
    errors: number;
  };
};

export type MatchStats = {
  matchId: string;
  homeTeamStats: {
    points: number;
    serves: { aces: number; errors: number; total: number };
    attacks: { kills: number; errors: number; total: number };
    blocks: { points: number; touches: number; total: number };
    digs: number;
    receives: { perfect: number; errors: number; total: number };
  };
  awayTeamStats: {
    points: number;
    serves: { aces: number; errors: number; total: number };
    attacks: { kills: number; errors: number; total: number };
    blocks: { points: number; touches: number; total: number };
    digs: number;
    receives: { perfect: number; errors: number; total: number };
  };
  playerStats: Record<number, PlayerStats>;
};