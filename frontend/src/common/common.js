export const UNIVERSITIES = [
  { short: 'Harvard', title: 'Harvard University', ranking: '#1 in National Universities', fee: 57410, undergraduate: 5321 },
  { short: 'Stanford', title: 'Stanford University', ranking: '#3 in National Universities', fee: 56169, undergraduate: 7645 },
  { short: 'UC Berkeley', title: 'UC Berkeley', ranking: '#1 in Public Schools', fee: 14226, undergraduate: 32143 },
  { short: 'Princeton', title: 'Princeton Univeristy', ranking: '#2 in Public Schools', fee: 9342, undergraduate: 3282 },
  { short: 'Yale', title: 'Yale University', ranking: '#2 in National Universities', fee: 43422, undergraduate: 7383 },
  { short: 'U of Chicago', title: 'University of Chicago', ranking: '#4 in National Universities', fee: 39493, undergraduate: 4738 },
];

export const GRADUATING_CLASSES = [2022, 2023, 2024, 2025, 2026, 2027, 2028];

export const MEMBERSHIP_FREE = 0;
export const MEMBERSHIP_UNIVERSITY = 1;
export const MEMBERSHIP_UNLIMITED = 2;
export const MEMBERSHIPS = [
  { type: 0, color: '#889ce7', title: 'Free Membership' },
  { type: 1, color: '#fd6262', title: 'University Package', summary: 'Deeply get to know your selected school',  fee: 295, features: ['Benefit One', 'Benefit Two'] },
  { type: 2, color: '#fbb01e', title: 'Unlimited Package', summary: 'Fully prepare for your college applications',  fee: 1195, features: ['Benefit One', 'Benefit Two', 'Benefit Three', 'Benefit Four', 'Benefit Five'], badge: true },
];

export const PLATFORM_TAX = 25;

export const CALENDAR_SELECTABLE_ALL = 'all';
export const CALENDAR_SELECTABLE_EVENTS = 'events';
