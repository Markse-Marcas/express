import { createSignal } from 'solid-js'
import { supabase } from './supabaseClient'

export default function Auth() {
    const [loading, setLoading] = createSignal(false)
    const [email, setEmail] = createSignal('')

    const handleLogin = async (e: SubmitEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOtp({ email: email() })
            // const { error } = await supabase.auth.signInWithPassword({ email: email(), password: password() })
            if (error) throw error
            alert('Cheque o teu e-mail para visualizar o link de acesso!')
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        // <div class="">
        //     <div class="" aria-live="polite">
        //         <h1 class="">Markse Express</h1>
        //         <p class="">Faça login pelo link enviado ao e-mail abaixo</p>
        //         <form class="" onSubmit={handleLogin}>
        //             <div>
        //                 <label for="email">Email</label>
        //                 <input
        //                     id="email"
        //                     class=""
        //                     type="email"
        //                     placeholder="Your email"
        //                     value={email()}
        //                     onChange={(e) => setEmail(e.currentTarget.value)}
        //                 />
        //             </div>
        //             <div>
        // <button type="submit" class="" aria-live="polite">
        //     {loading() ? <span>Carregando...</span> : <span>Enviar link</span>}
        // </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div class="hero min-h-screen bg-base-200" aria-live="polite">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold">Entrar</h1>
                    <p class="py-6">Autentique-se para poder ver o(s) statu(s) da(s) tua(s) marca(s)</p>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onsubmit={handleLogin}>
                        <div class="card-body">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">E-mail</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="marca@dominio.com"
                                    class="input input-bordered"
                                    value={email()}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                            </div>
                            <div class="form-control mt-6">
                                <button type="submit" class="btn btn-primary" aria-live="polite">
                                    {loading() ? <span>Carregando...</span> : <span>Enviar link</span>}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}