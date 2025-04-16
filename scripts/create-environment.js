import fs from 'fs';

const envConfig = `
export const environment = {
  production: true,
  host: '${process.env['host']}',
  apiPlayers:'${process.env['apiPlayers']}',
  
  geoApi:'${process.env['geoApi']}',
  geoKey:'${process.env['geoKey']}',
  geoUrl:'${process.env['geoUrl']}',
  mapUrl:'${process.env['mapUrl']}',
  
  apiGames:'${process.env['apiGames']}',
  idLEC:'${process.env['idLEC']}',
  idLCK:'${process.env['idLCK']}',
  idLPL:'${process.env['idLPL']}',
  idLCP:'${process.env['idLCP']}',
  idNorth:'${process.env['idNorth']}',
  idSouth:'${process.env['idSouth']}',
  idWorlds:'${process.env['idWorlds']}',
  idMSI:'${process.env['idMSI']}',

  esportsUrl:'${process.env['esportsUrl']}',
  esportsEn:'${process.env['esportsEn']}',
  esportsEsp:'${process.env['esportsEsp']}',
};`;

fs.writeFileSync('src/environments/environment.prod.ts', envConfig);