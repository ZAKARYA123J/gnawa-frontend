import { QueryClient } from '@tanstack/react-query';

// Types
export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface Artist {
  id: string;
  name: string;
  style: string;
  biography: string;
  photoUrl: string;
  schedule: string[];
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// API Configuration
const BASE_URL = 'http://10.0.2.2:3000'; // This should work in Android Emulator

// Query Client
export const queryClient = new QueryClient();

// API Services
export const api = {
  getEvent: async (): Promise<Event> => {
    // Check if we should fetch a specific event or a singleton
    // For now, let's assume we fetch the first event from a list or a specific endpoint
    const response = await fetch(`${BASE_URL}/events`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const events = await response.json();
    // Return the first event if an array is returned, or the object itself
    return Array.isArray(events) ? events[0] : events;
  },

  getArtists: async (): Promise<Artist[]> => {
    const response = await fetch(`${BASE_URL}/artists`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  getArtistById: async (id: string): Promise<Artist | undefined> => {
    const response = await fetch(`${BASE_URL}/artists/${id}`);
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  createArtist: async (artist: Omit<Artist, 'id'>): Promise<Artist> => {
    const response = await fetch(`${BASE_URL}/artists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artist),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  updateArtist: async (
    id: string,
    updates: Partial<Artist>,
  ): Promise<Artist> => {
    const response = await fetch(`${BASE_URL}/artists/${id}`, {
      method: 'PATCH', // or PUT, depending on your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  deleteArtist: async (id: string): Promise<boolean> => {
    const response = await fetch(`${BASE_URL}/artists/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  },

  register: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Registration failed');
    }

    return response.json();
  },
};
