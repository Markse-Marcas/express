import { Component } from 'solid-js'
import { A } from '@solidjs/router'
import { supabase } from '../supabaseClient'

const Header: Component = () => {
    return (
        <ul class="menu menu-horizontal bg-base-100 rounded-box ">
            <li><A href='/pages/brands'>Marcas</A></li>
            <button type="button" class="" onClick={() => supabase.auth.signOut()}>
                Sair
            </button>
        </ul>
    )
}

export default Header