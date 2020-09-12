import {useState, useCallback} from 'react'

export const useHttp = (callback, deps) => {
    const [loading, set_loading] = useState(false)
    const [error, set_error] = useState(null)
    const req = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        set_loading(true)
        try {
            const res = await fetch(url, {method, body, headers})
            const data = await res.json()

            if (!res.ok){
                throw new Error(data.message || "Something went wrong")
            }

            set_loading(false)
            return data
        } catch (e) {
            set_loading(false)
            set_error(e.message)
            throw e
        }
    }, deps)
    const clear_error = () => set_error(null)
    return {loading, set_loading, error}
}