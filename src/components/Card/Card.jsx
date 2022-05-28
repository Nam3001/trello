import React from 'react'
import style from './Card.module.scss'

function Card({ children }) {
    return <div className={style.card}>{children}</div>
}

export default React.memo(Card)
