const express = require('express')
const app = express()
const port=3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

let movies=[
    {
        id: '1',
        title:'inception',
        director:'christoher',
        releaseDate:'2010-1-1'
    },
    {
        id: '2',
        title:'fear',
        director:'columbus',
        releaseDate:'2011-1-1'
    },
]

app.get('/movie',(req,res)=>{
    res.json(movies)
})
app.post('/movie',(req,res)=>{
    console.log(req.body)
    movies.push(req.body)
    res.send('movie added')
})
app.get("/movie/:id",(req,res)=>{
    const id= req.params.id

    for(let movie of movies){
        if(movie.id === id){
            res.json(movie)
            console.log(movie)
            return;
        }
    }
    res.status(404).send('movie not found')
})
app.delete('/movie/:id',(req,res)=>{
    const id=req.params.id
    movies= movies.filter(movie =>{
        if(movie.id !== id){
            return true
        }
        return false
    })
    res.send('movie deleted')
})
app.listen(port,()=>console.log(`server is listening port ${port}`))