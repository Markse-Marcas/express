import { createSignal } from "solid-js"
import { supabase } from "../../supabaseClient"
import { A } from "@solidjs/router"

const CreateCustomer = () => {
    const [email, setEmail] = createSignal('')
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

            if (password() != confirmPassword()) {
                alert("As senhas não coincidem.");
                return false;
            }

            const { data, error } = await supabase
                .auth
                .signUp({
                    email: email(),
                    password: password(),
                    options: {
                        data: {
                            last_name: lastName(),
                            name: name(),
                            phone: phone(),
                            username: username()
                        }
                    }
                })

            if (error) {
                throw error
            }

            // window.location.href = "/"
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
            <nav>
                <ul class="nav-list">
                    <li>
                        <A href="/profile">Perfil</A>
                    </li>
                </ul>
            </nav>
            <div class="container">
                <div class="form">
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

export default CreateCustomer