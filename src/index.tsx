/* @refresh reload */
import { render } from 'solid-js/web';
import Home from './pages/Home';
import { lazy } from 'solid-js';
import { Route, Router, Routes } from '@solidjs/router';

const AdminProcesses = lazy(() => import('./pages/admin/processes'));
const AllBrands = lazy(() => import('./pages/admin/brands'));
const AllClasses = lazy(() => import('./pages/admin/classes'));
const AllCustomers = lazy(() => import('./pages/admin/customers'));
const AllPhases = lazy(() => import('./pages/admin/phases'));
const App = lazy(() => import('./App'));
const Brand = lazy(() => import('./pages/brands/[id]'));
const Brands = lazy(() => import('./pages/brands/index'));
const Class = lazy(() => import('./pages/classes/[id]'));
const Classes = lazy(() => import('./pages/classes/index'));
const Company = lazy(() => import('./pages/companies/[id]'));
const Companies = lazy(() => import('./pages/companies/index'));
const CreateBrand = lazy(() => import('./pages/admin/createBrand'));
const CreateClass = lazy(() => import('./pages/admin/createClass'));
const CreateCustomer = lazy(() => import('./pages/admin/createCustomer'));
const CreatePhase = lazy(() => import('./pages/admin/createPhase'));
const CreateProcess = lazy(() => import('./pages/admin/createProcess'));
const Header = lazy(() => import('./components/Header'));
const Phase = lazy(() => import('./pages/phases/[id]'));
const Phases = lazy(() => import('./pages/phases/index'));
const Process = lazy(() => import('./pages/processes/[id]'));
const Processes = lazy(() => import('./pages/processes/index'));
const SignIn = lazy(() => import('./Auth'));
const SignUp = lazy(() => import('./SignUp'));

const root = document.getElementById('root') as HTMLElement;

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(
  () => (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/profile" component={App} />
          <Route path="/signup" component={SignUp} />
          <Route path="/pages/brands">
            <Route path="/" component={Brands} />
            <Route path="/:id?">
              <Route path="/" component={Brand} />
              <Route path="/processes">
                <Route path="/" component={Processes} />
                <Route path="/:id?" component={Process} />
              </Route>
            </Route>
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
          <Route path="/pages/admin">
            <Route path="/customers">
              <Route path="/" component={AllCustomers} />
              <Route path="/:id">
                <Route path="/brands">
                  <Route path="/" component={AllBrands} />
                  <Route path="/:id?">
                    <Route path="/" component={Brand} />
                    <Route path="/processes">
                      <Route path="/" component={AdminProcesses} />
                      <Route path="/:id?" component={Process} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route path="/phases" component={AllPhases} />
            <Route path="/classes" component={AllClasses} />
            <Route path="/createBrand" component={CreateBrand} />
            <Route path="/createClass" component={CreateClass} />
            <Route path="/createCustomer" component={CreateCustomer} />
            <Route path="/createPhase" component={CreatePhase} />
            <Route path="/createProcess" component={CreateProcess} />
          </Route>
        </Routes>
      </Router>
    </>
  )
  , root);
