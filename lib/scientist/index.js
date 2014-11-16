// Scientist library

// Scientist objects:
function Scientist(uid, firstName, lastName, dob) {
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
}

// Temporary in-memory database
var scientistdb = [
    new Scientist('482015', 'Andrey', 'Kolmogorov', '25 April 1903')
];

exports.add = function(uid, firstName, lastName, dob) {
    scientistdb.push(new Scientist(uid, firstName, lastName, dob));
};

module.exports.scientistdb = scientistdb;
