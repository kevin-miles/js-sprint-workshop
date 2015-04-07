var User = require('./lib/User'),
    Team = require('./lib/Team'),
    userList = require('./userlist.json');

var userListExperienced = [],
    userListInexperienced = [],
    teamList = [];

var sorter = function () {
  return (Math.round(Math.random())-0.5);
};

// var testUser = new User("My Name", 1);
// var testUser2 = new User("My Name2", 2);


for(var i=0; i < userList.users.length; i++) {
  var experience = userList.users[i].experience,
      name = userList.users[i].name;
  if (experience === 2) {
    userListExperienced.push(new User(name, experience));
  } else if (experience === 1) {
    userListInexperienced.push(new User(name, experience));
  }
}
// testUser.printName();
// console.log(JSON.stringify(testUser));
// console.log(JSON.stringify(testUser2));
// testUser.printName();

// display # of users, experienced users, and inexperienced users
console.log('Total Users: ' + userList.users.length);
console.log('Experienced Users: ' + userListExperienced.length);
console.log('Inexperienced Users: ' + userListInexperienced.length);

console.log(userList.users);
//display warning if Total users is odd
if(userList.users.length % 2 !== 0) {
  console.log('*** WARNING: Uneven amount of users. One poor soul will be in their own group :(');
}

if(userListInexperienced > userListExperienced) {
  console.log('*** WARNING: There are more inexperienced users than experienced users. Not all teams will be 1:1 experienced with inexperienced.');
}

// randomize list order to prevent the same output each time
userListExperienced = userListExperienced.sort(sorter);
userListInexperienced = userListInexperienced.sort(sorter);

/*
console.log('Before Sort: ');
console.log(userListExperienced);

console.log('After Sort: ');
userListExperienced = userListExperienced.sort(sorter);
console.log(userListExperienced);
*/
console.log(userListInexperienced);
console.log(userListExperienced);


//create team list
while(true) {
  var users = [],
      team;
  if(userListExperienced.length === 0 && userListInexperienced.length === 0){
    break;
  } else if(userListExperienced.length > 0 && userListInexperienced.length > 0) {
    users.push(userListExperienced.pop());
    users.push(userListInexperienced.pop());
  } else if(userListInexperienced.length === 0 && userListExperienced.length > 0) {
    if(userListExperienced.length > 1) {
      // go by yourself
      users.push(userListExperienced.pop());
      users.push(userListExperienced.pop());
    } else {
      users.push(userListExperienced.pop());
    }
  } else if(userListExperienced.length === 0 && userListInexperienced.length > 0) {
    if(userListInexperienced.length > 1) {
      // go by yourself
      users.push(userListInexperienced.pop());
      users.push(userListInexperienced.pop());
    } else {
      users.push(userListInexperienced.pop());
    }
  } else {
    console.log('*** ERROR: how did we get here? :(');
    break;
  }
  console.log('adding users to team: ' + JSON.stringify(users));
  team = new Team(users);
  teamList.push(team);

  console.log('experienced users left: ' + userListExperienced.length);
  console.log('inexperienced users left: ' + userListInexperienced.length);

}

for(var j = 0; j < teamList.length; j++) {
  console.log('Team #' + (j+1) + ': ' + JSON.stringify(teamList[j].users[0].name) + ' ' + JSON.stringify(teamList[j].users[1].name));

}
