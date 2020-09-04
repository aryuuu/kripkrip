
/**
 * Check input completeness, including one of plaintext or ciphertext, and key
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkInputCompleteness = (req, res, next) => {
  if (req.key && (req.plain || req.cipher)) {
    next();
  } else {
    return res.status(400).json({
      message: 'Missing inputs'
    })
  }
}

module.exports.checkInputCompleteness = checkInputCompleteness;