import { createSignal } from 'solid-js'
import { supabase } from './supabaseClient'
import { A } from '@solidjs/router'

export default function Auth() {
    const [email, setEmail] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    const [password, setPassword] = createSignal('')

    const handleLogin = async (e: SubmitEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword(
                {
                    email: email(),
                    password: password()
                }
            )
            if (error) throw error
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div class="form">
                <form onSubmit={handleLogin}>
                    <div class="input-group">
                        <div class="input-box">
                            <div class="input-box">
                                <label for="email">E-mail</label>
                                <input
                                    id="email"
                                    type="text"
                                    name="firstname"
                                    placeholder="Digite seu e-mail"
                                    value={email() || ''}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                    required
                                />
                            </div>

                            <div class="input-box">
                                <label for="password">Senha</label>
                                <input
                                    id="password"
                                    type="text"
                                    name="password"
                                    placeholder="Digite sua senha"
                                    value={password() || ''}
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                    required
                                />
                            </div>
                            <div>
                                <span>Não tem uma conta? <A href="/signup">Crie aqui</A></span>
                            </div>
                        </div>
                    </div>
                    <div class="continue-button">
                        <button type="submit" class="continue-button" disabled={loading()}>
                            {loading() ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}