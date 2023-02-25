import React from 'react'
import "./Favs.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { actualPage } from '../../features/actualPageSlice';
import Product from '../Product/Product';

const Favs = () => {
    const favs = useSelector(state => state.favs.favs);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actualPage("favs"));
    }, [])
    let productOnFavs = true;

    return (
        <section className='favs'>
            <div className='contFavs'>
                {favs.map(t => <Product key={t.id} {...t} data={productOnFavs} />)}
            </div>
        </section >
    )
}

export default Favs;