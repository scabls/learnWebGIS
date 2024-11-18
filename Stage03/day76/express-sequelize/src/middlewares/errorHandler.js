module.exports = (err, req, res, next) => {
  console.error(err.message)
  res.status(500).json({ message: 'Something went wrong', code: 500 })
}
