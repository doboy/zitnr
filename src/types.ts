export interface Transaction {
  bookings: Booking[];
  transactionDateIso: string;
  totalCost: number;
}

export interface TransactionRecord {
  date: string;
  amount: number;
  type: "charge" | "donation" | "refund";
  info: string;
  permit: string;
}

export interface Booking {
  startDateTime: string;
  endDateTime: string;
}

export interface Donation {
  amount: number;
}

export interface CalendarEntry {
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  widthDivisor: number;
  index: number;
}

export const COURT_STATUS_STRINGS = [
  "Wet / not playable",
  "Wet / somewhat playable",
  "Wet / very playable",
  "Dry",
];

export type CourtStatus = (typeof COURT_STATUS_STRINGS)[number];

export interface CourtReport {
  parkId: number;
  reportedAtISO: string;
  stacks: number;
  status: CourtStatus;
}

export type Location = {
  latitude: number;
  longitude: number;
};

export interface Court {
  id: number;
  name: string;
  courtNo: string;
  startTime: string;
  endTime: string;
}

export type MenuItem = "home" | "calendar" | "donate" ;

export type HandlePageChangeType = (page: MenuItem) => void;
