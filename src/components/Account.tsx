import { AuthSession } from '@supabase/supabase-js'
import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from '../supabaseClient'
import Avatar from './Avatar'
import { useNavigate } from '@solidjs/router';

interface Props {
    session: AuthSession;
}

const Account: Component<Props> = ({ session }) => {
    const navigate = useNavigate()
    const [avatarUrl, setAvatarUrl] = createSignal<string | null>("")
    const [loading, setLoading] = createSignal(true)
    const [lastname, setLastName] = createSignal<string | null>(null)
    const [name, setName] = createSignal<string | null>(null)
    const [phone, setPhone] = createSignal<string | null>(null)
    const [username, setUsername] = createSignal<string | null>(null)

    createEffect(() => {
        getProfile()
    })

    async function signOut() {
        supabase.auth.signOut()
        navigate("/", { replace: true })
    }

    const getProfile = async () => {
        try {
            setLoading(true)
            const { user } = session

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, name, last_name, phone, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setName(data.name)
                setLastName(data.last_name)
                setPhone(data.phone)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (e: Event) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { user } = session

            const updates = {
                id: user.id,
                username: username(),
                name: name(),
                phone: phone(),
                avatar_url: avatarUrl(),
                updated_at: new Date().toISOString(),
            }

            let { error } = await supabase
                .from('profiles')
                .upsert(updates)

            if (error) {
                throw error
            }
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
            <div class="form" aria-live="polite">
                <form onSubmit={updateProfile}>
                    <Avatar url={avatarUrl()} size={180} onUpload={(e: Event, url: string) => {
                        setAvatarUrl(url)
                        updateProfile(e)
                    }} />
                    <div class="input-group">
                        <div class="input-box">
                            <label for="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Digite seu nome de usuário no sistema"
                                value={username() || ''}
                                onChange={(e) => setUsername(e.currentTarget.value)}
                                required
                            />
                        </div>

                        <div class="input-box">
                            <label for="firstname">Nome</label>
                            <input
                                id="firstname"
                                type="text"
                                name="firstname"
                                placeholder="Digite seu nome"
                                value={name() || ''}
                                onChange={(e) => setName(e.currentTarget.value)}
                                required
                            />
                        </div>

                        <div class="input-box">
                            <label for="lastname">Sobrenome</label>
                            <input
                                id="lastname"
                                type="text"
                                name="lastname"
                                placeholder="Digite seu sobrenome"
                                value={lastname() || ''}
                                onChange={(e) => setLastName(e.currentTarget.value)}
                                required
                            />
                        </div>

                        <div class="input-box">
                            <label for="number">Celular</label>
                            <input
                                id="number"
                                type="tel"
                                name="number"
                                placeholder="(xx) xxxx-xxxx"
                                value={phone() || ''}
                                onChange={(e) => setPhone(e.currentTarget.value)}
                                required
                            />
                        </div>
                    </div>

                    <div class="continue-button">
                        <button type="submit" class="continue-button" disabled={loading()}>
                            {loading() ? 'Salvando...' : 'Atualizar perfil'}
                        </button>
                    </div>
                </form>
                <div class="continue-button">
                    <button class="continue-button" onclick={() => { signOut() }}>
                        Sair
                    </button>
                </div>
            </div>
        </>
    )
}

export default Account