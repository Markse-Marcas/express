import { createEffect, createSignal } from "solid-js"
import { supabase } from "../supabaseClient"
import { session } from "../App"

const Brand = () => {
    const [id, setID] = createSignal<string | null>(null)
    const [loading, setLoading] = createSignal(true)
    const [name, setName] = createSignal<string | null>(null)
    const [status, setStatus] = createSignal<string | null>(null)

    createEffect(() => {
        getBrand()

        console.log("SESSION ID: " + session()?.user.id)
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
                .eq('customer_id', session()?.user.id)
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

            if (id() === null || id() === undefined)
                setID(crypto.randomUUID())

            const updates = {
                id: id(),
                name: name(),
                status: status(),
                customer_id: session()?.user.id
            }

            let { data, error } = await supabase
                .from('brand')
                .upsert(updates)
                .select()

            console.log("data: " + data)
            console.log("update brand id: " + id())
            console.log("error: " + error)

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
        <div aria-live="polite">
            <form onSubmit={updateBrand} class="form-widget">
                <div>
                    <label for="name">Nome: </label>
                    <input
                        id="name"
                        type="text"
                        value={name() || ''}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label for="status">Status</label>
                    <input
                        id="status"
                        type="text"
                        value={status() || ''}
                        onChange={(e) => setStatus(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button type="submit" class="button primary block" disabled={loading()}>
                        {loading() ? 'Carregando...' : 'Atualizar marca'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Brand