import { useNavigate } from "@solidjs/router"
import { createSignal } from "solid-js"

const CreateCustomer = () => {
    const [confirmPassword, setConfirmPassword] = createSignal('')
    const [email, setEmail] = createSignal('')
    const [lastName, setLastName] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    const [name, setName] = createSignal('')
    const navigate = useNavigate()
    const [password, setPassword] = createSignal('')
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

            let user = {
                email: email(),
                password: password(),
                email_confirm: true,
                last_name: lastName(),
                name: name(),
                phone: phone(),
                username: username()
            };

            // email: email(),
            // password: password(),
            // email_confirm: true,
            // last_name: lastName(),
            // name: name(),
            // phone: phone(),
            // username: username()

            let response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            });

            let result = await response.json();
            console.log(result.message);

            //navigate("/pages/admin/customers", { replace: true })
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