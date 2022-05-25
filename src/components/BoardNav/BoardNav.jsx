/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import style from './BoardNav.module.scss'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import svg from '@/assets/svg/spinner.svg'

function BoardNav() {
    const [isActiveBoardName, setActiveBoardName] = useState(false)
    const [boardName, setBoardName] = useState('clone trello')
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
            fontFamily: 'roboto-bold',
            fontSize: '1.8rem',
            position: 'absolute',
            padding: '0 1.3rem',
            whiteSpace: 'nowrap'
        })
        text.innerHTML = textInput

        const width = Math.ceil(text.clientWidth)
        const formattedWidth = width + 'px'
        document.body.removeChild(text)

        return formattedWidth
    }

    return (
        <>
            <div className={style.boardNav}>
                <button className={style.dropdown}>
                    <span className={style.iconSpinner}>
                        <img src={svg} alt="spinner" />
                    </span>
                    Bảng
                    <span className={style.iconWrapper}>
                        <FontAwesomeIcon
                            className={style.icon}
                            icon={faChevronDown}
                        />
                    </span>
                </button>
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
                            setBoardName(e.target.value)
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default BoardNav
