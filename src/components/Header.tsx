import { Component, createEffect, createMemo, createSignal, onMount } from 'solid-js'
import { supabase } from '../supabaseClient'
import { A, useLocation } from '@solidjs/router'
import noimage from '../assets/user.png'

const Header: Component = () => {
    const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null)
    const [isAdminUser, setIsAdminUser] = createSignal(false)
    const [userId, setUserId] = createSignal("")

    function toggleMenu() {
        const menuMobile = document.getElementById("menu-mobile") as HTMLElement
        if (menuMobile?.className === 'menu-mobile-active') {
            menuMobile.className = 'menu-mobile'
        } else {
            menuMobile.className = 'menu-mobile-active'
        }
    }

    async function isHomePage() {
        const location = useLocation()
        const pathname = createMemo(() => location.pathname);
        const $aside = document.getElementById('sidebar') as HTMLElement
        if (pathname() === '/') {
            $aside.style.display = "none"
        }
        else {
            $aside.style.display = "flex"
        }
    }

    createEffect(() => {
        isAdmin()
        isHomePage()
    })

    async function getAvatarURL(id: string) {
        let { data, error } = await supabase
            .from('profiles')
            .select(`avatar_url`)
            .eq('id', id)

        if (error)
            throw error;

        return data
    }

    async function isAdmin() {
        const { data: { user } } = await supabase.auth.getUser()

        if (user != null) {
            setUserId(user.id)
        }

        const avatarUrl = await getAvatarURL(userId())
        setAvatarUrl(avatarUrl[0].avatar_url)
        setUserImage()

        if (user?.app_metadata.claims_admin == true) {
            setIsAdminUser(true)
        } else {
            setIsAdminUser(false)
        }
    }

    async function setUserImage() {
        const { data } = await supabase.storage.from('avatars').getPublicUrl(avatarUrl())
        const $imgElement = document.getElementById('userLogo') as HTMLImageElement
        if (data.publicUrl.endsWith("null")) {
            $imgElement.src = noimage
        } else {
            $imgElement.src = data.publicUrl
        }
    }

    return (
        <>
            <aside id='sidebar' class='sidebar'>
                <header class='sidebar-header'>
                    <A href={`/profile`}>
                        <img id='userLogo' class='logo-img' src="" alt="Foto do usuário" />
                    </A>
                </header>
                <nav>
                    {isAdminUser() ?
                        <>
                            <button>
                                <span>
                                    <i class="material-symbols-outlined">Person</i>
                                    <span><A href={`/pages/admin/customers`}>Clientes</A></span>
                                </span>
                            </button>
                            <button>
                                <span>
                                    <i class="material-symbols-outlined">autorenew</i>
                                    <span><A href={`/pages/admin/phases`}>Fases</A></span>
                                </span>
                            </button>
                            <button>
                                <span>
                                    <i class="material-symbols-outlined">view_cozy</i>
                                    <span><A href={`/pages/admin/classes`}>Classes</A></span>
                                </span>
                            </button>
                        </> :
                        <>
                            <button>
                                <span>
                                    <i class="material-symbols-outlined">copyright</i>
                                    <span><A href={`/pages/brands`}>Suas marcas</A></span>
                                </span>
                            </button>
                        </>
                    }
                </nav>
            </aside>

            {/* Menu mobile */}
            <button class='button-mobile' onclick={() => toggleMenu()}>
                <i class="material-symbols-outlined">menu</i>
                <span>Menu</span>
            </button>

            <nav class="menu-mobile" id='menu-mobile'>
                <button class='button-close' onclick={() => toggleMenu()}>
                    <span>
                        <i class="material-symbols-outlined">close</i>
                    </span>
                </button>

                {isAdminUser() ?
                    <>
                        <button>
                            <span>
                                <i class="material-symbols-outlined">Person</i>
                                <span class='mobile-text'>Clientes</span>
                            </span>
                        </button>
                        <button>
                            <span>
                                <i class="material-symbols-outlined">autorenew</i>
                                <span class='mobile-text'>Fases</span>
                            </span>
                        </button>
                        <button>
                            <span>
                                <i class="material-symbols-outlined">view_cozy</i>
                                <span class='mobile-text'>Classes</span>
                            </span>
                        </button>
                    </> :
                    <>
                        <button>
                            <span>
                                <i class="material-symbols-outlined">copyright</i>
                                <span><A href={`/pages/admin/classes`}>Suas marcas</A></span>
                            </span>
                        </button>
                    </>}
            </nav>
        </>
    )
}

export default Header