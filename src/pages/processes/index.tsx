import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { A } from "@solidjs/router"

const Processes = () => {
    const [loading, setLoading] = createSignal(false)
    createEffect(() => {
        getProcesses()
    })

    const getProcesses = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('process')
                .select('id, number, activity_class, description, complement')

            if (error) {
                throw error
            }

            const table = document.getElementById("processes")
            const tbody = document.getElementById("processes-content") as HTMLElement
            const tr = document.createElement("tr")

            data.map((phases) => {
                for (let item in phases) {
                    let td = document.createElement("td")
                    let elementText = document.createTextNode(phases[item])
                    if (item == "description") {
                        let a = document.createElement("a")
                        a.href = `/pages/phases/${phases.id}`
                        a.textContent = `${elementText.textContent}`
                        td.appendChild(a)
                    }

                    td.appendChild(elementText)
                    if (item == "description") {
                        td.removeChild(elementText)
                    }
                    tr.appendChild(td)
                    tbody?.appendChild(tr)
                    table?.appendChild(tbody)
                }
            })
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <A href="/pages/processes/:id">Cadastrar processo</A>
            <table id="processes">
                <thead>
                    <tr>
                        <th id="id">ID</th>
                        <th id="number">Número</th>
                        <th id="activity_class">Classe de atividade</th>
                        <th id="description">Descrição</th>
                        <th id="complement">Complemento</th>
                    </tr>
                </thead>
                <tbody id="processes-content">

                </tbody>
            </table>
        </div>
    )
}
export default Processes