export default function () {
  const getComapareID = (items, object) => {
    const value = []
    items.forEach((item, index) => { value[index] = compareObjects(item.ID, object) })
    return value
  }

  const compareObjects = (item, object) => {
    let result = null
    object.forEach((obj) => { if (obj.ID === item) { result = obj.ID } })
    return result
  }
  return { getComapareID }
}
