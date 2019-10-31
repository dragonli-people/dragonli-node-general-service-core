const {TelnetFactory} = require('dragonli-node-tools');


module.exports = function (app) {

    var commands = app.config.commands || {};
    function telnetMessageHandler(key,...paras){
        var cmd = commands[key];
        if(!cmd)return null;
        try{
            return cmd(app,...paras);
        }catch (e) {
            return null;
        }
    }

    var port = app.getConfigFromPool('TELNET_COMMAND_PORT');
    if(!port)return;
    TelnetFactory.create(port,telnetMessageHandler);
}