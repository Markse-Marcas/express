import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "@solidjs/router";

const Phase = () => {
    const params = useParams()
    const [description, setDescription] = createSignal("")
    const [loading, setLoading] = createSignal(true)
    const [id, setID] = createSignal("")

    createEffect(() => {
        getPhase()
    })

    const getPhase = async () => {
        try {
            setLoading(true)
            let { data, error } = await supabase
                .from("phase")
                .select("id, description")
                .eq("id", params.id)
                .single()

            if (error) {
                throw error
            }

            if (data) {
                setID(data.id)
                setDescription(data.description)
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const updatePhase = async (e: Event) => {
        e.preventDefault()

        try {
            setLoading(true)

            if (!id())
                setID(uuidv4())

            const updates = {
                id: id(),
                description: description()
            }

            let { error } = await supabase
                .from('phase')
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
        <div aria-live="polite">
            <form onSubmit={updatePhase} class="">
                <div>
                    <label for="description">Descrição: </label>
                    <input
                        id="description"
                        type="text"
                        value={description() || ''}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button type="submit" class="" disabled={loading()}>
                        {loading() ? 'Carregando...' : 'Atualizar fase'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Phase