export interface Transaction {
  bookings: Booking[];
  transactionDateIso: string;
  totalCost: number;
};

export interface Booking {
  startDateTime: string;
  endDateTime: string;
};

export interface Donation {
  amount: number;
}

export interface TimeArray {
  times: {
    startTime: string;
    endTime: string;
  }[]
}
export interface CalendarEntry {
  icon: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  sortKey: string;
  widthDivisor: number;
  index: number;
};

export const COURT_STATUS_STRINGS = [
  "Wet / not playable",
  "Wet / somewhat playable",
  "Wet / very playable",
  "Dry",
]

export type CourtStatus = typeof COURT_STATUS_STRINGS[number];

export interface CourtReport {
  parkId: number;
  reportedAtISO: string;
  stacks: number;
  status: CourtStatus;
}

export type Location = {
  latitude: number
  longitude: number
}

export interface Park {
  id: number;
  name: string;
  courtIds: number[];
  startTime: string;
  endTime: string;
  location: Location;
};

export interface Court {
  id: number;
  name: string;
  courtNo: string;
  startTime: string;
  endTime: string;
};
