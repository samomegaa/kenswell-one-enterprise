'use strict';
function createConflict(c){return Object.freeze({...c,resolution:c.resolution||'pending'});}
module.exports={createConflict};
