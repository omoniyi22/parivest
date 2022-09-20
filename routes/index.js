const DriverRoutes = require('./driver')

const Routes = async router => {
  await DriverRoutes(router)
}

module.exports = Routes