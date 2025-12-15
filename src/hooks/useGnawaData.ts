import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, Artist, Event } from '../services/api';

export const useEventInfo = () => {
  return useQuery<Event>({
    queryKey: ['event'],
    queryFn: api.getEvent,
  });
};

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: api.getEvents,
  });
};

export const useEventById = (id: string) => {
  return useQuery<Event | undefined>({
    queryKey: ['event', id],
    queryFn: () => api.getEventById(id),
    enabled: !!id,
  });
};

export const useArtists = () => {
  return useQuery({
    queryKey: ['artists'],
    queryFn: api.getArtists,
  });
};

export const useArtist = (id: string) => {
  return useQuery({
    queryKey: ['artist', id],
    queryFn: () => api.getArtistById(id),
    enabled: !!id,
  });
};

export const useCreateArtist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newArtist: Omit<Artist, 'id'>) => api.createArtist(newArtist),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
    },
  });
};

export const useUpdateArtist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Artist> }) =>
      api.updateArtist(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
    },
  });
};

export const useDeleteArtist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteArtist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEvent: Omit<Event, 'id'>) => api.createEvent(newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Event> }) =>
      api.updateEvent(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};
