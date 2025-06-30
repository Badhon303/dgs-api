export const isValidUrl = (urlString) => {
  // Return false if the input is not a string or is empty
  if (typeof urlString !== 'string' || urlString.length === 0) {
    return false
  }

  // Regular expression to match common URL patterns.
  // This regex checks for:
  // - http:// or https:// protocol.
  // - An optional 'www.' subdomain.
  // - A domain name with at least one dot.
  // - A valid top-level domain (at least 2 characters).
  // - Optional port numbers, paths, query strings, and fragments.
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i', // Case-insensitive
  )

  return urlPattern.test(urlString)
}
