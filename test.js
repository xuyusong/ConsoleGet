



$.ajax({url:"/realtimectrl/loadCmdHistory?type=0",method:"POST",async:false});

$.ajax({
    url:'/realtimectrl/loadCmdHistory?type=0',
    type:'POST',
    data:{"search.dnum_eq":"512449021",page:1,rows:1,sort:"updateDate",order:"desc"},
    dataType:'json',
    async:false,
    success:function(result) {
        jsons = eval(result.rows);
        var isSucess = jsons[0].down;
        if(isSucess ==null||undefined||""){
            console.error("error");
        }else{
            if(isSucess == true){
                // for (var v in jsons){
                //     for (var key in jsons[v]){
                //         console.log("[" + jsons[v][key] + "]");
                //         if(typeof(jsons[v][key])=="object"){
                //             console.log("obj");
                //         }
                //         if(typeof(jsons[v][key])=="string") {
                //             console.log("string");
                //         }
                //     }
                // }
                var updateParam = jsons[0].upParameter;
                console.log(updateParam);
                var res = /http:.*txt/;
                var arr = new Array();
                var arr= res.exec(updateParam);
                var url = arr[0].replace(/file.acs.huan.tv/,"admin.acs.huan.tv");
                console.log(url);
            }else{
                console.error("down is fail");
            }
        }
    }
});