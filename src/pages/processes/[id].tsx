import { createEffect, createSignal } from "solid-js"
import { v4 as uuidv4 } from 'uuid'
import { supabase } from "../../supabaseClient"
import { useParams } from "@solidjs/router"


const Process = () => {
    const params = useParams()
    const [activityClass, setActivityClass] = createSignal("")
    const [complement, setComplement] = createSignal<string | null>(null)
    const [description, setDescription] = createSignal<string | null>(null)
    const [id, setID] = createSignal<string | string>("")
    const [loading, setLoading] = createSignal(false)
    const [number, setNumber] = createSignal<number | null>(null)
    const [phase, setPhase] = createSignal<string | string>("")

    createEffect(() => {
        getProcess()
    })

    const getProcess = async () => {
        try {
            setLoading(true)
            let { data, error } = await supabase
                .from('process')
                .select(`
                    id,
                    number,
                    activity_class,
                    description,
                    complement,
                    brand_id
                `)
                .eq("id", params.id)
                .single()

            if (error) {
                throw error
            }


            if (data) {
                setID(data.id)
                setNumber(data.number)
                setActivityClass(data.activity_class)
                setDescription(data.description)
                setComplement(data.complement)
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
            getAllPhases()
        }
    }

    const insertDataOnPhaseProcessTable = async (phaseId: string, processId: string) => {
        try {
            const { error } = await supabase
                .from('phase_process')
                .insert({ phase_id: phaseId, process_id: processId })

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }

    const getAllPhases = async () => {
        try {
            const { data, error } = await supabase
                .from('phase')
                .select('id, description')

            if (error) {
                throw error
            }

            const list = document.getElementById("phases")

            for (let { id, description } of data) {
                let option = document.createElement("option");
                option.setAttribute('value', id);

                let optionText = document.createTextNode(description);
                option.appendChild(optionText);

                list?.appendChild(option);
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }


    const updateProcess = async (e: Event) => {
        e.preventDefault()

        try {
            setLoading(true)

            if (!id())
                setID(uuidv4())

            const updates = {
                id: id(),
                activity_class: activityClass(),
                number: number(),
                description: description(),
                complement: complement(),
                brand_id: params.brandId
            }

            let { data, error } = await supabase
                .from('process')
                .upsert(updates)
                .select()

            if (data) {
                insertDataOnPhaseProcessTable(phase(), id())
            }

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
            <form onSubmit={updateProcess} class="">
                <div>
                    <label for="number">Número</label>
                    <input
                        id="number"
                        type="text"
                        value={number() || ''}
                        onChange={(e) => setNumber(Number.parseInt(e.currentTarget.value))}
                    />
                </div>
                <div>
                    <label for="description">Descrição</label>
                    <input
                        id="description"
                        type="text"
                        value={description() || ''}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label for="complement">Complemento</label>
                    <input
                        id="complement"
                        type="text"
                        value={complement() || ''}
                        onChange={(e) => setComplement(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label for="activityClass">Classe de atividade</label>
                    <input
                        id="activityClass"
                        type="text"
                        value={activityClass() || ''}
                        onChange={(e) => setActivityClass(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <select name="phases" id="phases" required onchange={(e) => { setPhase(e.target.value); }}>
                        <option selected disabled>Escolha uma opção: </option>
                    </select>
                </div>
                <div>
                    <button type="submit" class="" disabled={loading()}>
                        {loading() ? 'Carregando...' : 'Atualizar processo'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Process