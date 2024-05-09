# MySQL schema for fan emails in a portfolio site
DROP SCHEMA IF EXISTS toDoTasks;

create schema if not exists toDoTasks;

use toDoTasks;

drop table if exists toDoTasks;

#
# TABLEs
#
CREATE TABLE tasks (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       description VARCHAR(225) NOT NULL,
                       entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

#
# INDEXEs
#
create index description_ix
    on tasks(description);
create index entry_date_ix
    on tasks(entry_date);

#
# INSERTs
#
insert into tasks (description) values ('get milk');
insert into tasks (description) values ('talk a walk');
insert into tasks (description) values ('water plant');