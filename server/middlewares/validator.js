
/**
 * Check input completeness, including one of plaintext or ciphertext, and key
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkInputCompleteness = (req, res, next) => {
  if (req.body.key && (req.body.plain || req.body.cipher)) {
    next();
  } else {
    console.log()
    return res.status(400).json({
      message: 'Missing inputs'
    })
  }
}

module.exports.checkInputCompleteness = checkInputCompleteness;