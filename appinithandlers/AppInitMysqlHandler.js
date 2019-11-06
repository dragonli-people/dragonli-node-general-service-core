const {MysqlHandlerFactory} = require('dragonli-node-tools');

module.exports = class  {
    constructor(varName,hostConfigKey,portConfigKey,userConfKey,passwdConfKey,dbConfigKey,keyIsValue=false){
        this.HANDLER_KEY = varName;
        this.varName = varName;
        this.hostConfigKey = hostConfigKey;
        this.portConfigKey = portConfigKey;
        this.userConfKey = userConfKey;
        this.passwdConfKey = passwdConfKey;
        this.dbConfigKey = dbConfigKey;
        this.keyIsValue = false;
    }

    async init(app,DATA_POOL,CONFIG_POOL){
        var host = this.hostConfigKey,port = this.portConfigKey
            ,user = this.userConfKey,passwd = this.passwdConfKey,db = this.dbConfigKey;
        if( !this.keyIsValue ){
            host = host && CONFIG_POOL[host] ;
            port = port && CONFIG_POOL[port] ;
            user = user && CONFIG_POOL[user] ;
            passwd = passwd && CONFIG_POOL[passwd] ;
            db = db && CONFIG_POOL[db] ;
        }
        port = port && parseInt(port) || null;
        if(!host || !port || !user || !passwd || !db)
            throw new Error(`one of parameter is empty ! host:${host} , port:${port} , user:${user} , passwd:${passwd} , db:${db} `);
        var mysqlHandler = await MysqlHandlerFactory.create(host,port,user,passwd,db);
        DATA_POOL[this.varName] = mysqlHandler;
        console.log(` === auto init mysqlHandler:[${this.varName}] started done === `);
    }
}