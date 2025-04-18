// ==UserScript==
// @name         Luogu++
// @namespace    http://tampermonkey.net/
// @version      2024-06-16
// @description  一个为洛谷提供扩展功能的脚本插件。
// @author       BNDSOiersTeam
// @match        https://www.luogu.com.cn/*
// @match        https://www.luogu.com/*
// @match        https://lgpp.bnds.top/*
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11
// @require      https://cdn.jsdelivr.net/gh/colxi/getEventListeners/src/getEventListeners.min.js
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// ==/UserScript==


// ---------- Util Functions --------- \\
var settings = {
    'prefix': "[lg++]",
    'logger': console.log,
     //'logger': alert,
    'options_img': "<svg data-v-a97ae32a=\"\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"code\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 512\" class=\"svg-inline--fa fa-code fa-w-20\"><path data-v-a97ae32a=\"\" fill=\"currentColor\" d=\"M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z\" class=\"\"></path></svg>",

};
var log = function(msg){
    settings.logger(settings.prefix + msg);
};
var preventPageBack = function() {
    window.history.go = function(){ log("Page back blocked by luogu++"); }
};
var waitdom=function(dom, func){
    var ele=document.querySelector(dom);
    if(ele!=null)func(ele);
    else setTimeout(function(){ waitdom(dom, func); }, 100);
};
var onloaded = function(func){
    if(document.readyState == "complete")func();
    else setTimeout(function(){ onloaded(func); }, 100);
};
var issameday = function(date){
    var now = new Date();
    if(now.getYear()!=date.getYear())return false;
    if(now.getMonth()!=date.getMonth())return false;
    if(now.getDate()!=date.getDate())return false;
    return true;
};


