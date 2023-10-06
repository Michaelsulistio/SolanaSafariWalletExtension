(()=>{function n(c){try{let t=document.head||document.documentElement,e=document.createElement("script");e.setAttribute("async","false"),e.setAttribute("type","text/javascript"),e.setAttribute("src",c),t.insertBefore(e,t.children[0]),t.removeChild(e)}catch(t){console.error(`Failed to inject script
`,t)}}console.log("content script");n(chrome.extension.getURL("/build/injected.js"));})();
