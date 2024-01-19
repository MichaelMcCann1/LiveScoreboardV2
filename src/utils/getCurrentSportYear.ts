import { DateTime } from "luxon";

export const getCurrentNflYear = () => {
  const year = DateTime.now().year;
  const month = DateTime.now().month;

  if (month < 8) {
    return year - 1;
  }

  return year;
};

export const getCurrentNcaafYear = () => {
  const year = DateTime.now().year;
  const month = DateTime.now().month;

  if (month < 7) {
    return year - 1;
  }

  return year;
};

export const getCurrentNbafYear = () => {
  const year = DateTime.now().year;
  const month = DateTime.now().month;

  if (month < 9) {
    return year - 1;
  }

  return year;
};
