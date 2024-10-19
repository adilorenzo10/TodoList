import sqlite3 as sq

conn = sq.connect('todo.sqlite3')
with open('db.sql') as f:
    conn.executescript(f.read())
conn.close()