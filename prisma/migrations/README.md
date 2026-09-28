# Booking integrity migration

After `npx prisma migrate dev --name init` generates the first migration, add this SQL to that migration file. Prisma does not model PostgreSQL exclusion constraints directly, and this constraint is what prevents two pending or confirmed bookings from sharing a time range.

```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "appointments"
  ADD CONSTRAINT "appointments_no_overlap"
  EXCLUDE USING gist (
    tstzrange("starts_at", "ends_at", '[)') WITH &&
  ) WHERE ("status" IN ('PENDING', 'CONFIRMED'));
```

Keep this in the migration history; do not enforce booking conflicts solely in application code.
