import { supabase } from "../lib/supabaseClient";

export interface Revision {
  id: string;
  status: string;
  created_at: string;
}

export interface RevisionDetail {
  id: string;
  json_original: any;
  json_final: any;
  status: string;
  created_at: string;
  updated_at: string | null;
}

/**
 * Obtiene la lista de revisiones con estados pending o in_review
 */
export const getRevisions = async (): Promise<Revision[]> => {
  const { data, error } = await supabase
    .from("form_revision")
    .select("id, status, created_at")
    .in("status", ["pending", "in_review", "completed", "processed"])
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Error al cargar las revisiones");
  }
  return data || [];
};

/**
 * Obtiene el detalle completo de una revisión por ID
 */
export const getRevisionById = async (id: string): Promise<RevisionDetail> => {
  const { data, error } = await supabase
    .from("form_revision")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message || "Error al cargar la revisión");
  }

  if (!data) {
    throw new Error("Revisión no encontrada");
  }

  return data;
};

/**
 * Guarda parcialmente una revisión (solo json_final, sin cambiar status)
 * Usado para autoguardado mientras el analista trabaja
 */
export const savePartialRevision = async (
  id: string,
  jsonFinal: any
): Promise<void> => {
  const { error } = await supabase
    .from("form_revision")
    .update({
      json_final: jsonFinal,
      updated_at: new Date().toISOString(),
      // NO actualizamos status - se mantiene como está
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message || "Error al guardar cambios parciales");
  }
};

/**
 * Actualiza solo el estado de una revisión
 * Usado para cambiar el estado sin modificar el json_final
 */
export const updateRevisionStatus = async (
  id: string,
  status: "pending" | "in_review" | "completed" | "processed"
): Promise<void> => {
  const { error } = await supabase
    .from("form_revision")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message || "Error al actualizar el estado");
  }
};

/**
 * Actualiza una revisión con json_final y status
 * Usado cuando el analista finaliza explícitamente la revisión
 */
export const updateRevision = async (
  id: string,
  jsonFinal: any,
  status: string
): Promise<RevisionDetail> => {
  const { data, error } = await supabase
    .from("form_revision")
    .update({
      json_final: jsonFinal,
      status: status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Error al guardar la revisión");
  }

  if (!data) {
    throw new Error("Error al actualizar la revisión");
  }

  return data;
};
