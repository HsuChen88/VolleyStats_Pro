import { MatchData, Team } from '../types';

// Mock Teams
export const homeTeam: Team = {
  id: 1,
  name: "Taipei Dragons",
  players: [
    { id: 101, name: "Liu Wei", number: 7, position: "Setter" },
    { id: 102, name: "Chen Jie", number: 9, position: "Outside Hitter" },
    { id: 103, name: "Wang Tao", number: 12, position: "Middle Blocker" },
    { id: 104, name: "Zhang Min", number: 5, position: "Opposite" },
    { id: 105, name: "Li Wei", number: 3, position: "Outside Hitter" },
    { id: 106, name: "Wu Ying", number: 8, position: "Middle Blocker" },
    { id: 107, name: "Zhao Lei", number: 1, position: "Libero" },
    { id: 108, name: "Sun Jian", number: 14, position: "Setter" },
    { id: 109, name: "Huang Peng", number: 10, position: "Outside Hitter" },
    { id: 110, name: "Zhou Kai", number: 6, position: "Middle Blocker" },
    { id: 111, name: "Yang Hong", number: 11, position: "Opposite" },
    { id: 112, name: "Xie Gang", number: 4, position: "Libero" },
  ]
};

export const awayTeam: Team = {
  id: 2,
  name: "Kaohsiung Phoenix",
  players: [
    { id: 201, name: "Lin Tzu-wei", number: 2, position: "Setter" },
    { id: 202, name: "Tsai Ming-han", number: 13, position: "Outside Hitter" },
    { id: 203, name: "Lee Chih-kai", number: 17, position: "Middle Blocker" },
    { id: 204, name: "Chang Wei-cheng", number: 22, position: "Opposite" },
    { id: 205, name: "Hsu Chien-tung", number: 19, position: "Outside Hitter" },
    { id: 206, name: "Cheng Yu-min", number: 8, position: "Middle Blocker" },
    { id: 207, name: "Wu Chien-ho", number: 15, position: "Libero" },
    { id: 208, name: "Kao Chia-wei", number: 3, position: "Setter" },
    { id: 209, name: "Ho Tsung-chieh", number: 7, position: "Outside Hitter" },
    { id: 210, name: "Chen Po-ting", number: 5, position: "Middle Blocker" },
    { id: 211, name: "Yen Hsiang-chun", number: 10, position: "Opposite" },
    { id: 212, name: "Kuo Tzu-cheng", number: 1, position: "Libero" },
  ]
};

// Mock Match
export const mockMatch: MatchData = {
  id: "vb2024-0512-001",
  homeTeam: homeTeam,
  awayTeam: awayTeam,
  date: "2024-05-12T19:30:00",
  location: "Taipei Arena",
  status: "live",
  currentSet: 1,
  sets: [
    {
      id: 1,
      homeScore: 0,
      awayScore: 0,
      status: "live",
      events: []
    },
    {
      id: 2,
      homeScore: 0,
      awayScore: 0,
      status: "upcoming",
      events: []
    },
    {
      id: 3,
      homeScore: 0,
      awayScore: 0,
      status: "upcoming",
      events: []
    },
    {
      id: 4,
      homeScore: 0,
      awayScore: 0,
      status: "upcoming",
      events: []
    },
    {
      id: 5,
      homeScore: 0,
      awayScore: 0,
      status: "upcoming",
      events: []
    }
  ]
};