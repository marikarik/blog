export const userValidation = {
  required: 'Username is required',
  minLength: {
    value: 3,
    message: 'Username length must be from 3 to 20 characters',
  },
  maxLength: {
    value: 20,
    message: 'Username length must be from 3 to 20 characters'
  }
}

export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[a-z0-9]+[a-z0-9-_.+%]*@[a-z0-9-]+\.[a-z]{2,}$/i,
    message: 'Oops! That doesn’t look like a valid email'
  }
}

export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password length should be from 6 to 40 characters'
  },
  maxLength: {
    value: 40,
    message: 'Password length should be from 6 to 40 characters'
  }
}

export const passwordRepeatValidation = (password) => ({
  required: 'Please repeat the password',
  validate: (repeatPassword) => repeatPassword === password || 'Password do not match'
})

export const checkboxValidation = {
  required: 'Please confirm your agreement to proceed',
}