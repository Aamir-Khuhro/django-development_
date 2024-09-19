import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Use Routes instead of Switch
import Test from './Test'; // Import the Test component
import ContactManager from './ContactManager'; // This is your main app component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/contact-manager" element={<ContactManager />} />
    </Routes>
  );
};

export default App;
