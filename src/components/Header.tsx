import { Component } from 'solid-js'
import { A } from '@solidjs/router'
import session from '../App'

const Header: Component = () => {
    return (
        <ul class="menu menu-horizontal bg-base-100 rounded-box ">
            <li><A href='/pages/brands'>Marcas</A></li>
        </ul>
    )
}

export default Header