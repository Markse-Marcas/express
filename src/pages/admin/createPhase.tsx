import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { useParams } from "@solidjs/router";

const CreatePhase = () => {
    const [description, setDescription] = createSignal("")
    const [loading, setLoading] = createSignal(false)

    const createPhase = async (e: Event) => {
        e.preventDefault()

        try {
            setLoading(true)

            let { error } = await supabase
                .from('phase')
                .insert({
                    description: description()
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
        }
    }

    return (
        <div class="container" aria-live="polite">
            <form onSubmit={createPhase}>
                <div class="input-group">
                    <div class="input-box">
                        <label for="description">Descrição: </label>
                        <input
                            id="description"
                            type="text"
                            value={description() || ''}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                        />
                    </div>
                </div>
                <div class="continue-button">
                    <button type="submit" disabled={loading()}>
                        {loading() ? 'Carregando...' : 'Criar fase'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePhase