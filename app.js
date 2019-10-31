const {AppWithExpress} = require('dragonli-node-service-core');
const AppConfig = require('./configs/AppConfig');

var port = 3002;
class Controller1 {
    async index(){
        return {msg:'welcome! ',port};
    }

    async hello(){
        return {num:Math.random()};
    }
}
const routerConf = [
    {url:'/',clz:Controller1,method:'index',template:'demo.ejs'},
    {url:'/ajax/test',clz:Controller1,method:'hello'},
];

process.env.HTTP_PORT = port;
process.env.TELNET_COMMAND_PORT=30002;
const config = new AppConfig();
config.setViewFolder('views');
config.addRoutesConfig(routerConf);
(new AppWithExpress()).start(config);
