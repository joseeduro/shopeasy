import React from 'react';
import "./Product.css";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { quitProduct, addProduct } from '../../features/productSlice';
import { selectedFavs } from '../../features/favsSlice';
import { quitFav } from '../../features/favsSlice';
import { selectedTrash } from '../../features/trashSlice';
import { AiFillStar } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const Product = ({ id, thumbnail, price, currency_id, attributes, title, data }) => {
    const products = useSelector(state => state.products.products);
    const favs = useSelector(state => state.favs.favs);
    const dispatch = useDispatch();
    const [areaResults, setAreaResults] = useState([]);
    const [bedroomResults, setBedroomResults] = useState([]);
    const [operationResults, setOperationResults] = useState([]);
    const [propertyTypeResults, setPropertyTypeResults] = useState([]);
    let classProdFav;

    useEffect(() => {
        const areaResult = attributes.find(met => met.id === "TOTAL_AREA");
        setAreaResults(areaResult);

        const bedroomResult = attributes.find(met => met.id === "BEDROOMS");
        setBedroomResults(bedroomResult);

        const operationResult = attributes.find(met => met.id === "OPERATION");
        setOperationResults(operationResult);

        const propertyTypeResult = attributes.find(met => met.id === "PROPERTY_TYPE");
        setPropertyTypeResults(propertyTypeResult);
    }, []);

    if (data) {
        classProdFav = "classProdFav"
    }

    const productToFav = () => {
        if (data) {
            let favResult = favs.find(met => met.id === id);
            dispatch(addProduct(favResult));
            dispatch(quitFav(favResult));
        } else {
            let favResult = products.find(met => met.id === id);
            dispatch(selectedFavs(favResult));
            dispatch(quitProduct(favResult));
        }
    }

    const productToTrash = () => {
        if (data) {
            let trashResult = favs.find(met => met.id === id);
            dispatch(selectedTrash(trashResult));
            dispatch(quitFav(trashResult));
        } else {
            let trashResult = products.find(met => met.id === id);
            dispatch(selectedTrash(trashResult));
            dispatch(quitProduct(trashResult));
        }
    }

    const transformImageUrl = (url) => {
        const hyphenIndex = url.lastIndexOf("-");
        const dotIndex = url.lastIndexOf(".");

        return url.substring(0, hyphenIndex + 1) + "O" + url.substring(dotIndex, url.length);
    };

    return (
        <div id={id} className='prod'>
            <div onClick={productToFav} className={`iconContainer star ${classProdFav}`}>
                <AiFillStar className='fillStar' />
            </div>
            <div onClick={productToTrash} className='iconContainer trash'>
                <FaTrash className='faTrash' />
            </div>
            <div className='prodContainer'>
                <div className='imgContainer'>
                    <img className='imgProd' src={transformImageUrl(thumbnail)} alt="img product" />
                </div>
                <div className='infoProdContainer'>
                    <h3>{currency_id} {price}</h3>
                    <small>{areaResults.value_name} | {bedroomResults.value_name} Dorms</small>
                    <p>{propertyTypeResults.value_name} en {operationResults.value_name}</p>
                    <h5>{title.substr(0, 50)} ...</h5>
                </div>
            </div>
        </div>
    )
}

export default Product;