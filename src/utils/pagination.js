export const applyPagination = (page, limit) => {
  const options = {
    limit: parseInt(limit) || 10,
    skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
  }
  return options
}

export const formatPaginatedResponse = (results, total, page, limit) => {
  //count the remaining results and return the total number of pages
  let remainingResults =
    total - (parseInt(page) - 1) * parseInt(limit) - parseInt(limit)
  if (remainingResults < 0) {
    remainingResults = 0
  }
  return {
    results,
    currentPage: parseInt(page) || 1,
    totalResults: total,
    remainingResults,
  }
}
