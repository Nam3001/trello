import React from 'react'
import Column from '../Column/Column'
import style from './Board.module.scss'

function Board() {
    return (
        <div className={style.boardWrapper}>
            <div className={style.board}>
                <Column className={style.columnWrapper} />
                <Column className={style.columnWrapper} />
                <Column className={style.columnWrapper} />
                <Column className={style.columnWrapper} />
                <Column className={style.columnWrapper} />
                <Column className={style.columnWrapper} />
                <Column className={style.columnWrapper} />
            </div>
        </div>
    )
}

export default Board
