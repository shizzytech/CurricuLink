export interface Module {
  id: string;
  title: string;
  outcomes: string[];
  estimatedDuration: string;
  requiredTools: string[];
  proposer: string;
  votes: number;
  backers: number;
  status: 'proposed' | 'fast-tracked' | 'development' | 'live' | 'retired';
  category?: string; // e.g., "Data Science", "Web Development"
  coverImage?: string; // URL to an image
  tags?: string[];
  rating?: number; // Average rating 1-5
  feedbackCount?: number;
}

export interface LearningTrack {
  id: string;
  title: string;
  description: string;
  modules: Module[]; // or string[] of module IDs
  creator: string; // Can be user or mentor
  isMentorLed: boolean;
  mentor?: string; // Mentor's name or ID
  price?: number; // For premium tracks
  coverImage?: string; // URL to an image
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'learner' | 'instructor' | 'mentor' | 'employer';
  avatarUrl?: string;
  bio?: string;
  // Add more fields as needed, like reputation points, backed modules, created modules etc.
}
