import { Component } from 'solid-js';

const Footer: Component = () => {
    return (
        <footer class='footer'>
            {`${new Date().getFullYear()}`}
        </footer>
    )
}

export default Footer;