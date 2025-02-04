class CustomError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'CustomError'
    this.status = status || 500 // Default status is 500 if not specified
  }
}

export default CustomError
