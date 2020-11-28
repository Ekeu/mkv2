import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './ui/Home';
import Food from './ui/Food';
import Cart from './ui/Cart';

const App = () => {
  return (
    <Router>
      <div class='antialiased flex flex-col h-screen'>
        <Header />
        <main class='py-3 bg-gray-50'>
          <div class='container mx-auto px-4'>
            <Route path='/' component={Home} exact />
            <Route path='/food/:_id' component={Food} />
            <Route path='/cart/:_id?' component={Cart} />
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
