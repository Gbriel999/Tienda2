export const serverLog = (req, res, next) => {
  console.log({
    metodo: req.method,
    body: req.body,
    params: req.params,
    query: req.query
  })
  next()
}
