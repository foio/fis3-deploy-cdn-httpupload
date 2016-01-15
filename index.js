'use strict';
var req = require("request");
var stream = require('stream');
module.exports = function (options, modified, total, next) {
    if(!options.cdnUrl){
        throw 'cdnUrl is needed';
    }
    if(!options.basePath){
        throw 'basePath is needed';
    }
    if(!options.fileType || !Array.isArray(options.fileType)){
        throw 'fileType should be a array';
    }

    modified.reduceRight(function (_, file, index) {
        if(options.fileType.indexOf(file.ext) >= 0){
            var bufferStream = new stream.PassThrough(); 
            var remotePath = options.cdnUrl+options.basePath+file.subpath;
            bufferStream.end(file.getContent());
            bufferStream.pipe(req.put(remotePath));
            bufferStream.on('finish',function(){
                console.log(file.subpath+'--->'+remotePath);
            });
        }
    }, null);
    next();
};
