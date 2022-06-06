/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import BoardName from '../BoardName/BoardName'
import styles from './BoardNav.module.scss'
import svg from '@/assets/svg/spinner.svg'

function BoardNav() {
    return (
        <>
            <div className={styles.boardNav}>
                <button className={classNames(styles.dropdown, 'btn')}>
                    <span className={styles.iconSpinner}>
                        <img src={svg} alt="spinner" />
                    </span>
                    Bảng
                    <span className={styles.iconWrapper}>
                        <FontAwesomeIcon
                            className={styles.icon}
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
