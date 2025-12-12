export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  bannerImage: string;
  ticketPrice: number;
  availableTickets: number;
  maxTicketsPerPerson: number;
  status: 'upcoming' | 'ongoing' | 'finished';
}

export interface EventStats {
  totalArtists: number;
  totalAttendees: number;
  availableTickets: number;
  soldTickets: number;
}