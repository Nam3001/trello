import React, { useState, useEffect, useRef, useContext } from 'react'
import AutosizeInput from 'react-input-autosize'
import styles from './BoardName.module.scss'
import classNames from 'classnames'

import { BoardContext } from '@/App'

function BoardName() {
    const [isActiveBoardName, setActiveBoardName] = useState(false)
    const { boardName, updateBoardName } = useContext(BoardContext)
    const [name, setName] = useState(boardName)
    const inputRef = useRef()

    useEffect(() => {
        inputRef?.current?.focus()
        inputRef?.current?.select()
    }, [isActiveBoardName])

    const handleChangeBoardName = (e) => {
        setName(e.target.value)
    }

    return (
        <div
            className={classNames(styles.boardName)}
            onClick={() => setActiveBoardName(true)}
        >
            <div
                className={classNames({
                    [styles.active]: !isActiveBoardName,
                    [styles.nameDisplay]: true,
                })}
            >
                {name}
            </div>

            {isActiveBoardName && (
                <AutosizeInput
                    className={classNames(styles.nameInputWrapper)}
                    inputClassName={classNames(styles.nameInput)}
                    ref={inputRef}
                    onBlur={() => {
                        setActiveBoardName(!isActiveBoardName)
                        updateBoardName(name)
                    }}
                    value={name}
                    onChange={handleChangeBoardName}
                />
            )}
        </div>
    )
}

export default React.memo(BoardName)
