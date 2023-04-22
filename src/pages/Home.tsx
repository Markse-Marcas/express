import { Component } from 'solid-js'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home: Component = () => {
    return (
        <div>
            <Header />
            <div>
                Seja bem-vinda(o) à Mark-Se Express
            </div>
            <Footer />
        </div>
    )
}

export default Home