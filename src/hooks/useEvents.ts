import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Event, EventCategory, EventInsert, EventUpdate } from '../types/event';

// ─── Public hook: fetch published events ─────────────────────────────────────

interface UseEventsOptions {
  category?: EventCategory | 'all';
  searchQuery?: string;
}

export function useEvents(options: UseEventsOptions = {}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('event_date', { ascending: true });

      if (options.category && options.category !== 'all') {
        query = query.eq('category', options.category);
      }

      if (options.searchQuery && options.searchQuery.trim()) {
        const q = options.searchQuery.trim();
        query = query.or(
          `title.ilike.%${q}%,venue.ilike.%${q}%,short_description.ilike.%${q}%`
        );
      }

      const { data, error: err } = await query;
      if (err) throw err;
      setEvents(data as Event[]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch events';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [options.category, options.searchQuery]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
}

// ─── Public hook: fetch single event ─────────────────────────────────────────

export function useEvent(id: string | undefined) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();
        if (err) throw err;
        if (!cancelled) setEvent(data as Event);
      } catch (err: unknown) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : 'Failed to fetch event';
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [id]);

  return { event, loading, error };
}

// ─── Admin hook: full CRUD ────────────────────────────────────────────────────

export function useAdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      if (err) throw err;
      setEvents(data as Event[]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch events';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const createEvent = async (payload: EventInsert): Promise<Event | null> => {
    try {
      const { data, error: err } = await supabase
        .from('events')
        .insert([payload])
        .select()
        .single();
      if (err) throw err;
      await fetchAll();
      return data as Event;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create event';
      throw new Error(msg);
    }
  };

  const updateEvent = async (id: string, payload: EventUpdate): Promise<void> => {
    try {
      const { error: err } = await supabase
        .from('events')
        .update(payload)
        .eq('id', id);
      if (err) throw err;
      await fetchAll();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update event';
      throw new Error(msg);
    }
  };

  const deleteEvent = async (id: string): Promise<void> => {
    try {
      const { error: err } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      if (err) throw err;
      await fetchAll();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete event';
      throw new Error(msg);
    }
  };

  const togglePublish = async (id: string, isPublished: boolean): Promise<void> => {
    await updateEvent(id, { is_published: isPublished });
  };

  return {
    events,
    loading,
    error,
    refetch: fetchAll,
    createEvent,
    updateEvent,
    deleteEvent,
    togglePublish,
  };
}

// ─── Poster upload helper ─────────────────────────────────────────────────────

export async function uploadPoster(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const filePath = `posters/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('event-posters')
    .upload(filePath, file, { upsert: false });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('event-posters')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function useAuth() {
  const [session, setSession] = useState<import('@supabase/supabase-js').Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, authLoading, isAuthenticated: !!session };
}
