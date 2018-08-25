import fs from 'fs'

const config = {}

config.settings = JSON.parse(fs.readFileSync(__dirname + '/../settings.json'))
config.certs = {
  main: fs.readFileSync(__dirname + '/cert.pem'),
  key: fs.readFileSync(__dirname + '/key.pem')
}

export default config