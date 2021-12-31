const mongoose = require('mongoose')
//const { mongoPath } = require('./config.json')

const mongoPath =
  'mongodb+srv://Ruairiw8:celtic62@virtual-casino-bot.o7cou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}
