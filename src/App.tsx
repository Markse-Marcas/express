import { createEffect, createSignal } from 'solid-js'
import { supabase } from './supabaseClient'
import { AuthSession } from '@supabase/supabase-js'
import Account from './components/Account'
import Auth from './Auth'
import AdminHeader from './components/AdminHeader'
import Header from './components/Header'

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
      {session()?.user.app_metadata.claims_admin == true ? <AdminHeader /> : <Header />}
      <div class="container">
        {!session() ? <Auth /> : <Account session={session()!} />}
        {/* <Routes>
          <Route path={"signin"} component={Auth}></Route>
          <Route path={"profile"} element={<Account session={session()!} />}></Route>
        </Routes> */}
      </div>
    </>
  )
}

export default App