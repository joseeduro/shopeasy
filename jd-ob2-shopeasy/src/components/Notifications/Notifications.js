import React from 'react'
import "./Notifications.css";
import { useSelector } from 'react-redux';
import HistoryCard from '../HistoryCard/HistoryCard';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { actualPage } from '../../features/actualPageSlice';

const Notifications = () => {
    const history = useSelector(state => state.history.history);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actualPage("notifications"));
    }, [])
    return (
        <section className='notifications'>
            <div className='contNotifications'>
                {history.map(t => <HistoryCard key={t.id} {...t} />)}
            </div>
        </section>
    )
}

export default Notifications;