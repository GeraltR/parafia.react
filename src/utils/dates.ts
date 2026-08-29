const WEEKDAY_FULL_PL = [
  "niedziela",
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
];
const MONTH_SHORT_PL = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE", "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"];
const MONTH_FULL_PL = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];

function parseIsoDate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

export function formatEventDay(iso: string): { day: number; month: string } {
  const date = parseIsoDate(iso);
  return { day: date.getDate(), month: MONTH_SHORT_PL[date.getMonth()] };
}

export function formatEventTime(iso: string, time: string): string {
  const date = parseIsoDate(iso);
  const timeOnly = time.includes(",") ? time.split(",").slice(1).join(",").trim() : time;
  return `${WEEKDAY_FULL_PL[date.getDay()]}, ${timeOnly}`;
}

export function formatNewsDate(iso: string): string {
  const date = parseIsoDate(iso);
  return `${date.getDate()} ${MONTH_FULL_PL[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatIntentionGroupHeader(iso: string): { weekdayFull: string; day: number } {
  const date = parseIsoDate(iso);
  return { weekdayFull: WEEKDAY_FULL_PL[date.getDay()], day: date.getDate() };
}
