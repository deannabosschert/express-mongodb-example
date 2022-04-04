const getData = require('./filters/get-data.js')
const filterData = require('./filters/filter-data.js')

module.exports = async (variable) => {
  try {
    return cleanColors = await getData() // wait for data
      .then(data => filterData(data)) // filter usable data
      .then(data => {
        console.log(data.owner)
        return data
      })
  } catch (err) {
    console.error(err)
  }
}