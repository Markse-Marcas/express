import { Component } from 'solid-js'
import { A } from '@solidjs/router'
import { supabase } from '../supabaseClient'

const Header: Component = () => {
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
                        <li><A href='/pages/brands'>Marcas</A></li>
                        <li><a href='#' onclick={() => { supabase.auth.signOut() }}>Sair</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header