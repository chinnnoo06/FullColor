/**
 * Scroll horizontal con scroll vertical.
 * Un bloque pegajoso (pista + barra) se fija bajo el header cuando su parte superior llega ahí.
 * Un espaciador debajo reserva el recorrido; mientras se recorre, la pista avanza en X exactamente
 * lo que sobresale de la ventana, así termina con la última tarjeta pegada al borde derecho.
 */
export const horizontalScroll = {
  /** Altura del header fijo, en px. */
  headerOffset: 80,
  /** Aire entre el header y el bloque cuando se pega, en px. */
  stickyGap: 80,
} as const;

/** `top` del bloque pegajoso: bajo el header más el aire configurado. */
export const horizontalTop = horizontalScroll.headerOffset + horizontalScroll.stickyGap;

/**
 * Rango del progreso para `useScroll`: 0 cuando la parte superior del bloque llega a su `top`
 * y 1 cuando el final del contenedor alcanza la base del bloque pegado.
 */
export const horizontalOffset = (blockHeight: number) =>
  [`start ${horizontalTop}px`, `end ${horizontalTop + blockHeight}px`] as [`start ${number}px`, `end ${number}px`];

/** Píxeles que la pista sobresale de la ventana: es cuánto hay que desplazarla. */
export const horizontalDistance = (track: HTMLElement, viewport: HTMLElement) =>
  Math.max(0, track.scrollWidth - viewport.clientWidth);

/**
 * Transformador para `useTransform([progress, distance], horizontalX)`: desplazamiento en X.
 * Recibe el progreso y la distancia como valores de movimiento, así se recalcula solo cuando
 * cambia cualquiera de los dos y no depende de referencias de React.
 */
export const horizontalX = ([progress, distance]: number[]) =>
  -Math.min(1, Math.max(0, progress)) * distance;
