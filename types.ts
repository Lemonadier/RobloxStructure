export interface ScriptDetail {
  [key: string]: string[];
}

export type ScriptType = 'Client' | 'Server' | 'Shared' | 'Service';

export interface PlantDetails {
  Price: number;
  SellMultiply: number;
  GrowthTime: number;
}

export interface Script {
  id: string;
  description: string;
  type: ScriptType;
  location?: string;
  details?: ScriptDetail;
  connections: string[];
  notes?: string;
  data?: any;
}

export interface ScriptData {
  [id: string]: Script;
}

export interface Line {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  sourceId: string;
  targetId: string;
}