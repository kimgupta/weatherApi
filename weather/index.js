const http=require("http");
const fs=require("fs");
const requests=require("requests");

const homeFile=fs.readFileSync("home.html","utf-8")
const replaceval=(tempVal,orgVal)=>{
    let temp=tempVal.replace("{%tempval%}",orgVal.main.temp)
     temp=temp.replace("{%tempmin%}",orgVal.main.temp_min)
     temp=temp.replace("{%tempmax%}",orgVal.main.temp_max)
     temp=temp.replace("{%location%}",orgVal.name)
     temp=temp.replace("{%country%}",orgVal.sys.country)
    //  temp=temp.replace("{%tempStatus%}",orgVal.weather)


return temp;

}
const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid=bede5c7699e4482dfce7f1e5a7948255 ")
        .on("data",(chunk)=>{
            const objData=JSON.parse(chunk)
            const arrData=[objData]
            // console.log(arrData[0].main.temp);
            const realTimeData=arrData.map((val)=>{
                   replaceval(homeFile,val)
            }).join(" ")
            res.write(realTimeData);
        })
        .on("end",(err)=>{
            if(err)
            return console.log("connections closed due to errors",err);
              res.end();
        })
        
    }

    
})
server.listen(8000,"127.0.0.1");