const fs = require('fs');
const agentDownloader = require('./index');


const agentName = 'agent_foo';
const developerToken = 'abc123';

agentDownloader.getSummary(agentName, developerToken)
    .then(summary => {
      fs.writeFileSync(`./${agentName}.json`, JSON.stringify(summary));
      console.log(`=> Saved summary for ${agentName} with:`);
      console.log(`=> ${summary.entities.length} entities`);
      console.log(`=> ${summary.intents.length} intents`);
    })
    .catch(e => {
      console.error(e);
    });
