const express = require('express');

const TripModel = require('../models/trips-model');

const router = express.Router();

router.get('/trips', (req, res, next) => {
  TripModel.find()
  // .limit(20)
  // .sort({_id:-1})
  .exec
  ((err, recentTrips) => {
    if(err) {
      console.log('Error finding trips', err);
      res.status(500).json({errorMessage: 'Finding trips went wrong'});
      return;
    }
    res.status(200).json(recentTrips);
  });
});

router.post('/trips', (req, res, next) => {
  // if (!req.user) {
  //     res.status(401).json({ errorMessage: 'Not loged in.' });
  //     return;
  //   }
    console.log(req.body);
    const theTrip =new TripModel({
      name:  req.body.tripName,
      image: req.body.tripImage,
      date:  req.body.tripDate

    });

    theTrip.save((err) => {
      if (theTrip.errors) {
        res.status(400).json({
          errorMessage: 'Validation failed',
          validationErrors: theTrip.errors
        });
        return;
      }

      if(err) {
        console.log('Error POSTING trip', err);
        res.status(500).json({ errorMessage: 'New trip went wrong 💩' });
      }

      res.status(200).json(theTrip);
    });

});

router.get('/trips/:tripId', (req, res, next) => {
  TripModel.findById(
    req.params.tripId,
    (err, tripFromDB) => {
      if (err) {
        console.log('Trip details ERROR');
        res.status(500).json({ errorMessage: 'Trip details went wrong'});
        return;
      }
      res.status(200).json(tripFromDB);
    }
  );
});

router.put('/trips/:tripId', (req, res, next) => {
  TripModel.findById(
    res.params.tripId,
    (err, tripFromDB) => {
      if (err) {
      console.log('Trip details ERROR');
      res.status(500).json({ errorMessage: 'Trip details went wrong' });
      return;
    }
    tripFromDB.set({
      name:  req.body.tripName,
      image: req.body.tripImage,
      date:  req.body.tripDate
    });

    tripFromDB.save((err) => {
      if (tripFromDB.errors) {
        res.status(400).json({
          errorMessage: 'Validation failed',
          validationErrors: tripFromDB.errors
        });
        return;
      }

      if (err) {
        console.log('Trip details ERROR');
        res.status(500).json({ errorMessage: 'Trip details went wrong' });
        return;
      }

      res.status(200).json(tripFromDB);

    });
    }
  );
});


router.delete('/trips/:tripId', (req, res, next) => {

  TripModel.findByIdAndRemove(
    req.params.tripId,
    (err, tripFromDB) => {
      if (err) {
        console.log('Trip delete ERROR', err);
        res.status(500).json({ errorMessage: 'Trip delete went wrong' });
        return;
      }
      res.status(200).json(tripFromDB);
    }
  );
});

module.exports = router;
