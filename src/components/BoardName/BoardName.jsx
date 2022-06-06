import React, { useState, useEffect, useRef, useContext } from 'react'
import AutosizeInput from 'react-input-autosize'
import styles from './BoardName.module.scss'
import classNames from 'classnames'

import { BoardContext } from '@/App'

function BoardName() {
    const [isActiveBoardName, setActiveBoardName] = useState(false)
    const { boardName, handleChangeBoardName, updateBoardName } =
        useContext(BoardContext)
    const inputRef = useRef()

    useEffect(() => {
        inputRef?.current?.focus()
        inputRef?.current?.select()
    }, [isActiveBoardName])

    return (
        <div
            className={classNames(styles.boardName)}
            onClick={() => setActiveBoardName(true)}
        >
            <div
                className={classNames({
                    [styles.active]: !isActiveBoardName,
                    [styles.nameDisplay]: true
                })}
            >
                {boardName}
            </div>

            {isActiveBoardName && (
                <AutosizeInput
                    className={classNames(styles.nameInputWrapper)}
                    inputClassName={classNames(styles.nameInput)}
                    ref={inputRef}
                    onBlur={() => {
                        setActiveBoardName(!isActiveBoardName)
                        updateBoardName()
                    }}
                    value={boardName}
                    onChange={handleChangeBoardName}
                />
            )}
        </div>
    )
}

export default React.memo(BoardName)
