const handleHealth = (req, res) => {
  return res.status(200).send("OK")
}

module.exports = {
  handleHealth
}
