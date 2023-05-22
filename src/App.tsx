import { createEffect, createSignal } from 'solid-js'
import { supabase } from './supabaseClient'
import { AuthSession } from '@supabase/supabase-js'
import Account from './components/Account'
import Auth from './Auth'
import { useNavigate } from '@solidjs/router'

const App = () => {
  const navigate = useNavigate()
  const [session, setSession] = createSignal<AuthSession | null>(null)

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
      <div class="container">
        {!session() ? <Auth /> : <Account session={session()!} />}
      </div>
      {/* <div class="container">
        <Account session={session()!} />
      </div> */}
    </>
  )
}

export default App