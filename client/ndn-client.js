var name = new Name("/ndn/test/foobar"); // Named Data
var text = "Welcome to meteor-ndn.";
var face = new Face(); // NDN protocol wrapper

var onData = function (interest, data) {
  console.log("Closure.upcall: content signature verification pass.");
  console.log("Host: " + face.host + ":" + face.port);
  text += "Name string: " + escape(data.name.toUri()) + "\n";
  text += "Content buffer length: " + data.content.length + "\n";
  text += EncodingUtils.dataToHtml(data);
};
var onTimeout = function (interest) {
  console.log("Closure.upcall called with interest time out. Re-expressing the interest.");
  console.log("Host: " + face.host + ":" + face.port);
  face.expressInterest(interest, onData, onTimeout);
};

Template.hello.greeting = function () {
  return text;
};

Template.hello.events({
  'click input': function () {
    face.expressInterest(name, onData, onTimeout);
  }
});