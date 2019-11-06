const {MysqlHandlerFactory} = require('dragonli-node-tools');

module.exports = class  {
    constructor(varName,...paras){
        var hostConfigKey,portConfigKey,dbConfigKey,userConfKey,passwdConfKey,keyIsValue=false,jdbcUrl=null;
        if(paras.length === 5 || paras.length === 6)
            [hostConfigKey,portConfigKey,dbConfigKey,userConfKey,passwdConfKey,keyIsValue] = paras;
        if(paras.length === 3 || paras.length === 4)
            [jdbcUrl,userConfKey,passwdConfKey,keyIsValue] = paras;

        keyIsValue=keyIsValue||false
        this.HANDLER_KEY = varName;
        this.varName = varName;
        this.jdbcUrl = jdbcUrl;
        this.hostConfigKey = hostConfigKey;
        this.portConfigKey = portConfigKey;
        this.userConfKey = userConfKey;
        this.passwdConfKey = passwdConfKey;
        this.dbConfigKey = dbConfigKey;
        this.keyIsValue = keyIsValue;
    }

    async init(app,DATA_POOL,CONFIG_POOL){
        var jdbcUrl = this.jdbcUrl ,host = this.hostConfigKey,port = this.portConfigKey
            ,user = this.userConfKey,passwd = this.passwdConfKey,db = this.dbConfigKey;
        if( !this.keyIsValue ){
            jdbcUrl = jdbcUrl && CONFIG_POOL[jdbcUrl] ;
            host = host && CONFIG_POOL[host] ;
            port = port && CONFIG_POOL[port] ;
            user = user && CONFIG_POOL[user] ;
            passwd = passwd && CONFIG_POOL[passwd] ;
            db = db && CONFIG_POOL[db] ;
        }
        if(jdbcUrl)
            [host,port,db] = jdbcUrl.replace(/^.*mysql\:\/\//gi,'').replace(/\?.*$/gi,'').replace(':','\/').split('\/');
        port = port && parseInt(port) || null;
        if(!host || !port || !user || !passwd || !db)
            throw new Error(`one of parameter is empty ! host:${host} , port:${port} , user:${user} , passwd:${passwd} , db:${db} `);
        var mysqlHandler = await MysqlHandlerFactory.create(host,port,user,passwd,db);
        DATA_POOL[this.varName] = mysqlHandler;
        console.log(` === auto init mysqlHandler:[${this.varName}] started done === `);
    }
}