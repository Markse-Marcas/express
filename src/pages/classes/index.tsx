import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"

const Classes = () => {
    const [loading, setLoading] = createSignal(false)
    createEffect(() => {
        getClasses()
    })

    const getClasses = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('class')
                .select('id, number, specification, base_number')

            if (error) {
                throw error
            }

            const table = document.getElementById("classes")
            const tbody = document.getElementById("class-content") as HTMLElement
            const tr = document.createElement("tr")

            data.map((classes) => {
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
        } finally {
            setLoading(false)
        }
    }

    return (
        <div class="">
            <table id="classes" class="">
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
        </div>
    )
}

export default Classes