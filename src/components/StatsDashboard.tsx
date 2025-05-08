import React from 'react';
import { MatchStats } from '../types';
import { 
  ServeIcon, 
  AttackIcon, 
  BlockIcon, 
  ReceiveIcon, 
  DigIcon 
} from './Icons';

interface StatsDashboardProps {
  stats: MatchStats;
  homeTeamName: string;
  awayTeamName: string;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ 
  stats, 
  homeTeamName, 
  awayTeamName 
}) => {
  const { homeTeamStats, awayTeamStats } = stats;
  
  // Calculate attack efficiency
  const homeAttackEfficiency = homeTeamStats.attacks.total > 0 
    ? Math.round(((homeTeamStats.attacks.kills - homeTeamStats.attacks.errors) / homeTeamStats.attacks.total) * 100) 
    : 0;
    
  const awayAttackEfficiency = awayTeamStats.attacks.total > 0 
    ? Math.round(((awayTeamStats.attacks.kills - awayTeamStats.attacks.errors) / awayTeamStats.attacks.total) * 100) 
    : 0;
  
  // Calculate serve efficiency
  const homeServeEfficiency = homeTeamStats.serves.total > 0 
    ? Math.round(((homeTeamStats.serves.aces - homeTeamStats.serves.errors) / homeTeamStats.serves.total) * 100) 
    : 0;
    
  const awayServeEfficiency = awayTeamStats.serves.total > 0 
    ? Math.round(((awayTeamStats.serves.aces - awayTeamStats.serves.errors) / awayTeamStats.serves.total) * 100) 
    : 0;
  
  // Calculate receive efficiency
  const homeReceiveEfficiency = homeTeamStats.receives.total > 0 
    ? Math.round((homeTeamStats.receives.perfect / homeTeamStats.receives.total) * 100) 
    : 0;
    
  const awayReceiveEfficiency = awayTeamStats.receives.total > 0 
    ? Math.round((awayTeamStats.receives.perfect / awayTeamStats.receives.total) * 100) 
    : 0;

  // Statistic items to display
  const statItems = [
    { 
      label: 'Attacks', 
      icon: <AttackIcon className="h-5 w-5" />,
      homeData: `${homeTeamStats.attacks.kills}/${homeTeamStats.attacks.total}`,
      awayData: `${awayTeamStats.attacks.kills}/${awayTeamStats.attacks.total}`,
      homeEfficiency: homeAttackEfficiency,
      awayEfficiency: awayAttackEfficiency,
      homeDetails: `${homeTeamStats.attacks.kills} Kills, ${homeTeamStats.attacks.errors} Errors`,
      awayDetails: `${awayTeamStats.attacks.kills} Kills, ${awayTeamStats.attacks.errors} Errors`
    },
    { 
      label: 'Serves', 
      icon: <ServeIcon className="h-5 w-5" />,
      homeData: `${homeTeamStats.serves.aces}/${homeTeamStats.serves.total}`,
      awayData: `${awayTeamStats.serves.aces}/${awayTeamStats.serves.total}`,
      homeEfficiency: homeServeEfficiency,
      awayEfficiency: awayServeEfficiency,
      homeDetails: `${homeTeamStats.serves.aces} Aces, ${homeTeamStats.serves.errors} Errors`,
      awayDetails: `${awayTeamStats.serves.aces} Aces, ${awayTeamStats.serves.errors} Errors`
    },
    { 
      label: 'Blocks', 
      icon: <BlockIcon className="h-5 w-5" />,
      homeData: `${homeTeamStats.blocks.points}/${homeTeamStats.blocks.total}`,
      awayData: `${awayTeamStats.blocks.points}/${awayTeamStats.blocks.total}`,
      homeEfficiency: undefined,
      awayEfficiency: undefined,
      homeDetails: `${homeTeamStats.blocks.points} Points, ${homeTeamStats.blocks.touches} Touches`,
      awayDetails: `${awayTeamStats.blocks.points} Points, ${awayTeamStats.blocks.touches} Touches`
    },
    { 
      label: 'Receives', 
      icon: <ReceiveIcon className="h-5 w-5" />,
      homeData: `${homeTeamStats.receives.perfect}/${homeTeamStats.receives.total}`,
      awayData: `${awayTeamStats.receives.perfect}/${awayTeamStats.receives.total}`,
      homeEfficiency: homeReceiveEfficiency,
      awayEfficiency: awayReceiveEfficiency,
      homeDetails: `${homeTeamStats.receives.perfect} Perfect, ${homeTeamStats.receives.errors} Errors`,
      awayDetails: `${awayTeamStats.receives.perfect} Perfect, ${awayTeamStats.receives.errors} Errors`
    },
    { 
      label: 'Digs', 
      icon: <DigIcon className="h-5 w-5" />,
      homeData: `${homeTeamStats.digs}`,
      awayData: `${awayTeamStats.digs}`,
      homeEfficiency: undefined,
      awayEfficiency: undefined,
      homeDetails: `Total digs`,
      awayDetails: `Total digs`
    }
  ];

  const renderEfficiencyBar = (efficiency: number | undefined, isHome: boolean) => {
    if (efficiency === undefined) return null;
    
    // Determine color based on efficiency value
    let color;
    if (efficiency >= 30) color = 'bg-green-500';
    else if (efficiency >= 10) color = 'bg-yellow-500';
    else if (efficiency >= -10) color = 'bg-gray-400';
    else color = 'bg-red-500';
    
    // For negative efficiency, show red bar on opposite side
    const isNegative = efficiency < 0;
    const absEfficiency = Math.abs(efficiency);
    const width = Math.min(absEfficiency, 80); // Cap at 80% width
    
    return (
      <div className="h-1 bg-gray-200 w-16 mt-1">
        <div 
          className={`h-full ${color}`}
          style={{ 
            width: `${width}%`,
            float: (isHome && !isNegative) || (!isHome && isNegative) ? 'right' : 'left'
          }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-4 py-2">
        <h2 className="font-bold text-lg">Match Statistics</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <h3 className="font-semibold text-sm text-blue-700">{homeTeamName}</h3>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-sm text-gray-500">STAT</h3>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-sm text-red-700">{awayTeamName}</h3>
          </div>
        </div>
        
        <div className="space-y-5">
          {statItems.map((item, index) => (
            <div key={index} className="grid grid-cols-3 items-center">
              {/* Home Team */}
              <div className="text-right pr-2">
                <div className="font-semibold text-lg">{item.homeData}</div>
                <div className="text-xs text-gray-500">{item.homeDetails}</div>
                <div className="flex justify-end">
                  {renderEfficiencyBar(item.homeEfficiency, true)}
                </div>
                {item.homeEfficiency !== undefined && (
                  <div className="text-xs text-right">
                    Eff: {item.homeEfficiency > 0 ? '+' : ''}{item.homeEfficiency}%
                  </div>
                )}
              </div>
              
              {/* Stat Label */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-1">
                  {item.icon}
                </div>
                <div className="text-xs font-medium text-gray-600">{item.label}</div>
              </div>
              
              {/* Away Team */}
              <div className="pl-2">
                <div className="font-semibold text-lg">{item.awayData}</div>
                <div className="text-xs text-gray-500">{item.awayDetails}</div>
                <div className="flex justify-start">
                  {renderEfficiencyBar(item.awayEfficiency, false)}
                </div>
                {item.awayEfficiency !== undefined && (
                  <div className="text-xs">
                    Eff: {item.awayEfficiency > 0 ? '+' : ''}{item.awayEfficiency}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;