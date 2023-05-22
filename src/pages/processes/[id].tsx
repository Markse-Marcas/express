import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { useParams } from "@solidjs/router"

const Process = () => {
    const params = useParams()
    const [complement, setComplement] = createSignal<string | null>(null)
    const [description, setDescription] = createSignal<string | null>(null)
    const [number, setNumber] = createSignal<string | null>(null)
    const [phase, setPhase] = createSignal<string | string>("")
    const [processClass, setProcessClass] = createSignal<string | string>("")

    createEffect(() => {
        getProcess()
    })

    const getProcess = async () => {
        try {
            let { data, error } = await supabase
                .from('phase_process')
                .select(`
                    process (
                        number, class(number), description, complement
                    ),
                    phase (description)
                `)
                .eq("process_id", params.id)
                .order("created_at", { ascending: false })
                .single()

            if (error) {
                throw error
            }

            if (data) {
                setPhase(data.phase?.description)
                setProcessClass(data.process?.class.number)
                setComplement(data.process?.complement)
                setDescription(data.process?.description)
                setNumber(data.process?.number)
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }

    return (
        <>
            <div class="table-container">
                <table id="processes">
                    <thead>
                        <tr>
                            <th id="number">Número</th>
                            <th id="class">Classe</th>
                            <th id="phase">Fase</th>
                            <th id="description">Descrição</th>
                            <th id="complement">Complemento</th>
                        </tr>
                    </thead>
                    <tbody id="processes-content">
                        <tr>
                            <td>{number()}</td>
                            <td>{processClass()}</td>
                            <td>{phase()}</td>
                            <td>{description()}</td>
                            <td>{complement()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Process