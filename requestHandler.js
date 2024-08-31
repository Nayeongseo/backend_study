const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const adoptionlist_view = fs.readFileSync('./adoptionlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

//요청처리
function main(response){
    console.log('main');

    mariadb.query("select * from product", function(err, rows){
        console.log(rows);
    })

    //head
    response.writeHead(200, {'Content-Type': 'text/html'});
    //body
    response.write(main_view);
    //전송함
    response.end();
}

function BagCat(response){
    fs.readFile('./img/BagCat.jpeg', function(err, data){
        // head
        response.writeHead(200, {'Content-Type' : 'text/html'});
        // body다 
        response.write(data);
        // 전송함 
        response.end();
    })
}

function HulaHoopCat(response){
    fs.readFile('./img/HulaHoopCat.jpeg', function(err, data){
        // head
        response.writeHead(200, {'Content-Type' : 'text/html'});
        // body다 
        response.write(data);
        // 전송함 
        response.end();
    })
}

function PhoneCat(response){
    fs.readFile('./img/PhoneCat.jpeg', function(err, data){
        // head
        response.writeHead(200, {'Content-Type' : 'text/html'});
        // body다 
        response.write(data);
        // 전송함 
        response.end();
    })
}

function adoption(response, catId){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    if (catId == 1){
        var catName ='Bag Cat';
        var catAge = 3;
    }
    if (catId == 2){
        var catName = 'HulaHoop Cat';
        var catAge = 2;
    }
    if (catId == 3){
        var catName = 'Phone Cat';
        var catAge = 5;
    }

    mariadb.query("INSERT INTO petCat VALUES(?, ?, ?)", [catName, catId, catAge], function(err, rows){
        console.log(rows);
    });

    response.write('Adopted!');
    response.end();
}

function adoptionlist(response){
    console.log('adoptionlist');
    response.writeHead(200, {'Content-Type' : 'text/html'});

    
    mariadb.query("SELECT * FROM petCat", function(err, rows){
        response.write(adoptionlist_view);
        //반복문
        console.log(rows);
        
        let number_1 = 0;
        let number_2 = 0;
        let number_3 = 0;
        rows.forEach(element => {
            if (element.number == 1){
                number_1 += 1;
            }
            if (element.number == 2){
                number_2 += 1;
            }
            if (element.number == 3){
                number_3 += 1;
            }
        });
        if (number_1 > 0) {
            response.write("<tr>"
                + "<td style='text-align: center;'>" + 'Bag Cat' + "</td>"
                + "<td style='text-align: center;'>" + number_1 + "</td>"
                + "<td style='text-align: center;'>" + '3' + "</td>"
                + "</tr>");
        }
        if (number_2 > 0) {
            response.write("<tr>"
                + "<td style='text-align: center;'>" + 'HulaHoop Cat' + "</td>"
                + "<td style='text-align: center;'>" + number_2 + "</td>"
                + "<td style='text-align: center;'>" + '2' + "</td>"
                + "</tr>");
        }
        if (number_3 > 0) {
            response.write("<tr>"
                + "<td style='text-align: center;'>" + 'Phone Cat' + "</td>"
                + "<td style='text-align: center;'>" + number_3 + "</td>"
                + "<td style='text-align: center;'>" + '5' + "</td>"
                + "</tr>");
        }
        
        response.write("</table>");
        response.end();

    })
}


let handle = {};
handle['/'] = main;
handle['/adoption'] = adoption;
handle['/adoptionlist'] = adoptionlist;
handle['/adoptionlist.html'] = adoptionlist;

handle['/img/BagCat.jpeg'] = BagCat;
handle['/img/HulaHoopCat.jpeg'] = HulaHoopCat;
handle['/img/PhoneCat.jpeg'] = PhoneCat;


exports.handle = handle;