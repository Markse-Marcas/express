import { createSignal } from 'solid-js'
import { supabase } from './supabaseClient'

export default function Auth() {
    const [loading, setLoading] = createSignal(false)
    const [email, setEmail] = createSignal('')
    const [password, setPassword] = createSignal('')

    const handleLogin = async (e: SubmitEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOtp({ email: email() })
            //const { error } = await supabase.auth.signInWithPassword({ email: email(), password: password() })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div class="row flex-center flex">
            <div class="col-6 form-widget" aria-live="polite">
                <h1 class="header">Markse Express</h1>
                <p class="description">Faça login pelo link enviado ao e-mail abaixo</p>
                <form class="form-widget" onSubmit={handleLogin}>
                    <div>
                        <label for="email">Email</label>
                        <input
                            id="email"
                            class="inputField"
                            type="email"
                            placeholder="Your email"
                            value={email()}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" class="button block" aria-live="polite">
                            {loading() ? <span>Carregando...</span> : <span>Enviar link</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}