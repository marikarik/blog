export const userValidation = {
  required: 'Username is required',
  minLength: {
    value: 3,
    message: 'Username length must be from 3 to 20 characters',
  },
  maxLength: {
    value: 20,
    message: 'Username length must be from 3 to 20 characters',
  },
}

export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[a-z0-9]+[a-z0-9-_.+%]*@[a-z0-9-]+\.[a-z]{2,}$/i,
    message: 'Oops! That doesn’t look like a valid email',
  },
}

export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password length should be from 6 to 40 characters',
  },
  maxLength: {
    value: 40,
    message: 'Password length should be from 6 to 40 characters',
  },
}

export const passwordRepeatValidation = (password) => ({
  required: 'Please repeat the password',
  validate: (repeatPassword) => repeatPassword === password || 'Password do not match',
})

export const checkboxValidation = {
  required: 'Please confirm your agreement to proceed',
}

export const newPasswordValidation = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password length should be from 6 to 40 characters',
  },
  maxLength: {
    value: 40,
    message: 'Password length should be from 6 to 40 characters',
  },
}

export const urlValidation = {
  pattern: {
    value: /^https?:\/\/.+$/i,
    message: 'Enter a valid image URL',
  },
}

export const signInEmailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[a-z0-9]+[a-z0-9-_.+%]*@[a-z0-9-]+\.[a-z]{2,}$/i,
    message: 'Oops! That doesn’t look like a valid email',
  },
}

export const signInPasswordValidation = {
  required: 'Password is required',
}

export const inputTagValidation = {
  validate: (value) => {
    if (!value) return true
    if (value.length > 20) return 'Max length is 20 characters'
    return true
  },
}

export const inputValidation = {
  required: 'This field is requierd',
}
