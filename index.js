// ==UserScript==
// @name         Luogu++
// @namespace    http://tampermonkey.net/
// @version      2024-04-10
// @description  一个为洛谷提供扩展功能的脚本插件。
// @author       ztrztr
// @match        https://www.luogu.com.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var urlSplit = window.location.href.split("/");
    console.log("[lg++] [url] ", urlSplit);
    //初始化
    var _nav = document.querySelectorAll("[data-v-258e49ac]")[0];
    var Flag = document.createElement("a")
    Flag.style="border-radius: 5px; font-size: 13px; margin-bottom: 0px; padding: 0.5em 1em; font-weight: 400; line-height: 1.2; text-align: center; white-space: nowrap; background: green; border: 1px solid transparent; cursor: pointer; outline: 0px; appearance: none; user-select: none; transition: background-color 300ms ease-out 0s, border-color 300ms ease-out 0s; margin-right: 10px; box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px; color: white;";
    var _ = document.createElement("b");
    _.innerHTML="Luogu++";
    var _navhtml = _nav.innerHTML;
    Flag.appendChild(_);
    var divv = document.createElement("div")
    divv.appendChild(Flag);
//    Flag.innerHTML = "<a class=\"am-btn am-btn-success am-btn-sm\" style=\"border-radius: 5px; font-size: 13px; margin-bottom: 0px; padding: 0.5em 1em; font-weight: 400; line-height: 1.2; text-align: center; white-space: nowrap; background: green; border: 1px solid transparent; cursor: pointer; outline: 0px; appearance: none; user-select: none; transition: background-color 300ms ease-out 0s, border-color 300ms ease-out 0s; margin-right: 10px; box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px; color: white;\"><b>LG++++</b></a>";
    _nav.innerHTML = divv.innerHTML +_navhtml;
    // Your code here...
    var sidenav = document.querySelectorAll("[data-v-33633d7e]")[0];
    sidenav.innerHTML += "<a data-v-0640126c=\"\" data-v-639bc19b=\"\" data-v-33633d7e=\"\" href=\"/luogu++/admin\" colorscheme=\"none\" class=\"color-none\" data-v-12f19ddc=\"\" style=\"color: inherit;\"><span data-v-639bc19b=\"\" data-v-0640126c=\"\" class=\"icon\"><svg data-v-639bc19b=\"\" data-v-0640126c=\"\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"clipboard-list-check\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" class=\"svg-inline--fa fa-clipboard-list-check\"><path data-v-639bc19b=\"\" data-v-0640126c=\"\" fill=\"#94d66d\" d=\"M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-4.7 132.7c6.2 6.2 6.2 16.4 0 22.6l-64 64c-6.2 6.2-16.4 6.2-22.6 0l-32-32c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L112 249.4l52.7-52.7c6.2-6.2 16.4-6.2 22.6 0zM192 272c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H208c-8.8 0-16-7.2-16-16zm-16 80H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z\" class=\"\"></path></svg></span> <span data-v-639bc19b=\"\" data-v-0640126c=\"\" class=\"text\">后台</span></a>"
    console.log("[lg++] load success!");
    //控制面板
    if (urlSplit[3] == "luogu++" && urlSplit[4] == "admin") {
        function preventPageBack() {
            const state = { page: 1 };
            const title = '';
            const url = '#';
            history.pushState(state, title, url);
        }
        // 当页面加载时或需要触发阻止页面回退的时候调用该函数
        preventPageBack();
        var txt1 = document.querySelectorAll("[data-v-f9624136]")[0];
        txt1.innerHTML="控制面板未开发";
        console.log("[lg ++] Panel load success!")
    }
    if (urlSplit[3] == "user") {
            var intr = document.querySelectorAll("[data-v-e5ad98f0]")[0]
            intr.style = ""
        var __ = document.querySelectorAll("[data-v-429fbdfe]");
        for (var i = 1; i < __.length; i ++) {
            console.log(i, " : ", (__[i].innerHTML == "\n        系统维护，该内容暂不可见。\n      "))
            if (__[i].innerHTML == "\n        系统维护，该内容暂不可见。\n      ") {
                __[i].style = "display: none;";
            }
        }
    }
    //if (window.location)
})();
