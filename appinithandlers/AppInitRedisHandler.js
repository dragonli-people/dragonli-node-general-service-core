const {RedisHandlerFactory} = require('dragonli-node-tools');

module.exports = class  {
    constructor(varName,hostEnvKey,portEnvKey,hostConfigKey,portConfigKey){
        this.HANDLER_KEY = varName;
        this.varName = varName;
        this.hostEnvKey = hostEnvKey;
        this.portEnvKey = portEnvKey;
        this.hostConfigKey = hostConfigKey;
        this.portConfigKey = portConfigKey;
    }

    async init(app,DATA_POOL,CONFIG_POOL){
        var host = ( this.hostEnvKey && process.env[this.hostEnvKey] ) || ( this.hostConfigKey && CONFIG_POOL[this.hostConfigKey] );
        var port = ( this.portEnvKey && process.env[this.portEnvKey] ) || ( this.portConfigKey && CONFIG_POOL[this.portConfigKey] );
        port = port && parseInt(port) || null;
        if(!host || !port)return;
        var redisHandler = await RedisHandlerFactory.create(host,port);
        DATA_POOL[this.varName] = redisHandler;
        console.log(` === auto init RedisHandler:[${this.varName}] started done === `);
    }
}