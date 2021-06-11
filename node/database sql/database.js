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

    db.query(sql, post, (err) => {
        if (err) {
            throw err
        }
        res.send('inserted data')
    })
})
App.get('/getdata', (req, res) => {
    let data = ' SELECT * FROM credentials'
    db.query(data, (err, result) => {
        if (err) {
            throw err
        }
        // console.log(result)
        res.send(result)
    })
})
App.get('/updateuser/:id', (req, res) => {
    let userupdate = 'faizan'
    let update = `UPDATE credentials SET username = '${userupdate}' WHERE id = ${req.params.id}`
    db.query(update, (err) => {
        if (err) {
            throw err
        }
        res.send('updated user')
    })
})
App.get('/delete/:id', (req, res) => {
    const deleted = `DELETE from credentials WHERE id=${req.params.id}`
    db.query(deleted,err=>{
        if(err){
            throw err
        }
        res.send('deleted')
    })
})
App.listen(port, console.log(`connected server of port ${port}`))