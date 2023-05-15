import { createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { A } from "@solidjs/router"

const CreateClass = () => {
    const [baseNumber, setBaseNumber] = createSignal<number | undefined>()
    const [loading, setLoading] = createSignal(false)
    const [number, setNumber] = createSignal<number | number>(1)
    const [specification, setSpecification] = createSignal<string | null>("")

    const createClass = async (e: Event) => {
        e.preventDefault()

        try {
            setLoading(true)
            let { error } = await supabase
                .from('class')
                .insert({
                    number: number(),
                    specification: specification(),
                    base_number: baseNumber()
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
        <>
            <nav>
                <ul class="nav-list">
                    <li>
                        <A href={`/pages/admin/customers/`}>Marcas</A>
                    </li>
                </ul>
            </nav>
            <div class="container" aria-live="polite">
                <form onSubmit={createClass}>
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
                            {loading() ? 'Carregando...' : 'Criar classe'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateClass