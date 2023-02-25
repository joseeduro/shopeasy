import React from 'react';
import "./Home.css";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actualPage } from '../../features/actualPageSlice';
import Product from '../Product/Product';
import { Orbit } from "@uiball/loaders";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const loader = useSelector(state => state.loader.loader);
    useEffect(() => {
        dispatch(actualPage("home"));
    }, [])

    return (
        <section className='home'>
            <div className={`overlay ${loader ? "" : "hidden"}`}>
                <Orbit size={80} speed={1.3} color="#5d81c8" />
            </div>
            <div className='contProd'>
                {products.map(t => <Product key={t.id} {...t} />)}
            </div>
        </section >
    )
}

export default Home;