
/**
 * Check input completeness, including one of plaintext or ciphertext, and key
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkInputCompleteness = (req, res, next) => {
  let { body } = req;
  console.log(JSON.stringify(req.body))
  if (body.key && (body.plain || body.cipher)) {
    next();
  } else {
    console.log()
    return res.status(400).json({
      message: 'Missing inputs'
    })
  }
}

module.exports.checkInputCompleteness = checkInputCompleteness;