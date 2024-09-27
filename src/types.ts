export interface Transaction {
  bookings: Array<Booking>;
  totalCost: number;
};

export interface Booking {
  startDateTime: string;
};

export interface Donation {
  amount: number;
}