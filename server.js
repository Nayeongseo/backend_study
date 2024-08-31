let http = require('http');  //http 통신하려고 가져오기
let url = require('url');  //js에서 제공. url 사용하겠다.

// index.js에서 start를 하면 onRequest를 실행하도록
function start(route, handle){
    function onRequest(request, response){
        //url에 있는 pathname을 잡아온다(parse)
        //url: localhost:7777/order?/adoption=1이면, order를 잡아옴
        let pathname = url.parse(request.url).pathname;
        //query를 받아옴. 위의 url일 때, 1을 받아옴.
        let queryData = url.parse(request.url, true).query;

        console.log('Received request for '+ pathname + ' with catId' + queryData.catId);

        route(pathname, handle, response, queryData.catId);

        //head에는 통신 상태가 들어감 ex. 200, 400 등
    }

    //onRequest함수로 통신, 포트 번호는 7777
    http.createServer(onRequest).listen(7777);
}

exports.start = start;