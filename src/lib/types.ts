export interface TeamData {
  logo: string;
  location: string;
  name: string;
  record: string;
  score: string;
  linescores: number[];
  winner: boolean;
  abbreviation: string;
}

export interface LeaderData {
  shortDisplayName: string;
  displayValue: string;
  shortName: string;
  position: string;
  headshot: string;
  id: string;
}

export interface NflScoreboardData {
  id: string;
  date: string;
  awayTeamData: TeamData;
  homeTeamData: TeamData;
  status: string;
  clock: string;
  period: number;
  tv: string;
  leaders: LeaderData[];
}

export interface NflTeamBannerData {
  location: string;
  nickname: string;
  standingSummary: string;
  logo: string;
  record: string;
}

export interface NflTeamScheduleData {
  date: string;
  tv: string;
  logo: string;
  homeAway: "home" | "away";
  opponentNickname: string;
  opponentAbbreviation: string;
  winner: boolean;
  selectedTeamScore: string;
  opponentTeamScore: string;
}

export interface NflStandingsData {
  name: string;
  standings: NflTeamStandingsData[];
}

export interface NflTeamStandingsData {
  abbreviation: string;
  location: string;
  wins: string;
  losses: string;
  ties: string;
  pct: string;
}

export interface NflTeamLeaderData {
  displayName: string;
  value: string;
  athlete: NflTeamLeaderAthleteData;
  category: Categories;
}

export interface NflTeamLeaderAthleteData {
  fullName: string;
  headshot: string;
  position: string;
  jersey: string;
  id: string;
}
export type Categories = "Offense" | "Defense";

export interface NflPlayerData {
  firstName: string;
  lastName: string;
  jersey: string;
  position: string;
  height: string;
  weight: string;
  draft: string;
  headshot: string;
  teamLink: string;
  location: string;
  nickname: string;
  logo: string;
  abbreviation: string;
  age: number;
  city: string;
  state: string;
}
