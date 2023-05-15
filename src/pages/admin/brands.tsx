import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { A, useParams } from "@solidjs/router"
import { cookieStorage, createStorageSignal } from '@solid-primitives/storage'

const [value, setValue] = createStorageSignal("customer_id", { api: cookieStorage })
const AllBrands = () => {
    const params = useParams()
    const [loading, setLoading] = createSignal(false)
    const [brandId, setBrandId] = createSignal("")

    createEffect(() => {
        getBrands()
        setValue(params.id)
    })

    const getBrands = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('brand')
                .select('id, name, status, profiles(name)')
                .eq("customer_id", params.id)

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
                        }
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
            <nav>
                <ul class="nav-list">
                    <li>
                        <A href="/pages/admin/customers">Clientes</A>
                    </li>
                    <li>
                        <A href="/profile">Perfil</A>
                    </li>
                </ul>
            </nav>
            <div class="table-container">
                <table id="brands">
                    <thead>
                        <tr>
                            <th></th>
                            <th id="name">Marca</th>
                            <th id="status">Status</th>
                            <th id="customer">Cliente</th>
                            <th id="processes"></th>
                        </tr>
                    </thead>
                    <tbody id="brand-content">
                    </tbody>
                </table>
                <div class="create-element"><a href={`/pages/admin/createBrand`}>Criar marca</a></div>
            </div>
        </>
    )
}

export default AllBrands