const express = require('express');

const TripModel = require('../models/trips-model');

const router = express.Router();

router.get('/trips', (req, res, next) => {
  TripModel.find()
  (err, recentTrips) => {
    if(err) {
      console.log('Error finding trips', err);
      res.status(500).json({errorMessage: 'Finding trips went wrong'});
      return;
    }
    res.status(200).json(recentTrips);
  }
});

router.post('trips', (req, res, next) => {
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
