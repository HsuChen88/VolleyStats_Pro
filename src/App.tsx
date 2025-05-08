import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Scoreboard from './components/Scoreboard';
import MatchControlPanel from './components/MatchControlPanel';
import StatsDashboard from './components/StatsDashboard';
import EventTimeline from './components/EventTimeline';
import PlayerStatsList from './components/PlayerStatsList';
import { VolleyEvent } from './types';

import { 
  getCurrentMatch, 
  getMatchEvents, 
  recordEvent, 
  calculateMatchStats, 
  resetMatch 
} from './services/matchService';

function App() {
  const [match, setMatch] = useState(getCurrentMatch());
  const [events, setEvents] = useState<VolleyEvent[]>([]);
  const [stats, setStats] = useState(calculateMatchStats());
  
  // Load initial data
  useEffect(() => {
    updateMatchData();
    
    // Set up interval to refresh data every second (simulating real-time updates)
    const intervalId = setInterval(() => {
      updateMatchData();
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Update match data from the service
  const updateMatchData = () => {
    setMatch(getCurrentMatch());
    setEvents(getMatchEvents());
    setStats(calculateMatchStats());
  };
  
  // Handle recording a new event
  const handleRecordEvent = (event: Omit<VolleyEvent, 'id'>) => {
    recordEvent(event);
    updateMatchData();
  };
  
  // Get current set data
  const currentSetData = match.sets[match.currentSet - 1];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <Scoreboard match={match} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <MatchControlPanel 
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              matchId={match.id}
              currentSet={match.currentSet}
              homeScore={currentSetData.homeScore}
              awayScore={currentSetData.awayScore}
              onRecordEvent={handleRecordEvent}
            />
            
            <EventTimeline 
              events={events}
              homeTeamId={match.homeTeam.id}
              awayTeamId={match.awayTeam.id}
              homeTeamName={match.homeTeam.name}
              awayTeamName={match.awayTeam.name}
            />
          </div>
          
          {/* Middle/Right Columns */}
          <div className="space-y-6 lg:col-span-2">
            <StatsDashboard 
              stats={stats}
              homeTeamName={match.homeTeam.name}
              awayTeamName={match.awayTeam.name}
            />
            
            <PlayerStatsList 
              playerStats={stats.playerStats}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />
            
            {/* Development-only controls */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-bold text-lg mb-2">Development Controls</h2>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  resetMatch();
                  updateMatchData();
                }}
              >
                Reset Match
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;