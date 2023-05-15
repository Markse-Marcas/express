
import { Component } from 'solid-js'
import { A } from '@solidjs/router'
import { supabase } from '../supabaseClient'

const AdminHeader: Component = () => {
    return (
        <>
            <header>
                <nav>
                    <div class="mobile-menu">
                        <div class="line-1"></div>
                        <div class="line-2"></div>
                        <div class="line-3"></div>
                    </div>
                    <ul class="nav-list">
                        <li><A href='/pages/admin/customers'>Clientes</A></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default AdminHeader