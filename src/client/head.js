// ==UserScript==
// @name         115UploadHelper
// @namespace    115UploadHelper
// @version      0.0.1
// @author       liubei2077
// @description  a cool 115 enhanced tool
// @homepage     https://github.com/liubei2077/115helper
// @include      *://115.com/*
// @icon
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @grant        GM_log
// @connect      proapi.115.com
// @connect      webapi.115.com
// @connect      115.com
// ==/UserScript==

// @include can match iframe , which cause script to run multi times
// distinguish iframe from top window 
if (window.name === "wangpan") {
  // console.log(window.name)
  window.addEventListener("load", () => {
    let script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "http://localhost:3333/script"
    document.body.appendChild(script)
  })
}
