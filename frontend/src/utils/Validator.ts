export function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  }
  
  export function isStrongPassword(password: string) {
    return password.length >= 8
  }
