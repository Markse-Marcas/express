import { createEffect, createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { A } from "@solidjs/router"
import AdminHeader from "../../components/Header"

const Customers = () => {
    const [customerId, setCustomerId] = createSignal("")

    createEffect(() => {
        getCustomers()
    })

    const getCustomers = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, username, name, phone')

            if (error) {
                throw error
            }

            const table = document.getElementById("customers")
            const tbody = document.getElementById("customer-content") as HTMLElement

            if ((data != null) && (data.length > 0)) {
                data.map((customer) => {
                    const tr = document.createElement("tr")
                    for (let item in customer) {
                        let td = document.createElement("td")
                        let elementText = document.createTextNode(customer[item])
                        if (item == "id") {
                            setCustomerId(customer.id)
                        }
                        // if (item == "name") {
                        //     let a = document.createElement("a")
                        //     a.className = "link"
                        //     a.href = `/pages/customer/${customer.id}`
                        //     a.textContent = `${elementText.textContent}`
                        //     td.appendChild(a)
                        // }
                        td.appendChild(elementText)
                        // if (item == "name") {
                        //     td.removeChild(elementText)
                        // }
                        tr.appendChild(td)
                        tbody?.appendChild(tr)
                        table?.appendChild(tbody)
                    }
                    let td = document.createElement("td")
                    let a = document.createElement("a")
                    a.className = "link"
                    a.href = `${window.location.href}/${customerId()}/brands`
                    a.textContent = 'Marcas'
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
        }
    }

    return (
        <>
            {/* <nav>
                <ul class="nav-list">
                    <li>
                        <A href="/pages/admin/classes">Classes</A>
                    </li>
                    <li>
                        <A href="/pages/admin/customers">Clientes</A>
                    </li>
                    <li>
                        <A href="/pages/admin/phases">Fases</A>
                    </li>
                    <li>
                        <A href="/profile">Perfil</A>
                    </li>
                </ul>
            </nav> */}
            <div class="table-container">
                <table id="customers">
                    <thead>
                        <tr>
                            <th></th>
                            <th id="username">Username</th>
                            <th id="name">Nome</th>
                            <th id="phone">Telefone</th>
                            <th id="brands"></th>
                        </tr>
                    </thead>
                    <tbody id="customer-content">
                    </tbody>
                </table>
                <div class="create-element"><a href={`/pages/admin/createCustomer`}>Criar cliente</a></div>
            </div>
        </>
    )
}

export default Customers