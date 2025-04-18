const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;



/**
 * 
 * @param {String} routeName the pathname of the route to display/hit.
 * @param {Number} mode the mode to differentiate what html is put in.
 * @returns an "a" HTML element with a different prefix element depending on the mode.
 */

const setRoute = (routeName, mode=0) => {
    let result = ``
    switch(Math.round(mode)) {
        case(0):
            result = `<br><a href="/${routeName}">/${routeName}</a>`;
            break;
        case(1):
            result = `<a href="/${routeName}">/${routeName}</a>`;
            break;
        case(2):
            result = `<li><a href="/${routeName}">/${routeName}</a></li>`;
            break;
    }
    return result; 
};

module.exports = { mongoose, Schema, model, setRoute,}