import React, { useState } from 'react';
import { Player, Team, EventType, EventResult, VolleyEvent } from '../types';
import { 
  ServeIcon, 
  AttackIcon, 
  BlockIcon, 
  ReceiveIcon, 
  SetIcon, 
  DigIcon,
  SuccessResultIcon,
  ErrorResultIcon 
} from './Icons';

interface MatchControlPanelProps {
  homeTeam: Team;
  awayTeam: Team;
  matchId: string;
  currentSet: number;
  homeScore: number;
  awayScore: number;
  onRecordEvent: (event: Omit<VolleyEvent, 'id'>) => void;
}

const MatchControlPanel: React.FC<MatchControlPanelProps> = ({
  homeTeam,
  awayTeam,
  matchId,
  currentSet,
  homeScore,
  awayScore,
  onRecordEvent
}) => {
  const [selectedTeam, setSelectedTeam] = useState<Team>(homeTeam);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null);
  
  const handleTeamSelection = (team: Team) => {
    setSelectedTeam(team);
    setSelectedPlayer(null); // Reset player when team changes
  };
  
  const handlePlayerSelection = (player: Player) => {
    setSelectedPlayer(player);
  };
  
  const handleEventTypeSelection = (eventType: EventType) => {
    setSelectedEventType(eventType);
  };
  
  const handleEventResult = (result: EventResult) => {
    if (!selectedPlayer || !selectedEventType) return;
    
    // For point events, calculate new score
    let newHomeScore = homeScore;
    let newAwayScore = awayScore;
    
    if (selectedEventType === 'serve' && result === 'success' || 
        selectedEventType === 'attack' && result === 'success' ||
        selectedEventType === 'block' && result === 'success') {
      // These events directly result in points when successful
      if (selectedTeam.id === homeTeam.id) {
        newHomeScore += 1;
      } else {
        newAwayScore += 1;
      }
      
      // Record point event
      recordPointEvent(selectedTeam.id, newHomeScore, newAwayScore);
    } else if (selectedEventType === 'serve' && result === 'error' ||
              selectedEventType === 'attack' && result === 'error' ||
              selectedEventType === 'receive' && result === 'error') {
      // These events result in points for the opposing team when they're errors
      if (selectedTeam.id === homeTeam.id) {
        newAwayScore += 1;
      } else {
        newHomeScore += 1;
      }
      
      // Record point event for the opposite team
      recordPointEvent(
        selectedTeam.id === homeTeam.id ? awayTeam.id : homeTeam.id,
        newHomeScore,
        newAwayScore
      );
    }
    
    // Record the original event
    onRecordEvent({
      matchId,
      timestamp: new Date().toISOString(),
      type: selectedEventType,
      playerId: selectedPlayer.id,
      teamId: selectedTeam.id,
      setNumber: currentSet,
      result,
      homeScore: newHomeScore,
      awayScore: newAwayScore,
    });
    
    // Reset selected event
    setSelectedEventType(null);
  };
  
  const recordPointEvent = (scoringTeamId: number, newHomeScore: number, newAwayScore: number) => {
    // Find first player on the scoring team (typically captain) for the point event
    const team = scoringTeamId === homeTeam.id ? homeTeam : awayTeam;
    const player = team.players[0];
    
    onRecordEvent({
      matchId,
      timestamp: new Date().toISOString(),
      type: 'point',
      playerId: player.id,
      teamId: scoringTeamId,
      setNumber: currentSet,
      result: 'success',
      homeScore: newHomeScore,
      awayScore: newAwayScore,
    });
  };
  
  const eventTypeButtons = [
    { type: 'serve', icon: <ServeIcon className="h-5 w-5" />, label: 'Serve' },
    { type: 'attack', icon: <AttackIcon className="h-5 w-5" />, label: 'Attack' },
    { type: 'block', icon: <BlockIcon className="h-5 w-5" />, label: 'Block' },
    { type: 'receive', icon: <ReceiveIcon className="h-5 w-5" />, label: 'Receive' },
    { type: 'set', icon: <SetIcon className="h-5 w-5" />, label: 'Set' },
    { type: 'dig', icon: <DigIcon className="h-5 w-5" />, label: 'Dig' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-4 py-2">
        <h2 className="font-bold text-lg">Match Control</h2>
      </div>
      
      <div className="p-4">
        {/* Team Selection */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">SELECT TEAM</h3>
          <div className="grid grid-cols-2 gap-2">
            <button 
              className={`py-2 px-3 rounded-md text-sm font-semibold transition duration-200 ${
                selectedTeam.id === homeTeam.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleTeamSelection(homeTeam)}
            >
              {homeTeam.name}
            </button>
            <button 
              className={`py-2 px-3 rounded-md text-sm font-semibold transition duration-200 ${
                selectedTeam.id === awayTeam.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleTeamSelection(awayTeam)}
            >
              {awayTeam.name}
            </button>
          </div>
        </div>
        
        {/* Player Selection */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">SELECT PLAYER</h3>
          <div className="grid grid-cols-4 gap-2">
            {selectedTeam.players.map(player => (
              <button
                key={player.id}
                className={`py-2 px-1 rounded-md text-xs transition duration-200 flex flex-col items-center ${
                  selectedPlayer?.id === player.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handlePlayerSelection(player)}
              >
                <span className="font-bold text-lg">{player.number}</span>
                <span className="truncate w-full text-center" title={player.name}>
                  {player.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Event Type Selection */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">SELECT EVENT</h3>
          <div className="grid grid-cols-6 gap-2">
            {eventTypeButtons.map(button => (
              <button
                key={button.type}
                className={`py-2 px-1 rounded-md text-xs transition duration-200 flex flex-col items-center ${
                  selectedEventType === button.type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${!selectedPlayer ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => selectedPlayer && handleEventTypeSelection(button.type as EventType)}
                disabled={!selectedPlayer}
              >
                {button.icon}
                <span className="mt-1">{button.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Event Result */}
        {selectedEventType && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">EVENT RESULT</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                className="py-3 px-4 rounded-md text-sm font-semibold bg-green-100 text-green-700 hover:bg-green-200 transition duration-200 flex items-center justify-center"
                onClick={() => handleEventResult('success')}
              >
                <SuccessResultIcon className="h-5 w-5 mr-2" />
                <span>Success</span>
              </button>
              <button
                className="py-3 px-4 rounded-md text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-200 flex items-center justify-center"
                onClick={() => handleEventResult('neutral')}
              >
                <span>Neutral</span>
              </button>
              <button
                className="py-3 px-4 rounded-md text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition duration-200 flex items-center justify-center"
                onClick={() => handleEventResult('error')}
              >
                <ErrorResultIcon className="h-5 w-5 mr-2" />
                <span>Error</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchControlPanel;