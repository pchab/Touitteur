var face = new Face({host: "localhost"}); // NDN protocol wrapper
var name = new Name("/ndn/test/foobar"); // Named Data

// ’Interest’ event handler
var onInterest = function(prefix, interest, transport) {
  var data = new Data(interest.name, new SignedInfo(), new Buffer("Hello, NDN-JS."));
  data.signedInfo.setFields();
  data.sign();
  var encodeData = data.wireEncode();

  try {
    console.log("Send content " + contentString);
    transport.send(encodedData.buf());
  } catch (e) {
    console.log(e.toString());
  }
}

var onRegisterFailed = function(prefix) {
  console.log("Register failed for prefix " + prefix.toUri());
}

Meteor.startup(
  function () {
    face.registerPrefix(new Name(contentName), onInterest, onRegisterFailed);
  }
);