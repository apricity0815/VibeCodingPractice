
export interface Product {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  prompt: string;
}

export interface MockupHistory {
  id: string;
  url: string;
  timestamp: number;
  promptUsed: string;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  EDITING = 'EDITING',
  ERROR = 'ERROR'
}
