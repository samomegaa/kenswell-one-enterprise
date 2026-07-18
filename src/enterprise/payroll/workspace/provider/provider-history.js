'use strict';
function createHistory(events=[]){return Object.freeze(events.map(e=>Object.freeze({...e})));}
module.exports={createHistory};
