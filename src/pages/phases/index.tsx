import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"

const Phases = () => {
    createEffect(() => {
        getPhases()
    })

    const getPhases = async () => {
        try {
            const { data, error } = await supabase
                .from('phase')
                .select('id, description')

            if (error) {
                throw error
            }

            const table = document.getElementById("phases")
            const tbody = document.getElementById("phase-content") as HTMLElement

            data.map((phases) => {
                const tr = document.createElement("tr")
                for (let item in phases) {
                    let td = document.createElement("td")
                    let elementText = document.createTextNode(phases[item])
                    if (item == "description") {
                        let a = document.createElement("a")
                        a.className = "link"
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
        }
    }

    return (
        <div class="table-container">
            <table id="phases">
                <thead>
                    <tr>
                        <th id="id">ID</th>
                        <th id="description">Descrição</th>
                    </tr>
                </thead>
                <tbody id="phase-content">

                </tbody>
            </table>
        </div>
    )
}

export default Phases