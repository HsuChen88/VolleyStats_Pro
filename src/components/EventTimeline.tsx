import React, { useState } from 'react';
import { VolleyEvent } from '../types';
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

interface EventTimelineProps {
  events: VolleyEvent[];
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
}

const EventTimeline: React.FC<EventTimelineProps> = ({ 
  events, 
  homeTeamId, 
  awayTeamId,
  homeTeamName,
  awayTeamName
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Get point events only, sorted by timestamp
  const pointEvents = events
    .filter(event => event.type === 'point')
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
  // Get the event that led to a point (the event right before the point event)
  const getPointDetails = (pointEvent: VolleyEvent) => {
    const pointTime = new Date(pointEvent.timestamp).getTime();
    const previousEvents = events
      .filter(e => new Date(e.timestamp).getTime() < pointTime)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return previousEvents[0] || null;
  };
  
  const getEventIcon = (type: string) => {
    switch(type) {
      case 'serve': return <ServeIcon className="h-4 w-4" />;
      case 'attack': return <AttackIcon className="h-4 w-4" />;
      case 'block': return <BlockIcon className="h-4 w-4" />;
      case 'receive': return <ReceiveIcon className="h-4 w-4" />;
      case 'set': return <SetIcon className="h-4 w-4" />;
      case 'dig': return <DigIcon className="h-4 w-4" />;
      default: return null;
    }
  };
  
  const getEventTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-4 py-2 flex justify-between items-center">
        <h2 className="font-bold text-lg">Point Timeline</h2>
        <div className="flex space-x-2 text-xs">
          <span className="px-2 py-1 bg-blue-900 rounded">{homeTeamName}</span>
          <span className="px-2 py-1 bg-blue-900 rounded">{awayTeamName}</span>
        </div>
      </div>
      
      <div className="p-4">
        {pointEvents.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No points recorded yet
          </div>
        ) : (
          <div className="relative">
            {/* Home Team Track (Top) */}
            <div className="absolute top-0 left-0 right-0 h-px bg-blue-200"></div>
            
            {/* Away Team Track (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-red-200"></div>
            
            {/* Points Container */}
            <div className="relative h-32 mx-8">
              {pointEvents.map((event, index) => {
                const isHomeTeam = event.teamId === homeTeamId;
                const pointDetails = getPointDetails(event);
                const nodeId = `point-${event.id}`;
                const isHovered = hoveredNode === nodeId;
                
                // Calculate position based on total points
                const position = `${(index / (pointEvents.length - 1)) * 100}%`;
                
                return (
                  <div
                    key={event.id}
                    className="absolute"
                    style={{
                      left: position,
                      top: isHomeTeam ? '0' : 'calc(100% - 16px)',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Connection Line to Previous Point */}
                    {index > 0 && (
                      <div 
                        className="absolute bg-gray-200"
                        style={{
                          height: '2px',
                          width: `${100 / (pointEvents.length - 1)}vw`,
                          left: '-50%',
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      ></div>
                    )}
                    
                    {/* Point Node */}
                    <button
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-200
                        ${isHomeTeam 
                          ? 'border-blue-500 hover:border-blue-600' 
                          : 'border-red-500 hover:border-red-600'}
                        ${isHovered ? 'scale-150 shadow-lg' : 'bg-white'}`}
                      onMouseEnter={() => setHoveredNode(nodeId)}
                      onMouseLeave={() => setHoveredNode(null)}
                    ></button>
                    
                    {/* Point Information Tooltip */}
                    {isHovered && pointDetails && (
                      <div 
                        className={`absolute ${isHomeTeam ? 'bottom-full mb-2' : 'top-full mt-2'}
                          bg-white rounded-lg shadow-lg p-2 text-xs w-48 z-10`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">
                            {event.homeScore} - {event.awayScore}
                          </span>
                          <span className="text-gray-500 text-[10px]">
                            {getEventTime(event.timestamp)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getEventIcon(pointDetails.type)}
                          <span>
                            Player #{pointDetails.playerId % 100}
                          </span>
                          <span className="text-gray-500">
                            ({pointDetails.type})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-[10px]">
                          {pointDetails.result === 'success' ? (
                            <SuccessResultIcon className="h-3 w-3 text-green-500" />
                          ) : (
                            <ErrorResultIcon className="h-3 w-3 text-red-500" />
                          )}
                          <span className="capitalize">{pointDetails.result}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Score Label */}
                    <div 
                      className={`absolute ${isHomeTeam ? 'top-full mt-1' : 'bottom-full mb-1'}
                        left-1/2 -translate-x-1/2 text-xs font-medium`}
                    >
                      {isHomeTeam ? event.homeScore : event.awayScore}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventTimeline;
