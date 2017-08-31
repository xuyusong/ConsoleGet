var arrayId = new Array();
var offlineArray = new Array();
arrayId[0] = "512449900"
arrayId[1] = "512977573"
arrayId[2] = "511750438"
arrayId[3] = "512879112"
arrayId[4] = "512763368"
// arrayId[5] = "512330122"
// arrayId[6] = "512990289"
// arrayId[7] = "512332470"
// arrayId[8] = "512449021"
// arrayId[9] = "513032668"
// arrayId[10] = "512628721"
// arrayId[11] = "512473112"
// arrayId[12] = "512362520"
// arrayId[13] = "511864639"
// arrayId[14] = "512363171"
var IDlength = arrayId.length;
var offLineLength = offlineArray.length;
var realtimeCtrlTimer1 ="";
var isNeedDelete = false;

var i = 0;
var j = 0;
var count = 0;
var isOffLine = false;
var command = "logcat -s iopp";
showContrl(arrayId[0]);
function showContrl(id){
    clearTimeout(realtimeCtrlTimer1);//关闭定时器
    var href = '/realtimectrl/create';
    parent.realtimeSelectedDnum = id;
    var opts = {
        title: '控制终端:'+id+'',
        href: href,
        width: 1200,
        height: 700,
        closable: true,
        modal: true,
        top: (screen.height - 800) / 2,
        left: (screen.width - 1200) / 2,
        onLoad: function () {
            //parent.$("#editForm").form('load', id);
        },
        onClose: function () {
            parent.closeEditFormWin();
        }
    };
    showWindow(opts);
    commandTimer(id);
}
function commandTimer(id) {
    var sendCom=sendCommand(id,command,true);
    setTimeout(sendCom,3000);
}
function sendCommand(id,command,flag){
    if(count == 0 || isOffLine){
        command = "ps |grep iopp|while read u p o;do kill -9 $p;done;./tvos/bin/iopp.sh;ps |grep iopp";
    }else {
        command = "logcat -s iopp";
    }
    console.log(command);
    var cmd ="Command";
    var dnum = id;
    var paramKey= "NameAndParam";
    var paramValue= command;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/realtimectrl/sendmsg",
        data: {
            dnum: dnum,
            cmd: cmd,
            downParameter: paramKey,
            upParameter: paramValue,//便于传递参数
            id: null
        },
        success: function (data) {//返回命令在数据库中的id
            if (flag) {//遥控器没有返回结果
                resultdbId = data.msg;
                //setSendMsgDisable();
                clearTimeout(realtimeCtrlTimer1);//关闭定时器
                if(data =="" ||undefined || null){
                    console.log("这个客户端 :"+id+"离线了");
                }else if(data){
                    console.log("result is return id:"+id+"  resultdbId:"+resultdbId);
                    startTimerDB(resultdbId);//查询是否返回结果，刷新操作历史记录
                }
            }
        },
        // error: function (data) {
        //     //alert(data);
        //     console.log(data);
        //     alert("登录超时，请重新登录!");
        //     //window.top.location.href = "/framework/login";
        // }
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
    $('#cmdResult').html("");//清空当前数据
    $('#picResult').attr("src", "");
    if(count == 0){
        i++;
        if(i>=IDlength){
            i = 0 ;
            count = count +1;
        }
        contrlTimer();
    }else if(isOffLine &&count>0){
        j++;
        if(j>=offLineLength){
            isOffLine = false;
            j = 0;
            console.log("offline  return");
        }
        offLineContrlTimer();
    }else {
        writeTimer();
    }
}

function offLineContrlTimer() {
    if(isOffLine){
        setTimeout('showContrl('+offlineArray[j]+')',8000);
    }
}

function contrlTimer() {
    setTimeout('showContrl('+arrayId[i]+""+')',8000);
}

function writeTimer(){
    setTimeout('Write2File('+arrayId[i]+')',15000);
}


