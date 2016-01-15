#fis3-deploy-i18n-template
A i18n deploy plugin for [fis3](http://fis.baidu.com/) to push static resource to cdn 

## configuration

```
fis.match('*.{png,jpg,css,js}', {
    release: '/your-base-path$0',
    useDomain: true,
    domain: 'http://img.phone.baidu.com/public/uploads/fe'
});


fis.match('**', {
    deploy: [
        //upload to cdn
        fis.plugin('cdn-httpupload',{
            cdnUrl:'your-cdn-interface',
            basePath:  'your-base-path',
            fileType: ['.png','.jpg','css','js'],
        }),
        //deliver
        fis.plugin('local-deliver',{to:'./publish'}),
    ]
});
```
