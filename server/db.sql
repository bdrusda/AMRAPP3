-- init scripts
CREATE DATABASE amrapp;

create user admin with password 'admin';

CREATE TABLE exercise(
    id serial primary key,
    name text,
    description text,
    body_part text,
    created_date timestamptz,
    updated_date timestamptz
);

-- TODO the rest is pending
CREATE TABLE workout(); -- collection of exercises, start time, end time -- exercises need to be grouped in sets (weight, reps)
-- how do we store it? idk if we want to have a table just for sets but maybe that's what we'll do.


-- perusing
select * from todo;
