import React from 'react'
import "./HistoryCard.css";

const HistoryCard = ({ num, input, date, id }) => {
    return (
        <div id={id} className='contHistoryCard'>
            <p className='historyCardElem1'>{num}</p>
            <p>{input}</p>
            <p className='historyCardElem2'>{date}</p>
        </div>
    )
}

export default HistoryCard;