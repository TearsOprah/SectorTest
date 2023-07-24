import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Table from '../Table/Table';
import './App.css'

const App = () => {
  return (
    <div className="app">
      <h1>SPA with MobX</h1>
      <Routes>
        <Route path="/" element={<Table />} />
      </Routes>
    </div>
  );
};

export default App;
