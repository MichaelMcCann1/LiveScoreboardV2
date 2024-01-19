export interface TeamData {
  logo: string;
  location: string;
  name: string;
  record: string;
  score: string;
  linescores: number[];
  winner: boolean;
  id: string;
}

export interface LeaderData {
  shortDisplayName: string;
  displayValue: string;
  shortName: string;
  position: string;
  headshot: string;
  id: string;
}

export interface ScoreboardData {
  id: string;
  date: string;
  awayTeamData: TeamData;
  homeTeamData: TeamData;
  status: string;
  clock: string;
  period: number;
  tv: string;
  leaders: LeaderData[];
  spread: string;
  overUnder: string;
}

export interface TeamBannerData {
  location: string;
  nickname: string;
  standingSummary: string;
  logo: string;
  record: string;
}

export interface TeamScheduleData {
  date: string;
  tv: string;
  logo: string;
  homeAway: "home" | "away";
  opponentNickname: string;
  opponentId: string;
  winner?: boolean;
  selectedTeamScore?: string;
  opponentTeamScore?: string;
}

export interface TeamLeaderData {
  displayName: string;
  value: string;
  athlete: TeamLeaderAthleteData;
  category: Categories;
}

export interface TeamLeaderAthleteData {
  fullName: string;
  headshot: string;
  position: string;
  jersey: string;
  id: string;
}
export type Categories = "Offense" | "Defense";

export interface PlayerData {
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
  id: string;
  age: number;
  city: string;
  state: string;
}

export type WeeksList = {
  week: number;
  text: string;
}[];

export type TeamStat = {
  stat: string;
  value: string;
  rank: number;
};

export type ScheduleData = {
  title: string;
  scheduleData: TeamScheduleData[];
};

export type StandingsData = {
  name: string;
  headers: string[];
  standings: TeamStandingData[];
};

type TeamStandingData = {
  id: string;
  data: string[];
};
