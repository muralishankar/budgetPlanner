create database BudgetPlanner;

\c budgetplanner

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table budgetplans(
    id uuid DEFAULT uuid_generate_v4(),
    created_date TIMESTAMP NOT NULL DEFAULT NOW(),
    modified_date TIMESTAMP NOT NULL DEFAULT NOW(),
    data JSONB NOT NULL,
    --title VARCHAR NOT NULL,
   -- budget_description VARCHAR NOT NULL,
    --budget_limit numeric(15,2),
    --budget_year INT NOT NULL CHECK (budget_year >= 0),
    PRIMARY KEY (id)
);

create table ledger(
    id uuid DEFAULT uuid_generate_v4(),
    created_date TIMESTAMP NOT NULL DEFAULT NOW(),
    modified_date TIMESTAMP NOT NULL DEFAULT NOW(),
    data JSONB NOT NULL,
    --budget_id uuid NOT NULL REFERENCES budgetstory(id) ,
    --title VARCHAR NOT NULL,
    --note VARCHAR,
    --expense numeric(15,2),
    PRIMARY KEY (id)
);