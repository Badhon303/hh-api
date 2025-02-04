export const UrlPatternValidate = (val) => {
  if (!val) {
    // Allow empty values
    return true
  }
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-zA-Z0-9$_.+!*'(),;?&=-]|%[0-9a-fA-F]{2})+@)?" + // user info (optional)
      "((([a-zA-Z0-9-]{1,63}\\.)+[a-zA-Z]{2,})|localhost|\\d{1,3}(\\.\\d{1,3}){3})" + // domain or IP
      "(:\\d{1,5})?" + // port (optional)
      "(\\/([a-zA-Z0-9$_.+!*'(),;?&=-]|%[0-9a-fA-F]{2})*)*" + // path (optional)
      "(\\?[a-zA-Z0-9$_.+!*'(),;?&=-]*" + // query string (optional)
      "(=[a-zA-Z0-9$_.+!*'(),;?&=-]*)?)*" + // query parameters
      "(#[a-zA-Z0-9$_.+!*'(),;?&=-]*)?" + // fragment identifier (optional)
      ")$",
    "i"
  )

  if (!urlPattern.test(val)) {
    return "Please enter a valid URL, including http:// or https://"
  }
  return true
}
