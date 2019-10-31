module.exports = function (app) {
    var port = process.env.HTTP_PORT || app.config.port;
    port && (app.putConfigToPool('HTTP_PORT',parseInt(port)));
    port && (app.config.setPort(port));
}