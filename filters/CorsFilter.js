

module.exports = async function (controller,context,controllerIocKeys, request, response, config, app) {

    // http://www.0x55aa.com/%E7%AE%97%E6%B3%95-%E7%BC%96%E7%A8%8B/1774.html

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