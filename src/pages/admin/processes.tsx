import { createEffect } from "solid-js"
import { supabase } from "../../supabaseClient"
import { A, useParams } from "@solidjs/router"
import { cookieStorage, createStorageSignal } from '@solid-primitives/storage'

const AllProcesses = () => {
    const [value, setValue] = createStorageSignal("admin_brand_id", { api: cookieStorage })
    const params = useParams()
    createEffect(() => {
        getProcesses()
        setValue(params.id)
    })

    const getProcesses = async () => {
        try {
            const { data, error } = await supabase
                .from('process')
                .select('id, number, description, created_at')
                .eq("brand_id", params.id)

            if (error) {
                throw error
            }

            const table = document.getElementById("processes")
            const tbody = document.getElementById("processes-content") as HTMLElement

            data.map((processes) => {
                const tr = document.createElement("tr")
                for (let item in processes) {
                    let td = document.createElement("td")
                    let elementText = document.createTextNode(processes[item])
                    if (item == "created_at") {
                        const date = new Date(processes.created_at)
                        elementText = document.createTextNode(date.toLocaleDateString('pt-BR'))
                    }
                    if (item == "number") {
                        let a = document.createElement("a")
                        a.className = "link"
                        a.href = `${window.location.href}/${processes.id}`
                        a.textContent = `${elementText.textContent}`
                        td.appendChild(a)
                    }
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
                <table id="processes">
                    <thead>
                        <tr>
                            <th id="id"></th>
                            <th id="number">Número</th>
                            <th id="description">Descrição</th>
                            <th id="date">Data</th>
                        </tr>
                    </thead>
                    <tbody id="processes-content">

                    </tbody>
                </table>
                <div class="create-element"><a href={`/pages/admin/createProcess`}>Criar processo</a></div>
            </div>
        </>
    )
}
export default AllProcesses