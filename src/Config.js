'use strict';

let config = null;
try
{
  config = require('../config.json');
}
catch(err)
{
  if (err.code === 'MODULE_NOT_FOUND')
  {
    console.log('config.json not found! Please use the template to create a configuration file.');
    process.exit(1);
  }
  throw err;
}

module.exports = config;