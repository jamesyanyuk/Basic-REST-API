drop table if exists objects;

create table objects (
    uid varchar(25),
    object json,
    primary key (uid)
);

insert into objects values ('000001', '{"uid" : "000001","firstname" : "Andrey","lastname" : "Kolmogorov","dob" : "25 April 1903"}');
insert into objects values ('000002', '{"uid" : "000002","firstname" : "11","lastname" : "12","dob" : "13"}');
insert into objects values ('000003', '{"uid" : "000003","firstname" : "21","lastname" : "22","dob" : "23"}');
