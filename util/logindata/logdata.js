const checkPassword = (p) => p.length >= 6
const checkEmail = (e) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e)

module.exports = { checkPassword, checkEmail };