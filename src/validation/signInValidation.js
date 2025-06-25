export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[a-z0-9]+[a-z0-9-_.+%]*@[a-z0-9-]+\.[a-z]{2,}$/i,
    message: 'Oops! That doesn’t look like a valid email'
  }
}

export const passwordValidation = {
  required: "Password is required",
}