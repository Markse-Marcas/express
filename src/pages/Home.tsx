import { A } from '@solidjs/router'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <Header />
            <div class="hero min-h-screen">
                <div class="hero-overlay bg-opacity-60"></div>
                <div class="hero-content text-center text-neutral-content">
                    <div class="max-w-md">
                        <h1 class="mb-5 text-5xl font-bold">Express</h1>
                        <p class="mb-5">Aqui você irá gerenciar suas marcas e processos.</p>
                        <div class="" style={{ padding: '50px 0 100px 0' }}>
                            <button class="btn btn-primary"><A href='/profile'>Perfil</A></button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home