import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"

const Brands = () => {
    const [loading, setLoading] = createSignal(false)

    createEffect(() => {
        getBrands()
    })

    const getBrands = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('brand')
                .select('id, name, status, profiles(name)')

            if (error) {
                throw error
            }

            const table = document.getElementById("brands")
            const tbody = document.getElementById("brand-content") as HTMLElement
            const tr = document.createElement("tr")

            data.map((brands) => {
                for (let item in brands) {
                    let td = document.createElement("td")
                    let elementText = document.createTextNode(brands[item])
                    if (item == "name") {
                        let a = document.createElement("a")
                        a.className = "link"
                        a.href = `/pages/brands/${brands.id}`
                        a.textContent = `${elementText.textContent}`
                        td.appendChild(a)
                    }
                    if (item == "profiles") {
                        elementText = document.createTextNode(brands.profiles.name)
                    }
                    td.appendChild(elementText)
                    if (item == "name") {
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
        <div class="overflow-x-auto">
            <table id="brands" class="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th id="name">Marca</th>
                        <th id="status">Status</th>
                        <th id="customer">Cliente</th>
                        <th id="processes">Processos</th>
                    </tr>
                </thead>
                <tbody id="brand-content">

                </tbody>
            </table>
        </div>
    )
}

export default Brands