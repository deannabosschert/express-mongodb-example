const { Liquid } = require('liquidjs')
const engine = new Liquid({
  root: ['views/layouts', 'views/pages/'],
  extname: '.liquid'})

  module.exports = engine.express()