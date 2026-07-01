const WEEKDAY_SHORT_PL = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"];
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

export function formatIntentionDay(iso: string): string {
  const date = parseIsoDate(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${WEEKDAY_SHORT_PL[date.getDay()]} ${day}.${month}`;
}
