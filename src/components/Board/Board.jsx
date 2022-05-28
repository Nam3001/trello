/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { Container, Draggable } from 'react-smooth-dnd'
import isEmpty from 'lodash.isempty'

import { mapOrder } from '@/utils/mapOrder'
import Column from '../Column/Column'
import style from './Board.module.scss'

// bind classnames
let cx = classNames.bind(style)

function Board({ boardData }) {
    const [columns, setColumns] = useState([])
    const [columnOrder, setColumnOrder] = useState(boardData.columnOrder)

    useEffect(() => {
        const newColumnList = mapOrder(
            boardData.columns.columnList,
            columnOrder,
            'columnId'
        )
        setColumns(newColumnList)
    }, [columnOrder])

    if (isEmpty(boardData)) {
        return <h1>Page not found</h1>
    }

    const items = ['item1', 'item2', 'item3', 'item4']

    return (
        <div className={style.boardWrapper}>
            <div className={cx('board')}>
                <Container
                    orientation="horizontal"
                    dragHandleSelector=".column-drag-handle"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: cx('column-drop-preview')
                    }}
                >
                    {columns.map((column) => (
                        <Draggable
                            className={style.columnWrapper}
                            key={column.columnId}
                        >
                            <Column
                                className={style.columnWrapper}
                                column={column}
                            />
                        </Draggable>
                    ))}
                </Container>
            </div>
        </div>
    )
}

export default React.memo(Board)
