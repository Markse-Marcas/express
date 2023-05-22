import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { v4 as uuidv4 } from 'uuid';

const CreateProcess = () => {
    const [activityClass, setActivityClass] = createSignal("")
    const [brandId, setBrandId] = createSignal("")
    const [complement, setComplement] = createSignal<string | null>(null)
    const [description, setDescription] = createSignal<string | null>(null)
    const [loading, setLoading] = createSignal(false)
    const [number, setNumber] = createSignal<number | null>(null)
    const [phase, setPhase] = createSignal<string | string>("")

    createEffect(() => {
        getAllClasses()
        getAllPhases()
        setBrandId(localStorage.getItem("admin_brand_id"))
    })

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

    const insertDataOnBrandClassTable = async (brandId: string, classId: string) => {
        try {
            const { error } = await supabase
                .from('brand_class')
                .insert({ brand_id: brandId, class_id: classId })

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }

    const getAllClasses = async () => {
        try {
            const { data, error } = await supabase
                .from('class')
                .select('id, number')

            if (error) {
                throw error
            }

            const list = document.getElementById("classes")

            for (let { id, number } of data) {
                let option = document.createElement("option");
                option.setAttribute('value', id);

                let optionText = document.createTextNode(`${number}`);
                option.appendChild(optionText);

                list?.appendChild(option);
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


    const createProcess = async (e: Event) => {
        e.preventDefault()

        try {
            setLoading(true)

            let { data, error } = await supabase
                .from('process')
                .insert({
                    number: number(),
                    activity_class: activityClass(),
                    description: description(),
                    complement: complement(),
                    brand_id: brandId(),
                    id: uuidv4()
                })
                .select()

            if (error) {
                throw error
            }

            if (data) {
                insertDataOnPhaseProcessTable(phase(), data.id)
                insertDataOnBrandClassTable(brandId(), activityClass())
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
            // window.location.href = `https://main--markse-express.netlify.app/pages/admin/customers/${localStorage.getItem("customer_id")}/brands/${localStorage.getItem("admin_brand_id")}/processes`
        }
    }

    return (
        <>
            <div class="container" aria-live="polite">
                <div class="form">
                    <form onSubmit={createProcess}>
                        <div class="input-group">
                            <div class="input-box">
                                <label for="number">Número</label>
                                <input
                                    id="number"
                                    type="text"
                                    value={number() || ''}
                                    onChange={(e) => setNumber(Number.parseInt(e.currentTarget.value))}
                                />
                            </div>
                            <div class="input-box">
                                <label for="description">Descrição</label>
                                <input
                                    id="description"
                                    type="text"
                                    value={description() || ''}
                                    required
                                    onChange={(e) => setDescription(e.currentTarget.value)}
                                />
                            </div>
                            <div class="input-box">
                                <label for="complement">Complemento</label>
                                <input
                                    id="complement"
                                    type="text"
                                    value={complement() || ''}
                                    onChange={(e) => setComplement(e.currentTarget.value)}
                                />
                            </div>
                            <div class="input-box">
                                <select name="classes" id="classes" required onchange={(e) => { setActivityClass(e.target.value); }}>
                                    <option selected disabled>Escolha uma classe: </option>
                                </select>
                            </div>
                            <div class="input-box">
                                <select name="phases" id="phases" required onchange={(e) => { setPhase(e.target.value); }}>
                                    <option selected disabled>Escolha uma fase: </option>
                                </select>
                            </div>
                        </div>
                        <div class="continue-button">
                            <button type="submit" disabled={loading()}>
                                {loading() ? 'Carregando...' : 'Salvar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateProcess