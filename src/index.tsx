/* @refresh reload */
import { render } from 'solid-js/web';

import './styles/index.css';
import Home from './pages/Home';
import { Route, Router, Routes } from '@solidjs/router';
import { lazy } from 'solid-js';
import App from './App';

const Process = lazy(() => import('./pages/process'));
const Brand = lazy(() => import('./pages/brand'));

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
        <Route path="/pages/rocess" component={Process} />
        <Route path="/pages/brand" component={Brand} />
      </Routes>
    </Router>
  )
  , root);
