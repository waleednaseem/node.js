const express = require('express')
const App = express()
const mysql = require('mysql')
const port = 8080
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'waleeddb'
})

db.connect(err => {
    if (err) {
        throw err
    }
    console.log('my sql connected')
})

App.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE waleeddb'
    db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send('database created')
    })
})

App.get('/createtable', (req, res) => {
    let table = 'CREATE TABLE credentials(id int AUTO_INCREMENT,username VARCHAR(225), passowrd VARCHAR(225),PRIMARY KEY (id))'
    db.query(table, err => {
        if (err) {
            throw err
        }
        res.send('table created')
    })
})
App.get('/insertquery', (req, res) => {
    const sql = 'INSERT INTO credentials SET ?'
    const post = { username: 'waleed', passowrd: 'waleed' }

    const Query = db.query(sql, post, (err) => {
        if(err){
            throw err
        }
            res.send('inserted data')
    })
})

App.listen(port, console.log(`connected server of port ${port}`))