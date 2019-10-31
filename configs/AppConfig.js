const {AppConfig} = require('dragonli-node-service-core');
const InitTelnetCommand = require('../appinithandlers/InitTelnetCommand');
const GeneralCommand = require('../commands/GeneralCommand');
const HttpPortConfig = require('./HttpPortConfig');
const TelnetCommandConfig = require('./TelnetCommandConfig');
const CorsFilter = require('../filters/CorsFilter');

module.exports = class extends AppConfig {
    constructor(){
        super();
        this.addAppInitConfigHandlers([HttpPortConfig,TelnetCommandConfig]);
        this.addAppInitHandlers([InitTelnetCommand]);
        this.registerCommand(GeneralCommand);
        this.addControllerFilterHandlers([CorsFilter]);
    }
}