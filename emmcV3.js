var arrayId = new Array();
var offlineArray = new Array();
arrayId[0] = "512449900"
arrayId[1] = "511750438"
arrayId[2] = "512763368"
arrayId[3] = "512879112"
arrayId[4] = "512330122"
arrayId[5] = "512990289"
arrayId[6] = "512332470"
arrayId[7] = "512853491"
arrayId[8] = "512449021"
arrayId[9] = "512473112"
arrayId[10] = "512362520"
arrayId[11] = "511864639"
arrayId[12] = "512363171"
arrayId[13] = "510554850"
//add by xuyusong 8-15
arrayId[14] = "512471993"
arrayId[15] = "512625007"
arrayId[16] = "512763561"
arrayId[17] = "513147018"
arrayId[18] = "511714958"
arrayId[19] = "511943363"
arrayId[20] = "511763580"
arrayId[21] = "512325870"
arrayId[22] = "513119651"
arrayId[23] = "513622122"
arrayId[24] = "511873526"
arrayId[25] = "512864058"
arrayId[26] = "512373498"
//add 8-21
arrayId[27] = "513032668"
arrayId[28] = "511946682"
//add by xuyusong 8-22
arrayId[29] = "512469035"
arrayId[30] = "512853356"




var countNULL = 0;
var IDlength = arrayId.length;
var onLineLength = 0;
var refrashFlag = 20;
var offLineLength = offlineArray.length;
var realtimeCtrlTimer1 ="";
var innerText = "";

var indexOnline = 0;
var indexOffline = 0;
var count = 0;
var isOffLine = false;
var opts ="";
showContrl(arrayId[0]);
function showContrl(id){
    clearTimeout(realtimeCtrlTimer1);//关闭定时器
    parent.realtimeSelectedDnum = id;
    // opts ="";
    // opts = {
    //     title: '控制终端:'+id+'',
    //     href: '/realtimectrl/create',
    //     width: 1200,
    //     height: 700,
    //     closable: true,
    //     modal: true,
    //     top: (screen.height - 800) / 2,
    //     left: (screen.width - 1200) / 2,
    //     onLoad: function () {
    //         //parent.$("#editForm").form('load', id);
    //     },
    //     onClose: function () {
    //         parent.closeEditFormWin();
    //     }
    // };
    // showWindow(opts);
    commandTimer(id);
}
function commandTimer(id) {
    var sendCom=sendCommand(id,true);
    setTimeout(sendCom,3000);
}

var arrayId = new Array();
var offlineArray = new Array();
arrayId[0] = "512449900"
arrayId[1] = "511750438"
arrayId[2] = "512763368"
arrayId[3] = "512879112"
arrayId[4] = "512330122"
arrayId[5] = "512990289"
arrayId[6] = "512332470"
arrayId[7] = "512853491"
arrayId[8] = "512449021"
arrayId[9] = "512473112"
arrayId[10] = "512362520"
arrayId[11] = "511864639"
arrayId[12] = "512363171"
arrayId[13] = "510554850"
//add by xuyusong 8-15
arrayId[14] = "512471993"
arrayId[15] = "512625007"
arrayId[16] = "512763561"
arrayId[17] = "513147018"
arrayId[18] = "511714958"
arrayId[19] = "511943363"
arrayId[20] = "511763580"
arrayId[21] = "512325870"
arrayId[22] = "513119651"
arrayId[23] = "513622122"
arrayId[24] = "511873526"
arrayId[25] = "512864058"
arrayId[26] = "512373498"
//add 8-21
arrayId[27] = "513032668"
arrayId[28] = "511946682"
//add by xuyusong 8-22
arrayId[29] = "512469035"
arrayId[30] = "512853356"




var countNULL = 0;
var IDlength = arrayId.length;
var onLineLength = 0;
var refrashFlag = 20;
var offLineLength = offlineArray.length;
var realtimeCtrlTimer1 ="";
var innerText = "";

var indexOnline = 0;
var indexOffline = 0;
var count = 0;
var isOffLine = false;
var opts ="";
// showContrl(arrayId[0]);

