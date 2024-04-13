const success = (res, data, msg="") => {
  res.status(200).json({
    success: true,
    data,
    msg,
  })
}

const failure = (res, data, msg="") => {
  res.status(400).json({
    success: false,
    data,
    msg,
  })
}

module.exports = {
  success,
  failure
}
