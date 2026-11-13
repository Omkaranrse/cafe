-- ==============================================================================
-- CAFE FACE — SUPABASE POSTGRESQL SCHEMA
-- 519 Bristol Road, Selly Oak, Birmingham B29 6AU, UK
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Menu Items Table
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(6, 2) NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_available BOOLEAN DEFAULT true NOT NULL,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    dietary_tags TEXT[] DEFAULT '{}'::TEXT[],
    allergen_information TEXT[] DEFAULT '{}'::TEXT[],
    sort_order INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT true NOT NULL,
    prep_note TEXT,
    calories_approx TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Gallery Images Table
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    caption TEXT,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'atmosphere',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public can view categories" 
    ON public.categories FOR SELECT 
    USING (true);

CREATE POLICY "Public can view available menu items" 
    ON public.menu_items FOR SELECT 
    USING (true);

CREATE POLICY "Public can view gallery images" 
    ON public.gallery_images FOR SELECT 
    USING (true);

-- Authenticated Admin write access policies
CREATE POLICY "Admin full access to categories" 
    ON public.categories FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Admin full access to menu_items" 
    ON public.menu_items FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Admin full access to gallery_images" 
    ON public.gallery_images FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- 6. Initial Categories Seed Data
INSERT INTO public.categories (id, name, slug, description, sort_order) VALUES
('all', 'All', 'all', 'Complete selection', 1),
('coffee', 'Coffee', 'coffee', 'Specialty single origin and house blends', 2),
('hot-drinks', 'Hot Drinks', 'hot-drinks', 'Artisan teas and hot chocolates', 3),
('cold-drinks', 'Cold Drinks', 'cold-drinks', 'Iced coffees and fresh juices', 4),
('breakfast', 'Breakfast', 'breakfast', 'Hearty morning staples', 5),
('brunch', 'Brunch', 'brunch', 'Elevated brunch plates', 6),
('wraps', 'Wraps', 'wraps', 'Toasted artisan Mediterranean wraps', 7),
('flatbread-boxes', 'Flatbread Boxes', 'flatbread-boxes', 'Signature warm sumac flatbread boxes', 8),
('rice-boxes', 'Rice Boxes', 'rice-boxes', 'Turmeric spiced basmati rice boxes', 9),
('desserts', 'Desserts', 'desserts', 'Handcrafted pastries and bakes', 10)
ON CONFLICT (id) DO NOTHING;

