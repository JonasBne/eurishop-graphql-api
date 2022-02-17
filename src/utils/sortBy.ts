const sortBy = (data: any[], sortExpression: string | null | undefined) => {
  if (!data) {
    return data;
  }

  const sortedData = [...data];
  sortedData.sort((a: any, b: any) => {
    if (sortExpression?.includes('+')) {
      if (a[sortExpression.substring(1)] < b[sortExpression.substring(1)]) {
        return -1;
      }
    }
    if (sortExpression?.includes('-')) {
      if (b[sortExpression.substring(1)] < a[sortExpression.substring(1)]) {
        return -1;
      }
    }
    return 0;
  });
  return sortedData;
};

export default sortBy;
