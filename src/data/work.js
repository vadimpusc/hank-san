import commercial from './commercial.json';
import narrative from './narrative.json';

export const commercialWork = commercial.filter(item => item.display !== false);
export const allWork = [...narrative, ...commercialWork];
export const creditsWork = [...commercialWork, ...narrative];
