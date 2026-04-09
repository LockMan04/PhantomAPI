import { generators } from './generators';

export type Locale = 'en' | 'vi';
export type ResourceType = keyof typeof generators;
