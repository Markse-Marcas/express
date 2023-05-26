import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { A } from "@solidjs/router"

const Brands = () => {
    const [loading, setLoading] = createSignal(false)
    const [brandId, setBrandId] = createSignal("")

    createEffect(() => {
        getBrands()
    })

    const getBrands = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('brand')
                .select('id, name, status')

            if (error) {
                throw error
            }

            const table = document.getElementById("brands")
            const tbody = document.getElementById("brand-content") as HTMLElement

            if ((data != null) && (data.length > 0)) {
                data.map((brands) => {
                    const tr = document.createElement("tr")
                    for (let item in brands) {
                        let td = document.createElement("td")
                        let elementText = document.createTextNode(brands[item])
                        if (item == "id") {
                            setBrandId(brands.id)
                            td.setAttribute("class", "hideId")
                        }
                        if (item == "profiles") {
                            elementText = document.createTextNode(brands.profiles.name)
                        }
                        td.appendChild(elementText)
                        tr.appendChild(td)
                        tbody?.appendChild(tr)
                        table?.appendChild(tbody)
                    }
                    let td = document.createElement("td")
                    let a = document.createElement("a")
                    a.className = "link"
                    a.href = `${window.location.href}/${brandId()}/processes`
                    a.textContent = 'Processos'
                    td.appendChild(a)
                    tr.appendChild(td)
                    tbody?.appendChild(tr)
                    table?.appendChild(tbody)
                })
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
            <div class="table-container">
                <table id="brands">
                    <thead>
                        <tr>
                            <th id="name">Marca</th>
                            <th id="status">Status</th>
                            <th id="processes"></th>
                        </tr>
                    </thead>
                    <tbody id="brand-content">
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Brands