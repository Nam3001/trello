const applyDrag = (arr, dragResult) => {
    if (!Array.isArray(arr)) return null
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return

    const newArr = [...arr]

    if (removedIndex !== null) newArr.splice(removedIndex, 1)
    if (addedIndex !== null) newArr.splice(addedIndex, 0, payload)

    return newArr
}

export default applyDrag