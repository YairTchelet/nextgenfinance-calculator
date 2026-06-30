-- ══════════════════════════════════════════════════════════════════
-- finances_phase3.sql — הבית הפיננסי, Phase 3 (PDF intake)
-- Additive: lets a receipt parsed from a PDF hold its proposed line
-- items until the user confirms in Telegram. On confirm the webhook
-- expands pending_items into transactions (receipt_id) and flips
-- receipts.status to 'confirmed'. On discard the receipt row is deleted.
-- Run in: Supabase Dashboard → SQL Editor (or via MCP apply_migration).
-- ══════════════════════════════════════════════════════════════════

alter table receipts add column if not exists pending_items jsonb;
