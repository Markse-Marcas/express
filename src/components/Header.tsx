import { Component } from 'solid-js'
import { A } from '@solidjs/router'
import session from '../App'

const Header: Component = () => {
    return (
        <div class='header'>
            <nav>
                <A href='/'>Home</A>
                <A href='/pages/brands'>Marcas</A>
                <A href='/pages/classes'>Classes</A>
                <A href='/pages/phases'>Fases</A>
                <A href='/pages/processes'>Processos</A>
                <A href='/login'>{!session() ? "Login" : "Perfil"}</A>
            </nav>
        </div>
    )
}

export default Header