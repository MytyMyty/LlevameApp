import { HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';

const HttpError = require('http-errors');

const axios = require('axios');

const API_KEY = environment.googleMapsApiKey;

async function getCoordsForAddress(address) {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${API_KEY}`
    );
    const data = response.data
    
    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError(404, 'Address not found');
        throw error;
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordsForAddress;



