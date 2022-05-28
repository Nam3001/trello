import React, { useState, useEffect, useRef, useContext } from 'react'
import style from './BoardName.module.scss'
import classNames from 'classnames'

import { BoardContext } from '@/App'

function BoardName() {
    const [isActiveBoardName, setActiveBoardName] = useState(false)
    const { boardName, handleChangeBoardName } = useContext(BoardContext)
    const inputRef = useRef()

    useEffect(() => {
        inputRef?.current?.focus()
        inputRef?.current?.select()
    }, [isActiveBoardName])

    useEffect(() => {
        const textWidth = getTextWidth(inputRef.current.value)
        inputRef.current.style.width = textWidth
    }, [isActiveBoardName])

    function getTextWidth(textInput) {
        const text = document.createElement('span')
        document.body.appendChild(text)

        Object.assign(text.style, {
            fontFamily: 'roboto, sans-serif',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            position: 'absolute',
            padding: '0 1rem',
            whiteSpace: 'nowrap'
        })
        text.textContent = textInput

        const width = Math.ceil(text.clientWidth)
        const formattedWidth = width + 'px'
        document.body.removeChild(text)

        return formattedWidth
    }

    return (
        <div
            className={classNames(style.boardName)}
            onClick={() => setActiveBoardName(true)}
        >
            <div
                className={classNames({
                    [style.active]: !isActiveBoardName
                })}
            >
                {boardName}
            </div>
            <input
                ref={inputRef}
                onBlur={() => setActiveBoardName(false)}
                className={classNames({
                    [style.active]: isActiveBoardName
                })}
                type="text"
                value={boardName}
                onChange={(e) => {
                    e.target.style.width = getTextWidth(e.target.value)
                    handleChangeBoardName(e.target.value)
                }}
            />
        </div>
    )
}

export default React.memo(BoardName)
