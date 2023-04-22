import { createEffect, createSignal } from "solid-js"

const Process = () => {
    const [description, setDescription] = createSignal<string | null>(null)
    const [loading, setLoading] = createSignal(false)
    const [number, setNumber] = createSignal<string | null>(null)
    const [status, setStatus] = createSignal<string | null>(null)

    createEffect(() => {
        getProcess()
    })

    const getProcess = async () => {
        try {
            setLoading(true)
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>Teste</div>
    )
}

export default Process