import React from 'react';
import { Activity, Clock, Flag, User, Users, X, Award, Castle as Whistle, CheckCircle as CircleCheck, Circle as CircleX, ListPlus } from 'lucide-react';

export const VolleyballIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 9 14.5" />
    <path d="M12 2a5 5 0 0 0-5 7.5" />
    <path d="M7 9.5a5 5 0 0 0 5 7.5" />
    <path d="M12 17a10 10 0 0 0 10-14.5" />
    <path d="M22 9.5a10 10 0 0 1-10 7.5" />
  </svg>
);

export const ServeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M12 11v8" />
    <path d="M9 19l3 3 3-3" />
  </svg>
);

export const AttackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 3h5v5" />
    <path d="M21 3L8 16" />
    <path d="M8 12l-4 4" />
    <path d="M4 16v5h5" />
  </svg>
);

export const BlockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="4" y="7" width="16" height="12" rx="2" />
    <path d="M8 7V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" />
  </svg>
);

export const ReceiveIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 21h4c1.1 0 2-.9 2-2v-4" />
    <path d="M3 4a2 2 0 0 1 2-2h4" />
    <path d="m21 9-9 9-9-9" />
  </svg>
);

export const SetIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 10v12" />
    <path d="M16 2H8l4 8-4 8h8" />
  </svg>
);

export const DigIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 15v6" />
    <path d="M9 18h6" />
    <path d="m12 6-2 3h4l-2 3" />
    <path d="M12 3a9 9 0 0 0 9 9" />
    <path d="M12 3a9 9 0 0 1-9 9" />
  </svg>
);

export {
  Activity as StatsIcon,
  Clock as TimerIcon,
  Flag as MatchIcon,
  User as PlayerIcon,
  Users as TeamIcon,
  X as ErrorIcon,
  Award as SuccessIcon,
  Whistle as RefereeIcon,
  CircleCheck as SuccessResultIcon,
  CircleX as ErrorResultIcon,
  ListPlus as EventIcon
};