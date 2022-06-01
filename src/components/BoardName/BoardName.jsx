import React, { useState, useEffect, useRef, useContext } from 'react'
import AutosizeInput from 'react-input-autosize'
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

    return (
        <div
            className={classNames(style.boardName)}
            onClick={() => setActiveBoardName(true)}
        >
            <div
                className={classNames({
                    [style.active]: !isActiveBoardName,
                    [style.nameDisplay]: true
                })}
            >
                {boardName}
            </div>

            {isActiveBoardName && (
                <AutosizeInput
                    className={classNames(style.nameInputWrapper)}
                    inputClassName={classNames(style.nameInput)}
                    ref={inputRef}
                    onBlur={() => setActiveBoardName(!isActiveBoardName)}
                    value={boardName}
                    onChange={handleChangeBoardName}
                />
            )}
        </div>
    )
}

export default React.memo(BoardName)
