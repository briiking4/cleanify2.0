(this.webpackJsonpcleanify=this.webpackJsonpcleanify||[]).push([[0],{102:function(e,t,a){},104:function(e,t,a){},105:function(e,t,a){},137:function(e,t,a){},138:function(e,t,a){},139:function(e,t,a){},144:function(e,t,a){},146:function(e,t,a){},147:function(e,t,a){},153:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(23),r=a.n(c),s=(a(98),a(32)),i=a(33),o=a(26),u=a(42),m=a(41),d=a(81),p=a.n(d),f=a(30),h=a.n(f),b=a(51),y=a.n(b),g=a(52),v=a.n(g),E=(a(102),a(6)),k=a.n(E),x=a(18),w=a(12),N=(a(104),a(17)),j=a.n(N),O=new j.a,S=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={userId:"",playlistName:n.props.name,playlistId:n.props.data,ownerId:"",buttonPressed:!1,loadingData:!1,newPlaylistId:"",revealUnable:!1},n.explicitTracks=[],n.cleanTracks=[],n.noCleanVersions=[],n.recTracks=[],n.timesClicked=1,n.unaddCounter=1,n.openPlaylist="",n.makeCleanPlaylist=n.makeCleanPlaylist.bind(Object(o.a)(n)),n.findCleanTrack=n.findCleanTrack.bind(Object(o.a)(n)),n.getRecommended=n.getRecommended.bind(Object(o.a)(n)),n.unableToAdd=n.unableToAdd.bind(Object(o.a)(n)),n.addTrack=n.addTrack.bind(Object(o.a)(n)),n.getUser=n.getUser.bind(Object(o.a)(n)),n}return Object(i.a)(a,[{key:"getTracksData",value:function(e,t){var a=[],n=[];O.getPlaylistTracks(e,t).then((function(e){e.items.map((function(e){!0===e.track.explicit?a.push(e.track):n.push(e.track)}))})),this.explicitTracks=a,this.cleanTracks=n}},{key:"getUser",value:function(){var e=this;O.getMe().then((function(t){e.setState({userId:t.id})}))}},{key:"componentDidMount",value:function(){var e=this.props.data;this.getUser(),this.getTracksData(this.state.userId,e),window.scrollTo(0,0)}},{key:"findCleanTrack",value:function(){var e=Object(w.a)(k.a.mark((function e(t){var a,n,l,c,r,s,i,o;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.name,n=t.artists[0].name,r=0,e.next=5,O.search("track: "+a+' artist: "'+n+'"',["track"]);case 5:s=e.sent,i=Object(x.a)(s.tracks.items);try{for(i.s();!(o=i.n()).done;)!1===(c=o.value).explicit&&(c.name===a||c.name.includes("Clean"))&&c.artists[0].name===n&&r<=0&&(l=c,r++)}catch(u){i.e(u)}finally{i.f()}return 0===r&&(l=null),e.abrupt("return",l);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"makeCleanPlaylist",value:function(){var e=Object(w.a)(k.a.mark((function e(){var t,a,n,l,c,r,s,i,o,u;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(this.state.userId),this.setState({loadingData:!0}),a=Object(x.a)(this.explicitTracks),e.prev=3,a.s();case 5:if((n=a.n()).done){e.next=13;break}return t=n.value,e.next=9,this.findCleanTrack(t);case 9:null===(l=e.sent)?this.noCleanVersions.push(t):this.cleanTracks.push(l);case 11:e.next=5;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(3),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:if(!(this.noCleanVersions.length>0)){e.next=25;break}return e.next=24,this.getRecommended(this.noCleanVersions);case 24:this.recTracks=e.sent;case 25:c=[],r="",i=Object(x.a)(this.cleanTracks);try{for(i.s();!(o=i.n()).done;)s=o.value,c.push(s.uri)}catch(m){i.e(m)}finally{i.f()}return e.next=31,O.createPlaylist(this.state.userId,{name:this.state.playlistName+"(Clean)"});case 31:return u=e.sent,this.openPlaylist=u.external_urls.spotify,r=u.id,e.next=36,O.addTracksToPlaylist(this.state.userId,r,c);case 36:e.sent,this.setState({newPlaylistId:r,buttonPressed:!0});case 38:case"end":return e.stop()}}),e,this,[[3,15,18,21]])})));return function(){return e.apply(this,arguments)}}()},{key:"getRecommended",value:function(){var e=Object(w.a)(k.a.mark((function e(t){var a,n,l,c,r,s,i,o;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],n=t.slice(),l=[],t.length>5&&n.splice(5,t.length),n.map((function(e){a.push(e.id)})),e.next=7,O.getRecommendations({limit:20,seed_tracks:a});case 7:c=e.sent,s=Object(x.a)(c.tracks),e.prev=9,s.s();case 11:if((i=s.n()).done){e.next=23;break}if(!0!==(r=i.value).explicit){e.next=20;break}return e.next=16,this.findCleanTrack(r);case 16:null!==(o=e.sent)&&l.push(o),e.next=21;break;case 20:l.push(r);case 21:e.next=11;break;case 23:e.next=28;break;case 25:e.prev=25,e.t0=e.catch(9),s.e(e.t0);case 28:return e.prev=28,s.f(),e.finish(28);case 31:return l.length>10&&(l=l.slice(0,10)),e.abrupt("return",l);case 33:case"end":return e.stop()}}),e,this,[[9,25,28,31]])})));return function(t){return e.apply(this,arguments)}}()},{key:"unableToAdd",value:function(){this.timesClicked++,this.timesClicked%2===0?this.setState({revealUnable:!0}):this.setState({revealUnable:!1})}},{key:"addTrack",value:function(){var e=Object(w.a)(k.a.mark((function e(t){var a,n,l;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=document.getElementById(t.id),n=parseInt(a.getAttribute("clicks")),l=t.uri,++n%2!==0){e.next=12;break}return e.next=7,O.addTracksToPlaylist(this.state.userId,this.state.newPlaylistId,[l]);case 7:e.sent,a.style.backgroundColor="green",a.innerHTML="DONE",e.next=17;break;case 12:return e.next=14,O.removeTracksFromPlaylist(this.state.userId,this.state.newPlaylistId,[l]);case 14:e.sent,a.style.backgroundColor="#565656",a.innerHTML="ADD";case 17:a.setAttribute("clicks",n);case 18:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.noCleanVersions.map((function(e,t){return t++,l.a.createElement("p",{key:e.id}," ",t,". ",e.name)})),t=this.recTracks.map((function(e){var t=this;return l.a.createElement("div",{key:e.id},l.a.createElement("div",{className:"row my-2"},l.a.createElement("div",{className:"col-3 col-lg-1 mt-3"},l.a.createElement("button",{type:"button",className:"btn btn-add",id:e.id,clicks:"1",onClick:function(){return t.addTrack(e)}},"ADD")),l.a.createElement("div",{className:"col-9 col-lg-11"},l.a.createElement("iframe",{src:"https://open.spotify.com/embed/track/"+e.id,width:"100%",height:"80",frameBorder:"0",allowtransparency:"true",allow:"encrypted-media",title:"embeded-track"}))))}),this);return l.a.createElement("div",{className:"Clean col-12"},this.state.buttonPressed?l.a.createElement("div",{className:"mx-auto"},l.a.createElement("h3",{className:"font-weight-bold text-success"}," Your Playlist Is Cleanified! "),l.a.createElement("p",null," You're done! We have already saved it to your library!"),l.a.createElement("a",{href:this.openPlaylist,target:"_blank",rel:"noopener noreferrer",className:"btn btn-success"}," Open In Spotify "),l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("iframe",{src:"https://open.spotify.com/embed/playlist/"+this.state.newPlaylistId,width:"100%",height:"290",frameBorder:"0",allowtransparency:"true",allow:"encrypted-media",title:"embeded-playlist"})))),l.a.createElement("hr",{className:"divider mb-3"}),l.a.createElement("div",null,l.a.createElement("button",{type:"button",className:"btn btn-danger",onClick:this.unableToAdd}," Reveal Songs Unable to be Cleaned: ",this.noCleanVersions.length),this.state.revealUnable&&this.noCleanVersions.length>0?e:this.state.revealUnable&&l.a.createElement("p",null,"Good News! We were able to find clean versions of each song!"),this.noCleanVersions.length>0&&l.a.createElement("div",null,l.a.createElement("hr",{className:"divider mt-5"}),l.a.createElement("h4",null,"Recommended Clean Songs"),l.a.createElement("p",null,"Based on the songs we were unable to add: "),l.a.createElement("div",{className:"container"},t)))):l.a.createElement("div",null,l.a.createElement("button",{type:"button",className:"btn btn-lg btn-success mt-5",onClick:this.makeCleanPlaylist,disabled:this.state.loadingData},this.state.loadingData&&l.a.createElement("i",{className:"fa fa-compact-disc fa-spin text-white"}),"Clean Playlist"),l.a.createElement("div",null,l.a.createElement("iframe",{className:"rounded",src:"https://open.spotify.com/embed/playlist/"+this.state.playlistId,width:"100%",height:"400",frameBorder:"0",allowtransparency:"true",allow:"encrypted-media",title:"embeded-playlist"})),l.a.createElement("p",{className:"text-muted single-space"},l.a.createElement("small",null," Note: Spotify's explicit content tags are applied based on information Spotify receives from rights-holders. They can\u2019t guarantee all explicit content is marked as such. Cleanify will clean your playlist based off of Spotify's marked explicit/clean songs."))))}}]),a}(l.a.Component),C=(a(105),a(4)),T=a(82),I=a.n(T);a(137),a(138);var P=function(e){var t=Object(n.useState)(!1),a=Object(C.a)(t,2);return a[0],a[1],l.a.createElement("div",{id:"mainSearch",className:"pt-3"},l.a.createElement(q,{location:"search"}))},_=new j.a;var F=function(e){var t=Object(n.useState)(null),a=Object(C.a)(t,2),c=a[0],r=a[1],s=Object(n.useState)(null),i=Object(C.a)(s,2),o=i[0],u=i[1],m=Object(n.useState)(null),d=Object(C.a)(m,2),p=d[0],f=d[1],h=Object(n.useState)(!1),b=Object(C.a)(h,2),y=b[0],g=b[1],v=Object(n.useState)(""),E=Object(C.a)(v,2),N=E[0],j=E[1];return Object(n.useEffect)((function(){function e(){return(e=Object(w.a)(k.a.mark((function e(){var t,a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.getMyTopTracks();case 2:return t=e.sent,e.next=5,t;case 5:a=e.sent,console.log(a.items),r(a.items);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function t(){return(t=Object(w.a)(k.a.mark((function e(){var t,a,n,l,c,r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,_.getPlaylistTracks("billboard.com","6UeSakyzhiEt4NB3UAd6NQ",{limit:20});case 3:return a=e.sent,e.next=6,a;case 6:n=e.sent,l=Object(x.a)(n.items);try{for(l.s();!(c=l.n()).done;)r=c.value,t.push(r.track)}catch(s){l.e(s)}finally{l.f()}console.log(t),u(t);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function a(){return(a=Object(w.a)(k.a.mark((function e(){var t,a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return[],e.next=3,_.getUserPlaylists({limit:20});case 3:return t=e.sent,e.next=6,t;case 6:a=e.sent,console.log(a.items),f(a.items);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}console.log("IM IN"),function(){e.apply(this,arguments)}(),function(){t.apply(this,arguments)}(),function(){a.apply(this,arguments)}()}),[]),l.a.createElement("div",{id:"Home",className:"pt-2"},y?l.a.createElement(V,{id:N.id,name:N.name,artist:N.artist,type:N.type,location:"home"}):l.a.createElement("div",null,l.a.createElement("h5",{className:"text-left font-weight-bold text-yellow"},"Popular Singles"),o?l.a.createElement(X,{horiz:!0,list:o,type:"track",itemSelected:g,selectedItem:j}):l.a.createElement(l.a.Fragment,null),l.a.createElement("h5",{className:"text-left font-weight-bold text-yellow"},"Your Top Tracks"),c?l.a.createElement(X,{horiz:!0,list:c,type:"track",itemSelected:g,selectedItem:j}):l.a.createElement(l.a.Fragment,null),l.a.createElement("h5",{className:"text-left font-weight-bold text-yellow"},"Your Playlists"),p?l.a.createElement(X,{horiz:!0,list:p,type:"playlist",itemSelected:g,selectedItem:j}):l.a.createElement(l.a.Fragment,null)))},A=(a(139),a(54)),U=a.n(A),R=a(64),L=a.n(R),M=a(84),D=a.n(M),z=a(83),B=a.n(z),Y=new j.a;var V=function(e){var t=e.id,a=e.name,c=e.artist,r=e.type,s=e.location;console.log(s);var i=Object(n.useState)(null),o=Object(C.a)(i,2),u=o[0],m=o[1],d=Object(n.useState)({id:"",name:"",photo:""}),p=Object(C.a)(d,2),f=p[0],h=p[1],b=Object(n.useState)(!1),y=Object(C.a)(b,2),g=(y[0],y[1],Object(n.useState)(!1)),v=Object(C.a)(g,2),E=(v[0],v[1],Object(n.useState)(!1)),N=Object(C.a)(E,2),j=N[0],O=N[1];return Object(n.useEffect)((function(){function e(){return(e=Object(w.a)(k.a.mark((function e(t,a){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y.search("track: "+t+' artist: "'+a+'"',["track"]);case 2:n=e.sent,console.log(n),m(n.tracks.items);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function n(){return(n=Object(w.a)(k.a.mark((function e(t){var a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y.getTrack(t);case 2:a=e.sent,h({id:t,name:a.name,artist:a.artists[0].name,explicit:a.explicit,photo:a.album.images[0].url}),console.log(a);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}console.log(r),"track"==r&&(console.log("IM IN"),function(t,a){e.apply(this,arguments)}(a,c),function(e){n.apply(this,arguments)}(t))}),[]),l.a.createElement("div",{id:"profile",className:""},j?"search"==s?l.a.createElement(P,null):"library"==s?l.a.createElement(Q,null):l.a.createElement(F,null):l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"text-left"},l.a.createElement("button",{className:"btn mt-n2 mb-n2 ml-n1",onClick:function(){O(!0)}},l.a.createElement(B.a,{className:"text-yellow float-left back-arrow"}))),u&&"track"==r?l.a.createElement("div",null,l.a.createElement("div",{className:"row justify-content-center"},l.a.createElement("img",{src:f.photo,id:f.id,className:"profile-card",alt:"card"})),l.a.createElement("div",{className:"row justify-content-center"},l.a.createElement("p",{className:"mt-1 font-weight-bold"},f.name,f.explicit?l.a.createElement(U.a,{className:"ml-2 text-danger float-right"}):l.a.createElement(l.a.Fragment,null))),l.a.createElement("div",{className:"row justify-content-center"},l.a.createElement("p",{className:"font-weight-bold"},f.artist)),l.a.createElement("div",{className:"row justify-content-center"},l.a.createElement("div",{className:"col"},l.a.createElement(L.a,null)),l.a.createElement("div",{className:"col"},l.a.createElement(D.a,null))),l.a.createElement("div",null,l.a.createElement(K,{title:f.name,artist:f.artist})),l.a.createElement("div",null,l.a.createElement("h5",{className:"mt-4"},"Clean Version(s)"),function(){var e=[],t=function(e){var t,n,l,r=0,s=Object(x.a)(e);try{for(s.s();!(l=s.n()).done;)!1===(n=l.value).explicit&&(n.name===a||n.name.includes("Clean"))&&n.artists[0].name===c&&r<=0&&(t=n,r++)}catch(i){s.e(i)}finally{s.f()}return 0===r&&(t=null),t}(u);return e.push(t),console.log(e),t?l.a.createElement(X,{list:e,type:"track"}):l.a.createElement("h6",null,"There are no clean versions")}())):l.a.createElement(l.a.Fragment,null),"playlist"==r?l.a.createElement(S,{name:a,data:t}):l.a.createElement(l.a.Fragment,null)))},H=a(66),W=a.n(H);var X=function(e){console.log("rendered"),console.log("list"+e.list);var t=e.list,a=e.type,c=e.horiz;console.log("type "+a);var r=Object(n.useState)(!1),s=Object(C.a)(r,2),i=(s[0],s[1]),o=Object(n.useState)({id:"",name:"",artist:"",type:""}),u=Object(C.a)(o,2),m=(u[0],u[1]);Object(n.useEffect)((function(){}),[e.list,e.type]);var d=function(t,n,l){m({id:t,name:n,artist:l}),i(!0),e.itemSelected(!0),e.selectedItem({id:t,name:n,artist:l,type:a}),console.log("selected")},p=t.map((function(e){return l.a.createElement("div",{key:e.id,className:"p-2",onClick:function(){return d(e.id,e.name,"playlist"==a?e.owner.display_name:"track"==a?e.artists[0].name:l.a.createElement(l.a.Fragment,null))}},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-3"},l.a.createElement("img",{src:"playlist"==a?e.images.length>0?e.images[0].url:W.a:"track"==a?e.album.images[0].url:l.a.createElement(l.a.Fragment,null),id:e.id,className:"search-card",alt:"card"})),l.a.createElement("div",{className:"col-8 search-title"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-10"},l.a.createElement("p",{className:"font-weight-bold text-overflow"},e.name)),l.a.createElement("div",{className:"col-2"},"track"==a?e.explicit?l.a.createElement(U.a,{className:"ml-2 text-danger"}):l.a.createElement("img",{src:h.a,width:"45"}):e.name.includes("(Clean)")?l.a.createElement("img",{src:h.a,width:"45"}):l.a.createElement(l.a.Fragment,null))),"playlist"==a?l.a.createElement("p",null,e.owner.display_name):"track"==a?l.a.createElement("p",null,e.artists[0].name):l.a.createElement(l.a.Fragment,null))))})),f=t.map((function(e){return l.a.createElement("div",{key:e.id,className:"col-4",onClick:function(){return d(e.id,e.name,"playlist"==a?e.owner.display_name:"track"==a?e.artists[0].name:l.a.createElement(l.a.Fragment,null))}},"                ",l.a.createElement("img",{src:"playlist"==a?e.images.length>0?e.images[0].url:W.a:"track"==a?e.album.images[0].url:l.a.createElement(l.a.Fragment,null),id:e.id,className:"search-card",alt:"card"}),l.a.createElement("p",{className:"text-left text-overflow"},l.a.createElement("small",{className:"font-weight-bold"},e.name)),"playlist"==a?l.a.createElement("p",{className:"text-left text-overflow"},l.a.createElement("small",{className:"font-weight-bold"},e.owner.display_name)):"track"==a?l.a.createElement("p",{className:"text-left text-overflow"},l.a.createElement("small",{className:"font-weight-bold"},e.artists[0].name)):l.a.createElement(l.a.Fragment,null))}));return l.a.createElement("div",{id:"search",className:"pt-3"},c?l.a.createElement("div",{className:"row flex-row flex-nowrap horiz"},f):p)},G=(a(144),new j.a);var q=function(e){var t=e.location;console.log(t);var a=Object(n.useState)(null),c=Object(C.a)(a,2),r=c[0],s=c[1],i=Object(n.useState)(null),o=Object(C.a)(i,2),u=o[0],m=o[1],d=Object(n.useState)(null),p=Object(C.a)(d,2),f=p[0],h=p[1],b=Object(n.useState)(null),y=Object(C.a)(b,2),g=y[0],v=y[1],E=Object(n.useState)(""),N=Object(C.a)(E,2),j=N[0],O=N[1],S=Object(n.useState)("track"),T=Object(C.a)(S,2),I=T[0],P=T[1],_=Object(n.useState)(!1),F=Object(C.a)(_,2),A=F[0],U=F[1],R=Object(n.useState)(""),L=Object(C.a)(R,2),M=L[0],D=L[1],z=Object(n.useState)(!0),B=Object(C.a)(z,2),Y=(B[0],B[1]);Object(n.useRef)(!0),Object(n.useEffect)((function(){function e(){return(e=Object(w.a)(k.a.mark((function e(){var t,a,n,l,c;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G.getMyRecentlyPlayedTracks();case 2:t=e.sent,console.log(t),a=[],n=Object(x.a)(t.items);try{for(n.s();!(l=n.n()).done;)c=l.value,a.push(c.track)}catch(r){n.e(r)}finally{n.f()}console.log("RECENT"),m(a);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return console.log("mounted"),"library"==t&&function(){e.apply(this,arguments)}(),function(){m({})}}),[]),Object(n.useEffect)((function(){function e(){return(e=Object(w.a)(k.a.mark((function e(){var t,a,n,l,c;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=1,a=0,n=[];case 3:if(!(a<t)){e.next=15;break}return e.next=6,G.getUserPlaylists({limit:50,offset:a});case 6:return l=e.sent,e.next=9,l;case 9:c=e.sent,a+=c.items.length,t=c.total,n=n.concat(c.items),e.next=3;break;case 15:console.log(n),h(n);case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return"library"==t&&function(){e.apply(this,arguments)}(),function(){h({})}}),[]),Object(n.useEffect)((function(){function e(){return(e=Object(w.a)(k.a.mark((function e(){var t,a,n,l,c,r,s,i;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=1,a=0,n=[];case 3:if(!(a<t)){e.next=16;break}return e.next=6,G.getMySavedTracks({limit:50,offset:a});case 6:return l=e.sent,e.next=9,l;case 9:c=e.sent,a+=c.items.length,t=c.total,r=Object(x.a)(c.items);try{for(r.s();!(s=r.n()).done;)i=s.value,n.push(i.track)}catch(o){r.e(o)}finally{r.f()}e.next=3;break;case 16:console.log("TRACKS"),v(n),Y(!1);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return"library"==t&&function(){e.apply(this,arguments)}(),function(){v({})}}),[]);var H=function(){var e=Object(w.a)(k.a.mark((function e(a,n){var l,c,r,i,o,u,m,d,p,h,b,y;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,l=a.toLowerCase(),"library"!=t){e.next=11;break}if(c=[],console.log("in Library"),console.log(g),console.log(f),"track"==n){r=Object(x.a)(g);try{for(r.s();!(i=r.n()).done;)o=i.value,(u=o.name.toLowerCase()).includes(l)&&(console.log(u),console.log(u.includes(a)),c.push(o))}catch(v){r.e(v)}finally{r.f()}s(c)}if("playlist"==n){m=Object(x.a)(f);try{for(m.s();!(d=m.n()).done;)p=d.value,p.name.toLowerCase().includes(l)&&c.push(p)}catch(v){m.e(v)}finally{m.f()}s(c)}e.next=24;break;case 11:return h="",b=[],e.next=15,G.search(a,[n]);case 15:return h=e.sent,e.next=18,h;case 18:y=e.sent,console.log(y),"track"==n&&(b=y.tracks.items),"playlist"==n&&(b=y.playlists.items),console.log(b),s(b);case 24:e.next=29;break;case 26:e.prev=26,e.t0=e.catch(0),console.log(e.t0);case 29:case"end":return e.stop()}}),e,null,[[0,26]])})));return function(t,a){return e.apply(this,arguments)}}(),W=function(){var e=Object(w.a)(k.a.mark((function e(t){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:""==t.target.value&&s(null),console.log(t.target.value),H(t.target.value,I),O(t.target.value);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=function(e){console.log(e.target.value),"track"==e.target.value&&(P("track"),s(null)),"playlist"==e.target.value&&(P("playlist"),s(null))};return l.a.createElement("div",null,A?l.a.createElement(V,{id:M.id,name:M.name,artist:M.artist,type:M.type,location:t}):l.a.createElement("div",{id:"search",className:""},"library"==t?l.a.createElement("h3",{className:"text-left text-yellow font-weight-bold"},"Your Library"):l.a.createElement("h3",{className:"text-left text-yellow font-weight-bold"},"Search"),l.a.createElement("div",{className:"d-flex filter justify-content-center"},l.a.createElement("button",{type:"button",value:"track",onClick:function(e){return q(e)},className:"btn filter-option ".concat("track"==I?"selected-option":"")},"library"==t?"Liked":"Song"),l.a.createElement("button",{type:"button",value:"playlist",onClick:function(e){return q(e)},className:"btn filter-option ".concat("playlist"==I?"selected-option":"")},"Playlists")),l.a.createElement("input",{value:j,onChange:function(e){return W(e)},className:"search-input",placeholder:"search track, playlist, or artist"}),r&&""!=j?(console.log(r),l.a.createElement(X,{list:r,type:I,itemSelected:U,selectedItem:D})):l.a.createElement(l.a.Fragment,null),u&&""==j&&"track"==I&&"library"==t?(console.log(u),l.a.createElement(l.a.Fragment,null,l.a.createElement("p",{className:"pt-3 text-left text-muted"},"Recently Played"),l.a.createElement(X,{list:u,type:I,itemSelected:U,selectedItem:D}))):l.a.createElement(l.a.Fragment,null),f&&""==j&&"playlist"==I&&"library"==t?l.a.createElement(l.a.Fragment,null,l.a.createElement("p",{className:"pt-3 text-left text-muted"},"Playlists"),l.a.createElement(X,{list:f,type:I,itemSelected:U,selectedItem:D})):l.a.createElement(l.a.Fragment,null)))},J=a(47);a(145),a(146);var K=function(e){var t=e.title,a=e.artist;console.log(t);var c=Object(n.useState)(""),r=Object(C.a)(c,2),s=(r[0],r[1]),i=Object(n.useState)({sexually_explicit:"",profanity:""}),o=Object(C.a)(i,2),u=o[0],m=o[1],d=new I.a({apiKey:"AIzaSyDGUgBEpl4TOdzN5WimkqqBmMReZ_HEh9A"});return Object(n.useEffect)((function(){function e(){return(e=Object(w.a)(k.a.mark((function e(){var n,l,c,r,i,o;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n="https://api.lyrics.ovh/v1/".concat(a,"/").concat(t),e.next=4,fetch(n,{method:"GET",headers:{"Content-Type":"application/json"}});case 4:return l=e.sent,e.next=7,l.json();case 7:return l=e.sent,c=l.lyrics.replace(/.*/,"").substr(1),s(c),e.next=12,d.analyze(c,{attributes:["PROFANITY","SEXUALLY_EXPLICIT","THREAT","TOXICITY"]});case 12:r=e.sent,console.log(r),i=r.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value,o=r.attributeScores.PROFANITY.summaryScore.value,m({sexually_explicit:100*i,profanity:100*o}),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(0),console.log("Catch an error: ",e.t0);case 22:case"end":return e.stop()}}),e,null,[[0,19]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[e.title]),console.log(u.profanity),l.a.createElement("div",{id:"score",className:"pt-5 row"},l.a.createElement("div",{className:"donut col"},l.a.createElement(J.a,{value:u.sexually_explicit,text:"".concat(Math.round(u.sexually_explicit),"%"),styles:Object(J.b)({pathColor:"".concat(u.sexually_explicit<=33.33?"#4caf50":u.sexually_explicit>33.67&&u.sexually_explicit<66.67?"#ffc107":u.sexually_explicit>=66.67?"#b70000":""),textColor:"".concat(u.sexually_explicit<=33.33?"#4caf50":u.sexually_explicit>33.67&&u.sexually_explicit<66.67?"#ffc107":u.sexually_explicit>=66.67?"#b70000":"")})}),l.a.createElement("p",{className:"font-weight-bold mt-1"},"Sexual")),l.a.createElement("div",{className:"donut col"},l.a.createElement(J.a,{value:u.profanity,text:"".concat(Math.round(u.profanity),"%"),styles:Object(J.b)({pathColor:"".concat(u.profanity<=33.33?"#4caf50":u.profanity>33.67&&u.profanity<66.67?"#ffc107":u.profanity>=66.67?"#b70000":""),textColor:"".concat(u.profanity<=33.33?"#4caf50":u.profanity>33.67&&u.profanity<66.67?"#ffc107":u.profanity>=66.67?"#b70000":"")})}),l.a.createElement("p",{className:"font-weight-bold mt-1"},"Profanity")))};new j.a;var Q=function(e){return l.a.createElement("div",{id:"library",className:"p-2"},l.a.createElement(q,{location:"library"}))},Z=(a(147),a(43)),$=a(13),ee=a(177),te=a(178),ae=a(87),ne=a.n(ae),le=a(88),ce=a.n(le),re=a(89),se=a.n(re);var ie=Object($.f)((function(e){var t=e.userPic,a=e.userName;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"row profile"},l.a.createElement("img",{src:t,className:"profPic rounded-circle img-fluid",alt:"profile pic"}),l.a.createElement("h1",{className:"profName"},a),l.a.createElement("button",{type:"button",className:"btn btn-danger btn-sm mx-0 logout float-right"},"Log Out")),l.a.createElement(ee.a,{className:"fixed-bottom navbar"},l.a.createElement(te.a,{className:"mx-auto"},l.a.createElement(Z.b,{className:"btn",to:"/"},l.a.createElement(ne.a,{className:"nav-bar-icon  ".concat("/"===e.location.pathname?"active":"")})),l.a.createElement(Z.b,{className:"btn",to:"/search"},l.a.createElement(ce.a,{className:"nav-bar-icon  ".concat("/search"===e.location.pathname?"active":"")})),l.a.createElement(Z.b,{className:"btn",to:"/library"},l.a.createElement(se.a,{className:"nav-bar-icon  ".concat("/library"===e.location.pathname?"active":"")})))))}));(new j.a).getAccessToken();var oe=a(68),ue=new j.a,me=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);var n=(e=t.call(this)).getHashParams().access_token;return n&&ue.setAccessToken(n),oe.a.initialize("UA-172518785-1"),oe.a.pageview(window.location.pathname),e.state={userId:"",loggedIn:!!n,profPic:"",name:"",devices:"",token:""},e.logout=e.logout.bind(Object(o.a)(e)),e}return Object(i.a)(a,[{key:"getHashParams",value:function(){console.log("hi");var e,t={},a=/([^&;=]+)=?([^&;]*)/g,n=window.location.hash.substring(1);for(console.log(n);e=a.exec(n);)t[e[1]]=decodeURIComponent(e[2]);return console.log(t),t}},{key:"getUserProfile",value:function(){var e=this;ue.getMe().then((function(t){0===t.images.length?e.setState({userId:t.id,profPic:p.a,name:t.display_name}):e.setState({userId:t.id,profPic:t.images[0].url,name:t.display_name})}))}},{key:"componentDidMount",value:function(){this.getUserProfile()}},{key:"logout",value:function(){this.setState({loggedIn:!1}),window.location.href=""}},{key:"render",value:function(){this.state.userId;return this.state.loggedIn&&ue.getAccessToken(),l.a.createElement("div",{className:"App"},this.state.loggedIn?l.a.createElement("div",null,l.a.createElement(Z.a,null,l.a.createElement(ie,{userName:this.state.name,userPic:this.state.profPic}),l.a.createElement($.c,null,l.a.createElement($.a,{path:"/",exact:!0,component:function(){return l.a.createElement(F,null)}}),l.a.createElement($.a,{path:"/search",exact:!0,component:function(){return l.a.createElement(P,null)}}),l.a.createElement($.a,{path:"/library",exact:!0,component:function(){return l.a.createElement(Q,null)}})))):l.a.createElement("div",{id:"login",className:"login"},l.a.createElement(v.a,{top:!0},l.a.createElement("div",null,l.a.createElement("img",{src:h.a,className:"logo img-fluid text-center",alt:"logo"}),l.a.createElement("h1",{className:"logo-title font-weight-bold"},"Cleanify"))),l.a.createElement(y.a,{delay:1e3},l.a.createElement("div",null,l.a.createElement("a",{id:"login-button",href:"/login",className:"btn btn-success"},"Log in with Spotify")))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(me,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},30:function(e,t,a){e.exports=a.p+"static/media/logo.856b7ae0.png"},66:function(e,t,a){e.exports=a.p+"static/media/emptyPlaylist.30b581fc.png"},81:function(e,t,a){e.exports=a.p+"static/media/profPic.cc02a310.png"},93:function(e,t,a){e.exports=a(153)},98:function(e,t,a){}},[[93,1,2]]]);
//# sourceMappingURL=main.d750d3d3.chunk.js.map