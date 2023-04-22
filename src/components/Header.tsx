import { Component } from 'solid-js'
import { A } from '@solidjs/router'
import session from '../App'

const Header: Component = () => {
    return (
        <div class='header'>
            <nav>
                <A href='/'>Home</A>
                <A href='/profile'>{!session() ? "Login" : "Account"}</A>
            </nav>
        </div>
    )
}

export default Header