var User = function (name, experience){
  this.name = name;
  this.experience = experience;
};

function printName() {
  console.log(this.name);
}

User.prototype = {
  constructor: User,
  printName: printName
};


module.exports = User;
