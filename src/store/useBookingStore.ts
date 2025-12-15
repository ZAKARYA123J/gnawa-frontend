
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Booking {
    id: string;
    artistId: string;
    artistName: string;
    date: string;
    userName: string;
    bookingCode: string;
    // optional fields to align with backend Booking model
    email?: string;
    phoneNumber?: string;
    quantity?: number;
    confirmationCode?: string;
}

interface BookingState {
    bookings: Booking[];
    addBooking: (booking: Booking) => void;
    removeBooking: (id: string) => void;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set) => ({
            bookings: [],
            addBooking: (booking) =>
                set((state) => ({ bookings: [...state.bookings, booking] })),
            removeBooking: (id) =>
                set((state) => ({
                    bookings: state.bookings.filter((b) => b.id !== id),
                })),
        }),
        {
            name: 'booking-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
