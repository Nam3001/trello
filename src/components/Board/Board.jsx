import classNames from 'classnames/bind'
import { nanoid } from 'nanoid'
import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { ToastContainer } from 'react-toastify'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { applyDrag } from '@/utils'
import 'react-toastify/dist/ReactToastify.css'
import AddNewItem from '../AddNewItem/AddNewItem'
import Column from '../Column/Column'
import styles from './Board.module.scss'

import PropTypes from 'prop-types'

Board.propTypes = {
    boardData: PropTypes.string.isRequired,
    setBoardData: PropTypes.func.isRequired,
}

// bind classnames
let cx = classNames.bind(styles)

function Board({ boardData, setBoardData }) {
    const [columnList, setColumnList] = useState([])

    const [isAddingColumn, setIsAddingColumn] = useState(false)
    // this is name of new column when adding new column
    const [newColumnName, setNewColumnName] = useState('')

    const addColumnRef = useRef(null)

    useEffect(() => {
        setColumnList(boardData.columns.columnList)
    }, [])

    useEffect(() => {
        setColumnList(boardData.columns.columnList)
    }, [boardData])

    const onColumnDrop = (dropResult) => {
        const newColumns = applyDrag([...columnList], dropResult)
        const newBoard = { ...boardData }
        newBoard.columns.columnList = newColumns
        setBoardData(newBoard)
    }

    const addColumnEvent = {
        onClose() {
            setIsAddingColumn(false)
            setNewColumnName('')
        },
        onInput(e) {
            setNewColumnName(e.target.value)
        },
        onAddItem() {
            if (newColumnName === '') return

            const newColumn = {
                columnId: `column-${nanoid()}`,
                columnName: newColumnName,
                cardList: [],
            }
            const newBoard = { ...boardData }
            newBoard.columns?.columnList.push(newColumn)

            setBoardData(newBoard)
            setNewColumnName('')
        },
    }

    useEffect(() => {
        if (isAddingColumn) {
            addColumnRef.current.scrollIntoView()
            addColumnRef.current.focus()
        }
    }, [boardData])

    return (
        <div className={styles.boardWrapper}>
            <div className={cx('board')}>
                <div style={{ height: '100%' }}>
                    <Container
                        orientation="horizontal"
                        dragHandleSelector=".column-drag-handle"
                        dragClass={cx('column-ghost')}
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: cx('column-drop-preview'),
                        }}
                        getChildPayload={(index) => {
                            return boardData.columns.columnList[index]
                        }}
                        onDrop={onColumnDrop}
                    >
                        {columnList.map((column) => (
                            <Draggable key={column.columnId}>
                                <Column
                                    className={styles.columnWrapper}
                                    column={column}
                                />
                            </Draggable>
                        ))}
                    </Container>
                </div>
                <div className={styles.columnWrapper}>
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
                                        className={classNames(styles.icon)}
                                        icon={faPlus}
                                    />
                                </span>
                                Thêm danh sách khác
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

Board.propTypes = {
    boardData: PropTypes.object.isRequired,
    setBoardData: PropTypes.func.isRequired,
}

export default React.memo(Board)
