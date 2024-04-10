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
    var _nav = document.querySelectorAll("[data-v-258e49ac]")[0];
    var Flag = document.createElement("div")
    Flag.innerHTML = "<a class=\"am-btn am-btn-success am-btn-sm\" style=\"border-radius: 5px; font-size: 13px; margin-bottom: 0px; padding: 0.5em 1em; font-weight: 400; line-height: 1.2; text-align: center; white-space: nowrap; background: green; border: 1px solid transparent; cursor: pointer; outline: 0px; appearance: none; user-select: none; transition: background-color 300ms ease-out 0s, border-color 300ms ease-out 0s; margin-right: 10px; box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px; color: white;\"><b>LG++++</b></a>";
    _nav.appendChild(Flag);
    console.log("[lg++] load success!");
    // Your code here...
})();
