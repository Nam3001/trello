import React, { useContext, useState, useEffect } from 'react'
import styles from './Card.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

import DeleteCard from '../DeleteCard/DeleteCard'
import { BoardContext } from '@/App'

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
                <input
                    onBlur={handleUpdateCard}
                    onChange={(e) => setCardContent(e.target.value)}
                    ref={(_input) => (inputRef = _input)}
                    value={cardContent}
                />
            ) : (
                <span>{cardContent}</span>
            )}
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
    )
}

export default React.memo(Card)
