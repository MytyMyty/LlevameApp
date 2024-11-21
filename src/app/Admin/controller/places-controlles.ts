const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const HttpError = require('http-errors');
const getCoordsForAddress = require('../../environments/locations');

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    
    if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404);
    }
    res.json({ place });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { title, description, address,creator} = req.body;

    let coordinates;
    try {
        coordinates = await getGeolocation(address);
    } catch (error) {
        return next(error);
    }
    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        creator
    };
    }