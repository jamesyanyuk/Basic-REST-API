// Scientist library

// Scientist objects:
function Scientist(id, firstName, lastName, dob) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
}

// Temporary in-memory database
var scientistdb = [
    new Scientist('482015', 'Andrey', 'Kolmogorov', '25 April 1903')
];

exports.addUser = function(id, firstName, lastName, dob) {
    scientistdb.push(new Scientist(id, firstName, lastName, dob));
};

//exports.lookup = function(firstName, lastName) {  }


exports.lookupScientist = function(firstName) {
    var len = scientistdb.length;
    for (var i = 0; i < len; i++) {
        var s = scientistdb[i];
        if (s.firstName === firstName) {
            return true;
        }
    }
    return false;
};

module.exports.scientistdb = scientistdb;
