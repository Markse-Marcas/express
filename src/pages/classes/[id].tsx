import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { useParams } from "@solidjs/router"

const Class = () => {
    const params = useParams()
    const [baseNumber, setBaseNumber] = createSignal<number | undefined>()
    const [id, setID] = createSignal<string | null>("")
    const [loading, setLoading] = createSignal(true)
    const [number, setNumber] = createSignal<number | number>(1)
    const [specification, setSpecification] = createSignal<string | null>("")

    createEffect(() => {
        getClass()
    })

    const getClass = async () => {
        try {
            setLoading(true)

            let { data, error } = await supabase
                .from('class')
                .select(`
                    id,
                    number, 
                    specification,
                    base_number
                `)
                .eq("id", params.id)
                .single()

            if (error) {
                throw error
            }


            if (data) {
                setID(data.id)
                setNumber(data.number)
                setSpecification(data.specification)
                setBaseNumber(data.base_number)
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const updateClass = async (e: Event) => {
        e.preventDefault()

        try {
            setLoading(true)

            const updates = {
                baseNumber: baseNumber(),
                id: id(),
                number: number(),
                specification: specification()
            }

            let { error } = await supabase
                .from('class')
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
            <form onSubmit={updateClass}>
                <div class="input-group">
                    <div class="input-box">
                        <label for="number">Número: </label>
                        <input
                            id="number"
                            type="number"
                            min={1}
                            max={45}
                            value={number()}
                            required
                            onChange={(e) => setNumber(Number.parseInt(e.currentTarget.value))}
                        />
                    </div>
                    <div class="input-box">
                        <label for="specification">Especificação</label>
                        <input
                            id="specification"
                            type="text"
                            value={specification() || ''}
                            onChange={(e) => setSpecification(e.currentTarget.value)}
                        />
                    </div>
                    <div class="input-box">
                        <label for="base_number">Número de base: </label>
                        <input
                            id="base_number"
                            type="number"
                            min={0}
                            value={baseNumber()}
                            onChange={(e) => setBaseNumber(Number.parseInt(e.currentTarget.value))}
                        />
                    </div>
                </div>
                <div class="continue-button">
                    <button type="submit" class="" disabled={loading()}>
                        {loading() ? 'Carregando...' : 'Atualizar classe'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Class