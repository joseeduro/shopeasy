import React from 'react'
import './Menu.css';
import Logo from "../Logo/Logo"
import { useEffect, useRef, useState, useId } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { quitProduct } from '../../features/productSlice';
import { selectedProducts } from '../../features/productSlice';
import { selectedFavs, loadFavs } from '../../features/favsSlice';
import { selectedTrash, loadTrash } from '../../features/trashSlice';
import { selectedHistory, loadHistory } from '../../features/historySlice';
import { startLoader } from '../../features/loaderSlice';
import { Link, Outlet } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsBookmarkStar } from "react-icons/bs";
import { WiCloudRefresh } from "react-icons/wi"

const Menu = () => {
    const favs = useSelector(state => state.favs.favs);
    const trash = useSelector(state => state.trash.trash);
    const history = useSelector(state => state.history.history);
    const page = useSelector(state => state.page.page);
    const [classPageFavs, setClassPageFavs] = useState();
    const [classPageNoti, setClassPageNoti] = useState();
    const [classPageCart, setClassPageCart] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [cont, setCont] = useState(1);
    const dispatch = useDispatch();
    dispatch(startLoader(isLoading));

    useEffect(() => {
        let favsStorage = localStorage.getItem("favs");
        if (favsStorage === null) {
            localStorage.setItem("favs", JSON.stringify([]));
        } else {
            let storageFavs = JSON.parse(favsStorage);
            if (storageFavs.length !== 0) {
                dispatch(loadFavs(storageFavs));
            }
        }

        let trashStorage = localStorage.getItem("trash");
        if (trashStorage === null) {
            localStorage.setItem("trash", JSON.stringify([]));
        } else {
            let storageTrash = JSON.parse(trashStorage);
            if (typeof storageTrash.length !== 0) {
                dispatch(loadTrash(storageTrash));
            }
        }

        let historyStorage = localStorage.getItem("history");
        if (historyStorage === null) {
            localStorage.setItem("history", JSON.stringify([]));
        } else {
            let storageHistory = JSON.parse(historyStorage);
            if (typeof storageHistory.length !== 0) {
                dispatch(loadHistory(storageHistory));
            }
        }
    }, []);

    useEffect(() => {
        if (favs.length !== 0) {
            localStorage.setItem("favs", JSON.stringify(favs));
        }
    }, [favs]);

    useEffect(() => {
        if (trash.length !== 0) {
            localStorage.setItem("trash", JSON.stringify(trash));
        }
    }, [trash]);

    useEffect(() => {
        if (history.length !== 0) {
            localStorage.setItem("history", JSON.stringify(history));
        }
    }, [history]);

    const eraseLocalStorage = () => {
        localStorage.clear();
    }

    const apiURL = "https://api.mercadolibre.com";
    const SITE_ID = 'MLU';
    const search = useRef(null);

    const loadProducts = (prods) => {
        if (trash.length === 0 & favs.length === 0) {
            dispatch(selectedProducts(prods));
            setIsLoading(false);
        } else {
            dispatch(selectedProducts(prods));
            if (trash.length !== 0) {
                trash.forEach(e => {
                    let trashRepeat = prods.find(met => met.id === e.id);
                    if (typeof trashRepeat !== 'undefined') {
                        dispatch(quitProduct(trashRepeat));
                    }
                });
            }
            if (favs.length !== 0) {
                favs.forEach(e => {
                    let favsRepeat = prods.find(met => met.id === e.id);
                    if (typeof favsRepeat !== 'undefined') {
                        dispatch(quitProduct(favsRepeat));
                    }
                });
            }
            setIsLoading(false);
        }
    }

    const submitSearch = (offset, arr) => {
        let searchInput = search.current.value;
        fetch(`${apiURL}/sites/${SITE_ID}/search?q=${searchInput}&offset=${offset}`)
            .then(r => r.json())
            .then(setIsLoading(true))
            .then(res => {
                let total = res.paging.total;
                if (total >= 1000) {
                    total = 999;
                }
                let actual = res.paging.limit + res.paging.offset;
                let arrActual = [...arr, ...res.results];
                if (actual < total) {
                    submitSearch(actual, arrActual);
                } else {
                    loadProducts(arrActual);
                    let id = "h" + ":" + (cont);
                    setCont(cont + 1)
                    let time = Date.now();
                    let today = new Date(time);
                    let actualDate = today.toDateString();
                    let newHistory = {
                        num: cont,
                        id: id,
                        input: searchInput,
                        date: actualDate
                    }
                    dispatch(selectedHistory(newHistory));
                }
            });
    }

    const handleKeyUp = (e) => {
        if (search.current.value !== "") {
            if (e.key === "Enter") submitSearch(0, []);
        }
    };

    useEffect(() => {
        if (page === "favs") {
            setClassPageFavs("favsActive");
            setClassPageNoti("");
            setClassPageCart("");
        }
        if (page === "notifications") {
            setClassPageNoti("notiActive");
            setClassPageFavs("");
            setClassPageCart("");
        }
        if (page === "cart") {
            setClassPageCart("cartActive");
            setClassPageFavs("");
            setClassPageNoti("");
        }
        if (page === "home") {
            setClassPageCart("");
            setClassPageFavs("");
            setClassPageNoti("");
        }
    }, [page])

    return (
        <>
            <div className='header'>
                <div className='headerCont'>
                    <div className='navigation1'>
                        <Link to="/home"><Logo /></Link>
                        <div className='inputTxt'>
                            <input type="text" onKeyUp={handleKeyUp} id="search" ref={search} placeholder='Buscar casas, apartamentos y más...'></input>
                            <WiCloudRefresh className='refresh' onClick={eraseLocalStorage} />
                        </div>
                        <h3 className='ofertas'>OFERTAS LIMITADAS</h3>
                    </div>
                    <div className='navigation2'>
                        <Link to="/favs"><div className={`iconCont ${classPageFavs}`}><BsBookmarkStar className='icon icon1' /></div></Link>
                        <Link to="/notifications"><div className={`iconCont ${classPageNoti}`}><IoMdNotificationsOutline className='icon icon2' /></div></Link>
                        <Link to="/cart"><div className={`iconCont ${classPageCart}`}><AiOutlineShoppingCart className='icon icon3' /></div></Link>
                    </div>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Menu;