-- Courage To Claws: drop the timeline field.
-- Customers don't set their own schedule (Troy's queue does), so the
-- question wasn't actionable. Run after 001 and 002.

alter table public.quote_requests drop column if exists timeline;
