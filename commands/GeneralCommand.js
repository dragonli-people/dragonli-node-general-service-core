
module.exports = {
    'hello':(app,msg)=>`hello world!:::${msg}`,
    'handling':app=>`[${app.handlingCount0},${app.handlingCount1},${app.handlingCount2},${app.handlingCount3}]`,
}