import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

export function initializeLibrary() {
  TimeAgo.addDefaultLocale(en);
  // Other library configuration...
}