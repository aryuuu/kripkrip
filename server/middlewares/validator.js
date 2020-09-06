
/**
 * Check input completeness, including one of plaintext or ciphertext, and key
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkInputCompleteness = (req, res, next) => {
<<<<<<< HEAD
  let { body } = req;
  console.log(JSON.stringify(req.body))
  if (body.key && (body.plain || body.cipher)) {
=======
  if (req.body.key && (req.body.plain || req.body.cipher)) {
>>>>>>> b6b873495a5d589c99614769b8ad9e14c6da7852
    next();
  } else {
    console.log()
    return res.status(400).json({
      message: 'Missing inputs'
    })
  }
}

module.exports.checkInputCompleteness = checkInputCompleteness;