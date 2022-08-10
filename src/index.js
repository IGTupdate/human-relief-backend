// Requiring module
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes.js';
import mongoose from 'mongoose';
import cors from 'cors';
 
const app = express();
const PORT = process.env.PORT || 5000;
const URL = 'mongodb+srv://react1:YEWO4P4C8eEffOCm@cluster0.rxk8i.mongodb.net/Cluster0?retryWrites=true&w=majority';

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api', router); 

app.use(express.static('public')); 
app.use('/images', express.static('images'));


import multer from 'multer';
const upload = multer({ dest: "images/" });


app.post("/upload_files", upload.single("files"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
}



mongoose.connect(URL,{
    useNewUrlParser: true, 
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=> console.log(`Server is running on port http://localhost:${PORT}`));
}).catch((error)=>{
    console.log(`Error${error}`);
});
