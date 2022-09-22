
const express=require('express')
const multer=require('multer')
const path=require('path')

const app=express()
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+ '---'+file.originalname)
    }
})
const upload=multer({storage:fileStorage})
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})

app.post('/single',upload.single('image'),(req,res)=>{

    console.log(req.file)
    res.send("single file upload succss")
})

//mu/tiple files

app.post('/multiple',upload.array('images',3),(req,res)=>{
    console.log(req.files)
    res.send('uploaded')
})



app.listen(3000,()=>{
    console.log("server is running at 3000 port")
})