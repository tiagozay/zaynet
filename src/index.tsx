import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './styles/reset.css';
import './styles/style.css';
import CarrosselDeImagens from './components/CarrosselDeImagens';
import CarrosselDeImagensProvider from './contexts/CarrosselDeImagens';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>

    <CarrosselDeImagensProvider>
      <CarrosselDeImagens />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </CarrosselDeImagensProvider>

  </React.StrictMode>
);