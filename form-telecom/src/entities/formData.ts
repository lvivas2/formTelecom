/**
 * Tipos para los datos del formulario de mantenimiento
 * Todos los campos pueden ser null según la especificación
 */

export interface DocumentacionSeguridadItem {
  tiene?: boolean | string | null;
  vencimiento?: string | null;
}

export interface DocumentacionSeguridad {
  cedula_verde: DocumentacionSeguridadItem | boolean | string | null;
  vtv_rto: DocumentacionSeguridadItem | boolean | string | null;
  matafuego_1kg: DocumentacionSeguridadItem | boolean | string | null;
  matafuego_25kg: DocumentacionSeguridadItem | boolean | string | null;
  botiquin: boolean | string | null;
  seguro: boolean | string | null;
  tarjeta_combustible: boolean | string | null;
  llave_rueda: boolean | string | null;
  crickey_gato: boolean | string | null;
  cuarta_remolque: boolean | string | null;
  balizas: boolean | string | null;
  chapa_patente: boolean | string | null;
  certificado_habilitacion_hidros:
    | DocumentacionSeguridadItem
    | boolean
    | string
    | null;
}

export interface Luces {
  opticas_delantera_trasera: string | null; // "b", "m", "r"
  baliza_giros: string | null;
  luz_baja: string | null;
  luz_alta: string | null;
  antiniebla: string | null;
  luz_retroceso: string | null;
  luz_stop: string | null;
  luz_furgon: string | null;
  observaciones: string | null;
}

export interface NeumaticoItem {
  estado: string | null; // "b", "m", "r"
  dot?: string | null;
  marca?: string | null;
  mm?: number | string | null;
}

export interface Neumaticos {
  medida: string | null;
  tuerca_seguridad: boolean | string | null;
  delantera_derecha: NeumaticoItem | null;
  delantera_izquierda: NeumaticoItem | null;
  trasera_derecha: NeumaticoItem | null;
  trasera_izquierda: NeumaticoItem | null;
  inferior_td: NeumaticoItem | null;
  inferior_ti: NeumaticoItem | null;
  rueda_auxilio: NeumaticoItem | null;
  observaciones: string | null;
}

export interface NivelDeLiquidos {
  aceite_motor: string | null; // "b", "m", "r"
  aceite_caja: string | null;
  aceite_diferencial: string | null;
  liquido_frenos: string | null;
  liquido_refrigerante: string | null;
  liquido_dir_hidraulica: string | null;
  liquido_limpiaparabrisas: string | null;
  posee_perdida: boolean | string | null;
  detalle_perdida: string | null;
}

export interface Funcionamiento {
  motor: string | null; // "b", "m", "r"
  electroventilador: string | null;
  embrague: string | null;
  transmision: string | null;
  direccion: string | null;
  escape: string | null;
  frenos: string | null;
  freno_de_mano: string | null;
  amortiguadores: string | null;
  tren_delantero: string | null;
  aire_acondicionado: string | null; // "b", "m", "r", "no posee"
  calefaccion: string | null;
  bateria_marca: string | null;
  bateria_fecha_fabricacion: string | null;
  bateria_con_carga: boolean | string | null;
  tablero_instrumental: string | null;
  cerraduras: string | null;
  vidrios: string | null;
  limpia_parabrisas: string | null;
  sapito: string | null;
  bocina: string | null;
}

export interface EstadoGeneralItem {
  tiene?: boolean | string | null;
  estado?: string | null;
}

export interface EstadoGeneral {
  limpieza_interior: string | null; // "b", "m", "r"
  limpieza_exterior: string | null;
  opticas_delanteras: string | null;
  faros_traseros: string | null;
  espejos: string | null;
  parabrisas: string | null;
  luneta: string | null;
  vidrios_laterales: string | null;
  estado_carroceria: string | null;
  estado_pintura: string | null;
  paragolpe_delantero: string | null;
  paragolpe_trasero: string | null;
  porta_cajuela: string | null;
  puertas: string | null;
  bandas_refractivas: string | null;
  ficha_enganche: string | null;
  separador_de_carga: string | null;
  tapizados: string | null;
  alfombras: string | null;
  cinturones_de_seguridad: string | null;
  equipamiento_hidraulico: EstadoGeneralItem | string | null;
  cupula: EstadoGeneralItem | boolean | string | null;
}

export interface UltimoService {
  km: number | null;
  fecha_realizado: string | null;
}

export interface UltimaDistribucion {
  km: number | null;
  fecha_realizado: string | null;
}

export interface ObservacionesFinales {
  observaciones: string | null;
  realizado_por: string | null;
}

export interface FormularioMantenimientoData {
  dominio: string | null;
  modelo_vehiculo: string | null;
  km_actual: number | null;
  combustible_tipo: string | null;
  fecha: string | null;

  ultimo_service: UltimoService | null;
  ultima_distribucion: UltimaDistribucion | null;

  documentacion_seguridad: DocumentacionSeguridad | null;
  luces: Luces | null;
  neumaticos: Neumaticos | null;
  nivel_de_liquidos: NivelDeLiquidos | null;
  funcionamiento: Funcionamiento | null;
  estado_general: EstadoGeneral | null;

  observaciones_finales: ObservacionesFinales | null;

  // Campos adicionales para compatibilidad
  direccion?: string | null;
  base_vec?: string | null;
  usuario_conductor?: string | null;
  guarda?: string | null;
  // Permite campos adicionales dinámicos
  [key: string]: unknown;
}
