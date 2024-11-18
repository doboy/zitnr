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

export type CourtStatus = "Wet" | "Dry"

export interface CourtReport {
  parkId: number;
  timestamp: string;
  stacks: number;
  status: CourtStatus;
  reservedCourts: number;
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
