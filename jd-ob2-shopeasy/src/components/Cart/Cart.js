import React from 'react'
import './Cart.css';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { actualPage } from '../../features/actualPageSlice';

const Cart = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actualPage("cart"));
    }, [])
    return (
        <section className='cart'>
            <p>No products available...</p>
        </section>
    )
}

export default Cart;