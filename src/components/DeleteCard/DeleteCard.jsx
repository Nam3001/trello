import React, { useEffect } from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './DeleteCard.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Modal from '../Modal/Modal'

const cx = classNames.bind(styles)

function DeleteCard({ className, onDeleteCard }) {
    const handleConfirm = (closeModal) => {
        try {
            onDeleteCard()
            closeModal()
            toast.success('Card deleted', {
                toastId: 'delete-card-success',
                autoClose: 2000
            })
        } catch (err) {
            closeModal()
            toast.error(err.message, {
                toastId: 'delete-card-error',
                autoClose: 2000
            })
        }
    }

    return (
        <Modal
            onConfirm={handleConfirm}
            header="Delete Card"
            content="Are you sure delete this card? "
        >
            <div className={cx(className)}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </Modal>
    )
}

export default DeleteCard
