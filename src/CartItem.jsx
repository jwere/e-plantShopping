import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity, decrementQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, setAddedToCart}) => {
  const cart = useSelector(state => state.cart.items);
  const productCounter = useSelector(state => state.cart.productCounter);
  const treeCounter = useSelector(state => state.cart.treeCounter);
  const dispatch = useDispatch();
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      let cost = item.cost;
      totalAmount += parseInt(cost.substring(1)) * item.quantity
    });
    return totalAmount;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e); 
  };

  const handleIncrement = (item) => {
    // dispatch(addItem(item));
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    // dispatch(decrementQuantity(item));
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    setAddedToCart((prevState) => ({
      ...prevState,
      [item.name]: false,
    }));
    dispatch(removeItem(item));
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let totalCost = 0;
    cart.forEach((cartItem) =>{
      if (cartItem.name === item.name){
        let cost = cartItem.cost;
        totalCost += parseInt(cost.substring(1)) * cartItem.quantity;
      }
    });
    return totalCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Number of Plant-Types Selected: {treeCounter}</h2>
      <h2 style={{ color: 'black' }}>Total Number of Plants In Cart: {productCounter}</h2>
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

