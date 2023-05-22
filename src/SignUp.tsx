import { createSignal } from "solid-js"
import { supabase } from "./supabaseClient"
import { v4 as uuidv4 } from 'uuid'

const SignUp = () => {
    const [email, setEmail] = createSignal('')
    const [id, setID] = createSignal("")
    const [lastName, setLastName] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    const [name, setName] = createSignal('')
    const [password, setPassword] = createSignal('')
    const [confirmPassword, setConfirmPassword] = createSignal('')
    const [phone, setPhone] = createSignal('')
    const [username, setUserName] = createSignal('')

    const handleSignUp = async (e: Event) => {
        e.preventDefault()

        try {
            setLoading(true)
            setID(uuidv4())

            if (password() != confirmPassword()) {
                alert("As senhas não coincidem.");
                return false;
            }

            const { data, error } = await supabase.auth.signUp({
                email: email(),
                password: password(),
                options: {
                    data: {
                        name: name(),
                        last_name: lastName(),
                        phone: phone(),
                        username: username(),
                        id: id()
                    },
                    emailRedirectTo: 'https://main--markse-express.netlify.app/profile'
                }
            })

            if (error) {
                throw error
            }

            window.location.href = "/profile"
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
            <div class="container">
                <div class="form">
                    <span>Cadastre-se</span>
                    <form onSubmit={handleSignUp}>
                        <div class="input-group">
                            <div class="input-box">
                                <label for="username">Nome de usuário</label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="Somente letras e números"
                                    value={username() || ''}
                                    onChange={(e) => setUserName(e.currentTarget.value)}
                                    required />
                            </div>

                            <div class="input-box">
                                <label for="name">Nome</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={name() || ''}
                                    onChange={(e) => setName(e.currentTarget.value)}
                                    placeholder="Digite seu nome"
                                    required />
                            </div>

                            <div class="input-box">
                                <label for="lastname">Sobrenome</label>
                                <input
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    placeholder="Digite seu sobrenome"
                                    value={lastName() || ''}
                                    onChange={(e) => setLastName(e.currentTarget.value)}
                                    required />
                            </div>

                            <div class="input-box">
                                <label for="phone">Celular</label>
                                <input
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    value={phone() || ''}
                                    onChange={(e) => setPhone(e.currentTarget.value)}
                                    placeholder="(xx) xxxxxxxxx)"
                                    required />
                            </div>

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

                            <div class="input-box">
                                <label for="passwordValidate">Confirmação de senha</label>
                                <input
                                    id="passwordValidate"
                                    type="text"
                                    name="firstname"
                                    placeholder="Digite sua senha novamente"
                                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                                    required
                                />
                            </div>

                        </div>
                        <div class="continue-button">
                            <button type="submit" class="continue-button" disabled={loading()}>
                                {loading() ? 'Criando...' : 'Criar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp