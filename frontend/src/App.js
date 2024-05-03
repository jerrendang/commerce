import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route} from 'react-router-dom';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { restoreSession } from './store/sessionReducer';
import { resetCart } from './store/cartReducer';
import Landing from './components/Landing';
import Home from './components/Home';
import Nav from './components/Nav';
import Explore from './components/Explore';
import Cart from './components/Cart';
import Profile from './components/Profile';
import VerifyPage from './components/VerifyPage';
import ItemModal from './components/ItemModal';
import Loading from './components/Loading';
import Checkout from './components/Checkout';
import VerifyStripe from './components/VerifyStripe';
import EditItem from './components/EditItem';
import Orders from './components/Orders';
import OrderSuccess from './components/OrderSuccess';

function App() {
  const [isLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(restoreSession()) 
      .then(() => setLoaded(true))
  }, [dispatch])

  useEffect(() => {
    if (isLoaded){
      if (JSON.stringify(user) === "{}") {
        navigate('/')
      }
      else if (!user.verified){
        navigate('/verify')
      }
    }
  }, [isLoaded])

  useEffect(() => {
    if (isLoaded && JSON.stringify(user) !== '{}'){
      if (localStorage.getItem('user_id') && parseInt(localStorage.getItem('user_id')) === user.id) {
        if (localStorage.getItem('cart')){
          dispatch(resetCart(JSON.parse(localStorage.getItem('cart'))))
        }
        else{
          dispatch(resetCart([]))
        }
      }
      else {
        localStorage.setItem('user_id', user.id);
        localStorage.removeItem('cart');
        dispatch(resetCart([]))
      }
    }
  }, [user, isLoaded])

  if (!isLoaded){
    return <Loading />
  }

  return (
    <>
    {
      isLoaded && (
        <div className="App flex flex-row min-w-[1440px]">
          <Nav isLoaded/>
          <Routes>
            <Route exact path='/verify' element={<VerifyPage isLoaded />} />
            <Route exact path='/home' element={user.stripe_verified ? <Home isLoaded />: <VerifyStripe isLoaded/>} />
            <Route exact path='/explore' element={<Explore isLoaded />} />
            <Route exact path='/cart' element={<Cart isLoaded />} />
            <Route exact path='/profile' element={<Profile isLoaded />} />
            <Route exacr path='/checkout' element={<Checkout isLoaded />} />
            <Route exact path='/orders' element={<Orders isLoaded />} />
            <Route exact path='/success' element={<OrderSuccess />} />
            <Route exact path='/' element={<Landing isLoaded />} />
          </Routes>
          <ItemModal isLoaded/>
          <EditItem isLoaded />
      </div>
      )
    }
    </>
  );
}

export default App;
