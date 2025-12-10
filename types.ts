import React from 'react';

export interface QuizAnswers {
  mrr: string;
  painLevel: number;
  failedChannels: string[];
  icpClarity: string;
  blocker: string;
  pricing: string;
  email: string;
  name: string;
  booked: boolean;
}

export type QuizStep = 
  | 'welcome'
  | 'mrr'
  | 'pain'
  | 'channels'
  | 'icp'
  | 'blocker'
  | 'pricing'
  | 'interview_offer' // Conditional
  | 'email_optin'
  | 'success';

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}