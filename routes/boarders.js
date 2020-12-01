const router = require('express').Router();
const Authorize = require('../middlewares/Authorizer');
const Boarder = require('../models/boarderModel');
const Room = require('../models/roomModel');


// ----------------------- GET REQUEST ------------------------- //

router.get('/',  async ( req, res ) => {
   // GET ALL BOARDERS AND POPULATE THE ROOM ID
   try { 
      await Boarder.find().populate('roomID', 'name' ).
         exec(function (err, found) {
         if (err) return res.json({ message:err });
         res.status(200).json(found)
      });
    } 
   catch (err) { res.status(400).json({ message: error.toString()})}
})

router.get('/:id',  async ( req, res ) => {
   // GET ONE ALL BOARDER AND POPULATE THE ROOM ID
   try { 
      await Boarder.findOne(req.body.id).populate('roomID', 'name').
         exec(function (err, found) {
         if (err) return res.json({ message:err });
         res.status(200).json(found)
      });
   } 
   catch (err) { res.status(400).json( { message: error.toString() } ) }
})

// ----------------------- POST REQUEST ------------------------- //

router.post('/', Authorize('admin', 'demo'), async ( req, res ) => {

   try {
      const boarder = new Boarder({
         name: req.body.name,
         contactNum: req.body.contactNum,
         parentNum: req.body.parentNum,
         picture: req.body.picture,
         roomID: req.body.roomID
      })

      // FIND THE ROOM THEY WILL BE OCCUPIED IN
      // AND UPDATE THE ARRAY OF BOARDERS
      // INSIDE THE ROOM OBJECT AND CHECK IF ITS FULL CAPACITY

   const roomOccupied = await Room.findOne(boarder.roomID)
    if(roomOccupied.boarders.length  < roomOccupied.capacity) {
         await Room.updateOne({_id: boarder.roomID},{ $push: { boarders: boarder._id }})
         res.json({ message: `Successfully Added` })  
         boarder.save()
    } else {
      res.status(400).end('Room is full')
    }
  } catch (err) { res.status(400).json({ message: error.toString() })}
})

// ----------------------- PATCH REQUEST ------------------------ //

router.patch('/:id', Authorize('admin'), async ( req, res ) => {

   const whatToUpdate = {$set: {      
      name: req.body.name,
      contactNum: req.body.contactNum,
      parentNum: req.body.parentNum,
      picture: req.body.picture
   }}

   try {
      // DON'T UPDATE THE ROOM THEY OCCUPIED IN
      // JUST DELETE AND INPUT THEM AGAIN INSTEAD
      // OR MAYBE YOU CAN TRY THE CODE BELOW IN THE DELETE REQUEST
      await Boarder.updateOne({ _id: req.params.id}, whatToUpdate )
      res.status(200).json({ message:'Successfully Updated.' })

   } catch (error) { res.status(400).json({ message: error.toString() }) }


})

// ----------------------- DELETE REQUEST ------------------------ //

router.delete('/:id', Authorize('admin'), async (req, res) => {
   try {
      // FIND ONE SPECIFIC BOARDER AND DELETE THEN UPDATE THE ROOM THEY OCCUPIED
      const toBeDeleted = await Boarder.findOneAndDelete({_id:req.params.id})
      await Room.updateOne({ _id: toBeDeleted.roomID },{ $pull: { boarders: req.params.id }})
      res.json({ message:'Successfully Deleted.' })  
   } catch (error) { res.status(400).json({ message: error.toString() }) }
})


module.exports = router
