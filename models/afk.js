const mongoose = require('mongoose');// require kiya mongoose ko

let Schema = new mongoose.Schema({// schema ko asan language mai bolu to this is data
  Guild: String,// abhi data mai hame kiya kiya store karna wo haam dalenge first is guildID
  Member: String,// isme member id ye saab haam apne event and command pa define kiye member var pa kiya store karna wesa samjhe
  Content: String,// isme content, content ko hamne afk command pa as reason store kiya
  TimeAgo: String// timeago, moment ke timeago se store kiya simple
})

module.exports = mongoose.model('afk', Schema) // and then isse model ke hisab se le lenge
