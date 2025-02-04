const getCookieExpiration = (seconds) => {
  const expirationDate = new Date()
  if (seconds) {
    expirationDate.setTime(expirationDate.getTime() + seconds * 1000)
    return expirationDate
  } else {
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    return expirationDate
  }
}

export default getCookieExpiration
