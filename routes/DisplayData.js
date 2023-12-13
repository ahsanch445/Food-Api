const express = require("express")
const router = express.Router()
router.post("/fooddata",(req,res)=>{
res.send([categorydata,fooddata])

})
router.get("/fooddata1",(req,res)=>{
  res.send("hello world")
})





module.exports= router