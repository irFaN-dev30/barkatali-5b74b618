import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getDefaultData, normalizeData, type SiteData } from "@/lib/data";

const ROW_KEY = "main";

export function useSiteData() {
  const [data, setData] = useState<SiteData>(() => getDefaultData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial load
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: row, error: err } = await supabase
          .from("site_content")
          .select("data")
          .eq("key", ROW_KEY)
          .maybeSingle();
        if (cancelled) return;
        if (err) {
          setError(err.message);
        } else if (row) {
          setData(normalizeData(row.data));
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Realtime updates — when admin saves on one device, all visitors see it
  useEffect(() => {
    const channel = supabase
      .channel("site-content-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_content", filter: `key=eq.${ROW_KEY}` },
        (payload) => {
          const next = (payload.new as { data?: unknown } | null)?.data;
          if (next) setData(normalizeData(next));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /** Persist to Supabase. Requires the user to be logged in as admin. */
  const updateData = useCallback(async (newData: SiteData) => {
    setData(newData); // optimistic
    const { error: err } = await supabase
      .from("site_content")
      .update({ data: newData as unknown as Record<string, unknown> })
      .eq("key", ROW_KEY);
    if (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return { data, updateData, loading, error };
}
