const {AppConfig,AssertCheck,sleep} = require('dragonli-node-service-core');
const InitTelnetCommand = require('../appinithandlers/InitTelnetCommand');
const GeneralCommand = require('../commands/GeneralCommand');
const HttpPortConfig = require('./HttpPortConfig');
const TelnetCommandConfig = require('./TelnetCommandConfig');
const CorsFilter = require('../filters/CorsFilter');

module.exports = class extends AppConfig {
    constructor(){
        super();
        this.addAppInitConfigHandlers([HttpPortConfig,TelnetCommandConfig]);
        this.addAppInitHandlers([
            InitTelnetCommand,
            {HANDLER_KEY:'assertCheck',init:app=>app.putToPool('assert',AssertCheck)},
            {HANDLER_KEY:'sleep',init:app=>app.putToPool('sleep',sleep)},
        ]);
        this.registerCommand(GeneralCommand);
        this.addControllerFilterHandlers([CorsFilter]);
        this.addControllerIocKeys(['assert','sleep']);//auto ioc those variables

    }
}