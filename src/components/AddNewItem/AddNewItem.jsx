import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef
} from 'react'
import classNames from 'classnames/bind'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import style from './AddNewItem.module.scss'
const cx = classNames.bind(style)

function AddNewItem(props, ref) {
    const { event, cardContent } = props
    const cardInputRef = useRef()
    const componentRef = useRef()

    useImperativeHandle(ref, () => ({
        focus() {
            cardInputRef.current.focus()
        },
        scrollIntoView() {
            componentRef.current.scrollIntoView()
        }
    }))

    useEffect(() => {
        componentRef.current.scrollIntoView()
    }, [])

    return (
        <div ref={componentRef} className={cx('add-card')}>
            <textarea
                className={cx('card-input')}
                value={cardContent}
                rows="3"
                placeholder="Nhập tiêu đề cho thẻ này…"
                onChange={event.onInput}
                ref={cardInputRef}
            />
            <button className={cx('add-button')} onClick={event.onAddCard}>
                Thêm Thẻ
            </button>
            <button className={cx('close')} onClick={event.onClose}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    )
}

export default forwardRef(AddNewItem)
