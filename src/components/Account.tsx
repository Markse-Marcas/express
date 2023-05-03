import { AuthSession } from '@supabase/supabase-js'
import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from '../supabaseClient'
import Avatar from './Avatar';
import { A } from '@solidjs/router';

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
        <div class="flex flex-col" aria-live="polite">
            <A href="/pages/brands">Suas marcas</A>
            <form onSubmit={updateProfile}>
                <div class="grid grid-cols-1">
                    <div class="avatar">
                        <div class="w-24 rounded">
                            <Avatar url={avatarUrl()} size={220} onUpload={(e: Event, url: string) => {
                                setAvatarUrl(url)
                                updateProfile(e)
                            }} />
                        </div>
                    </div>
                    <div class="form-control">
                        <label class="input-group">
                            <span>E-mail</span>
                            <input
                                type="text"
                                value={session.user.email}
                                class="input input-bordered w-full max-w-xs"
                                disabled
                            />
                        </label>
                    </div>
                    <div class="form-control">
                        <label class="input-group">
                            <span>Username</span>
                            <input
                                type="text"
                                id="username"
                                class="input input-bordered w-full max-w-xs"
                                value={username() || ''}
                                onChange={(e) => setUsername(e.currentTarget.value)}
                            />
                        </label>
                    </div>
                    <div class="form-control">
                        <label class="input-group">
                            <span>Nome</span>
                            <input
                                type="text"
                                id="name"
                                class="input input-bordered w-full max-w-xs"
                                value={name() || ''}
                                onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </label>
                    </div>
                    <div class="form-control">
                        <label class="input-group">
                            <span>Telefone celular</span>
                            <input
                                type="text"
                                id="name"
                                class="input input-bordered w-full max-w-xs"
                                value={phone() || ''}
                                onChange={(e) => setPhone(e.currentTarget.value)}
                            />
                        </label>
                    </div>
                    {/* <Avatar url={avatarUrl()} size={150} onUpload={(e: Event, url: string) => {
                        setAvatarUrl(url)
                        updateProfile(e)
                    }} /> */}
                    <div>
                        <button type="submit" class="btn" disabled={loading()}>
                            {loading() ? 'Salvando...' : 'Atualizar perfil'}
                        </button>
                    </div>
                    <button type="button" class="btn" onClick={() => supabase.auth.signOut()}>
                        Sair
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Account