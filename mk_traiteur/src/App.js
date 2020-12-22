import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './ui/Home';
import Food from './ui/Food';
import Cart from './ui/Cart';
import Login from './ui/Login';
import Register from './ui/Register';
import Profile from './ui/Profile';
import Shipping from './ui/Shipping';
import Payment from './ui/Payment';
import PlaceOrder from './ui/PlaceOrder';
import Order from './ui/Order';

const App = () => {
  return (
    <Router>
      <div class='antialiased flex flex-col font-hind'>
        <Header />
        <main class='py-3 bg-gray-50'>
          <div class='container mx-auto px-4'>
            <Route path='/order/:_id' component={Order} />
            <Route path='/signin' component={Login} />
            <Route path='/shipping' component={Shipping} />
            <Route path='/payment' component={Payment} />
            <Route path='/placeorder' component={PlaceOrder} />
            <Route path='/register' component={Register} />
            <Route path='/profile' component={Profile} />
            <Route path='/food/:_id' component={Food} />
            <Route path='/cart/:_id?' component={Cart} />
            <Route path='/' component={Home} exact />
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
