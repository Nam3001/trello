import React from 'react'
import style from './Column.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Column(props) {
    const { className, children, columnName, handleChangeColumnName } = props
    return (
        <div className={className}>
            <div className={style.column}>
                <div className={style.header}>
                    <textarea
                        value={columnName}
                        onChange={(e) => handleChangeColumnName(e.target.value)}
                    />
                </div>
                <div className={style.body}>{children}</div>
                <div className={style.footer}>
                    <div className={style.footerInner}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Thêm thẻ</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Column)
