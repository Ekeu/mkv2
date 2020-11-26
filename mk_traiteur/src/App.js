import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './ui/Home';
import Food from './ui/Food';

const App = () => {
  return (
    <Router>
      <div class='antialiased'>
        <Header />
        <main class='py-3 bg-gray-100'>
          <div class='container mx-auto px-4'>
            <Route path='/' component={Home} exact />
            <Route path='/food/:_id' component={Food} />
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
