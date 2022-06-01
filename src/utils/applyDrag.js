const applyDrag = (arr, dragResult) => {
    if (!Array.isArray(arr)) return null
    if (!dragResult) return arr

    const newArr = [...arr]

    const { removedIndex, addedIndex, payload } = dragResult

    if (removedIndex !== null) newArr.splice(removedIndex, 1)
    if (addedIndex !== null) newArr.splice(addedIndex, 0, payload)

    return newArr
}

export default applyDrag