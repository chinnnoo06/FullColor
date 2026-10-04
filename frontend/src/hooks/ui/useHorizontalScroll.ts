'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { horizontalDistance, horizontalOffset, horizontalTop, horizontalX } from '@/utils/motion/horizontal'

type TLayout = {
  /** Píxeles que la pista sobresale de la ventana: alto del espaciador. */
  distance: number
  /** Alto del bloque pegajoso. */
  blockHeight: number
}

/**
 * Scroll horizontal con scroll vertical. Devuelve lo que la estructura necesita:
 * - `outerRef`: contenedor que mide el progreso (bloque pegajoso + espaciador).
 * - `viewportRef`: bloque pegajoso que recorta la pista.
 * - `trackRef`: pista que se desplaza en X.
 * - `x`: desplazamiento para la pista. `progress`: avance de 0 a 1. `distance`: alto del espaciador.
 * - `top`: dónde se pega el bloque, bajo el header más el aire configurado.
 */
export const useHorizontalScroll = () => {
  const reduced = useReducedMotion()
  const outerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [layout, setLayout] = useState<TLayout>({ distance: 0, blockHeight: 0 })
  /** La distancia también vive como valor de movimiento para calcular X sin re-renderizar. */
  const distanceValue = useMotionValue(0)

  const measure = useCallback(() => {
    if (!trackRef.current || !viewportRef.current) return
    const distance = horizontalDistance(trackRef.current, viewportRef.current)
    distanceValue.set(distance)
    setLayout({ distance, blockHeight: viewportRef.current.offsetHeight })
  }, [distanceValue])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const { scrollYProgress } = useScroll({ target: outerRef, offset: horizontalOffset(layout.blockHeight) })
  const x = useTransform([scrollYProgress, distanceValue], horizontalX)

  return {
    reduced,
    outerRef,
    viewportRef,
    trackRef,
    x,
    progress: scrollYProgress,
    distance: reduced ? 0 : layout.distance,
    top: horizontalTop,
  }
}
