const router = require('express').Router();
const Authorize = require('../middlewares/Authorizer');
const Room = require('../models/roomModel');

//----------------------- GET REQUESTS -------------------------//

// GET ALL ROOMS
router.get('/',  async ( req, res ) => {
   try { 
      await Room.find().populate('boarders' ).
      exec(function (err, found) {
      if (err) return res.status(401).end(err);
      res.status(200).json(found)
      });
    } 
   catch (err) { res.status(400).end(error.toString())}
})

// GET ONE ROOM
router.get('/:id',  async ( req, res ) => {
   try { res.status(200).json(await Room.findOne(req.body.id)) } 
   catch (error) { res.status(400).json( { message: error.toString() } ) }
})

//----------------------- POST REQUEST -------------------------//

router.post('/', Authorize('admin','demo'), async ( req, res ) => {
   try {
      const room = new Room({
         name: req.body.name,
         capacity: req.body.capacity,
         features: req.body.features,
         image: req.body.image
      })
      res.json({ message: `Successfully Added` })  
      room.save()
  } catch (err) { res.status(400).end(error.toString())}
})

//----------------------- PATCH REQUEST -------------------------//

router.patch('/:id', Authorize('admin'), async ( req, res ) => {
   const whatToUpdate = { $set: {      
         name:req.body.name,
         capacity: req.body.capacity,
         features: req.body.features,
         image: req.body.image
      }
  }
   try { 
      await Room.updateOne({_id: req.params.id},whatToUpdate)
      res.json({ message:'Successfully Updated.' })  
  } catch (error) { res.status(400).end(error.toString()) }
})

//----------------------- DELETE REQUEST -------------------------//

router.delete('/:id', Authorize('admin'), async (req, res) => {
   try {
      await Room.findOneAndDelete({_id:req.params.id})
      res.json({ message:'Successfully Deleted.' })  
   } catch (error) { res.status(400).json({ message: error.toString() }) }
})


module.exports = router
