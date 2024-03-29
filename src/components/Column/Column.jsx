import classNames from 'classnames/bind'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
// font
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// component
import { BoardContext } from '@/App'
import AddNewItem from '../AddNewItem/AddNewItem'
import Card from '../Card/Card'
import DeleteColumn from '../DeleteColumn/DeleteColumn'
import style from './Column.module.scss'

// utilities
import { applyDrag, createCardData } from '@/utils'

let cx = classNames.bind(style)

function Column(props) {
    const { boardData, setBoardData } = useContext(BoardContext)
    const { className } = props

    // state
    const [isAddingCard, setIsAddingCard] = useState(false)
    const [column, setColumn] = useState(props.column)
    const [cards, setCards] = useState(column.cardList)
    const [newCard, setNewCard] = useState('')
    const [isChangeColumnName, setIsChangeColumnName] = useState(false)

    // ref
    const textareaRef = useRef(null)
    const addCardRef = useRef(null)

    useEffect(() => {
        setCards(column.cardList)
    }, [])

    const onCardDrop = (dropResult, columnId) => {
        const { removedIndex, addedIndex } = dropResult
        if (removedIndex === null && addedIndex === null) return

        const newBoard = { ...boardData }
        const columnIndex = boardData.columns.columnList.findIndex(
            (x) => x.columnId === columnId
        )

        const newColumn = { ...column }
        newColumn.cardList = applyDrag(newColumn.cardList, dropResult)
        setCards(newColumn.cardList)
        setColumn(newColumn)

        newBoard.columns.columnList[columnIndex] = newColumn
        setBoardData(newBoard)
    }

    const onChangeColumnName = (e) => {
        const newColumn = { ...column }
        newColumn.columnName = e.target.value
        setColumn(newColumn)
    }

    const addCardEvent = {
        onClose() {
            setIsAddingCard(false)
            setNewCard('')
        },
        onInput(e) {
            e.target.style.height = e.target.scrollHeight + 'px'
            const cardContent = e.target.value
            setNewCard(cardContent)
        },
        onAddItem(columnId) {
            if (newCard === '') return

            const cardList = createCardData(cards, newCard)
            const newColumn = Object.assign({}, column)
            newColumn.cardList = cardList
            setCards(cardList)
            setColumn(newColumn)
            setNewCard('')
            addCardRef.current.focus()

            const newBoard = { ...boardData }
            const columnIndex = boardData.columns.columnList.findIndex(
                (x) => x.columnId === columnId
            )

            newBoard.columns.columnList[columnIndex] = newColumn
            setBoardData(newBoard)
        },
    }

    useEffect(() => {
        if (!isChangeColumnName) return
        textareaRef.current.focus()
        textareaRef.current.select()
    }, [isChangeColumnName])

    return (
        <div className={className}>
            <div className={style.column}>
                <div className={cx('header', 'column-drag-handle')}>
                    <div
                        style={{ flex: 1 }}
                        onClick={() => setIsChangeColumnName(true)}
                    >
                        {isChangeColumnName ? (
                            <textarea
                                ref={textareaRef}
                                value={column.columnName}
                                onChange={onChangeColumnName}
                                onBlur={() => setIsChangeColumnName(false)}
                            />
                        ) : (
                            <div className={cx(style.columnName)}>
                                {column.columnName}
                            </div>
                        )}
                    </div>
                    <DeleteColumn
                        column={column}
                        className={cx('delete-column')}
                    />
                </div>
                <div className={cx('body')}>
                    <Container
                        orientation="vertical"
                        groupName="col"
                        dragClass={cx('card-ghost')}
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: cx('card-drop-preview'),
                        }}
                        getChildPayload={(index) => column.cardList[index]}
                        onDrop={(payload) =>
                            onCardDrop(payload, column.columnId)
                        }
                    >
                        {cards.map((card) => (
                            <Draggable key={card.cardId}>
                                <Card column={column} card={card}>
                                    {card.content}
                                </Card>
                            </Draggable>
                        ))}
                    </Container>
                    {isAddingCard && (
                        <div>
                            <AddNewItem
                                type="card"
                                ref={addCardRef}
                                cardContent={newCard}
                                event={addCardEvent}
                                columnId={column.columnId}
                                placeholder="Nhập tiêu đề cho thẻ này..."
                            />
                        </div>
                    )}
                </div>
                {isAddingCard || (
                    <div
                        onClick={() => setIsAddingCard(true)}
                        className={cx('footer')}
                    >
                        <div className={cx('footerInner')}>
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Thêm thẻ</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default React.memo(Column)
