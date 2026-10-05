'use client'

import { useEffect } from 'react'
import { clearDepotOrigin, getDepotOrigin } from '@/utils/fcDepotCatalogOrigin'

const MAX_ATTEMPTS = 20

export const ScrollToDepotProduct = () => {
    useEffect(() => {
        const origin = getDepotOrigin()
        if (!origin) return

        let frame = 0
        let attempts = 0

        const scrollToCard = () => {
            const card = document.querySelector(`[data-product-id="${origin.productId}"]`)

            if (!card && attempts++ < MAX_ATTEMPTS) {
                frame = requestAnimationFrame(scrollToCard)
                return
            }

            if (card) card.scrollIntoView({ behavior: 'auto', block: 'center' })
            else window.scrollTo(0, 0)

            clearDepotOrigin()
        }

        frame = requestAnimationFrame(scrollToCard)
        return () => cancelAnimationFrame(frame)
    }, [])

    return null
}
