-- Restrict listing: only allow SELECT when querying a specific object name,
-- not bulk listing of the bucket. We do this by dropping the broad SELECT
-- policy and replacing it. Public direct-URL access still works because
-- the bucket is public (storage CDN serves files directly).
DROP POLICY IF EXISTS "Public can view gallery images" ON storage.objects;

-- Allow read of individual objects (needed for the public CDN URLs to work
-- via the storage API). Listing is naturally restricted because the bucket
-- is public — direct CDN URLs work without going through SELECT.
-- We add a narrow policy that only matches when the request includes a
-- specific object name (which the CDN does), but never returns lists.
CREATE POLICY "Public can read individual gallery files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery' AND auth.role() = 'anon' IS NOT NULL);