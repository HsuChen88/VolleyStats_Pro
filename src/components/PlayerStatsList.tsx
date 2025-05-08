import React, { useState } from 'react';
import { PlayerStats, Team } from '../types';

interface PlayerStatsListProps {
  playerStats: Record<number, PlayerStats>;
  homeTeam: Team;
  awayTeam: Team;
}

const PlayerStatsList: React.FC<PlayerStatsListProps> = ({ 
  playerStats,
  homeTeam,
  awayTeam 
}) => {
  const [selectedTeam, setSelectedTeam] = useState<number>(homeTeam.id);
  const [sortBy, setSortBy] = useState<string>('number');
  
  // Get stats for selected team
  const teamPlayerStats = Object.values(playerStats).filter(
    stats => stats.teamId === selectedTeam
  );
  
  // Sort player stats
  const sortedStats = [...teamPlayerStats].sort((a, b) => {
    switch(sortBy) {
      case 'number':
        return a.playerNumber - b.playerNumber;
      case 'attacks':
        return b.attacks.kills - a.attacks.kills;
      case 'aces':
        return b.serves.aces - a.serves.aces;
      case 'blocks':
        return b.blocks.points - a.blocks.points;
      case 'digs':
        return b.digs - a.digs;
      default:
        return a.playerNumber - b.playerNumber;
    }
  });
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-4 py-2">
        <h2 className="font-bold text-lg">Player Stats</h2>
      </div>
      
      <div className="p-4">
        {/* Team Selection */}
        <div className="flex space-x-2 mb-4">
          <button 
            className={`py-1 px-3 rounded-md text-sm transition duration-200 ${
              selectedTeam === homeTeam.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedTeam(homeTeam.id)}
          >
            {homeTeam.name}
          </button>
          <button 
            className={`py-1 px-3 rounded-md text-sm transition duration-200 ${
              selectedTeam === awayTeam.id 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedTeam(awayTeam.id)}
          >
            {awayTeam.name}
          </button>
        </div>
        
        {/* Sort Options */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          <button 
            className={`py-1 px-2 rounded-md text-xs whitespace-nowrap transition duration-200 ${
              sortBy === 'number' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('number')}
          >
            Jersey #
          </button>
          <button 
            className={`py-1 px-2 rounded-md text-xs whitespace-nowrap transition duration-200 ${
              sortBy === 'attacks' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('attacks')}
          >
            Kills
          </button>
          <button 
            className={`py-1 px-2 rounded-md text-xs whitespace-nowrap transition duration-200 ${
              sortBy === 'aces' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('aces')}
          >
            Aces
          </button>
          <button 
            className={`py-1 px-2 rounded-md text-xs whitespace-nowrap transition duration-200 ${
              sortBy === 'blocks' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('blocks')}
          >
            Blocks
          </button>
          <button 
            className={`py-1 px-2 rounded-md text-xs whitespace-nowrap transition duration-200 ${
              sortBy === 'digs' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('digs')}
          >
            Digs
          </button>
        </div>
        
        {/* Player Stats Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase border-b">
                <th className="py-2 px-2 text-left">#</th>
                <th className="py-2 px-2 text-left">Player</th>
                <th className="py-2 px-2 text-center">Kills</th>
                <th className="py-2 px-2 text-center">Att</th>
                <th className="py-2 px-2 text-center">Aces</th>
                <th className="py-2 px-2 text-center">Blocks</th>
                <th className="py-2 px-2 text-center">Digs</th>
                <th className="py-2 px-2 text-center">Perfect Pass</th>
              </tr>
            </thead>
            <tbody>
              {sortedStats.map(player => (
                <tr key={player.playerId} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 font-semibold text-blue-800">{player.playerNumber}</td>
                  <td className="py-2 px-2 font-medium">{player.playerName}</td>
                  <td className="py-2 px-2 text-center">
                    {player.attacks.kills}
                    <span className="text-red-500 text-xs ml-1">
                      {player.attacks.errors > 0 ? `-${player.attacks.errors}` : ''}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center text-gray-600">{player.attacks.total}</td>
                  <td className="py-2 px-2 text-center">
                    {player.serves.aces}
                    <span className="text-red-500 text-xs ml-1">
                      {player.serves.errors > 0 ? `-${player.serves.errors}` : ''}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center">{player.blocks.points}</td>
                  <td className="py-2 px-2 text-center">{player.digs}</td>
                  <td className="py-2 px-2 text-center">
                    {player.receives.perfect}/{player.receives.total}
                  </td>
                </tr>
              ))}
              
              {sortedStats.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-4 text-center text-gray-500">
                    No player stats available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsList;