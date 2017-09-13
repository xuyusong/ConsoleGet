
var reflash = 20;
var delay;
reflashList();
function reflashList() {

    if(reflash==0){
        setMain('实时控制','/realtimectrl/list');
        console.log("reflash the window");
        reflash =20;
    }
    reflash--;
    console.log(reflash);
    delayTime();
}

function delayTime() {
    delay = setTimeout(function () {
        reflashList();
    },2000);
}

