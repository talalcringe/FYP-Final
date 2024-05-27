import { lazy, Suspense, useState } from 'react';

import Exporting from './pages/Exporting';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Editor from './pages/Editor';
import SprintHistory from './pages/SprintHistory';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard'>
          <Route index element={<Dashboard />} />
          <Route
            path='create-new-project'
            element={<Exporting page='create' />}
          />
          <Route path='export' element={<Exporting page='export' />} />
          <Route path='editor' element={<Editor />} />
          <Route path='sprint-history' element={<SprintHistory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
