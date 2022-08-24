import * as pg from 'pg'
const { Pool } = pg.default
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'fish',
    port:'5432'
})
export let conn = pool
