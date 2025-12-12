import { Artist } from "./api/artist";
import { EventStats } from "./api/event";
import { Booking } from "./api/booking";
export interface EventStore {
  event: Event | null;
  stats: EventStats | null;
  isLoading: boolean;
  error: string | null;
  setEvent: (event: Event) => void;
  setStats: (stats: EventStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearEvent: () => void;
}

export interface ArtistStore {
  artists: Artist[];
  selectedArtist: Artist | null;
  isLoading: boolean;
  error: string | null;
  setArtists: (artists: Artist[]) => void;
  setSelectedArtist: (artist: Artist | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearArtists: () => void;
}

export interface BookingStore {
  bookings: Booking[];
  selectedBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
  addBooking: (booking: Booking) => void;
  removeBooking: (bookingId: string) => void;
  updateBooking: (bookingId: string, updates: Partial<Booking>) => void;
  setBookings: (bookings: Booking[]) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearBookings: () => void;
}