// ===========================
// TIPOS BASE
// ===========================

export type EstadoBRM = "b" | "r" | "m";
export type EstadoBRM_NP = "b" | "r" | "m" | "no posee";

// Campos tipo tiene + vencimiento
export interface TieneVencimiento {
  tiene: boolean;
  vencimiento?: string | null;
}

// ===========================
// ENCABEZADO
// ===========================

export interface Encabezado {
  fecha: string;
  dominio: string;
  modelo_vehiculo: string;
  km_actual: number;
  combustible_tipo: string;
}

// ===========================
// ÚLTIMO SERVICE
// ===========================

export interface UltimoService {
  km: number;
  fecha_realizado: string;
  ultima_distribucion?: {
    km: number;
    fecha_realizado: string;
  } | null;
}

// ===========================
// DOCUMENTACIÓN - SEGURIDAD
// ===========================

export interface DocumentacionSeguridad {
  cedula_verde: TieneVencimiento | { tiene: boolean };
  vtv_rto: TieneVencimiento;
  matafuego_1kg: TieneVencimiento | { tiene: boolean };
  matafuego_25kg: TieneVencimiento;
  botiquin: boolean;
  seguro: boolean;
  tarjeta_combustible: string; // VPF / SHELL / TICKET-CARD
  llave_rueda: boolean;
  crickey_gato: boolean;
  cuarta_remolque: boolean;
  balizas: boolean;
  chapa_patente: boolean;
  certificado_habilitacion_hidros: TieneVencimiento | { tiene: boolean };
}

// ===========================
// LUCES
// ===========================

export interface Luces {
  luz_alta: EstadoBRM;
  luz_baja: EstadoBRM;
  luz_stop: EstadoBRM;
  antiniebla: EstadoBRM;
  luz_furgon: EstadoBRM | "m";
  baliza_giros: EstadoBRM;
  luz_retroceso: EstadoBRM;
  opticas_delantera_trasera: EstadoBRM;
  observaciones?: string | null;
}

// ===========================
// NEUMÁTICOS
// ===========================

export interface NeumaticoDetalle {
  estado: EstadoBRM;
  dot?: string | null;
  marca?: string | null;
  mm?: number | null;
}

export interface Neumaticos {
  medida: string;
  tuerca_seguridad: boolean;
  delantera_derecha: NeumaticoDetalle;
  delantera_izquierda: NeumaticoDetalle;
  trasera_derecha: NeumaticoDetalle;
  trasera_izquierda: NeumaticoDetalle;
  inferior_td: NeumaticoDetalle;
  inferior_ti: NeumaticoDetalle;
  rueda_auxilio: NeumaticoDetalle;
  observaciones?: string | null;
}

// ===========================
// NIVEL DE LÍQUIDOS
// ===========================

export interface NivelLiquidos {
  aceite_motor: EstadoBRM;
  aceite_caja: EstadoBRM;
  aceite_diferencial: EstadoBRM;
  liquido_frenos: EstadoBRM;
  liquido_refrigerante: EstadoBRM;
  liquido_dir_hidraulica: EstadoBRM;
  liquido_limpiaparabrisas: EstadoBRM;
  posee_perdida: boolean;
  detalle_perdida?: string | null;
}

// ===========================
// FUNCIONAMIENTO
// ===========================

export interface Funcionamiento {
  motor: EstadoBRM;
  bocina: EstadoBRM;
  escape: EstadoBRM;
  frenos: EstadoBRM;
  sapito: EstadoBRM;
  vidrios: EstadoBRM;
  embrague: EstadoBRM;
  direccion: EstadoBRM;
  cerraduras: EstadoBRM;
  calefaccion: EstadoBRM;
  transmision: EstadoBRM;
  bateria_marca: string;
  freno_de_mano: EstadoBRM;
  amortiguadores: EstadoBRM;
  tren_delantero: EstadoBRM;
  bateria_con_carga: boolean;
  electroventilador: EstadoBRM;
  limpia_parabrisas: EstadoBRM;
  aire_acondicionado: EstadoBRM_NP;
  tablero_instrumental: EstadoBRM;
  bateria_fecha_fabricacion?: string | null;
}

// ===========================
// ESTADO GENERAL
// ===========================

export interface EstadoGeneral {
  cupula: {
    tiene: boolean;
    estado?: EstadoBRM | null;
  };
  luneta: EstadoBRM;
  espejos: EstadoBRM;
  alfombras: EstadoBRM;
  tapizados: EstadoBRM;
  parabrisas: EstadoBRM;
  porta_cajuela: EstadoBRM;
  estado_pintura: EstadoBRM;
  faros_traseros: EstadoBRM;
  ficha_enganche: EstadoBRM;
  estado_carroceria: EstadoBRM;
  limpieza_exterior: EstadoBRM;
  limpieza_interior: EstadoBRM;
  paragolpe_trasero: EstadoBRM;
  vidrios_laterales: EstadoBRM;
  bandas_refractivas: EstadoBRM;
  opticas_delanteras: EstadoBRM;
  paragolpe_delantero: EstadoBRM;
  puertas?: EstadoBRM | null;
  separador_de_carga?: EstadoBRM | null;
  cinturones_de_seguridad: EstadoBRM;
  equipamiento_hidraulico: {
    tiene: boolean;
    estado?: EstadoBRM | null;
  };
}

// ===========================
// OBSERVACIONES FINALES
// ===========================

export interface ObservacionesFinales {
  observaciones: string;
  realizado_por: string;
}

// ===========================
// ENTIDAD PRINCIPAL
// ===========================

export class FormularioPM {
  encabezado!: Encabezado;
  ultimo_service!: UltimoService;
  documentacion_seguridad!: DocumentacionSeguridad;
  luces!: Luces;
  neumaticos!: Neumaticos;
  nivel_de_liquidos!: NivelLiquidos;
  funcionamiento!: Funcionamiento;
  estado_general!: EstadoGeneral;
  observaciones_finales!: ObservacionesFinales;

  constructor(data: Partial<FormularioPM>) {
    Object.assign(this, data);
  }
}
