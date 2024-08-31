const fs = require('fs');  //file system
const path = require('path');

function route(pathname, handle, response, catId){
    console.log('pathname: ' + pathname);

    // 경로가 올바르면
    if (typeof handle[pathname] == 'function'){
        handle[pathname](response, catId);
    } else{
        const filePath = path.join(__dirname, pathname);

        fs.readFile(filePath, function(err, data){
            if (err){ //에러가 있으면
                console.log('No request handler found for ' + pathname);

                response.writeHead(404, {'Content-Type' : 'text/html'});
                response.write('Not Found');
                response.end();
                return;
            }

            response.writeHead(200);  //정상신호
            response.write(data);
            response.end();
        })
    }
    
}

exports.route = route;