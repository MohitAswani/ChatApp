const multer = require('multer');
const crypto=require('crypto');
const path=require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/images');
    },
    filename: (req,file,cb)=>{
        crypto.randomBytes(16,(err,buf)=>{
            if(err){
                console.log(err);
            }
            else{
                const filename=buf.toString('hex')+path.extname(file.originalname);
                cb(null,filename);
            }
        });
    }
});

const upload = multer({ storage: storage,
    limits:{
        fieldSize:1024*1024*3,
    },
});

exports.upload=upload;