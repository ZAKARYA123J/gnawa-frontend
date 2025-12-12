export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'used';

export interface Booking {
  id: string;
  bookingCode: string;
  artistId: string;
  artistName: string;
  fullName: string;
  email: string;
  phone?: string;
  ticketQuantity: number;
  totalAmount: number;
  date: string; 
  status: BookingStatus;
  qrCode?: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  artistId: string;
  fullName: string;
  email: string;
  phone?: string;
  ticketQuantity: number;
  specialRequests?: string;
}

export interface CreateBookingResponse {
  success: boolean;
  booking: Booking;
  message?: string;
}