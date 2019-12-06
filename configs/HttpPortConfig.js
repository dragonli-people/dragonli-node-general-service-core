class HttpPortConfig {
    constructor(portConfigPath,varName){
        portConfigPath && ( HttpPortConfig.portConfigPath = portConfigPath );
        this.HANDLER_KEY = varName || 'HttpPortConfig';
    }

    async init(app,DATA_POOL,CONFIG_POOL){
        var port = process.env.HTTP_PORT || app.config.port;
        HttpPortConfig.portConfigPath && ( port = CONFIG_POOL[HttpPortConfig.portConfigPath] || port );
        port && (app.putConfigToPool('HTTP_PORT',parseInt(port)));
        port && (app.config.setPort(port));
    }
};
module.exports = HttpPortConfig;