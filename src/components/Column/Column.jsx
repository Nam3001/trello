import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import { Container, Draggable } from 'react-smooth-dnd'
// font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import style from './Column.module.scss'
import Card from '../Card/Card'
import { mapOrder } from '@/utils/mapOrder'

let cx = classNames.bind(style)

function Column(props) {
    const { className, column } = props
    const textareaRef = useRef()

    const [cards, setCards] = useState([])
    const [cardOrder, setCardOrder] = useState(column.cardOrder)

    useEffect(() => {
        const newCardList = mapOrder(column.cardList, cardOrder, 'cardId')
        setCards(newCardList)
    }, [cardOrder, column.cardList])

    return (
        <div className={className}>
            <div className={style.column}>
                <div
                    className={cx('header', 'column-drag-handle')}
                    onClick={() => {
                        textareaRef.current.disabled = false
                        textareaRef.current.focus()
                    }}
                >
                    <textarea
                        ref={textareaRef}
                        value={column.columnName}
                        onChange={() => {}}
                        disabled
                        onBlur={(e) => (e.target.disabled = true)}
                    />
                </div>
                <div className={cx('body')}>
                    <Container
                        orientation="vertical"
                        groupName="col"
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: cx('card-drop-preview')
                        }}
                    >
                        {cards.map((card) => (
                            <Draggable key={card.cardId}>
                                <Card>{card.content}</Card>
                            </Draggable>
                        ))}
                    </Container>
                </div>
                <div className={cx('footer')}>
                    <div className={cx('footerInner')}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Thêm thẻ</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Column)
