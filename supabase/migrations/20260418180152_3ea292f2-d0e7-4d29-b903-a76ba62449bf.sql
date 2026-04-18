-- ============================================
-- 1. ROLES SYSTEM (privilege-escalation safe)
-- ============================================
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================
-- 2. SITE CONTENT (single-row JSON store)
-- ============================================
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
  ON public.site_content FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert site content"
  ON public.site_content FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site content"
  ON public.site_content FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site content"
  ON public.site_content FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default site content
INSERT INTO public.site_content (key, data) VALUES (
  'main',
  '{
    "doctor": {
      "name": "Professor Dr. Md. Barkot Ali",
      "title": "Newborn, Child & Adolescent Health Specialist",
      "bmdc": "A-25803",
      "intro": "With decades of experience in pediatric care, Professor Dr. Md. Barkot Ali is one of the most trusted child health specialists in Khulna. He provides compassionate, evidence-based care for newborns, children, and adolescents.",
      "imageUrl": "https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png"
    },
    "qualifications": ["MBBS (Dhaka)", "DCH", "FCPS (India)", "FRCPCH (UK)"],
    "memberships": [
      "Member, Bangladesh Medical Association (BMA)",
      "Member, Bangladesh Pediatric Association (BPA)",
      "Fellow, Royal College of Paediatrics and Child Health (UK)"
    ],
    "experience": [
      "Former Child Specialist – Bangladesh Navy Hospital (CMH Khulna)",
      "Former Head of Pediatrics – GMC",
      "Professor & Head of Pediatrics – MSMC"
    ],
    "services": [
      "Newborn Care",
      "Child & Adolescent Treatment",
      "Vaccination & Immunization",
      "Fever & Infection Treatment",
      "Growth Monitoring",
      "Nutrition Advice"
    ],
    "chambers": [
      {
        "id": "1",
        "name": "Khadija Villa",
        "address": "Holding No-20, Ward No-5, KDA Market Road (Rishipara), Daulatpur, Khulna",
        "schedule": ["Daily 5 PM – 9 PM", "Monday Closed", "Friday 9 AM – 12 PM"],
        "phones": ["01784-052339", "01972-050951"],
        "mapQuery": "Khadija Villa Daulatpur Khulna"
      },
      {
        "id": "2",
        "name": "Popular Diagnostic Centre Ltd. (Khulna)",
        "address": "House #37, KDA Avenue, Moylapota-Sheikhpara",
        "schedule": ["Tuesday, Wednesday, Thursday", "10 AM – 1 PM"],
        "phones": [],
        "hotline": "09666787821",
        "website": "www.populardiagnostic.com",
        "facebook": "facebook.com/populardiagnostickhulna",
        "mapQuery": "Popular Diagnostic Centre Khulna"
      }
    ],
    "gallery": [],
    "contact": {
      "whatsappNumbers": ["01712-050951"],
      "phoneNumbers": ["01784-052339"],
      "website": "www.populardiagnostic.com",
      "facebook": "facebook.com/populardiagnostickhulna"
    },
    "settings": {
      "siteTitle": "Dr. Barkot Ali - Child Specialist Khulna",
      "logo": "https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png"
    }
  }'::jsonb
);

-- ============================================
-- 3. STORAGE: gallery bucket
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true);

CREATE POLICY "Public can view gallery images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload gallery images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));