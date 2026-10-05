type TDepotOrigin = { page: number; productId: string }

const KEY = 'fc-depot-origin'

export const saveDepotOrigin = (origin: TDepotOrigin) => {
    try { sessionStorage.setItem(KEY, JSON.stringify(origin)) } catch {}
}

export const getDepotOrigin = (): TDepotOrigin | null => {
    try {
        const raw = sessionStorage.getItem(KEY)
        if (!raw) return null
        return JSON.parse(raw) as TDepotOrigin
    } catch { return null }
}

export const clearDepotOrigin = () => {
    try { sessionStorage.removeItem(KEY) } catch {}
}
