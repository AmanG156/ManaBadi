const colorPalete = (course) => {
  switch (course) {
    case 'Pravesam':
      return '#F24813';
    case 'BalaBadi - I':
      return '#2965CD';
    case 'BalaBadi - II':
      return '#D16078';
    case 'Prasunam':
      return '#FF9B00';
    case 'Prakasam':
      return '#078312';
    case 'Pramodam':
      return '#A51C9A';
    case 'Prabhasam':
      return '#0090D2';
    default:
      return null;
  }
};

export default colorPalete;
