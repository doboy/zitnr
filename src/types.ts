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
