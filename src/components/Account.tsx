import { AuthSession } from '@supabase/supabase-js'
import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from '../supabaseClient'
import Avatar from './Avatar';

interface Props {
    session: AuthSession;
}

const Account: Component<Props> = ({ session }) => {
    const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null)
    const [loading, setLoading] = createSignal(true)
    const [name, setName] = createSignal<string | null>(null)
    const [phone, setPhone] = createSignal<string | null>(null)
    const [username, setUsername] = createSignal<string | null>(null)

    createEffect(() => {
        getProfile()
    })

    const getProfile = async () => {
        try {
            setLoading(true)
            const { user } = session
            console.log(session)

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, name, phone, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setName(data.name)
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
        <div aria-live="polite">
            {/* <Header /> */}
            <form onSubmit={updateProfile} class="">
                <div>Email: {session.user.email}</div>
                <div>
                    <label for="username">Username: </label>
                    <input
                        id="username"
                        type="text"
                        value={username() || ''}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label for="name">Nome: </label>
                    <input
                        id="name"
                        type="text"
                        value={name() || ''}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label for="phone">Telefone celular</label>
                    <input
                        id="phone"
                        type="text"
                        value={phone() || ''}
                        onChange={(e) => setPhone(e.currentTarget.value)}
                    />
                </div>
                <Avatar url={avatarUrl()} size={150} onUpload={(e: Event, url: string) => {
                    setAvatarUrl(url)
                    updateProfile(e)
                }} />
                <div>
                    <button type="submit" class="" disabled={loading()}>
                        {loading() ? 'Salvando...' : 'Atualizar perfil'}
                    </button>
                </div>
                <button type="button" class="" onClick={() => supabase.auth.signOut()}>
                    Sair
                </button>
            </form>
        </div>
    )
}

export default Account