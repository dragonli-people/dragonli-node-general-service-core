const {AppWithExpress} = require('dragonli-node-service-core');
const AppConfig = require('./configs/AppConfig');

var port = 3002;

function exampleInjectedVariables(app){
        app.putToPool('valueInitOnAppStart',1024)
}

class Controller1 {
    async index(){
        return {msg:'welcome! ',port};
    }

    async hello(){
        return {num:Math.random(),time:this.lastTime,initValue:this.valueInitOnAppStart};
    }
}

class Task1 {
    async updateLastTime(){
        var str = (new Date()).format('yyyy-MM-dd hh:mm:ss');
        //put to pool to injected variables,and controller will be auto ioc this variable
        this.app.putToPool('lastTime',str );
    }
}

const routerConf = [
    {url:'/',clz:Controller1,method:'index',template:'demo.ejs'},
    {url:'/ajax/test',clz:Controller1,method:'hello'},
];

const taskConf = {
    testTask:{clz:Task1, method:'updateLastTime', interval:5000},
}


const config = new AppConfig();

//should pass by cmd env paras
process.env.HTTP_PORT = port;
process.env.TELNET_COMMAND_PORT=30002;
//just for test.
config.setViewFolder('views');
config.setStaticFolder('public','/static');

config.addRoutesConfig(routerConf);
config.addTaskConfig(taskConf);
config.addAppInitConfigHandlers([exampleInjectedVariables]);//Injected variables
config.addControllerIocKeys(['lastTime','valueInitOnAppStart']);//auto ioc those variables

(new AppWithExpress()).start(config);
