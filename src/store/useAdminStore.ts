import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse } from '../services/api';

interface AdminState {
    isAuthenticated: boolean;
    token: string | null;
    user: AuthResponse['user'] | null;
    login: (data: AuthResponse) => void;
    logout: () => void;
}

export const useAdminStore = create<AdminState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            token: null,
            user: null,
            login: (data) => set({
                isAuthenticated: true,
                token: data.token,
                user: data.user
            }),
            logout: () => set({
                isAuthenticated: false,
                token: null,
                user: null
            }),
        }),
        {
            name: 'admin-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
