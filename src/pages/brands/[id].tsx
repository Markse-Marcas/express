import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { session } from "../../App"
import { useParams } from "@solidjs/router"

const Brand = () => {
    const params = useParams()
    const [id, setID] = createSignal<string | null>(null)
    const [loading, setLoading] = createSignal(true)
    const [name, setName] = createSignal<string | null>(null)
    const [status, setStatus] = createSignal<string | null>(null)

    createEffect(() => {
        getBrand()
    })

    const getBrand = async () => {
        try {
            setLoading(true)

            let { data, error } = await supabase
                .from('brand')
                .select(`
                    customer_id,
                    id,
                    name, 
                    status
                `)
                .eq("id", params.id)
                .single()

            if (error) {
                throw error
            }


            if (data) {
                setID(data.id)
                setName(data.name)
                setStatus(data.status)
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const updateBrand = async (e: Event) => {
        e.preventDefault()

        try {
            setLoading(true)

            const updates = {
                id: id(),
                name: name(),
                status: status(),
                customer_id: session()?.user.id
            }

            let { error } = await supabase
                .from('brand')
                .upsert(updates)
                .select()

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div class="container" aria-live="polite">
            <form onSubmit={updateBrand} class="">
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Nome da marca</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        class="input input-bordered w-full max-w-xs"
                        value={name() || ''}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Status</span>
                    </label>
                    <input
                        id="status"
                        type="text"
                        class="input input-bordered w-full max-w-xs"
                        value={status() || ''}
                        onChange={(e) => setStatus(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button type="submit" class="" disabled={loading()}>
                        {loading() ? 'Carregando...' : 'Atualizar marca'}
                    </button>
                </div>
            </form>
        </div >
    )
}

export default Brand