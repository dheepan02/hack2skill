export type ScreenId = 'atelier' | 'nordic' | 'html-studio' | 'device-matrix' | 'asset-library';

export interface ScreenDefinition {
  id: ScreenId;
  name: string;
  category: string;
  description: string;
  badge?: string;
}

export type DeviceMode = 'desktop' | 'laptop' | 'tablet' | 'mobile' | 'responsive';

export interface DeviceSpec {
  id: DeviceMode;
  name: string;
  width: number;
  height: number;
  label: string;
}

export interface HotlinkedAsset {
  id: string;
  title: string;
  url: string;
  category: 'architecture' | 'product' | 'portrait' | 'editorial' | 'custom';
  aspectRatio: string;
  naturalWidth?: number;
  naturalHeight?: number;
  isLocal?: boolean;
}

export interface HtmlScreenPreset {
  id: string;
  title: string;
  category: string;
  description: string;
  htmlContent: string;
  thumbnailUrl: string;
}
