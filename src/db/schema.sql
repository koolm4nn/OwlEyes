create table if not exists banks (
	id integer primary key autoincrement,
	name text not null unique
);

create table if not exists accounts (
	id integer primary key autoincrement,
	name text not null unique,
	bank_id integer not null,
	foreign key (bank_id) references banks(id)
);

create table if not exists balances (
	id integer primary key autoincrement,
	amount real not null,
	timestamp integer not null default (strftime('%s', 'now')),
	account_id integer not null,
	foreign key (account_id) references accounts(id)
);