sendCommand(445731738,true)
function sendCommand(id,flag){
    if(count == 0 || isOffLine){
        command = "ps |grep iopp|while read u p o;do kill -9 $p;done;./tvos/bin/iopp.sh;ps |grep iopp";
    }else {
        command = "logcat -s iopp";
    }
    command = "logcat ";

    console.log(command);
    var cmd ="Command";
    var dnum = id;
    var paramKey= "NameAndParam#";
    var paramValue= command+"#";
    $.ajax({
        //type: "POST",
        method: 'POST',
        dataType: "json",
        url: "/realtimectrl/sendmsg",
        timeout : 2000 ,//超时时间设置，单位毫秒
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data: {
            dnum: dnum,
            cmd: cmd,
            downParameter: paramKey,
            upParameter: paramValue,//便于传递参数
            id: null
        },
        success: function (data) {//返回命令在数据库中的id
            if (cmd != "Remote") {//遥控器没有返回结果
                setSendMsgDisable(10);
                // 成功后刷新历史记录
                loadCmdHistory();
                // 清空参数
                $("#msg").val(null);
                $("#nav3").val(null);
            } else {
                // 遥控器间隔时间设置成1秒
                setSendMsgDisable(1);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.error("超时，请重新登录");
            console.error(XMLHttpRequest.status);
            console.error(XMLHttpRequest.readyState);
            console.error(textStatus);
           // offLine();
        }
    });
    // $('#cmdResult').html("");//清空当前数据
    // $('#picResult').attr("src", "");
}

//发送命令10s内不能发送
function setSendMsgDisable(time) {
    ifSend = 1;
    sendFlagTimer = setTimeout(function () {//10秒内不能发命令
        ifSend = 0;
    }, time * 1000);
}

function offLine(){

    // var res = "<div style='color:#F00;font-size:15px;font-weight:bold;'>设备离线</div>";
    // $('#cmdResult').html(res);
    countNULL = 0;
    clearTimeout(realtimeCtrlTimer1);//关闭定时器
    if(!isOffLine){
        console.error(arrayId[indexOnline]+" is offline");
        var offlineId = arrayId.splice(indexOnline,1);
        offLineLength++;
        indexOnline--;
        IDlength--;
        offlineArray.push(offlineId);
        if(IDlength<=0){
            console.error("all client is offline...............");
            indexOffline--;   //修正index
            indexOnline = 0;  //修正参数
            isOffLine = true;
            //return;
        }
    }
    nextLoop();
}

function Write2File(id){
    clearTimeout(realtimeCtrlTimer1);//关闭定时器
    countNULL = 0;
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var filespec= "C://emmc/"+id+"在"+getNowFormatDate()+"日的日志记录.txt";
    if(fso.FileExists(filespec)){
        //打开已有文件然后写入
        var ts = fso.OpenTextFile(filespec,8,true,-1);
        ts.WriteLine("这是"+id+"第"+count+"次抓取日志--------------------华丽的分割线--------------------");
        ts.write(innerText);
        ts.WriteBlankLines(3);
        ts.Close();
    }else{
        var f = fso.CreateTextFile(filespec,8, true);
        f.WriteLine("这是"+id+"第"+count+"次抓取日志--------------------华丽的分割线--------------------");
        f.write(innerText);
        f.WriteBlankLines(3);
        f.Close();
    }
    innerText = "";
    console.log("这是第："+count+"次记录日志");
    nextLoop();
}

function nextLoop(){
    console.info("online client:"+arrayId);
    console.error("offline client:"+offlineArray);
    if(isOffLine){
        indexOffline++;
    }
    if(!isOffLine){
        indexOnline++;
        if(indexOnline>=IDlength){
            indexOnline = 0;
            count = count+1;
        }
        refrashFlag--;
    }

    var weight = 1;

    if(onLineLength<=5){
        weight = 100;

    }else if(onLineLength>5&&onLineLength<=10){
        weight = 80;

    }else if(onLineLength>10&&onLineLength<=20){
        weight = 50;

    }else if(onLineLength>20&&onLineLength<=30){
        weight = 20;

    }else{
        weight = 10;

    }
    //weight = 3;
    if(count != 0 && count %weight ==0){
        if(offlineArray =="" ||undefined || null){
            console.log("all client will be tested online");
        }else if(indexOnline ==0){
            isOffLine = true;
            onLineLength = IDlength;  //记住上一次的长度，在合并之前
        }
    }
    if(!isOffLine && refrashFlag<=0){
        console.log("reflash..................");
        refrashFlag = 20;
        setTimeout(reloadList,1000);
    }else if(!isOffLine){
        //console.log("no reflash");
        setTimeout('showContrl('+arrayId[indexOnline]+')',1000);
    }else{
        console.log("we are restarting iopp............");
        console.log("index:"+indexOffline);
        console.log("length"+offLineLength);
        if(indexOffline>=offLineLength){
            isOffLine = false;
            indexOffline = 0;
            arrayId =arrayId.concat(offlineArray);
            offlineArray.splice(0,offlineArray.length);
            offLineLength = 0;
            console.log("concat offline and online");
            IDlength = arrayId.length;
            setTimeout('showContrl('+arrayId[indexOnline]+')',1000);
        }else{
            setTimeout('showContrl('+offlineArray[indexOffline]+')',1000);
        }
    }
}

function reloadList(){
    setMain('实时控制','/realtimectrl/list');
    setTimeout('showContrl('+arrayId[indexOnline]+')',2000);

}

function startTimerDB(dbId) {
    //console.log("xuyuong==>>"+dbId);
    realtimeCtrlTimer1 = setInterval(function () {
        //loadCmdHistory();
        getResultID(dbId);
    }, 5000);
}

//获取当前命令的返回结果
function getResultID(dbId) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/realtimectrl/getResult",
        contentType: "application/x-www-form-urlencoded;charset=utf-8", //记住加上charset=utf-8，否则Ajax请求有可能会报SCRIPT7002错误
        timeout : 2000, //超时时间设置，单位毫秒
        data: {
            id: dbId
        },
        success: function (data) {
            if (data.resultFlag == "empty") {
                // var res = "<div style='color:#F00;font-size:15px;font-weight:bold;'>终端命令执行中</div>";
                // $('#cmdResult').html(res);
                // $('#picResult').hide();
                console.log("resultFlag is null");
                countNULL++;
                if(countNULL>=6){
                    offLine();
                }
                return;
            } else {
                // setSendMsgAble();//返回结果，让发送按钮可用
            }

            if (data.errorFlag == "true") {//终端执行命令失败，errorCode=1
                offLine();
                console.log("resultFlag is error");
                var res = "<div style='color:#F00;font-size:15px;font-weight:bold;'>终端执行命令失败</div>";
                // $('#cmdResult').html(res);
                // $('#picResult').hide();
                clearTimeout(realtimeCtrlTimer1);//返回结果后关闭定时器
            } else if (data.errorFlag == "false") {

                if (data.resultFlag == "file") {//终端以文件形式返回结果
                    clearTimeout(realtimeCtrlTimer1);//返回结果后关闭定时器
                    console.log("resultFlag is file");
                    // var res = "";
                    if (data.fileInfo == "readFileOk") {
                        var lineCount = parseInt(data.lineCount);
                        for (var i = 0; i < lineCount; i++) {
                            var key = "line" + i;
                            var value = eval("data." + key);
                            // res += value + "<br/>";
                            innerText +=value +"\r\n";
                        }
                    } else if (data.fileInfo == "readFileError") {//读取文件失败
                        res = "<div style='color:#F00;font-size:15px;font-weight:bold;'>读取文件失败</div>";
                    }
                    // $('#cmdResult').html(res);
                    // $('#picResult').hide();
                    // res ="";

                } else if (data.resultFlag == "picture") {//终端以图片形式返回结果
                    console.log("resultFlag is picture");
                    // $('#picResult').show();
                    // $('#picResult').attr("src", data.picUrl + "?" + new Date().getTime());//data.rows存放图片的地址
                    // $('#cmdResult').html("");
                } else if (data.resultFlag == "message") {//终端以消息形式返回结果
                    console.log("resultFlag is message");
                    // clearTimeout(realtimeCtrlTimer1);//返回结果后关闭定时器
                    // var res = "";
                    // res += "<table class='gridtable'><th>name</th><th>value</th>";
                    // var msgCount = parseInt(data.msgCount);
                    // for (var i = 0; i < msgCount; i++) {
                    //     var entry = data.msg[i];
                    //     res += "<tr>"
                    //         + "<td>" + entry.key + "</td>"
                    //         + "<td>" + entry.value + "</td>"
                    //         + "</tr>";
                    // }
                    // res += "</table>";
                    // $('#cmdResult').html(res);
                    // $('#picResult').hide();

                }
                if(count>0 && !isOffLine){
                    if(isIoppAlive(innerText)){
                        Write2File(arrayId[indexOnline]);
                    }else{
                        offLine();
                    }
                }else{
                    nextLoop();
                }
            }
        },
        error: function () {
            offLine();
            console.log("resultFlag is error2");
            clearTimeout(realtimeCtrlTimer1);//出错时关闭定时器
            console.log("获取结果失败");
            //$.messager.alert('提示', "获取结果失败，请重试", 'info');
        }
    });
}
function isIoppAlive(str){
    var reg = /.*(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]).*/;
    return reg.test(str);
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate =  month + seperator1 + strDate;
    return currentdate;
}