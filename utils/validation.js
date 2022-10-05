/**
 * cheack if the sortBy value is valid and returns a boolean
 *
 * @param {string} sortby sortBy value
 */
const isSortByValid = (sortby) => {
  const validSortValues = [
    'id',
    'author',
    'authorId',
    'likes',
    'popularity',
    'reads',
    'tags',
    undefined,
  ];
  return validSortValues.includes(sortby);
};

/**
 * cheack if the direction value is valid and returns a boolean
 *
 * @param {string} direction direction value
 */
const isDirectionValid = (direction) => {
  const validDirectionValues = ['asc', 'desc', undefined];
  return validDirectionValues.includes(direction);
};
  

export { isSortByValid, isDirectionValid };
