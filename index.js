// ==UserScript==
// @name         Luogu++
// @namespace    http://tampermonkey.net/
// @version      2024-04-20
// @description  一个为洛谷提供扩展功能的脚本插件。
// @author       BNDSOiersTeam
// @match        https://www.luogu.com.cn/*
// @match        https://www.luogu.com/*
// @grant        none
// ==/UserScript==

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

var dashboard = function(){
    document.querySelector('title').textContent = "Luogu++ 控制面板加载中...";
    onloaded(function(){
        log('Dashboard Loading');
        document.getElementsByClassName('message')[0].innerHTML="控制面板正在开发中";
        document.getElementsByClassName('lfe-h1')[0].innerHTML="Luogu++ 控制面板";
        document.querySelector('title').textContent = "Luogu++ 控制面板";
    });
};
var showuser = function(intro){
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
    newlink.setAttribute("href", "/luogu-plusplus");
    newlink.setAttribute("colorscheme", "none");
    newlink.className = "color-none";
    newlink.innerHTML = settings.options_img+"Luogu++ 设置";
    ops.appendChild(newlink);
    log("Control button added.")
};
var direct_jump = function(){
    if(document.title == "安全访问中心 - 洛谷"){
        location.href = document.getElementById("url").innerText;
        return;
    }
    setTimeout(direct_jump, 100);
};
var punch = function(){
    var csrf_token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    fetch("https://www.luogu.com.cn/index/ajax_punch", {method: "POST", headers: {"x-csrf-token": csrf_token}}).then(function(data){ data.json().then(function(data){
        if(data.code==200)alert("Luogu++ 打卡成功！");
        else log("打卡失败");
    }) });
};

(function() {
    'use strict';

    log('Luogu++ Started Loading!');
    var urlSplit = window.location.href.split("/");
    //控制面板
    if (urlSplit[3] == "luogu-plusplus") {
        preventPageBack();
        dashboard();
    }
    if (urlSplit[3] == "user") {
        waitdom(".introduction", showuser);
    }
    if(urlSplit[3].indexOf("discuss")!=-1 || urlSplit[3].indexOf("paste")!=-1)direct_jump();
    waitdom(".ops", showops);
    punch();
})();
