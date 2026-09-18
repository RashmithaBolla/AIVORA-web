-- ============================================================
-- AIVORA Sample Seed Data
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

INSERT INTO events (
  title, category, poster_url, venue, event_date, start_time, end_time,
  short_description, full_description, rules, eligibility,
  registration_link, registration_deadline,
  contact_name_1, contact_phone_1,
  contact_name_2, contact_phone_2,
  is_published
) VALUES

-- TECHNICAL
(
  'PromptWars - The Ultimate AI Prompting Challenge',
  'technical', https://nounmpqiblglrwzwcczf.supabase.co/storage/v1/object/public/event-posters/promptwars.jpeg,
  'Pearl Block 301 & 302',
  '2026-09-17', '12:00', '15:00',
  'Think. Prompt. Create. Innovate.',
  'Are you confident in communicating with AI? Join PROMPT WARS, an exciting AI prompting challenge where you showcase your prompting, problem-solving, creativity, and technical skills!',
  '1. Team Size: 2\n2. Round I - Prompt: Create an effective prompt for the given problem statement.\n3. Round II - War: Develop a functional web application using the prompt.\n4. Participation Certificate for ALL participants!',
  'Open to all students of BVRIT Hyderabad. Any year, any branch.',
  'https://forms.gle/Kh1Urn5QDwJMokPt8', '2026-09-16',
  'K. Revathi', '6304978489',
  'K. Nithya', '9908552661',
  TRUE
);