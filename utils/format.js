/**
 * Returns a unique array object by filtering out duplicate ids.
 *
 * @param {array} arr array of objects
 */
const getUnqiueItemsById = (arr) => {
  const ids = arr.map((item) => item.id);
  // to increase speed I don't check for duplicates at the current or last postion of the array
  return arr.filter(({ id }, index) => !ids.includes(id, index + 1));
};

/**
 * Returns a ordered array of objects by sorting by the given [sortBy] property.
 *
 * @param {array} arr array of objects
 * @param {string} sortBy array of objects
 * @param {string} direction array of objects
 */
const orderBy = (arr, sortBy, direction) => {
    /* Yes I know it could be Refactored to reduce Cognitive Complexity. just let me have this dude*/
  if (sortBy && direction) {
    return direction.toLowerCase() === 'asc'
      ? arr.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
      : arr.sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : -1));
  } else if (sortBy) {
    return arr.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  } else {
    return arr;
  }
};

export  { getUnqiueItemsById, orderBy };