// -------- Futures --------- \\
var showuser = function(intro){
    if(GM_getValue("unlockuser", "enabled") != "enabled")return;
    if(intro!=undefined && intro.previousElementSibling!=null && intro.previousElementSibling.innerText=='系统维护，该内容暂不可见。'){
        log("Unlocked User Tab!");
        intro.setAttribute("style", "");
        intro.previousElementSibling.setAttribute("style", 'display:none');
    }
    setTimeout(showuser, 100, document.getElementsByClassName("introduction")[0]); // prevent it to come back again
};
var showops = function(ops){
    var newlink = document.createElement("a");
    newlink.setAttribute("data-v-0640126c", "");
    newlink.setAttribute("data-v-53887c7a", "");
    newlink.setAttribute("href", "https://lgpp.bnds.top/dashboard");
    newlink.setAttribute("colorscheme", "none");
    newlink.className = "color-none";
    newlink.innerHTML = settings.options_img+"Luogu++ 设置";
    ops.appendChild(newlink);
    log("Control button added.")
};
var direct_jump = function(){
    if(GM_getValue("directjump", "enabled") != "enabled")return;
    if(document.title == "安全访问中心 - 洛谷"){
        location.href = document.getElementById("url").innerText;
        return;
    }
    setTimeout(direct_jump, 100);
};
var punch = function(){
    if(GM_getValue("autopunch", "enabled") != "enabled")return;
    if(document.getElementsByName("csrf-token").length == 0)return;
    if(issameday(new Date(GM_getValue("punch_date", new Date(0).toISOString()))))return;
    var csrf_token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    fetch("https://www.luogu.com.cn/index/ajax_punch", {method: "POST", headers: {"x-csrf-token": csrf_token}}).then(function(data){ data.json().then(function(data){
        if(data.code==200){
            if(document.getElementsByClassName("lg-punch").length!=0){
                    document.getElementsByClassName("lg-punch")[0].innerHTML = data.more.html;
            }
            Swal.fire("Luogu++ 打卡成功！");
        }
        if(data.code==200||data.code==201)GM_setValue("punch_date", new Date().toISOString());
    }) });
};
var antijc = function(callback){
    return function(evt){
        if(GM_getValue("antijc", "enabled") != "enabled"){
            callback(evt);
            return;
        }
        var flag=false;
        document.querySelectorAll("div[class~=cm-line]").forEach((elem)=>{
            if(!flag && (elem.innerHTML.toLowerCase().indexOf("ioi") != -1 || elem.innerHTML.toLowerCase().indexOf("sb") != -1 || elem.innerHTML.toLowerCase().indexOf("nmd")!=-1 )){
                flag=true;
                Swal.fire({
                    title: "检测到正在发送的内容可能与机惨有关，请手动确认。",
                    showCancelButton: true,
                    confirmButtonText: "仍要发送",
                    cancelButtonText: "取消发送"
                }).then((result) => {
                    if (result.isConfirmed) {
                        callback(evt);
                    }
                });
            };
        });
        if(!flag)callback(evt);
    };
};
function nbnhhsh_api(text){
    console.log(text);
    GM_xmlhttpRequest({

        method: "post",
        url: 'https://lab.magiconch.com/api/nbnhhsh/guess',
        data: JSON.stringify({"text":text}),
        headers: { "Content-Type": "application/json" },
        onload: function(r) {
            console.log("!@#$%3")
            console.log(r.response);

            var res = String(r.response);
            var dataa = r.response;
            console.log("{\"data\":" + dataa + "}")
            dataa = JSON.parse("{\"data\":" + dataa + "}");
            console.log(dataa);
            var vv = "";
            for (var i = 0; i < dataa.data.length; i ++) {
                if (!dataa.data[i].trans) continue;
                vv += "<p>" + dataa.data[i].trans + "</p>";
            }
//            var vv = String(dataa.data[0].trans);
            Swal.fire({html: vv,});
            // co
        }
    });

};
function nbnhhsh_old() {
    if(GM_getValue("nbnhhsh", "enabled") != "enabled")return;
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.shiftKey) { // 如果按下的是回车键并且同时按下了Shift键
            var text = prompt("请输入需要翻译的短语，用英文逗号分开，比如 114,514 或者 114");
            nbnhhsh_api(text);
        }
    });
}
var lasttext = "";
function nbnhhsh() {
    document.onmouseup = function () {
        var sel_text = window.getSelection().toString();
        if (sel_text == lasttext) return;
        else lasttext = sel_text;
        if (sel_text) {
            nbnhhsh_api(sel_text);
        }
    };
};
var dashboard = function(){
    var checkbox = function(id, def){
        if(def == undefined){
            def = "enabled";
        }
        var e = document.getElementById(id);
        if(GM_getValue(id, def) == "enabled"){
            e.setAttribute("checked","");
        }
        e.addEventListener("input", function(evt){
            if(e.hasAttribute("checked"))GM_setValue(id, "disabled");
            else GM_setValue(id, "enabled");
        });
    }
    checkbox("autopunch");
    checkbox("directjump");
    checkbox("unlockuser");
    checkbox("nbnhhsh");
    checkbox("timer");
    checkbox("cleandiscuss");
    checkbox("antijc");
    document.getElementById("lastpunch").setAttribute("placeholder", "最后一次自动打卡时间："+new Date(GM_getValue("punch_date", new Date(0).toISOString())).toISOString());
    document.getElementById("lastpunch").setAttribute("helper", "数据加载成功！");
    document.getElementById("lasttimerupdate").setAttribute("helper", "您使用的 Luogu++ 版本不支持此功能");
    document.getElementById("placeholder").setAttribute("style", "display:none;");
    document.getElementById("tabs").setAttribute("style", "");
};
var debug_dashboard = function(){
    document.getElementById("action-get").addEventListener("click",function(){
        document.getElementById("value").value = GM_getValue(document.getElementById("key").value);
    });
    document.getElementById("action-set").addEventListener("click",function(){
        GM_setValue(document.getElementById("key").value,document.getElementById("value").value);
    });
    document.getElementById("action-delete").addEventListener("click",function(){
        GM_deleteValue(document.getElementById("key").value);
    });
    document.getElementById("action-list").addEventListener("click",function(){
       document.getElementById("key").value =  GM_listValues();
    });
};
// ---------- Main --------- \\
(function() {
    'use strict';
    log('Luogu++ Started Loading!');
    nbnhhsh_old();
    log('<能不能好好说话> 插件加载成功！')
    var urlSplit = window.location.href.split("/").splice(2,);
    log(urlSplit);
    urlSplit[urlSplit.length-1]=urlSplit[urlSplit.length-1].split('?')[0];
    if (urlSplit[0].indexOf("luogu")!=-1){
        if(urlSplit[1] == "user") {
            waitdom(".introduction", showuser);
        }
        if((urlSplit[1] == "discuss" || urlSplit[1] == "paste") && urlSplit[0] == "www.luogu.com.cn"){
           direct_jump();
        }
        if(urlSplit[2] == "problem" && urlSplit[1] == "www.luogu.com"){
            location.href = location.href.replace("luogu.com", "luogu.com.cn");
        }
        if(urlSplit[2] == "new"){
            waitdom("#app > div.main-container.lside-bar > main > div > div > div.main > div > div:nth-child(6) > button", function(elem){
                var listener = elem.getEventListeners().click[0];
                elem.removeEventListener(listener.type, listener.listener, listener.useCapture );
                elem.addEventListener('click', antijc(listener.listener));
            });
        }else if(urlSplit[1] == 'discuss'){
            waitdom("#app > div.main-container.lside-bar > main > div > div > div.main > div.l-card.reply-editor > div.reply-bottom > button", function(elem){
                var listener = elem.getEventListeners().click[0];
                elem.removeEventListener(listener.type, listener.listener, listener.useCapture );
                elem.addEventListener('click', antijc(listener.listener));
            });
        }
    }
    if(urlSplit[1] == "dashboard"){
        dashboard();
    }else if(urlSplit[1] == "debug"){
        debug_dashboard();
    }
    waitdom(".ops", showops);
    punch();
})();
