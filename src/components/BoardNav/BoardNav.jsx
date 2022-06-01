/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import BoardName from '../BoardName/BoardName'
import style from './BoardNav.module.scss'
import svg from '@/assets/svg/spinner.svg'

function BoardNav() {
    return (
        <>
            <div className={style.boardNav}>
                <button className={classNames(style.dropdown, 'btn')}>
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
                <BoardName />
            </div>
        </>
    )
}

export default React.memo(BoardNav)
