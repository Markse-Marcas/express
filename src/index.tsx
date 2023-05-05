/* @refresh reload */
import { render } from 'solid-js/web';
import Home from './pages/Home';
import { lazy } from 'solid-js';
import { Route, Router, Routes } from '@solidjs/router';

const App = lazy(() => import('./App'));
const Brand = lazy(() => import('./pages/brands/[id]'));
const Brands = lazy(() => import('./pages/brands/index'));
const Class = lazy(() => import('./pages/classes/[id]'));
const Classes = lazy(() => import('./pages/classes/index'));
const Company = lazy(() => import('./pages/companies/[id]'));
const Companies = lazy(() => import('./pages/companies/index'));
const Phase = lazy(() => import('./pages/phases/[id]'));
const Phases = lazy(() => import('./pages/phases/index'));
const Process = lazy(() => import('./pages/processes/[id]'));
const Processes = lazy(() => import('./pages/processes/index'));
const SignUp = lazy(() => import('./SignUp'));

const root = document.getElementById('root') as HTMLElement;

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/profile" component={App} />
        <Route path="/signup" component={SignUp} />
        <Route path="/pages/brands">
          <Route path="/" component={Brands} />
          <Route path="/:id?" component={Brand} />
        </Route>
        <Route path="/pages/classes">
          <Route path="/" component={Classes} />
          <Route path="/:id?" component={Class} />
        </Route>
        <Route path="/pages/companies">
          <Route path="/" component={Companies} />
          <Route path="/:id?" component={Company} />
        </Route>
        <Route path="/pages/phases">
          <Route path="/" component={Phases} />
          <Route path="/:id?" component={Phase} />
        </Route>
        <Route path="/pages/processes">
          <Route path="/" component={Processes} />
          <Route path="/:id?" component={Process} />
        </Route>
      </Routes>
    </Router>
  )
  , root);
