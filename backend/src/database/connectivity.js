const mongoose = require("mongoose");

function checkMongoConnection() {
  // We need binary ready state ({1} = Connected, {0, 2, 3} = Disconnected )
  if (mongoose.connection.readyState == 1 || mongoose.connection.readyState == 2) {
    return 1;
  }
  else {
    return 0;
  }


}

module.exports = { checkMongoConnection };
