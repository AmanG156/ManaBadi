export function stableSort(array, comparator) {
  const stabilizedThis = (array || []).map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function descendingComparator(a, b, orderBy) {
  let aVal = a ? a[orderBy] : null;
  let bVal = b ? b[orderBy] : null;

  if (typeof aVal === 'string' || aVal instanceof String) {
    aVal = aVal.toLowerCase();
  }

  if (typeof bVal === 'string' || bVal instanceof String) {
    bVal = bVal.toLowerCase();
  }

  // fix for sorting in case of null values
  if (aVal !== bVal) {
    if (!aVal) return -1;
    if (!bVal) return 1;
  }

  if (aVal < bVal) {
    return -1;
  }
  if (aVal > bVal) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function GetSortOrder(prop) {
  // eslint-disable-next-line func-names
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}
