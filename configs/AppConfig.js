const {AppConfig,AssertCheck} = require('dragonli-node-service-core');
const {sleep,GeneralUtil} = require('dragonli-node-tools');
const InitTelnetCommand = require('../appinithandlers/InitTelnetCommand');
const GeneralCommand = require('../commands/GeneralCommand');
const HttpPortConfig = require('./HttpPortConfig');
const TelnetCommandConfig = require('./TelnetCommandConfig');
const CorsFilter = require('../filters/CorsFilter');

module.exports = class extends AppConfig {
    constructor(){
        super();
        this.addAppInitConfigHandlers([new HttpPortConfig(),TelnetCommandConfig]);
        this.addAppInitHandlers([
            InitTelnetCommand,
            {HANDLER_KEY:'assertCheck',init:app=>app.putToPool('assert',AssertCheck)},
            {HANDLER_KEY:'sleep',init:app=>app.putToPool('sleep',sleep)},
            {HANDLER_KEY:'getObjectFromPara',init:app=>app.putToPool('getObjectFromPara',function (key) {
                    return GeneralUtil.getObjectByPrefix(this.paras,key);
            })},

        ]);
        this.registerCommand(GeneralCommand);
        this.addControllerFilterHandlers([CorsFilter]);
        this.addControllerIocKeys(['assert','sleep','getObjectFromPara']);//auto ioc those variables

    }
}