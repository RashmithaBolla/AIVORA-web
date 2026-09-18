export type EventCategory = 'technical' | 'non_technical' | 'cultural';

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  poster_url: string | null;
  venue: string;
  event_date: string;       // YYYY-MM-DD
  start_time: string;       // HH:MM
  end_time: string;         // HH:MM
  short_description: string;
  full_description: string;
  rules: string | null;
  eligibility: string | null;
  registration_link: string | null;
  registration_deadline: string | null;
  contact_name_1: string | null;
  contact_phone_1: string | null;
  contact_name_2: string | null;
  contact_phone_2: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type EventInsert = Omit<Event, 'id' | 'created_at' | 'updated_at'>;
export type EventUpdate = Partial<EventInsert>;

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  technical: 'Technical',
  non_technical: 'Non-Technical',
  cultural: 'Cultural',
};

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  technical: 'badge-technical',
  non_technical: 'badge-non_technical',
  cultural: 'badge-cultural',
};

export function isUpcoming(event: Event): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(event.event_date);
  return eventDate >= today;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${m} ${ampm}`;
}