function Write2File(id){
    clearTimeout(realtimeCtrlTimer1);//关闭定时器
    if(isNeedDelete){
        var offlineId = arrayId.splice(i,1);
        console.log("offlineId add:"+offlineId);
        offlineArray.push(offlineId);
        offLineLength++;
        i--;
        IDlength--;
        if(IDlength<=0){
            alert("all client is offline");
            return;
        }
        console.log("online id:"+arrayId+" lenght:"+IDlength);
        console.log("offfline id:"+offlineArray );
    }else{
        var res = document.getElementById("cmdResult").innerText;
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var filespec= "C://emmc/"+id+"在"+getNowFormatDate()+"日的日志记录.txt";
        if(fso.FileExists(filespec)){
            //打开已有文件然后写入
            var ts = fso.OpenTextFile(filespec,8,true,-1);
            ts.WriteLine("这是"+id+"第"+count+"次抓取日志--------------------华丽的分割线--------------------");
            ts.write(res);
            ts.WriteBlankLines(3);
            ts.Close();
        }else{
            var f = fso.CreateTextFile(filespec,8, true);
            f.WriteLine("这是"+id+"第"+count+"次抓取日志--------------------华丽的分割线--------------------");
            f.write(res);
            f.WriteBlankLines(3);
            f.Close();
        }
    }
    i++;
    console.log("这是第："+count+"次记录日志");
    if(i>=IDlength){
        i = 0;
        count = count+1;
    }
    $('#cmdResult').html("");//清空当前数据
    var weight = 1;
    var refrash =1;
    if(IDlength<=5){
        weight = 15;
        refrash = 5;
    }else if(IDlength>5&&IDlength<=10){
        weight = 10;
        refrash = 4;
    }else if(IDlength>10&&IDlength<=20){
        weight = 7;
        refrash = 2;
    }else if(IDlength>20&&IDlength<=30){
        weight = 5;
        refrash = 1;
    }else{
        weight = 3;
        refrash = 1;
    }

    if(count %weight ==0){

        console.log("we need confirm the offline")
        if(offlineArray =="" ||undefined || null){
            console.log("all client will be tested online");
        }else if(i ==0){
            isOffLine = true;
            console.log("we are restarting offline");
            var firstOffline= offlineArray[0];
            showContrl(firstOffline+"");
            setTimeout(offlineTimer,(offLineLength)*8000);
        }
    }
    if(!isOffLine &&count %refrash ==0){
        if(i == 0 || i == 1){
            console.log("reflash......");
            setTimeout(reloadList,2000);
        }else{
            setTimeout('showContrl('+arrayId[i]+')',2000);
        }
    }else if(!isOffLine){
        //console.log("no reflash");
        setTimeout('showContrl('+arrayId[i]+')',2000);
    }else{
        console.log("we are restarting iopp");
    }
}
function offlineTimer() {
    console.log("offline Timer end");
    var weight = 1;
    var refrash =1;
    if(IDlength<=5){
        weight = 15;
        refrash = 5;
    }else if(IDlength>5&&IDlength<=10){
        weight = 10;
        refrash = 4;
    }else if(IDlength>10&&IDlength<=20){
        weight = 7;
        refrash = 2;
    }else if(IDlength>20&&IDlength<=30){
        weight = 5;
        refrash = 1;
    }else{
        weight = 3;
        refrash = 1;
    }
    arrayId =arrayId.concat(offlineArray);
    offlineArray.splice(0,offlineArray.length);
    offLineLength = 0;
    console.log("concat offline and online");
    IDlength = arrayId.length;

    if(!isOffLine &&count %refrash ==0){
        if(i == 0 || i == 1){
            console.log("reflash......");
            setTimeout(reloadList,2000);
        }else{
            setTimeout('showContrl('+arrayId[i]+')',2000);
        }
    }else if(!isOffLine){
        console.log("no reflash");
        setTimeout('showContrl('+arrayId[i]+')',2000);
    }else{
        console.log("we need waiting the offline return");
        //offlineTimer();
    }
}

function reloadList(){
    setMain('实时控制','/realtimectrl/list');
    setTimeout('showContrl('+arrayId[i]+')',2000);
}

function startTimerDB(dbId) {
    console.log("xuyuong==>>"+dbId);
    realtimeCtrlTimer1 = setInterval(function () {
        //loadCmdHistory();
        getResultID(dbId);
    }, 3000);
}

//获取当前命令的返回结果
function getResultID(dbId) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/realtimectrl/getResult",
        data: {
            id: dbId
        },
        success: function (data) {
            if (data.resultFlag == "empty") {
                var res = "<div style='color:#F00;font-size:15px;font-weight:bold;'>终端命令执行中</div>";
                $('#cmdResult').html(res);
                $('#picResult').hide();
                isNeedDelete = true;
                console.log("resultFlag is null");
                return;
            } else {
                setSendMsgAble();//返回结果，让发送按钮可用
            }

            if (data.errorFlag == "true") {//终端执行命令失败，errorCode=1
                isNeedDelete = true;
                console.log("resultFlag is error");
                var res = "<div style='color:#F00;font-size:15px;font-weight:bold;'>终端执行命令失败</div>";
                $('#cmdResult').html(res);
                $('#picResult').hide();
                clearTimeout(realtimeCtrlTimer1);//返回结果后关闭定时器
            } else if (data.errorFlag == "false") {
                isNeedDelete = false;
                if (data.resultFlag == "file") {//终端以文件形式返回结果
                    clearTimeout(realtimeCtrlTimer1);//返回结果后关闭定时器
                    console.log("resultFlag is file");
                    var res = "";
                    if (data.fileInfo == "readFileOk") {
                        var lineCount = parseInt(data.lineCount);
                        for (var i = 0; i < lineCount; i++) {
                            var key = "line" + i;
                            var value = eval("data." + key);
                            res += value + "<br/>";
                        }
                    } else if (data.fileInfo == "readFileError") {//读取文件失败
                        res = "<div style='color:#F00;font-size:15px;font-weight:bold;'>读取文件失败</div>";
                    }
                    $('#cmdResult').html(res);
                    $('#picResult').hide();

                } else if (data.resultFlag == "picture") {//终端以图片形式返回结果
                    console.log("resultFlag is picture");
                    $('#picResult').show();
                    $('#picResult').attr("src", data.picUrl + "?" + new Date().getTime());//data.rows存放图片的地址
                    $('#cmdResult').html("");
                } else if (data.resultFlag == "message") {//终端以消息形式返回结果
                    console.log("resultFlag is message");
                    clearTimeout(realtimeCtrlTimer1);//返回结果后关闭定时器
                    var res = "";
                    res += "<table class='gridtable'><th>name</th><th>value</th>";
                    var msgCount = parseInt(data.msgCount);
                    for (var i = 0; i < msgCount; i++) {
                        var entry = data.msg[i];
                        res += "<tr>"
                            + "<td>" + entry.key + "</td>"
                            + "<td>" + entry.value + "</td>"
                            + "</tr>";
                    }
                    res += "</table>";
                    $('#cmdResult').html(res);
                    $('#picResult').hide();
                }
            }
        },
        error: function () {
            console.log("resultFlag is error2");
            isNeedDelete = true;
            clearTimeout(realtimeCtrlTimer1);//出错时关闭定时器
            console.log("获取结果失败");
            //$.messager.alert('提示', "获取结果失败，请重试", 'info');
        }
    });
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