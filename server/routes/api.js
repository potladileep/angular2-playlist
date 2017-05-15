const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const video = require('../models/video');

//connecting to DB
const db = 'mongodb://test:test@ds127391.mlab.com:27391/video-player';
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
   if(err){
       console.log('error is ' + err);
   } 
});

//get all videos from DB
router.get('/videos', function(req, res){
   video.find({})
    .exec(function(err, videos){
       if(err){
           console.log('error is ' + err);
       }else{
           res.json(videos);
       }
   });
});

//get video by id
router.get('/videos/:id', function(req, res){
   video.findById(req.params.id)
    .exec(function(err, video){
       if(err){
           console.log('error is ' + err);
       }else{
           res.json(video);
       }
   });
});

//posting a new video into db
router.post('/video', function(req, res){
   var newvideo = new video();
    newvideo.title = req.body.title;
    newvideo.url = req.body.url;
    newvideo.description = req.body.description;
    newvideo.save(function(err, insertedvideo){
       if(err){
           console.log('error is ' + err);
       } else{
           res.json(insertedvideo);
       }
    });
});

//edit a video in the DB
router.put('/video/:id', function(req, res){
   video.findByIdAndUpdate(req.params.id, {
       $set: {title: req.body.title, url: req.body.url, description: req.body.description}
   }, {
       new: true
   }, 
   function(err, updatedvideo){
       if(err){
           res.send('some error while updating');
       }else{
           res.json(updatedvideo);
       }
   });
});

//delete a video from DB
router.delete('/video/:id', function(req, res){
   video.findByIdAndRemove(req.params.id, function(err, deletedvideo){
       if(err){
           res.send('problem with deleting a video');
       }else{
           res.json(deletedvideo);
       }
   });
});

module.exports = router;