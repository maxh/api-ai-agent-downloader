# API.AI Agent Downloader

Download your API.AI agent intents and entities for backup or analysis.

## Usage

```js
const agentDownloader = require('api-ai-agent-downloader');
const fs = require('fs');

const agentName = 'agent_foo';
const developerToken = 'abc123';

agentDownloader.getSummary(agentName, developerToken).then(summary => {
  fs.writeFileSync('./agent_foo.json', JSON.stringify(summary));
});
```

Note: Requests are throttled to 1 per second to avoid exceeding API.AI usage limits.

## Summary format

An agent summary is an object with three keys:

  - `name`: The name of the agent.
  - `entities`: An array of the agent's [entity objects](https://docs.api.ai/docs/entities#entity-object).
  - `intents`: An array of the agent's [intent objects](https://docs.api.ai/docs/intents#intent-object).

For example, something like:

```js
{
  name: 'pizzeria',
  entities: [
    {
      id: 'abc123',
      name: 'topping',
      entries: [
        {
          value: 'mushrooms',
          synonyms: ['mushrooms', 'shrooms', 'white mushrooms'],
        },
        ...
      ]
    },
    ...
  ],
  intents: [
    {
      id: 'def456',
      name: 'order pizza',
      userSays: [...],
    },
    ...
  ]
}
```
