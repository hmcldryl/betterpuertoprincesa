export type UtilitySource = 'PALECO' | 'PPCWD';

export type AdvisoryCategory =
  | 'power-outage'
  | 'power-interruption'
  | 'power-advisory'
  | 'water-interruption'
  | 'water-advisory'
  | 'water-quality'
  | 'maintenance'
  | 'news';

export interface UtilityAdvisory {
  id: string;
  source: UtilitySource;
  providerName: string;
  title: string;
  date: string;
  url: string;
  category: AdvisoryCategory;
  status: string;
  isUrgent?: boolean;
  timeOut?: string;
  timeRestored?: string;
  reason?: string;
  affectedAreas: string[];
  feeders?: string[];
  summary: string;
  content: string;
  imageUrl?: string;
}

export interface UtilitySourceMetadata {
  name: UtilitySource;
  fullName: string;
  url: string;
  emergencyHotline: string;
  apiEndpoint: string;
}

export interface UtilityAdvisoriesData {
  metadata: {
    lastUpdated: string;
    palecoCount: number;
    ppcwdCount: number;
    totalCount: number;
    failedSources?: UtilitySource[];
    sources: UtilitySourceMetadata[];
  };
  advisories: UtilityAdvisory[];
}
