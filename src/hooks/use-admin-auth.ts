import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    const checkRole = async (user: User | null) => {
      if (!user) {
        if (!cancelled) setState({ user: null, isAdmin: false, loading: false });
        return;
      }
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (cancelled) return;
      setState({ user, isAdmin: !error && !!data, loading: false });
    };

    // Listener FIRST (avoid missed events)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer the role check to avoid deadlocks inside the auth callback
      setTimeout(() => checkRole(session?.user ?? null), 0);
    });

    // Then existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkRole(session?.user ?? null);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
