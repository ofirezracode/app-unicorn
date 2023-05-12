export const googleBookService = {
  query,
}

function query(searchTerm) {
  return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`)
}
