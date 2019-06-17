var request = require('request');
var fs = require('fs');

var gdqrun = {
    url:'https://gamesdonequick.com/tracker/search/?type=run&event=26',
    method: 'GET',
    json:true
}
request(gdqrun, function (error, response, body) {
    let output={};
    body.forEach((element)=>{
        output[element.pk]={
            "tw": element.fields.name,
            "sr": ""
        }
    });
    output['logo'] = "";
    output['yetee_link'] = "";
    output['gdq_link'] = "";
    let data = JSON.stringify(output, null, 4);

    fs.writeFile('tw.json', data, (err) => {  
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('saved!');
    });
});

