import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'

import { getItemsFromIdArr, removeFromCart } from "../../store/cartReducer";
import ItemTile from "../ItemTile";
import Loading from "../Loading";
import { createPaymentIntent } from "../../store/payment";
import { editItemFunc } from "../../store/item";

const Cart = ({isLoaded}) => {
  const [cartLoading, setCartLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const {user} = useSelector(state => state.session);
  const {itemIds} = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteFromCart = (e, item) => {
    dispatch(removeFromCart(item.id))
    editItemFunc(item.id, 'in_cart', false)
  }

  const proceedtoCheckout = (e) => {
    navigate('/checkout');
  }

  useEffect(() => {
    if (isLoaded) {
      if (JSON.stringify(user) === '{}') {
        navigate('/')
      }
      else if (!user.verified) {
        navigate('/verify')
      }
    }
  }, [isLoaded, user, navigate])

  useEffect(() => {
    if (itemIds.length > 0){
      setCartLoading(true);
      setCartItems([]);
      getItemsFromIdArr(itemIds)
        .then(data => setCartItems(data))
        .then(setCartLoading(false))
    }
    else{
      setCartLoading(false);
      setCartItems([])
    }
  }, [itemIds, isLoaded])

  if (cartLoading){
    return <Loading />
  }
  return (
    <div className='flex flex-col text-[black]'>
      <div className='text-[2em] '>Cart</div>
      <div className='flex flex-row'>
      {
        cartItems.length > 0 && cartItems.map((item, idx) => {
          return (
            <div key={idx} className='m-[1em]'>
              <div className='pointer-events-none'>
                <ItemTile item={item}/>
              </div>
              <div className='w-fit bg-brown-brownblack text-[white] px-[1em]
              hover:cursor-pointer'
                onClick={e => handleDeleteFromCart(e, item)}
              >Remove</div>
            </div>
          )
        })
      }
      {
        cartItems.length <= 0 && (
          <div>No items in cart yet!</div>
        )
      }
      </div>
      {
        cartItems.length > 0 && (
          <div onClick={proceedtoCheckout} className='m-[1em] bg-brown-brownblack text-[white] w-fit px-[1em]'>Proceed to checkout</div>
        )
      }
    </div>
  )
};

export default Cart;
