const express =require('express')
const mysql =require('mysql')
const db =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'nodeConnection'
})
const app =express()

db.connect(err =>{
    if(err){
        throw err
    }
    console.log('connected')
})
app.get('/createdb',(req,res)=>{
    let sql ='CREATE DATABASE nodeConnection'
    db.query(sql, err=>{
        if(err){
            throw err
        }
        res.send('database created')
    })
})

app.get('/createTable',(req,res)=>{
    let sql='CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(225), designation VARCHAR(225), PRIMARY KEY(id))'
    db.query(sql,err=>{
        if(err){
            throw err
        }
        res.send('Table added')
    })
})
app.get('/insertTable',(req,res)=>{
    let post={NAME: 'WALEED NASEEM', designation: 'developer'}
    let sql='INSERT INTO employee SET ?'
    let query= db.query(sql,post,err=>{
        if(err){
            throw err
        }
        res.send('Employee added')
    })
})
app.get('/getemployee',(req,res)=>{
    let sql='SELECT * FROM employee'
    let query=db.query(sql,(err,result)=>{
        if(err){
            throw err
        }
        console.log(result)
        res.send('details fetched')
    })
})
app.get('/updatesql/:id',(req,res)=>{
    let newName='update name'
    let sql=`UPDATE employee SET name = '${newName}' WHERE id=${req.params.id}`
    let query=db.query(sql,err=>{
        if(err){
            throw err
        }
        res.send('updated')
    })
})
app.get('/deletesql/:id',(req,res)=>{
    let sql=`DELETE FROM employee WHERE id=${req.params.id}`
    let query=db.query(sql,(err)=>{
        if(err){
            throw err
        }
        res.send('deleted')
    })
})
app.listen(3000,()=>{
    console.log('connected with port')
})
