import * as pg from 'pg'
const { Pool } = pg.default
const pool = new Pool({
    user:'postgres',
    database:'fish',
    password:'secret123',
    port:5432,
    host:'localhost'
})
export let conn = pool
