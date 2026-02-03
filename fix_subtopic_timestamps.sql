-- Fix missing createdAt and updatedAt columns in Subtopic table
-- Run this SQL in your Supabase SQL Editor

-- Check if columns exist and add them if missing
DO $$ 
BEGIN
    -- Add createdAt column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='Subtopic' AND column_name='createdAt'
    ) THEN
        ALTER TABLE "Subtopic" 
        ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
        
        RAISE NOTICE 'Added createdAt column to Subtopic table';
    ELSE
        RAISE NOTICE 'createdAt column already exists in Subtopic table';
    END IF;

    -- Add updatedAt column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='Subtopic' AND column_name='updatedAt'
    ) THEN
        ALTER TABLE "Subtopic" 
        ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
        
        RAISE NOTICE 'Added updatedAt column to Subtopic table';
    ELSE
        RAISE NOTICE 'updatedAt column already exists in Subtopic table';
    END IF;
END $$;

-- Verify the columns were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'Subtopic'
ORDER BY ordinal_position;
