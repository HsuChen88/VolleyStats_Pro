import { MatchData, VolleyEvent, MatchStats, PlayerStats } from '../types';
import { mockMatch } from '../utils/mockData';

// Simulated storage for an actual database
let currentMatch: MatchData = { ...mockMatch };
let matchEvents: VolleyEvent[] = [];

// Initialize localStorage if available
const initLocalStorage = () => {
  try {
    const storedMatch = localStorage.getItem('currentMatch');
    const storedEvents = localStorage.getItem('matchEvents');
    
    if (storedMatch) {
      currentMatch = JSON.parse(storedMatch);
    } else {
      localStorage.setItem('currentMatch', JSON.stringify(currentMatch));
    }
    
    if (storedEvents) {
      matchEvents = JSON.parse(storedEvents);
    } else {
      localStorage.setItem('matchEvents', JSON.stringify(matchEvents));
    }
  } catch (e) {
    console.error('LocalStorage not available:', e);
  }
};

initLocalStorage();

// Get current match data
export const getCurrentMatch = (): MatchData => {
  return currentMatch;
};

// Record a new volleyball event
export const recordEvent = (event: Omit<VolleyEvent, 'id'>): VolleyEvent => {
  const newEvent: VolleyEvent = {
    ...event,
    id: `event-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  };
  
  matchEvents.push(newEvent);
  
  // Update match state based on event
  if (event.type === 'point') {
    const setIndex = currentMatch.currentSet - 1;
    const currentSetData = currentMatch.sets[setIndex];
    
    if (event.teamId === currentMatch.homeTeam.id) {
      currentSetData.homeScore = event.homeScore;
    } else {
      currentSetData.awayScore = event.awayScore;
    }
    
    // Check if set is complete (typically 25 points with 2-point lead)
    if ((currentSetData.homeScore >= 25 || currentSetData.awayScore >= 25) && 
        Math.abs(currentSetData.homeScore - currentSetData.awayScore) >= 2) {
      currentSetData.status = 'completed';
      
      // Check if next set should be started
      if (currentMatch.currentSet < 5) {
        currentMatch.currentSet += 1;
        currentMatch.sets[currentMatch.currentSet - 1].status = 'live';
      } else {
        // Match is complete
        currentMatch.status = 'completed';
      }
    }
  }
  
  // Save to localStorage
  try {
    localStorage.setItem('currentMatch', JSON.stringify(currentMatch));
    localStorage.setItem('matchEvents', JSON.stringify(matchEvents));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
  
  return newEvent;
};

// Get events for the current match
export const getMatchEvents = (): VolleyEvent[] => {
  return matchEvents.filter(event => event.matchId === currentMatch.id);
};

// Calculate statistics for the current match
export const calculateMatchStats = (): MatchStats => {
  const events = getMatchEvents();
  
  // Initialize team stats
  const stats: MatchStats = {
    matchId: currentMatch.id,
    homeTeamStats: {
      points: 0,
      serves: { aces: 0, errors: 0, total: 0 },
      attacks: { kills: 0, errors: 0, total: 0 },
      blocks: { points: 0, touches: 0, total: 0 },
      digs: 0,
      receives: { perfect: 0, errors: 0, total: 0 },
    },
    awayTeamStats: {
      points: 0,
      serves: { aces: 0, errors: 0, total: 0 },
      attacks: { kills: 0, errors: 0, total: 0 },
      blocks: { points: 0, touches: 0, total: 0 },
      digs: 0,
      receives: { perfect: 0, errors: 0, total: 0 },
    },
    playerStats: {},
  };
  
  // Initialize player stats
  const allPlayers = [...currentMatch.homeTeam.players, ...currentMatch.awayTeam.players];
  allPlayers.forEach(player => {
    stats.playerStats[player.id] = {
      playerId: player.id,
      playerName: player.name,
      playerNumber: player.number,
      teamId: player.id < 200 ? currentMatch.homeTeam.id : currentMatch.awayTeam.id,
      serves: { total: 0, aces: 0, errors: 0 },
      attacks: { total: 0, kills: 0, errors: 0 },
      blocks: { total: 0, points: 0, touches: 0 },
      digs: 0,
      sets: 0,
      receives: { total: 0, perfect: 0, errors: 0 },
    };
  });
  
  // Process each event to build stats
  events.forEach(event => {
    const teamStats = event.teamId === currentMatch.homeTeam.id 
      ? stats.homeTeamStats 
      : stats.awayTeamStats;
    
    const playerStat = stats.playerStats[event.playerId];
    if (!playerStat) return; // Skip if player not found
    
    // Process different event types
    switch(event.type) {
      case 'serve':
        teamStats.serves.total++;
        playerStat.serves.total++;
        
        if (event.result === 'success') { // Ace
          teamStats.serves.aces++;
          playerStat.serves.aces++;
        } else if (event.result === 'error') { // Error
          teamStats.serves.errors++;
          playerStat.serves.errors++;
        }
        break;
        
      case 'attack':
        teamStats.attacks.total++;
        playerStat.attacks.total++;
        
        if (event.result === 'success') { // Kill
          teamStats.attacks.kills++;
          playerStat.attacks.kills++;
        } else if (event.result === 'error') { // Error
          teamStats.attacks.errors++;
          playerStat.attacks.errors++;
        }
        break;
        
      case 'block':
        teamStats.blocks.total++;
        playerStat.blocks.total++;
        
        if (event.result === 'success') { // Point
          teamStats.blocks.points++;
          playerStat.blocks.points++;
        } else if (event.result === 'neutral') { // Touch
          teamStats.blocks.touches++;
          playerStat.blocks.touches++;
        }
        break;
        
      case 'dig':
        teamStats.digs++;
        playerStat.digs++;
        break;
        
      case 'set':
        playerStat.sets++;
        break;
        
      case 'receive':
        teamStats.receives.total++;
        playerStat.receives.total++;
        
        if (event.result === 'success') { // Perfect pass
          teamStats.receives.perfect++;
          playerStat.receives.perfect++;
        } else if (event.result === 'error') { // Error
          teamStats.receives.errors++;
          playerStat.receives.errors++;
        }
        break;
        
      case 'point':
        if (event.teamId === currentMatch.homeTeam.id) {
          stats.homeTeamStats.points++;
        } else {
          stats.awayTeamStats.points++;
        }
        break;
    }
  });
  
  return stats;
};

// Reset match for testing
export const resetMatch = () => {
  currentMatch = { ...mockMatch };
  matchEvents = [];
  
  try {
    localStorage.setItem('currentMatch', JSON.stringify(currentMatch));
    localStorage.setItem('matchEvents', JSON.stringify(matchEvents));
  } catch (e) {
    console.error('Error resetting match data:', e);
  }
};