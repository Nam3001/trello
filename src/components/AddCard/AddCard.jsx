import React, { useState } from 'react'
import classNames from 'classnames/bind'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import style from './AddCard.module.scss'
const cx = classNames.bind(style)

function AddCard() {
    const [cardContent, setCardContent] = useState('')
    const handleInputCard = (e) => {
        e.target.style.height = e.target.scrollHeight + 'px'
        setCardContent(e.target.value)
    }

    return (
        <div className={cx('add-card')}>
            <textarea
                className={cx('card-input')}
                value={cardContent}
                rows="3"
                placeholder="Nhập tiêu đề cho thẻ này…"
                onChange={handleInputCard}
            />
            <button className={cx('add-button')}>Thêm Thẻ</button>
            <button className={cx('close')}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    )
}

export default AddCard
