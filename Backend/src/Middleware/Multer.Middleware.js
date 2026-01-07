import multer from 'multer';

const Storage=multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
  
},console.log("complete multer"))

const Multer= multer({ storage: Storage })

export default Multer