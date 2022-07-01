-- init scripts
CREATE DATABASE amrapp;

create user admin with password 'admin';

CREATE TABLE exercise(
    id serial primary key,
    name text,
    description text,
    push_pull text,
    upper_lower text,
    body_part text,
    created_date timestamptz not null default now(),
    updated_date timestamptz not null default now()
);

update exercise set upper_lower = 'LOWER' where upper_lower = '	Lower	';
select * from exercise;
-- todo need to figure out how to trim the names

-- TODO the rest is pending
CREATE TABLE workout(); -- collection of exercises, start time, end time -- exercises need to be grouped in sets (weight, reps)
-- how do we store it? idk if we want to have a table just for sets but maybe that's what we'll do.


-- perusing
select * from todo;
