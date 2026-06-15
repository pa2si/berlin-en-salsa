import { neon } from "@neondatabase/serverless";

interface UpsertClassSubscriptionInput {
  classId: string;
  classTitle: string;
  participantName: string;
  participantEmail: string;
}

export interface DanceClassSubscriptionRow {
  class_id: string;
  class_title: string;
  participant_name: string;
  participant_email: string;
  created_at: string;
  updated_at: string;
}

let schemaInitialized = false;

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return neon(databaseUrl);
}

async function ensureSchema() {
  if (schemaInitialized) {
    return;
  }

  const sql = getSqlClient();

  await sql`
    CREATE TABLE IF NOT EXISTS dance_class_subscriptions (
      id BIGSERIAL PRIMARY KEY,
      class_id TEXT NOT NULL,
      class_title TEXT NOT NULL,
      participant_name TEXT NOT NULL,
      participant_email TEXT NOT NULL,
      privacy_accepted BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (class_id, participant_email)
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_dance_class_subscriptions_class_id
    ON dance_class_subscriptions(class_id)
  `;

  schemaInitialized = true;
}

export async function upsertDanceClassSubscription(
  input: UpsertClassSubscriptionInput,
): Promise<void> {
  await ensureSchema();

  const sql = getSqlClient();

  await sql`
    INSERT INTO dance_class_subscriptions (
      class_id,
      class_title,
      participant_name,
      participant_email,
      privacy_accepted
    )
    VALUES (
      ${input.classId},
      ${input.classTitle},
      ${input.participantName},
      ${input.participantEmail},
      TRUE
    )
    ON CONFLICT (class_id, participant_email)
    DO UPDATE SET
      class_title = EXCLUDED.class_title,
      participant_name = EXCLUDED.participant_name,
      privacy_accepted = TRUE,
      updated_at = NOW()
  `;
}

export async function getDanceClassSubscriptions(
  classId: string,
): Promise<DanceClassSubscriptionRow[]> {
  await ensureSchema();

  const sql = getSqlClient();

  const rows = await sql`
    SELECT
      class_id,
      class_title,
      participant_name,
      participant_email,
      created_at,
      updated_at
    FROM dance_class_subscriptions
    WHERE class_id = ${classId}
    ORDER BY updated_at DESC, created_at DESC
  `;

  return rows.map((row) => ({
    class_id: String(row.class_id),
    class_title: String(row.class_title),
    participant_name: String(row.participant_name),
    participant_email: String(row.participant_email),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  }));
}
