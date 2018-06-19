const fs = require('fs');
const path = require('path');
const environment = process.env.ENV;
const isProd = environment === 'prod';
const targetPath = path.join(__dirname + '/environments/environment.heroku.ts');
const envConfigFile = `
export const environment = {
  production: ${isProd},
  baseUrl: '${process.env.API_URL}',
  emailsUrl: '${process.env.EMAILS_URL}'
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Environment config generated at ${targetPath}. Environment mode is ${environment} `);
  console.log(envConfigFile);
});