/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import { Container, Draggable } from 'react-smooth-dnd'
import isEmpty from 'lodash.isempty'
import { nanoid } from 'nanoid'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { mapOrder, applyDrag } from '@/utils'
import Column from '../Column/Column'
import style from './Board.module.scss'
import AddNewItem from '../AddNewItem/AddNewItem'

// bind classnames
let cx = classNames.bind(style)

function Board({ boardData }) {
    const [board, setBoard] = useState(boardData)
    const [columnList, setColumnList] = useState([])
    const columnOrder = board.columnOrder

    const [isAddingColumn, setIsAddingColumn] = useState(false)
    // this is name of new column when adding new column
    const [newColumnName, setNewColumnName] = useState('')

    const addColumnRef = useRef(null)

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

    const addColumnEvent = {
        onClose() {
            setIsAddingColumn(false)
        },
        onInput(e) {
            setNewColumnName(e.target.value)
        },
        onAddItem() {
            if (newColumnName === '') return

            const newColumn = {
                columnId: `column-${nanoid()}`,
                columnName: newColumnName,
                cardOrder: [],
                cardList: []
            }
            const newBoard = { ...board }
            newBoard.columns?.columnList.push(newColumn)

            setBoard(newBoard)
            setNewColumnName('')
        }
    }

    useEffect(() => {
        if (isAddingColumn) {
            addColumnRef.current.scrollIntoView()
            addColumnRef.current.focus()
        }
    }, [board])

    return (
        <div className={style.boardWrapper}>
            <div className={cx('board')}>
                <div style={{ height: '100%' }}>
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
                <div className={style.columnWrapper}>
                    <div>
                        {isAddingColumn ? (
                            <AddNewItem
                                type="column"
                                ref={addColumnRef}
                                columnName={newColumnName}
                                event={addColumnEvent}
                                placeholder="Nhập tiêu đề dánh sách..."
                            />
                        ) : (
                            <div
                                onClick={() => setIsAddingColumn(true)}
                                className={cx('add-new-column', 'btn')}
                            >
                                <span style={{ marginRight: '0.6rem' }}>
                                    <FontAwesomeIcon
                                        className={classNames(style.icon)}
                                        icon={faPlus}
                                    />
                                </span>
                                Thêm danh sách khác
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Board)
