export const mapOrder = (array, order, key) => {
    if (!Array.isArray(array)) return
    array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
    return array
}