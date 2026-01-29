# Database Schema Fix Guide

## Problem
The `Subtopic` table in your database is missing the `createdAt` and `updatedAt` columns that Prisma expects.

## Error
```
The column `createdAt` does not exist in the current database.
code: 'P2022'
```

## Solution Options

### Option 1: Run SQL Script in Supabase (RECOMMENDED)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Go to "SQL Editor"

2. **Run the SQL Script**
   - Copy the contents of `fix_subtopic_timestamps.sql`
   - Paste into the SQL Editor
   - Click "Run"

3. **Verify**
   - You should see a message: "Added createdAt column to Subtopic table"
   - You should see a message: "Added updatedAt column to Subtopic table"
   - A table showing all columns in the Subtopic table

### Option 2: Use Prisma Migrate (If Option 1 doesn't work)

Run these commands in order:

```bash
# 1. Reset the Prisma client
npx prisma generate

# 2. Push the schema to the database
npx prisma db push --accept-data-loss

# 3. If that doesn't work, try migrate dev
npx prisma migrate dev --name fix_subtopic_timestamps
```

### Option 3: Manual SQL via psql

If you have PostgreSQL client installed:

```bash
psql "postgresql://postgres.swexktlzarqksjdxzsiu:ahbWeZbvZcf7tJbL@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres" -f fix_subtopic_timestamps.sql
```

## After Fixing

1. **Restart the dev server**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. **Test the fix**
   - Try creating a subtopic
   - The error should be gone

## Verification Query

Run this in Supabase SQL Editor to check if columns exist:

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'Subtopic'
ORDER BY ordinal_position;
```

Expected columns:
- id
- testId
- name
- description
- totalQuestions
- order
- **createdAt** ← Should be here
- **updatedAt** ← Should be here

## Why This Happened

The migration file `20260114214221_add_subtopic_table` was created but never applied to your Supabase database. This can happen if:
- The migration was created locally but not deployed
- Database was reset without re-running migrations
- Migration failed silently during deployment

## Prevention

Always run migrations after creating them:
```bash
npx prisma migrate deploy
```

Or use:
```bash
npx prisma db push
```
