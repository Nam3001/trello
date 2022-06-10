import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Card.module.scss'

import { BoardContext } from '@/App'
import DeleteCard from '../DeleteCard/DeleteCard'

Card.propTypes = {
    children: PropTypes.string.isRequired,
    column: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
}

function Card({ children, column, card }) {
    const [isEditing, setIsEditing] = useState(false)
    const { boardData, setBoardData } = useContext(BoardContext)
    const [cardContent, setCardContent] = useState(children)
    let inputRef

    // clone array/object data to update state
    const _column = { ...column }
    const board = { ...boardData }
    const cardList = _column.cardList

    const handleDeleteCard = () => {
        cardList.forEach((cardObj, index) => {
            if (cardObj.cardId === card.cardId) {
                cardList.splice(index, 1)
            }
        })

        board.columns.columnList.forEach((columnObj, index) => {
            if (columnObj.columnId === _column.columnId) {
                board.columns.columnList[index] = _column
            }
        })
        setBoardData(board)
    }

    useEffect(() => {
        if (inputRef !== undefined && isEditing) inputRef.focus()
    }, [inputRef, isEditing])

    useEffect(() => {
        const blurWhenClickOutside = (e) => {
            if (e.target === inputRef) return
            setIsEditing(false)
        }
        if (isEditing) {
            window.addEventListener('click', blurWhenClickOutside)
        }
        return () => window.removeEventListener('click', blurWhenClickOutside)
    }, [inputRef, isEditing])

    const handleUpdateCard = () => {
        cardList.forEach((cardObj, index) => {
            if (cardObj.cardId === card.cardId) {
                cardList[index].content = cardContent
            }
        })

        board.columns.columnList.forEach((columnObj, index) => {
            if (columnObj.columnId === _column.columnId) {
                board.columns.columnList[index] = _column
            }
        })
        setBoardData(board)
    }

    return (
        <div className={styles.card}>
            {isEditing ? (
                <textarea
                    onFocus={(e) => {
                        e.target.style.height = e.target.scrollHeight + 'px'
                        e.target.select()
                    }}
                    onBlur={handleUpdateCard}
                    onChange={(e) => {
                        e.target.style.height = e.target.scrollHeight + 'px'
                        setCardContent(e.target.value)
                    }}
                    ref={(_input) => (inputRef = _input)}
                    value={cardContent}
                />
            ) : (
                <span>{cardContent}</span>
            )}
            <div
                className={classNames(styles.cardUtils, {
                    [styles.hidden]: isEditing,
                })}
            >
                <div
                    onClick={() => {
                        setIsEditing(true)
                    }}
                    className={styles.editCard}
                >
                    <FontAwesomeIcon icon={faPencil} />
                </div>

                <DeleteCard
                    onDeleteCard={handleDeleteCard}
                    className={styles.removeCard}
                />
            </div>
        </div>
    )
}

export default React.memo(Card)
