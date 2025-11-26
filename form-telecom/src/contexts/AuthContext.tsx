import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAnalyst: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAnalyst, setIsAnalyst] = useState(false);

  //Verifica sesión y rol leyendo directo del JWT
  const verifyUser = async (currentSession: Session | null) => {
    if (!currentSession) {
      setUser(null);
      setSession(null);
      setIsAnalyst(false);
      setLoading(false);
      return;
    }

    // Esperar a que Supabase termine de setear la cookie + token
    await new Promise((resolve) => setTimeout(resolve, 550));

    const userId = currentSession.user.id;

    const { data: roleRow, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error reading user_roles:", error);
    }

    if (!roleRow || roleRow.role !== "analyst") {
      console.warn("User without analyst role → signing out");
      await supabase.auth.signOut();
      window.location.href = "/login";
      return;
    }

    setUser(currentSession.user);
    setSession(currentSession);
    setIsAnalyst(true);
    setLoading(false);
  };

  console.log("user", user);

  // Inicializar sesión al montar
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      verifyUser(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      verifyUser(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    await verifyUser(data.session);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAnalyst(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signIn, signOut, isAnalyst }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
