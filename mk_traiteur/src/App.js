import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main class="py-3 container mx-auto px-4">
        <h1>Bienvenue chez MK</h1>
      </main>
      <Footer />
    </>
  );
};

export default App;
