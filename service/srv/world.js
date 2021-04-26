module.exports = class world {
  hello(req) { return `Hello ${req.data.to}!` }
}
