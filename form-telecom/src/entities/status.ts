export interface Status {
  id: string;
  value: string;
  label: string;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
}

export const STATUSES: Status[] = [
  {
    id: "1",
    value: "pending",
    label: "Pendiente",
    color: "warning",
  },
  {
    id: "2",
    value: "in_review",
    label: "En Revisión",
    color: "info",
  },
  {
    id: "3",
    value: "completed",
    label: "Completado",
    color: "success",
  },
  {
    id: "4",
    value: "processed",
    label: "Procesado",
    color: "default",
  },
];

export const getStatusByValue = (value: string): Status | undefined => {
  return STATUSES.find((status) => status.value === value);
};

export const getStatusById = (id: string): Status | undefined => {
  return STATUSES.find((status) => status.id === id);
};

export const getStatusColor = (value: string): Status["color"] => {
  const status = getStatusByValue(value);
  return status?.color || "default";
};

export const getStatusLabel = (value: string): string => {
  const status = getStatusByValue(value);
  return status?.label || value;
};

