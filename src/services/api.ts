import { QueryClient } from '@tanstack/react-query';
import { Platform } from 'react-native';

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
  // legacy field used in current UI
  style?: string;
  biography: string;
  photoUrl: string;
  schedule: string[];
  // new fields aligned with backend model
  genre?: string;
  photos?: string[];
  website?: string;
  socialMedia?: Record<string, string>;
  isHeadliner?: boolean;
  performanceTime?: string;
  performanceDuration?: number;
  status?: 'active' | 'inactive' | 'pending';
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

// Normalize URLs coming from backend so Android emulator can load them.
// - Converts relative paths to absolute using BASE_URL
// - Rewrites localhost/127.0.0.1 to 10.0.2.2 on Android
const normalizeUrl = (url: string | undefined): string | undefined => {
  if (!url) return url;

  const isAbsolute = url.startsWith('http://') || url.startsWith('https://');
  let absoluteUrl = isAbsolute
    ? url
    : `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;

  if (Platform.OS === 'android') {
    absoluteUrl = absoluteUrl
      .replace('http://localhost:', 'http://10.0.2.2:')
      .replace('https://localhost:', 'http://10.0.2.2:')
      .replace('http://127.0.0.1:', 'http://10.0.2.2:')
      .replace('https://127.0.0.1:', 'http://10.0.2.2:');
  }

  return absoluteUrl;
};

const normalizeArtist = (artist: Artist): Artist => {
  // prefer first photo if provided, fallback to photoUrl
  const primaryPhoto = (artist.photos && artist.photos.length > 0)
    ? artist.photos[0]
    : artist.photoUrl;

  return {
    ...artist,
    // ensure we have a display style even if backend sends genre
    style: artist.style ?? artist.genre ?? 'Gnawa',
    photoUrl: normalizeUrl(primaryPhoto) as string,
    photos: artist.photos ? artist.photos.map((p) => normalizeUrl(p) as string) : artist.photos,
    website: artist.website ? normalizeUrl(artist.website) : artist.website,
  };
};

const normalizeEventData = (event: Event): Event => ({
  ...event,
  imageUrl: normalizeUrl(event.imageUrl) as string,
});

// Query Client
export const queryClient = new QueryClient();

// API Services
export const api = {
  getEvents: async (): Promise<Event[]> => {
    const response = await fetch(`${BASE_URL}/events`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const events = Array.isArray(data) ? data : [data];
    return events.map(normalizeEventData);
  },

  getEvent: async (): Promise<Event> => {
    // Check if we should fetch a specific event or a singleton
    // For now, let's assume we fetch the first event from a list or a specific endpoint
    const response = await fetch(`${BASE_URL}/events`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const events = await response.json();
    // Return the first event if an array is returned, or the object itself
    const eventData = Array.isArray(events) ? events[0] : events;
    return normalizeEventData(eventData);
  },

  getEventById: async (id: string): Promise<Event | undefined> => {
    const response = await fetch(`${BASE_URL}/events/${id}`);
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error('Network response was not ok');
    }
    const event = await response.json();
    return normalizeEventData(event);
  },

  createEvent: async (event: Omit<Event, 'id'>): Promise<Event> => {
    const response = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const created = await response.json();
    return normalizeEventData(created);
  },

  updateEvent: async (
    id: string,
    updates: Partial<Event>,
  ): Promise<Event> => {
    const response = await fetch(`${BASE_URL}/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const updated = await response.json();
    return normalizeEventData(updated);
  },

  deleteEvent: async (id: string): Promise<boolean> => {
    const response = await fetch(`${BASE_URL}/events/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  },

  getArtists: async (): Promise<Artist[]> => {
    const response = await fetch(`${BASE_URL}/artists`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return (Array.isArray(data) ? data : []).map(normalizeArtist);
  },

  getArtistById: async (id: string): Promise<Artist | undefined> => {
    const response = await fetch(`${BASE_URL}/artists/${id}`);
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error('Network response was not ok');
    }
    const artist = await response.json();
    return normalizeArtist(artist);
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
    const created = await response.json();
    return normalizeArtist(created);
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
    const updated = await response.json();
    return normalizeArtist(updated);
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
