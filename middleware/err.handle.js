const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).send({ msg: "Internal Server Error", error: err.message });
};

module.exports = { errorHandler };
