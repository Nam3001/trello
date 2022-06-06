import React, { useContext } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from './DeleteColumn.module.scss'
import { BoardContext } from '@/App'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '../Modal/Modal'
// ToastContainer place in Board component

const cx = classNames.bind(styles)

function DeleteColumn({ className, column }) {
    const { boardData, setBoardData } = useContext(BoardContext)

    const handleDeleteColumn = (closeModal) => {
        try {
            boardData.columns.columnList.forEach((curr, index) => {
                if (curr.columnId === column.columnId) {
                    // create new board and mutate column
                    const newBoard = Object.assign({}, boardData)
                    newBoard.columns.columnList.splice(index, 1)
                    setBoardData(newBoard)

                    // show toast message
                    toast.success('Column deleted', {
                        toastId: 'success-toast',
                        autoClose: 2000
                    })
                }
            })

            closeModal()
        } catch (err) {
            closeModal()
            // show error toast message
            toast.error(err.message, {
                toastId: 'error-toast',
                autoClose: 2000
            })
        }
    }

    return (
        <Modal
            header="Delete column"
            content={`Are you sure delete column ${column.columnName}?`}
            onConfirm={handleDeleteColumn}
        >
            <div className={cx(className, 'delete-column')}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </Modal>
    )
}

export default DeleteColumn
