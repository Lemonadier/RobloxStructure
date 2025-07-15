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