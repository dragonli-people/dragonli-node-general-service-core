const {Crypto} = require('dragonli-node-tools');
const UUID  = require('uuid');

module.exports = class  {
    constructor(privateKey,timeout){
        this.privateKey = privateKey;
        this.timeout = timeout || 315360000000;
    }

    generateUniqueId(uid){return uid ? `U-${uid}` : `G-${UUID.v1()}`}
    signOrigin(uniqueId,uid,code,time,privateKey){ return `${uniqueId}|${uid}|${code}|${time}|${privateKey}` };
    generateSign(uniqueId,uid,code,time,privateKey){ return Crypto.sha1(this.signOrigin(uniqueId,uid,code,time,privateKey)) };

    async validateAndRefresh(authDto, refreshTime, autoGenerate, privateKey,timeout) {
        if (!authDto.uniqueId || !(authDto.uid = parseInt(authDto.uid) || authDto.uid < 0)
            || !(authDto.time = parseInt(authDto.time)) || !authDto.sign) return null;
        privateKey = privateKey || this.privateKey
        timeout = timeout || this.timeout;
        var rightSign = this.generateSign(authDto.uniqueId, authDto.uid, authDto.code, authDto.time, privateKey);
        var now = Date.now(),validate = authDto.sign === rightSign,hadTimeout = Math.abs(now - authDto.time) > timeout;
        if (validate && !hadTimeout) return authDto;// validate passed
        if (validate && hadTimeout && refreshTime) {// let it passed
            authDto.sign = this.generateSign(authDto.uniqueId, authDto.uid, authDto.code, now, privateKey);
            authDto.time = now;
            return authDto;
        }
        //now , cant be passed
        if (autoGenerate) return this.generate(null, 0, "", privateKey);
        return null;
    }

    generate(uniqueId, uid,code, privateKey) {
        code = code || '';
        privateKey = privateKey || this.privateKey;
        uniqueId = uniqueId || this.generateUniqueId(uid) ;
        var time = Date.now(),authDto = {uniqueId,uid,code,time},sign = this.generateSign(uniqueId,uid,code,time,privateKey);
        authDto.sign = sign;
        return authDto
    }
};