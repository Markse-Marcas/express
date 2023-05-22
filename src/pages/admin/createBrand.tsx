import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { A } from "@solidjs/router"

const CreateBrand = () => {
    const [customerId, setCustomerId] = createSignal("")
    const [loading, setLoading] = createSignal(false)
    const [name, setName] = createSignal<string | null>("")
    const [status, setStatus] = createSignal<string | null>("")

    createEffect(() => {
        setCustomerId(localStorage.getItem("customer_id"))
    })

    const createBrand = async (e: Event) => {
        e.preventDefault()

        try {
            setLoading(true)

            let { error } = await supabase
                .from('brand')
                .insert({
                    name: name(),
                    status: status(),
                    customer_id: customerId()
                })

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
            window.location.href = `https://main--markse-express.netlify.app/pages/admin/customers/${customerId()}/brands`
        }
    }

    return (
        <>
            <div class="container" aria-live="polite">
                <form onSubmit={createBrand}>
                    <div class="input-group">
                        <div class="input-box">
                            <label for="name">Nome da marca</label>
                            <input
                                id="name"
                                type="text"
                                value={name() || ''}
                                required
                                onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </div>
                        <div class="input-box">
                            <label for="status">Status</label>
                            <input
                                id="status"
                                type="text"
                                value={status() || ''}
                                required
                                onChange={(e) => setStatus(e.currentTarget.value)}
                            />
                        </div>
                    </div>
                    <div class="continue-button">
                        <button type="submit" class="" disabled={loading()}>
                            {loading() ? 'Carregando...' : 'Criar marca'}
                        </button>
                    </div>
                </form>
            </div >
        </>
    )
}

export default CreateBrand