import { createEffect, createSignal } from 'solid-js'
import { supabase } from './supabaseClient'
import { AuthSession } from '@supabase/supabase-js'
import Account from './components/Account'
import Auth from './Auth'

export const [session, setSession] = createSignal<AuthSession | null>(null)

const App = () => {

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })

  return (
    <div class="md:container md:mx-auto">
      {!session() ? <Auth /> : <Account session={session()!} />}
    </div>
  )
}

export default App