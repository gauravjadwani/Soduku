(this.webpackJsonpsoduku=this.webpackJsonpsoduku||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var r=n(2),a=n.n(r),o=n(4),s=n.n(o),i=(n(14),n(15),n(7)),c=n(5),u=n(6),l=n(9),m=n(8),h=/^[0-8]+$/,v=n(1),f=function(t){return Math.floor(Math.random()*Math.floor(t))},d=function(t){for(var e=new Array(9).fill(0).map((function(){return new Array(9).fill("")})),n=1;n<=t;n++){var r=f(8),a=f(8),o=f(8);e[r][a]=o,!1===j(e,r,a).status&&""!==e[r][a]&&(e[r][a]="")}return e},j=function(t,e,n){var r=t[e][n],a=p(e,n),o=a.row,s=a.coloumn,i=g(t,o,s,r,e,n);if(!1===i.status)return Object(v.a)(Object(v.a)({},i),{},{completed:!1});var c=w(t,"row",r,e,n);if(!1===c.status)return Object(v.a)(Object(v.a)({},c),{},{completed:!1});var u=w(t,"coloumn",r,e,n);return!1===u.status?Object(v.a)(Object(v.a)({},u),{},{completed:!1}):!1===b(t,"").status?{status:!0,completed:!0}:{status:!0,completed:!1}},g=function(t,e,n,r,a,o){for(var s=e+3,i=n+3,c=!0,u=e;u<s;u++)for(var l=n;l<i;l++)if((u!==a||l!==o)&&r===t[u][l])return{status:c=!1,row:u,coloumn:l};return{status:c}},p=function(t,e){return t<3?e<3?{row:0,coloumn:0}:e>2&&e<6?{row:0,coloumn:3}:{row:0,coloumn:6}:t>2&&t<6?e<3?{row:3,coloumn:0}:e>2&&e<6?{row:3,coloumn:3}:{row:3,coloumn:6}:e<3?{row:6,coloumn:0}:e>2&&e<6?{row:6,coloumn:3}:{row:6,coloumn:6}},w=function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"row",n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0,o=!0,s=0;s<t.length;s++){var i=void 0;if("row"===e){if(s===a)continue;i=t[r][s]}else{if(s===r)continue;i=t[s][a]}if(n===i){if(o=!1,"row"===e){var c={row:r,coloumn:s};return Object(v.a)({status:o},c)}var u={row:s,coloumn:a};return Object(v.a)({status:o},u)}}return{status:o}},b=function(t,e){for(var n=!1,r=0;r<t.length;r++)for(var a=0;a<t[r].length;a++)if(t[r][a]===e)return n=!0;return n},O=n(0),x=function(t){Object(l.a)(n,t);var e=Object(m.a)(n);function n(t){var r,o=this;return Object(c.a)(this,n),(r=e.call(this,t)).startTimer=function(t){var e=function(t){var e;e=(new Date).getTime()-t;var n=Math.floor(e%864e5/36e5),r=Math.floor(e%36e5/6e4),a=Math.floor(e%6e4/1e3);return(n=n<10?"0"+n:n)+":"+(r=r<10?"0"+r:r)+":"+(a<10?"0"+a:a)}(t);r.setState({time:e})},r.componentDidMount=function(){var t=(new Date).getTime(),e=setInterval((function(){return r.startTimer(t)}),1e3);r.setState({tInterval:e})},r.handleChange=function(t,e){var n=t.target.value;if(""!==n&&(!h.test(n)||1!==n.length||isNaN(parseInt(n,10))))return!1;var a=e.split(""),o=Object(i.a)(r.state.value),s=parseInt(a[0],10),c=parseInt(a[1],10);if(o[s][c]=""!==n?parseInt(t.target.value,10):"",r.setState({value:o}),""===n)return r.setState({error:""}),!1;var u=j(o,s,c);if(!1===u.status){var l=u.row+""+u.coloumn;r.setState({error:l})}else!1===u.status&&!0===u.completed?(r.setState({error:""}),clearInterval(r.state.tInterval)):r.setState({error:""})},r.renderColoums=function(t){for(var e=[],n=function(n){var a=t.i+""+n,o=r.state.value[t.i][n],s="Row-".concat(t.i," ","Coloumn-").concat(n),i=r.state.error.split(""),c=parseInt(i[0],10),u=parseInt(i[1],10);e.push(Object(O.jsx)("div",{"data-position":a,className:s,children:Object(O.jsx)("input",{type:"string",onChange:function(t){return r.handleChange(t,a)},onKeyDown:function(t){return r.onKeyDown(t)},value:o,className:c===t.i&&u===n?"Red":"",readOnly:!(r.state.chancesRemaining>=0)})}))},o=0;o<9;o++)n(o);return Object(O.jsx)(a.a.Fragment,{children:e})},r.renderTableComponent=function(){for(var t=[],e=0;e<9;e++){var n=[];n.push(Object(O.jsx)("div",{className:"FlexColoumnContainer",children:Object(O.jsx)(o.renderColoums,{i:e})})),t.push(n)}return Object(O.jsx)(a.a.Fragment,{children:Object(O.jsx)("span",{className:"sp",children:t})})},r.state={chancesRemaining:3,error:"",message:"playing",tInterval:0,time:"00:00:00",value:d(40)},r}return Object(u.a)(n,[{key:"onKeyDown",value:function(t){if(8===t.keyCode&&this.state.chancesRemaining>=0){var e=this.state.chancesRemaining-1;""!==this.state.error&&(e<0&&(this.setState({message:"Game Over"}),clearInterval(this.state.tInterval)),this.setState({chancesRemaining:e}))}}},{key:"render",value:function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{className:"MainContainer",children:Object(O.jsx)(this.renderTableComponent,{})}),Object(O.jsxs)("div",{children:["TIme : ",this.state.time]}),Object(O.jsxs)("div",{children:["Chances remaining :"," ",this.state.chancesRemaining>=0?this.state.chancesRemaining:0]}),Object(O.jsxs)("div",{children:["Status : ",this.state.message]})]})}}]),n}(a.a.Component);console.log("Test"),console.log("Test"),console.log("Test"),console.log("Test");var I=function(){return Object(O.jsx)("div",{className:"App",children:Object(O.jsx)(x,{})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(Object(O.jsx)(I,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[17,1,2]]]);
//# sourceMappingURL=main.3053b09a.chunk.js.map