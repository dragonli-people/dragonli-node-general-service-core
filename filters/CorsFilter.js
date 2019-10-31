

module.exports = async function (controller, request,response,app) {



    var host =  request.headers.origin;
    response.header('Access-Control-Allow-Origin', host);
    response.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,credentials,X-XSRF-TOKEN');
    response.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    response.header('Access-Control-Allow-Credentials','true');
    response.header('X-Powered-By',' 3.2.1')
    response.header('Content-Type', 'application/json;charset=utf-8');


    if(request.method.toLocaleLowerCase() !== 'options')
        return true;
    response.send('options');
    return false;

}