import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { A } from "@solidjs/router"

const AllClasses = () => {
    createEffect(() => {
        getClasses()
    })

    const getClasses = async () => {
        try {
            const { data, error } = await supabase
                .from('class')
                .select('id, number, specification, base_number')

            if (error) {
                throw error
            }

            const table = document.getElementById("classes")
            const tbody = document.getElementById("class-content") as HTMLElement

            data.map((classes) => {
                const tr = document.createElement("tr")
                for (let item in classes) {
                    let td = document.createElement("td")
                    let elementText = document.createTextNode(classes[item])
                    if (item == "number") {
                        let a = document.createElement("a")
                        a.className = "link"
                        a.href = `/pages/classes/${classes.id}`
                        a.textContent = `${elementText.textContent}`
                        td.appendChild(a)
                    }

                    if (elementText.textContent == "null")
                        elementText.textContent = ""

                    td.appendChild(elementText)
                    if (item == "number") {
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
        <>
            <div class="table-container">
                <table id="classes">
                    <thead>
                        <tr>
                            <th id="id">ID</th>
                            <th id="number">Número</th>
                            <th id="specification">Especificação</th>
                            <th id="baseNumber">Número de base</th>
                        </tr>
                    </thead>
                    <tbody id="class-content">

                    </tbody>
                </table>
                <div class="create-element"><a href={`/pages/admin/createClass`}>Criar classe</a></div>
            </div>
        </>
    )
}

export default AllClasses