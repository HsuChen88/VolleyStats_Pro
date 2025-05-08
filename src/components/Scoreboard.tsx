import React from 'react';
import { MatchData } from '../types';

interface ScoreboardProps {
  match: MatchData;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ match }) => {
  const { homeTeam, awayTeam, sets, currentSet } = match;
  
  // Get current set scores
  const currentSetData = sets[currentSet - 1];
  
  // Count sets won by each team
  const homeSetsWon = sets.filter(set => 
    set.status === 'completed' && set.homeScore > set.awayScore
  ).length;
  
  const awaySetsWon = sets.filter(set => 
    set.status === 'completed' && set.homeScore < set.awayScore
  ).length;

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg overflow-hidden shadow-lg">
      <div className="bg-slate-700 py-2 px-4 text-center">
        <h2 className="text-sm font-semibold text-slate-200">SET {currentSet}</h2>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Home Team */}
        <div className={`flex-1 p-4 ${homeSetsWon > awaySetsWon ? 'bg-blue-900/30' : ''}`}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl">{homeTeam.name}</h3>
              <div className="flex space-x-1 mt-1">
                {Array(5).fill(0).map((_, i) => (
                  <div key={`home-set-${i}`} className={`w-6 h-6 flex items-center justify-center rounded 
                    ${i < homeSetsWon ? 'bg-blue-600' : 'bg-slate-700'}`}>
                    {i < sets.length && sets[i].status === 'completed' ? sets[i].homeScore : ''}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-5xl font-bold tabular-nums">{currentSetData.homeScore}</div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="bg-slate-600 w-full h-1 md:h-auto md:w-1"></div>
        
        {/* Away Team */}
        <div className={`flex-1 p-4 ${awaySetsWon > homeSetsWon ? 'bg-red-900/30' : ''}`}>
          <div className="flex justify-between items-center">
            <div className="text-5xl font-bold tabular-nums">{currentSetData.awayScore}</div>
            <div>
              <h3 className="font-bold text-xl text-right">{awayTeam.name}</h3>
              <div className="flex space-x-1 mt-1 justify-end">
                {Array(5).fill(0).map((_, i) => (
                  <div key={`away-set-${i}`} className={`w-6 h-6 flex items-center justify-center rounded 
                    ${i < awaySetsWon ? 'bg-red-600' : 'bg-slate-700'}`}>
                    {i < sets.length && sets[i].status === 'completed' ? sets[i].awayScore : ''}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-700 py-1 px-4 flex justify-between items-center text-xs text-slate-300">
        <div>MATCH ID: {match.id}</div>
        <div className="flex items-center">
          {match.status === 'live' && (
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
          )}
          <span>{match.status.toUpperCase()}</span>
        </div>
        <div>{new Date(match.date).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default Scoreboard;