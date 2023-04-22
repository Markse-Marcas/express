import { createEffect, createSignal } from 'solid-js'
import { supabase } from './supabaseClient'
import { AuthSession } from '@supabase/supabase-js'
import { A } from '@solidjs/router'
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
    <>
      <A href='/'>Home</A>
      <div class="container" style={{ padding: '50px 0 100px 0' }}>
        {!session() ? <Auth /> : <Account session={session()!} />}
      </div>
    </>
  )
}

export default App