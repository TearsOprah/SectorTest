import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Table from '../Table/Table';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/page/:page" element={<Table />} />
        <Route path="*" element={<Navigate to="/page/1" />} />
      </Routes>
    </div>
  );
};

export default App;
