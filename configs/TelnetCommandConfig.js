module.exports = function (app) {
    process.env.TELNET_COMMAND_PORT && (app.putConfigToPool('TELNET_COMMAND_PORT',parseInt(process.env.TELNET_COMMAND_PORT)));
    // putToPool putConfigToPool
}