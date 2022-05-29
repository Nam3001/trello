/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { Container, Draggable } from 'react-smooth-dnd'
import isEmpty from 'lodash.isempty'

import { mapOrder } from '@/utils/mapOrder'
import { applyDrag } from '@/utils/applyDrag'
import Column from '../Column/Column'
import style from './Board.module.scss'

// bind classnames
let cx = classNames.bind(style)

function Board({ boardData }) {
    const [board, setBoard] = useState(boardData)
    const [columnList, setColumnList] = useState([])
    const columnOrder = board.columnOrder

    useEffect(() => {
        const newColumnList = mapOrder(
            board.columns.columnList,
            columnOrder,
            'columnId'
        )
        setColumnList(newColumnList)
    }, [])

    if (isEmpty(board)) {
        return <h1>Page not found</h1>
    }

    const onColumnDrop = (dropResult) => {
        const newColumns = applyDrag([...columnList], dropResult)
        const newBoard = { ...board }
        newBoard.columns.columnList = newColumns
        setColumnList(newColumns)
        setBoard(newBoard)
    }

    return (
        <div className={style.boardWrapper}>
            <div className={cx('board')}>
                <Container
                    orientation="horizontal"
                    dragHandleSelector=".column-drag-handle"
                    dragClass={cx('column-ghost')}
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: cx('column-drop-preview')
                    }}
                    getChildPayload={(index) => {
                        return board.columns.columnList[index]
                    }}
                    onDrop={onColumnDrop}
                >
                    {columnList.map((column) => (
                        <Draggable key={column.columnId}>
                            <Column
                                className={style.columnWrapper}
                                column={column}
                                board={board}
                                setBoard={setBoard}
                            />
                        </Draggable>
                    ))}
                </Container>
            </div>
        </div>
    )
}

export default React.memo(Board)
