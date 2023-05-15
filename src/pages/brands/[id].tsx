import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { useParams } from "@solidjs/router"

const Brand = () => {
    const params = useParams()
    const [brandId, setBrandId] = createSignal("")
    const [id, setID] = createSignal<string | null>(null)
    const [loading, setLoading] = createSignal(true)
    const [name, setName] = createSignal<string | null>(null)
    const [status, setStatus] = createSignal<string | null>(null)

    createEffect(() => {
        getBrand()
    })

    const getBrand = async () => {
        try {
            setLoading(true)

            let { data, error } = await supabase
                .from('brand')
                .select(`
                    id,
                    name, 
                    status
                `)
                .eq("id", params.id)
                .single()

            if (error) {
                throw error
            }


            const table = document.getElementById("brands")
            const tbody = document.getElementById("brand-content") as HTMLElement
            const tr = document.createElement("tr")
            for (const item in data) {
                let td = document.createElement("td")
                let elementText = document.createTextNode(data[item])
                if (item == "id") {
                    setBrandId(data.id)
                }
                if (item == "profiles") {
                    elementText = document.createTextNode(data.profiles.name)
                }
                td.appendChild(elementText)
                tr.appendChild(td)
                tbody?.appendChild(tr)
                table?.appendChild(tbody)
            }
            let td = document.createElement("td")
            let a = document.createElement("a")
            a.className = "link"
            a.href = `${window.location.href}/processes`
            a.textContent = 'Processos'
            td.appendChild(a)
            tr.appendChild(td)
            tbody?.appendChild(tr)
            table?.appendChild(tbody)
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div class="table-container">
            <table id="brands">
                <thead>
                    <tr>
                        <th></th>
                        <th id="name">Marca</th>
                        <th id="status">Status</th>
                        <th id="processes"></th>
                    </tr>
                </thead>
                <tbody id="brand-content">
                </tbody>
            </table>
        </div>
    )
}

export default Brand