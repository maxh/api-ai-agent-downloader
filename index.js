const fs = require('fs');
const Promise = require('promise');

const ThrottledFetcher = require('./ThrottledFetcher');

const API_AI_URL_BASE = 'https://api.api.ai/v1/';
const API_AI_VERSION = '2015091';

// Shared fetcher for request throttling.
const fetcher = new ThrottledFetcher();


const getSummary = (name, developerToken) => {

  const fetchResource = (resource) => {
    const url = API_AI_URL_BASE + resource + '?v=' + API_AI_VERSION;
    const options = { headers: { authorization: 'Bearer ' + developerToken } };
    return fetcher.fetch(url, options);
  };

  const entityIndexPromise = fetchResource('entities');
  const intentIndexPromise = fetchResource('intents');

  return Promise.all([ entityIndexPromise, intentIndexPromise ]).then((values) => {
    const [ entityIndex, intentIndex ] = values;

    const entityIds = entityIndex.map(item => item.id);
    const intentIds = intentIndex.map(item => item.id);

    const entityPromises = entityIds.map(id => fetchResource('entities/' + id));
    const intentPromises = intentIds.map(id => fetchResource('intents/' + id));

    const entitiesPromise = Promise.all(entityPromises);
    const intentsPromise = Promise.all(intentPromises);

    return Promise.all([ entitiesPromise, intentsPromise ]);
  }).then((values) => {
    let [ entities, intents ] = values;
    entities = entities.filter(entity => Boolean(entity));
    intents = intents.filter(intent => Boolean(intent));
    return { name, entities, intents };
  }).catch((error) => {
    console.error(error);
  });
};

module.exports = {
  getSummary
};
