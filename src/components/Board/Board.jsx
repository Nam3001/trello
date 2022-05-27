/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react'
import Column from '../Column/Column'
import Card from '../Card/Card'
import style from './Board.module.scss'

function Board({ boardData }) {
    const [columns, setColumns] = useState(boardData.columns.columnList)
    const [columnOrder, setColumnOrder] = useState(boardData.columnOrder)

    const mapOrder = useCallback((array, order, key) => {
        if (!Array.isArray(array)) return
        array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
        return array
    }, [])

    useEffect(() => {
        const newColumnList = mapOrder([...columns], columnOrder, 'columnId')
        setColumns(newColumnList)
    }, [columnOrder])

    const handleChangeColumnName = useCallback((value) => {
        setColumns(value)
    }, [])

    console.log('rerender')

    return (
        <div className={style.boardWrapper}>
            <div className={style.board}>
                {columns.map((column) => (
                    <Column
                        key={column.columnId}
                        className={style.columnWrapper}
                        columnName={column.columnName}
                        onChangeColumnName={handleChangeColumnName}
                    >
                        {mapOrder(
                            column.cardList,
                            column.cardOrder,
                            'cardId'
                        ).map((card) => (
                            <Card key={card.cardId}>{card.content}</Card>
                        ))}
                    </Column>
                ))}
            </div>
        </div>
    )
}

export default React.memo(Board)
