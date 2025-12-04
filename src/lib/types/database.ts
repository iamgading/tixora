export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomField {
  id: string;
  label: string;
  type: "text" | "email" | "number" | "select" | "textarea";
  required: boolean;
  options?: string[]; // For select type
}

export interface EventSession {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  max_attendees: number | null;
}

export interface TeamMember {
  id: string;
  event_id: string;
  user_id: string;
  email: string;
  role: "admin" | "staff";
  invited_at: string;
  accepted_at: string | null;
}

export interface Event {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  description: string | null;
  location: string | null;
  event_date: string;
  event_time: string | null;
  max_attendees: number | null;
  is_published: boolean;
  image_url: string | null;
  custom_fields: CustomField[] | null;
  sessions: EventSession[] | null;
  enable_waitlist: boolean;
  certificate_template: string | null;
  created_at: string;
  updated_at: string;
}

export interface Registration {
  id: string;
  event_id: string;
  name: string;
  email: string;
  phone: string | null;
  qr_code: string;
  checked_in_at: string | null;
  custom_data: Record<string, string> | null;
  session_id: string | null;
  is_waitlist: boolean;
  waitlist_approved_at: string | null;
  created_at: string;
}

export interface EventWithStats extends Event {
  total_registrations: number;
  total_checked_in: number;
}

export interface RegistrationWithEvent extends Registration {
  event: Event;
}
