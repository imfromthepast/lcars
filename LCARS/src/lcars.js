// Free under MIT License | for info: http://mbmedia.cc/stuff/use_namespace
function use_namespace(ns,cl,g){"use strict";g=g||window;var a=ns.split('.');if(a.length==1)return;var l=cl||a[a.length-1];var m=a.pop();var b=g[a.shift()];while(a.length>0)b=b[a.shift()];if(l!=='*')g[l]=b[m];else{for(var c in b)g[c]=b[c];}}
use_namespace('createjs.*');
/*!
 * EaselJS clip plugin v0.01
 * https://github.com/CindyLinz/EaselJS-clip
 *
 * Copyright 2012, Cindy Wang (CindyLinz)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: 2012.4.25
 */
(function(w, e, c, i, j){

    e = w.createjs || console.warn('EaselJS clip plugin: EaselJS not found.'),
    c = ['Container', 'BitmapAnimation', 'DOMElement', 'Text', 'Bitmap', 'Shape', 'Stage'];

    for(i = c.length; --i; j=e[c[i]])
        if(j && j.prototype && j.prototype.draw)
            (function(ori_draw){
                j.prototype.draw = function(ctx){
                    if(this.clip && this.clip.draw ){
                        ctx.save();
                        this.clip.draw(ctx);
                        ctx.clip();
                        ori_draw.apply(this, arguments);
                        ctx.restore();
                    }
                    else{
                        ori_draw.apply(this, arguments);
                    }
                };
            })(j.prototype.draw);

})(this);

/*
   /$$$$$$   /$$$$$$  /$$        /$$$$$$  /$$$$$$$   /$$$$$$ 
  /$$__  $$ /$$__  $$| $$       /$$__  $$| $$__  $$ /$$__  $$
 | $$  \__/| $$  \ $$| $$      | $$  \ $$| $$  \ $$| $$  \__/
 | $$      | $$  | $$| $$      | $$  | $$| $$$$$$$/|  $$$$$$ 
 | $$      | $$  | $$| $$      | $$  | $$| $$__  $$ \____  $$
 | $$    $$| $$  | $$| $$      | $$  | $$| $$  \ $$ /$$  \ $$
 |  $$$$$$/|  $$$$$$/| $$$$$$$$|  $$$$$$/| $$  | $$|  $$$$$$/
  \______/  \______/ |________/ \______/ |__/  |__/ \______/ 
*/
yellow = '#e1eea4';
paleYellow = '#ece6c1';
white = '#ece6c1';
gold = '#eec331';
blue = '#a0c0de';
tan = '#d7a474';
red = '#d20a15';
salmon = 'salmon';
gray = '#999';
black = '#000';
none = 'none';
/*
  /$$        /$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$ 
 | $$       /$$__  $$ /$$__  $$| $$__  $$ /$$__  $$
 | $$      | $$  \__/| $$  \ $$| $$  \ $$| $$  \__/
 | $$      | $$      | $$$$$$$$| $$$$$$$/|  $$$$$$ 
 | $$      | $$      | $$__  $$| $$__  $$ \____  $$
 | $$      | $$    $$| $$  | $$| $$  \ $$ /$$  \ $$
 | $$$$$$$$|  $$$$$$/| $$  | $$| $$  | $$|  $$$$$$/
 |________/ \______/ |__/  |__/|__/  |__/ \______/ 
*/
class LCARS {
    constructor(canvasId){
        this.canvasId = canvasId;
        this.lcarsCanvas = new Stage(canvasId);
        Ticker.on("tick", this.lcarsCanvas);
    }
    debug = false;
    lcarsCanvas;
    height;
    width;
    gutters;
    elements=[];
    innerHeight;
    innerWidth;
    canvasId;
    yellow = yellow;
    paleYellow = paleYellow;
    white = white;
    gold = gold;
    blue = blue;
    tan = tan;
    red = red;
    salmon = salmon;
    gray = gray;
    black = black;
    none = none;
    btnTypes=['pill','pill-left','pill-right','rect'];
    playSound(soundID) {
        Sound.play(soundID.toString());
    }
    colors = [this.white,this.yellow,this.gold,this.blue,this.tan,this.red,this.salmon,this.gray,this.none];
    circleColors = [this.white,this.yellow,this.gold];
    buttonMargin = 12;
    bg = new Shape();
    uilayer = new Container();
    tick = 0;
    handleTick(event){
        if (!event.paused) {
            // 4 times a second
            if(this.tick==0 || this.tick==6 || this.tick==12 || this.tick == 18){
                doFourTimesPerSecond();
            }
            // twice a second
            if(this.tick==0 || this.tick==12){
                doTwicePerSecond();
            }
            // once a second
            if(this.tick==0){  
                doOncePerSecond();                                  
            }
            this.lcarsCanvas.update();
            var top = 24;
            this.tick = this.tick<top?this.tick+1:0;
        }
    }
    handleClick(event){
        playSound(this.rifi(1,4));
        if(this.rifi(0,10)>7) buildUI();
    }
    handleRectClick(event){
        playSound(6);
        console.log('btn',event.target.parent.name);
    }
    handleRectPillClick(event){
        playSound(1);
        console.log('btn',event.target.parent.name);
    }
    handleRectCapClick(event){
        playSound(2);
        console.log('btn',event.target.parent.name);
        if(this.rifi(0,10)>7) buildUI();
    }
    handleTabClick(event){
        playSound(3); 
        console.log('btn',event.target.parent.name);           
    }
    handlePillClick(event){
        playSound(4);
        console.log('btn',event.target.parent.name);
        if(this.rifi(0,10)>7) buildUI();
    }
    handleTitledPillClick(event){
        playSound(4);
        playSound(6);
        if(this.rifi(0,10)>7) buildUI();
    }
    handleJoystickClick(event){
        console.log('handleJoystickClick()');
        console.log("event", event);
        console.log("event.local ", event.localX+'x'+event.localY); 
        // console.log("event.stageY", event.stageY);            
        var x=event.localX,y=event.localY;
        if(x>=80 && y<=35 && x<=120){
            console.log('up');
            playSound(1);
            joystickButtonFunction(1,event.target.name);
        }else if(x>=165 & y>=80 && y<=120){
            console.log('right');
            playSound(2);
            joystickButtonFunction(2,event.target.name);
        }else if(x>=80 && y>=165 && x<=120){
            console.log('down');
            playSound(3);
            joystickButtonFunction(3,event.target.name);
        }else if(x<=35 && y>=80 && y<=120){
            console.log('left');
            playSound(4);
            joystickButtonFunction(4,event.target.name);
        }
    }
    joystickButtonFunction(bid,name){}

    build(json){
        let cnvs = document.getElementById(this.canvasId);
        if(json){                
            this.height = json.dim.h;
            this.width = json.dim.w;
            this.gutters = json.dim.g;
            this.elements = json.elements;
        }
        cnvs.width = this.width;
        cnvs.height = this.height;
        this.buildUI();
    }
    buildUI(){
        // add black background to canvas
        if(this.debug)
            this.bg.graphics.ss(2).beginStroke(white).drawRect(0,0,this.width,this.height);;
        this.bg.graphics.beginFill('#000').drawRect(0, 0, this.width, this.height);
        this.lcarsCanvas.addChild(this.bg);
        this.uilayer.removeAllChildren();
        // set up uilayer
        this.innerHeight = this.height - (this.gutters*2);
        this.innerWidth = this.width - (this.gutters*2);
        this.uilayer.name = 'uilayer';
        this.uilayer.x = this.gutters;
        this.uilayer.y = this.gutters;
        this.uilayer.width = this.width-(this.gutters*2);
        this.uilayer.height = this.height-(this.gutters*2);
        // loop through json elements and create sections to add to uilayer
        var x = 0,y = 0;
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            var header = el.header;
            var headerMargins = [0,0,0,0];
            if(is.not.undefined(header)){
                if(header.m!=null){
                    headerMargins = header.m;
                }
            }
            var elementMargins = [0,0,0,0];
            if(el!=null){
                elementMargins = el.m;
            }
            x+=is.not.undefined(header)?headerMargins[3]:elementMargins[3];
            y+=is.not.undefined(header)?headerMargins[0]:elementMargins[0];
            this.uilayer.addChild(this.lcarsSection(x,y,el,null));
            x+=el.w+(is.not.undefined(header)?headerMargins[1]:elementMargins[1]);
        }
        // add uilayer to canvas
        this.lcarsCanvas.addChild(this.uilayer);
        this.lcarsCanvas.update();
    }
/*
   /$$$$$$                                  /$$                                     /$$     /$$                    
  /$$__  $$                                | $$                                    | $$    |__/                    
 | $$  \__/  /$$$$$$  /$$$$$$$   /$$$$$$$ /$$$$$$    /$$$$$$  /$$   /$$  /$$$$$$$ /$$$$$$   /$$  /$$$$$$  /$$$$$$$ 
 | $$       /$$__  $$| $$__  $$ /$$_____/|_  $$_/   /$$__  $$| $$  | $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$__  $$
 | $$      | $$  \ $$| $$  \ $$|  $$$$$$   | $$    | $$  \__/| $$  | $$| $$        | $$    | $$| $$  \ $$| $$  \ $$
 | $$    $$| $$  | $$| $$  | $$ \____  $$  | $$ /$$| $$      | $$  | $$| $$        | $$ /$$| $$| $$  | $$| $$  | $$
 |  $$$$$$/|  $$$$$$/| $$  | $$ /$$$$$$$/  |  $$$$/| $$      |  $$$$$$/|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$
  \______/  \______/ |__/  |__/|_______/    \___/  |__/       \______/  \_______/   \___/  |__/ \______/ |__/  |__/
*/

/*
  /$$                                          /$$$$$$                        /$$     /$$                       /$$$ /$$$  
 | $$                                         /$$__  $$                      | $$    |__/                      /$$_/|_  $$ 
 | $$  /$$$$$$$  /$$$$$$   /$$$$$$   /$$$$$$$| $$  \__/  /$$$$$$   /$$$$$$$ /$$$$$$   /$$  /$$$$$$  /$$$$$$$  /$$/    \  $$
 | $$ /$$_____/ |____  $$ /$$__  $$ /$$_____/|  $$$$$$  /$$__  $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$__  $$| $$      | $$
 | $$| $$        /$$$$$$$| $$  \__/|  $$$$$$  \____  $$| $$$$$$$$| $$        | $$    | $$| $$  \ $$| $$  \ $$| $$      | $$
 | $$| $$       /$$__  $$| $$       \____  $$ /$$  \ $$| $$_____/| $$        | $$ /$$| $$| $$  | $$| $$  | $$|  $$     /$$/
 | $$|  $$$$$$$|  $$$$$$$| $$       /$$$$$$$/|  $$$$$$/|  $$$$$$$|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$ \  $$$ /$$$/ 
 |__/ \_______/ \_______/|__/      |_______/  \______/  \_______/ \_______/   \___/  |__/ \______/ |__/  |__/  \___/|___/  
*/
    lcarsSection(x,y,o,s){
        if(is.undefined(o.h)) o.h=this.innerHeight;
        var headerMargins = [0,0,0,0];
        if(is.not.undefined(o.header)){
            if(o.header.m!=null){
                headerMargins = o.header.m;
            }
        }
        var footerMargins = [0,0,0,0];
        if(is.not.undefined(o.footer)){
            if(o.footer.m!=null){
                footerMargins = o.footer.m;
            }
        }
        var cont = new Container();
        // header
        var header = new Container();
        var headerHeight = is.not.undefined(o.header)?o.header.h+headerMargins[0]+headerMargins[2]:0;
        
        var leftSidebar = new Container();
        var body = new Container();
        var rightSidebar = new Container();
        var footer = new Container();

        var rightSidebarWidth = is.not.undefined(o.rightSidebar)?o.rightSidebar.w:0;
        var leftSidebarWidth = is.not.undefined(o.leftSidebar)?o.leftSidebar.w:0;
        var bodyWidth = o.w - (rightSidebarWidth+leftSidebarWidth);
        
        var footerHeight = is.not.undefined(o.footer)?o.footer.h+footerMargins[0]+footerMargins[2]:0;
        var bodyHeight = o.h - (headerHeight+footerHeight);
        var midY = headerHeight;
        var footerY = headerHeight+bodyHeight+(is.not.undefined(o.footer)?footerMargins[0]:0);

        var boundingBox = new Shape();
        boundingBox.graphics.ss(2).beginStroke(white).drawRect(0,0,o.w,o.h);
        console.log(o.h)
        cont.x = x; //o.x;
        cont.y = y; //o.y;
        leftSidebar.y=midY;
        body.x=leftSidebarWidth; //o.leftSidebar.w;
        body.y=midY;
        body.name='body';
        for (var i = 0; i < o.body.length; i++) {
            var el = o.body[i];
            //console.log('el',el)
            if(el.type=='joystick') body.addChild(this.buildJoystick(el));
            if(el.type=='header'){
                var w = el.w==null?o.w:el.w;
                if(el.t!=null){
                    var textAlign = is.undefined(el.t.a)||el.t.a==null?'end':el.t.a;
                    var textX = textAlign=='end'?w-10:10;
                    var text = this.addText(textX,el.t.y,el.t.t,textAlign,el.t.s,el.t.c)
                }else{
                    var text = null;
                }
                // var text = el.t!=null?addText(textX,el.t.y,el.t.t,el.t.a,el.t.s,el.t.c):null;
                body.addChild(this.buildHeader(el.x,el.y,w,el.h,el.c,el.r,text));
            }
            if(el.type=='buttonGroups'){
                var size = el.s;
                var btns = this.addButtonGroupTo(el.x,el.y,el.q,el.t,size);
                // console.log("btns", btns);
                for (var iii = 0; iii < btns.length; iii++) {
                    body.addChild(btns[iii]);
                }
            }    
            if(el.type=='buttons'){
                body.addChild(this.addButtonsTo(el.x,el.y,el.q,el.t,el.c));
            }
            if(el.type=='scanner')body.addChild(this.lcarsScanner(el.x,el.y,el.w,el.h,el.c,el.rx,el.ry,i));
            if(el.type=='tabs')body.addChild(this.addTabsTo(el));
            if(el.type=='text')body.addChild(this.buildText(el));
            if(el.type=='textblock')body.addChild(this.buildDynamicText(el));
            if(el.type=='readout')body.addChild(this.buildReadout(el));
        }
        
        rightSidebar.y=midY;
        rightSidebar.x=leftSidebarWidth+bodyWidth;
        footer.y=footerY;
        if(is.not.undefined(o.header)){             
            
            var l = 0;
            var s = 0;
            if(o.header.r != null){
                if(o.header.r[0]>0){
                    l=0;
                }else if(o.header.r[1]>0){
                    l=1;
                }else if(o.header.r[2]>0){
                    l=2;
                }else if(o.header.r[3]>0){
                    l=3;
                }
                s=o.header.r[l];
            }
            header.addChild(
                this.buildHeader(0,0,o.w,o.header.h,o.header.c,o.header.r)
            )
            if(is.not.undefined(o.header.t) && o.header.t!= null){    
                var textAlign = is.undefined(o.header.t.a)?'end':o.header.t.a;
                // console.log("textAlign", textAlign);
                var textX = textAlign=='end'?o.w - 10:10;
                // console.log("textX", textX);
                var textY = is.not.undefined(o.header)?(o.header.h+headerMargins[0])-35:0;
                var textVal = o.header.t==null?'':o.header.t.t;
                // console.log("o.header.t", o.header.t);
                var txt = this.addText(textX,textY,textVal,textAlign,'30px');
                header.addChild(
                    txt
                )
            }
        }
        if(is.not.undefined(o.leftSidebar)) leftSidebar.addChild(this.buildHeader(0,0,o.leftSidebar.w,bodyHeight,o.leftSidebar.c,o.leftSidebar.r))
        if(is.not.undefined(o.rightSidebar)) rightSidebar.addChild(this.buildHeader(0,0,o.rightSidebar.w,bodyHeight,o.rightSidebar.c,o.rightSidebar.r))
        if(is.not.undefined(o.footer)) footer.addChild(this.buildHeader(0,0,o.w,o.footer.h,o.footer.c,o.footer.r))
        //body.addChild(s);
        console.log('body y',body.y);
        cont.addChild(header,leftSidebar,body,rightSidebar,footer);
        if(this.debug) cont.addChild(boundingBox);
        return cont;
    }

    lcarsSectionOptions(){
        return {x:0,y:0,w:200,h:650,header:{h:210,r:[0,0,0,0],c:yellow,m:[0,0,100,0],t:''},leftSidebar:{w:0,r:[0,0,0,0],c:gold},body:{},rightSidebar:{w:0,r:[0,0,0,0],c:gold},footer:{h:15,r:[0,0,0,0],c:tan,m:[0,0,0,0]}}
    }
    lcarsScanner(x,y,w,h,c,rx,ry,id){
        var scannerCont = new Container();
        scannerCont.name='lcarsScanner'+id;
        var topLeftFrame = new Shape();
        var frame = new Shape();
        var reticule = new Shape();
        var screen = new Container();
        scannerCont.x=x;
        scannerCont.y=y;
        topLeftFrame.graphics.f(c[0])
        .mt(0,0)
        .lt(rx-25,0)
        .lt(rx-25,30)
        .lt(0,30)
        .cp();
        frame.graphics.f(c[1])
        .mt(rx+25,0)
        .lt(w,0)
        .lt(w,h)
        .lt(0,h)
        .lt(0,h-15)
        .lt(w-20,h-15)
        .lt(w-20,30)
        .lt(rx+25,30)
        .cp();
        reticule.graphics.f(c[2])
        .mt(rx-20,0)
        .lt(rx+20,0)
        .lt(rx+20,ry-30)
        .lt(w-40,ry-30)
        .lt(w-40,ry)
        .lt(w-50,ry)
        .lt(w-50,ry-20)
        .lt(40,ry-20)
        .lt(40,ry)
        .lt(30,ry)
        .lt(30,ry-30)
        .lt(rx-20,ry-30)
        .cp()
        .f(c[3])
        .dr(30,ry+70,w-70,10)
        .f(this.black)
        .dr(rx-20,20,40,2)
        .dr(rx-20,30,40,2)
        .dr(rx-20,40,40,5)
        .f(c[3])
        .ss(5).s(this.black)
        .dr(rx-22,h-38,45,40);
        // var stars = ;
        screen.removeAllChildren();
        for (var i = 0; i < this.rifi(10,20); i++) {
            var star = new Shape();
            var r = this.rifi(2,7);
            star.graphics.beginFill(this.rae(this.circleColors)).dc(this.rifi(20,w-20),this.rifi(20,h-20),r);
            star.name=r;
            screen.addChild(star);
        }
        scannerCont.addChild(screen,frame,topLeftFrame,reticule);
        return scannerCont;
    }
    buildJoystick(el){
        var js = new Container();
        js.x=el.x;
        js.y=el.y;
        var base = new Shape();
        base.graphics.beginFill(this.blue).dc(100,100,100);
        var buttons = new Container();
        var cross = new Shape();    
        var w = 40;
        var l = 130;
        var w1 = 100-(w/2);
        var w2 = w1+w;
        var l1 = (200-l)/2;
        var l2 = l1+l;
        cross.graphics.beginFill(this.yellow).setStrokeStyle(4).beginStroke('black').lt(w1,l1).lt(w2,l1).lt(w2,w1).lt(l2,w1).lt(l2,w2).lt(w2,w2).lt(w2,l2).lt(w1,l2).lt(w1,w2).lt(l1,w2).lt(l1,w1).lt(w1,w1).cp().beginFill(el.c1).dr(w1,0-5,w,w).beginFill(el.c2).dr(l2,w1,w,w).beginFill(el.c3).dr(w1,l2,w,w).beginFill(el.c4).dr(l1-w,w1,w,w);
        var accents = new Shape();
        accents.graphics.ss(2).beginStroke('black').mt(w1,74).lt(w2,74).mt(w1,152).lt(w2,152).ss(3).mt(w1,45).lt(w2,45).mt(w1,69).lt(w2,69).mt(w1,128).lt(w2,128).mt(w1,138).lt(w2,138).mt(w1+16,15).lt(w1+16,30).mt(w1+23,15).lt(w1+23,30).ss(6).mt(w1+30,15).lt(w1+30,30).mt(l2+5,w2-10).lt(l2+20,w2-10).mt(w1+10,l2+5).lt(w1+10,l2+20).mt(l1-w+20,w1+10).lt(l1-w+35,w1+10)
        cross.clip = base;  
        cross.name = el.n;              
        buttons.addChild(cross);
        buttons.addChild(accents);
        // cross.addEventListener("click", function(evt) {
        //     console.log("evt", evt);
        //     console.log("type: "+evt.type+" target: "+evt.target+" stageX: "+evt.stageX);

        // });
        cross.addEventListener("click", this.handleJoystickClick);
        js.addChild(base);
        js.addChild(buttons);

        return js;
    }
    buildHeader(x,y,w,h,c,r,t){
        console.log('header y',y);
        var hdrCont = new Container();
        hdrCont.x=x;
        hdrCont.y=y;
        var hdr = new Shape();
        var headerRadius = [0,0,0,0];
        if(r!=null){
            headerRadius = r;
        }
        hdr.graphics.beginFill(c).rc(0,0,w,h,headerRadius[0],headerRadius[1],headerRadius[2],headerRadius[3]);
        hdrCont.addChild(hdr);
        if(t!=null) hdrCont.addChild(t);
        return hdrCont;
    }
    buildText(el){
        return addText(el.x,el.y,el.t,el.a,el.s,el.c);
    }
    addText(x,y,t,a,s,c){
        // console.log("t", t);
        a = a==null?'end':a;
        s = s==null?'18px':s;
        c = c==null?'#000':c;
        var txt = new Text(this.makeCap(t),s+" Okuda",c);
        txt.x = x;
        txt.y = y;
        txt.textAlign=a; //Any of "start", "end", "left", "right", and "center"
        txt.textBaseLine = 'bottom';
        return txt;
    }
    buildButton(x,y,w,h,c,t,l,s){
        // console.log("w", w);
        var btnCont = new Container();
        btnCont.x=x;
        btnCont.y=y;
        x=0;
        y=0;
        var txtWidth; 
        var textAlign = 'end';
        var btn = new Shape();
        if(t=='pill'){
            btn.graphics.beginFill(c).rc(x,y,w,h,h*0.5,h*0.5,h*0.5,h*0.5); //.drawRoundRect(x,y,w,h,h*.5);
            // console.log("pill-h", h);
            txtWidth = w-15;
        }
        if(t=='pill-left'){
            btn.graphics.beginFill(c).rc(x,y,w,h,h*0.5,0,0,h*0.5);
            txtWidth = w-10;
        }
        if(t=='pill-right'){
            btn.graphics.beginFill(c).rc(x,y,w,h,0,h*0.5,h*0.5,0);
            txtWidth = 5;
            textAlign = 'start';
        }
        if(t=='cap-left'){
            btn.graphics.beginFill(c).rc(x-10,y,h,h,h*0.5,0,0,h*0.5);
            // console.log("h", h);
            txtWidth = w-10;
        }
        if(t=='cap-right'){
            btn.graphics.beginFill(c).rc(x+10,y,h,h,0,h*0.5,h*0.5,0);
            txtWidth = 5;
            textAlign = 'start';
        }
        if(t=='rect'){
            btn.graphics.beginFill(c).rect(x,y,w,h);
            txtWidth = w-10;
        }
        var txt = this.addText(txtWidth,(h/2)-10,l,textAlign,(s==1?18:30)+'px');
        if(c!='none'){
            btnCont.addChild(btn);
            btnCont.addChild(txt);
            // btnCont.addEventListener("click", handleClick);
        }
        return btnCont;
    }
    addPillButton(x,y,c,w,h,s,t){
        // w = w==null?buttonWidth:w;
        // h = h==null?buttonHeight:h;
        t = t==null?this.randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'pill',t,s);
    }
    addPillLeftButton(x,y,c,w,h,s,t){
        // w = w==null?buttonWidth:w;
        // h = h==null?buttonHeight:h;
        t = t==null?this.randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'pill-left',t,s);
    }
    addPillRightButton(x,y,c,w,h,s,t){
        // w = w==null?buttonWidth:w;
        // h = h==null?buttonHeight:h;
        t = t==null?this.randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'pill-right',t,s);
    }
    addCapLeftButton(x,y,c,w,h,s,t){
        // w = w==null?buttonWidth:w;
        // h = h==null?buttonHeight:h;
        t = t==null?this.randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'cap-left',t,s);
    }
    addCapRightButton(x,y,c,w,h,s,t){
        // w = w==null?buttonWidth:w;
        // h = h==null?buttonHeight:h;
        t = t==null?this.randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'cap-right',t,s);
    }
    addRectButton(x,y,c,w,h,s,t){
        // w = w==null?buttonWidth:w;
        // h = h==null?buttonHeight:h;
        t = t==null?this.randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'rect',t,s);
    }
    addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,s){
        // console.log("x", x);
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(0,0,c,buttonWidth-20,buttonHeight,s));
        btnCont.addChild(this.addCapRightButton(buttonWidth-20,0,this.randomColor(),buttonHeight,buttonHeight,s,''));
        return btnCont;
    }
    addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,s){
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(buttonHeight,0,c,buttonWidth-20,buttonHeight,s));
        btnCont.addChild(this.addCapLeftButton(0,0,this.randomColor(),buttonHeight,buttonHeight,s,''));
        return btnCont;
    }
    addTinyRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,s){
        // console.log("x", x);
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(0,0,c,(buttonWidth*0.20),buttonHeight,s));
        btnCont.addChild(this.addCapRightButton(buttonWidth-10,0,this.randomColor(),buttonHeight,buttonHeight,s,''));
        return btnCont;
    }
    addTinyRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,s){
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(buttonHeight,0,c,(buttonWidth*0.20),buttonHeight,s,''));
        btnCont.addChild(this.addCapLeftButton(0,0,this.randomColor(),buttonHeight,buttonHeight,s,''));
        return btnCont;
    }
    addRectWithPillLeftButton(x,y,c,buttonWidth,buttonHeight,s){
        var btnCont = new Container();
        btnCont.x = x-30;
        btnCont.y = y;
        btnCont.addChild(this.addPillLeftButton(0,0,c,buttonWidth,buttonHeight,s));
        btnCont.addChild(this.addRectButton(buttonWidth+10,0,this.randomColor(),15,buttonHeight,s,''));
        return btnCont;
    }
    addRectWithPillRightButton(x,y,c,buttonWidth,buttonHeight,s){
        var btnCont = new Container();
        btnCont.x = x-30;
        btnCont.y = y;
        btnCont.addChild(this.addPillRightButton(25,0,c,buttonWidth,buttonHeight,s));
        btnCont.addChild(this.addRectButton(0,0,this.randomColor(),15,buttonHeight,s,''));
        return btnCont;
    }
    addTitledLeftPillButton(x,y,c,buttonWidth,buttonHeight,s){
        var cont = new Container();
        var crbtn = this.addRectWithCapLeftButton(x,0,c,buttonWidth,buttonHeight,s);
        crbtn.x = 0;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton((s==1?75:90)+buttonWidth,0,this.randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(buttonWidth+(s==1?67:86),-8,this.randomButtonTitle(),null,(s==1?46:56)+'px',this.randomColor()))
        return cont;
    }
    addTitledRightPillButton(x,y,c,buttonWidth,buttonHeight,s){
        var cont = new Container();
        var crbtn = this.addRectWithCapRightButton(x,0,c,buttonWidth,buttonHeight,s);
        crbtn.x = s==1?75:85;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton(0,0,this.randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(20,-8,this.randomButtonTitle(),'start',(s==1?46:56)+'px',this.randomColor()))
        return cont;
    }

    addTitledLeftButton(x,y,c,buttonWidth,buttonHeight,s){
        var cont = new Container();
        var crbtn = this.addRectButton(x,0,c,buttonWidth,buttonHeight,s);
        crbtn.x = 0;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton((s==1?75:90)+buttonWidth,0,this.randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(buttonWidth+(s==1?67:86),-8,this.randomButtonTitle(),null,(s==1?46:56)+'px',this.randomColor()))
        return cont;
    }
    addTitledRightButton(x,y,c,buttonWidth,buttonHeight,s){
        var cont = new Container();
        var crbtn = this.addRectButton(x,0,c,buttonWidth,buttonHeight,s);
        crbtn.x = s==1?75:85;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton(0,0,this.randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(20,-8,this.randomButtonTitle(),'start',(s==1?46:56)+'px',this.randomColor()))
        return cont;
    }

    addTitledRightTab(x,y,c,buttonWidth,buttonHeight,l){
        var s=2;
        var cont = new Container();

        cont.addChild(this.addRectButton(0,0,c,150,buttonHeight,s,l));
        cont.addChild(this.addText(155,-8,this.randomButtonTitle()+this.randomButtonTitle(),'start','56px',c))

        cont.addChild(this.addCapRightButton(245,0,c,buttonHeight,buttonHeight,s,''));

        return cont;
    }
    addTitledLeftTab(x,y,c,buttonWidth,buttonHeight,l){
        var s=2;
        var cont = new Container();

        cont.addChild(this.addCapLeftButton(0,0,c,buttonHeight,buttonHeight,s,''));
        cont.addChild(this.addText(130,-8,this.randomButtonTitle()+this.randomButtonTitle(),null,'56px',c))

        cont.addChild(this.addRectButton(135,0,c,150,buttonHeight,s,l));
        return cont;
    }
    addRightTab(x,y,c,buttonWidth,buttonHeight,l){
        var s=2;
        var cont = new Container();
        cont.addChild(this.addRectButton(0,0,c,275,buttonHeight,s,l));
        cont.addChild(this.addCapRightButton(280,0,c,buttonHeight,buttonHeight,s,''));
        return cont;
    }
    addLeftTab(x,y,c,buttonWidth,buttonHeight,l){
        var s=2;
        var cont = new Container();
        cont.addChild(this.addCapLeftButton(0,0,c,buttonHeight,buttonHeight,s,''));
        cont.addChild(this.addRectButton(buttonHeight,0,c,275,buttonHeight,s,l));
        return cont;
    }
    addButtonGroupTo(x,y,q,types,s){
        var buttons = [];
        var incWidth = 0;
        for (var i = 0; i < types.length; i++) {
            x+=incWidth;
            var btnCol = this.addButtonsTo(x,y,q,types[i],null,s,null,null);
            incWidth=btnCol.getBounds().width;
            buttons.push(btnCol);
        }
        return buttons;
    }
    addButtonsTo(x,y,q,t,c,s,bw,bh){
        var scale = s==null?1:s;
        scale=scale==1?1:1.25;
        var buttonWidth = (bw==null?85:bw)*scale;
        var buttonHeight = (bh==null?33:bh)*scale;
        var btns = new Container();
        btns.x=x;
        btns.y=y;

        for (var i = 0; i < q; i++) {
            var color = '';
            if(c==null){
                color = this.randomColor();
            }else{
                color = c[i];
            }
            this.addButtonTo(this.addButtonType(0,i*(buttonHeight+this.buttonMargin),color,t,buttonWidth,buttonHeight,scale),btns);
        }
        return btns;
    }

    addTabsTo(el){
        var tabCont = new Container();

        var buttonWidth = 85*1.25;
        var buttonHeight = 33*1.25;
        var y = el.y;
        var titled = el.titled?'titled-':'';
        for (var i = 0; i < el.c.length; i++) {                
            tabCont.addChild(this.addButtonType(el.x,y,el.c[i],titled+'tab-'+el.a,buttonWidth,buttonHeight,2,el.t[i]));
            y+=  buttonHeight + this.buttonMargin;    
        }
        return tabCont;
    }
    addButtonType(x,y,c,t,buttonWidth,buttonHeight,scale,l){
        
        // var buttonWidth = (bw==null?85:bw)*scale;
        // var buttonHeight = (bh==null?33:bh)*scale;
        var buttonHeightPlusMargin = buttonHeight+this.buttonMargin;
        var buttonWidthPlusMargin = buttonWidth+(this.buttonMargin*2);

        var btn = new Container();
        var btnbg = new Shape();
        if(t=='pill'){
            btn = this.addPillButton(x,y,c,buttonWidth,buttonHeight,scale);
            // btn.name=btn.id+'_btn';
            // console.log("btn", btn);
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btnbg.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handlePillClick);
        }
        if(t=='pill-left'){
            btn = this.addPillLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btnbg.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handlePillClick);
        }
        if(t=='pill-right'){
            btn = this.addPillRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btnbg.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handlePillClick);
        }
        if(t=='rect'){
            btn = this.addRectButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btnbg.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleRectClick);
        }
        if(t=='rect-pill-right'){
            btn = this.addRectWithPillRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleRectPillClick);
        }
        if(t=='rect-pill-left'){
            btn = this.addRectWithPillLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleRectPillClick);
        }
        if(t=='rect-cap-right'){
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin)
            btnbg.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleRectCapClick);
        }
        if(t=='rect-cap-left'){
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleRectCapClick);
        }
        if(t=='tiny-rect-cap-right'){
            btn = this.addTinyRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleRectCapClick);
        }
        if(t=='tiny-rect-cap-left'){
            btn = this.addTinyRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin)
            btnbg.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleRectCapClick);
        }
        if(t=='medium-rect-cap-right'){
            buttonWidthPlusMargin = buttonWidthPlusMargin+buttonWidth;
            buttonWidth = buttonWidth*2;
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleRectCapClick);
        }
        if(t=='medium-rect-cap-left'){
            buttonWidth = buttonWidth*2;
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleRectCapClick);
        }
        if(t=='wide-rect-cap-right'){
            buttonWidthPlusMargin = buttonWidthPlusMargin+(buttonWidth*2);
            buttonWidth = buttonWidth*3;
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleRectCapClick);
        }
        if(t=='wide-rect-cap-left'){
            buttonWidth = buttonWidth*3;
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleRectCapClick);
        }
        if(t=='titled-pill-left'){
            btn = this.addTitledLeftPillButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleTitledPillClick);
        }
        if(t=='titled-pill-right'){
            btn = this.addTitledRightPillButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleTitledPillClick);
        }

        if(t=='titled-left'){
            btn = this.addTitledLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleTitledPillClick);
        }
        if(t=='titled-right'){
            btn = this.addTitledRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleTitledPillClick);
        }

        if(t=='titled-tab-left'){
            btn = this.addTitledLeftTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleTabClick);
        }
        if(t=='titled-tab-right'){
            btn = this.addTitledRightTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleTabClick);
        }
        if(t=='tab-left'){
            btn = this.addLeftTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleTabClick);
        }
        if(t=='tab-right'){
            btn = this.addRightTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btnbg.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", this.handleTabClick);
        }
        btn.x=x;
        btn.y=y;
        btn.addChildAt(btnbg,0);
        return btn;
    }
    addButtonTo(btn,p){
        p.addChild(btn);
    }

    buttonLabelType = ['#','a','#,a','a,a'];
    letters = ['SDX','NAV','RCNT','COMM','CON','SYS','STR','RVOL','BT','ALPH','TCH','ro','al','luv','lef','mac','pe','lin','jl','pow','an','re'];

    possibleletters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    // var possibleletters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    buttonTitles = ['B1','B4','XX','A6','P5','X1','Y8','Z9'];
    buildReadout(el){
        var readout = new Container();
        readout.x = el.x;
        readout.y = el.y;
        var x = 0;
        var y = 0;
        var maxX = 0;
        for (var ri = 0; ri < el.rows; ri++) {
            for (var i = 0; i < el.cols.length; i++) {
                var datum = this.makeDatum(this.rifi((el.cols[i]<4?2:el.cols[i]-2),el.cols[i]));
                datum.textAlign='end';
                x+=(el.cols[i]+2)*5;
                datum.x=x;
                datum.y=y;
                readout.addChild(datum);
                maxX=x;
            }
            y+=20;
            x=0;
        }  
        return readout;       
    }
    buildDynamicText(el){
        
        var header = new Text();
        header.font='20px Okuda';
        header.text = el.header==''?this.makeDatum(6).text:this.makeCap(el.header);
        header.color = this.white;
        header.textAlign='end';
        var bbg = new Shape();
        bbg.graphics.f(this.black).r(5,0,165,25);
        var data = new Container();
        data.x = el.x;
        data.y = el.y;
        data.addChild(header);
        var x = 0;
        var y = 40;
        var maxX = 0;
        for (var ri = 0; ri < el.rows; ri++) {
            for (var i = 0; i < el.cols.length; i++) {
                var datum = this.makeDatum(this.rifi((el.cols[i]<4?2:el.cols[i]-2),el.cols[i]));
                datum.textAlign='end';
                x+=(el.cols[i]+2)*5;
                datum.x=x;
                datum.y=y;
                data.addChild(datum);
                maxX=x;
            }
            y+=20;
            x=0;
        }            
        header.x=maxX
        var hbg = new Shape();
        hbg.graphics.f(this.rae(this.datumColors)).mt(0,0)
            .lt(5,0)
            .lt(5,25)
            .lt(maxX,25)
            .lt(maxX,35)
            .lt(maxX*0.66,35)
            .lt(maxX*0.66,30)
            .lt(0,30)
        var ftr = new Shape();
        ftr.graphics.f(this.rae(this.datumColors)).mt(0,y+5)
            .lt(maxX*0.66,y+5)
            .lt(maxX*0.66,y)
            .lt(maxX,y)
            .lt(maxX,y+75)
            .lt(0,y+75)
            .lt(0,y+60)
            .lt(maxX/3,y+60)
            .lt(maxX/3,y+70)
            .lt(maxX-20,y+70)
            .lt(maxX-20,y+10)
            .lt(0,y+10)
        data.addChildAt(hbg,0);
        data.addChild(ftr);
        return data;
    }
    randomButtonLabel(){
        var l = this.randomIntFromInterval(1,5);
        var r = this.randomIntFromInterval(0,99999);
        var t = r.toString();
        var bt = t.substr(0,l);
        var btnLblTp = this.randomFromArray(this.buttonLabelType);
        if(btnLblTp == 'a'){
            bt = this.randomFromArray(this.letters);
        }else if(btnLblTp == '#,a'){
            bt = bt+' '+this.randomFromArray(this.letters);
        }else if(btnLblTp == 'a,a'){
            bt = this.randomFromArray(this.letters)+' '+this.randomFromArray(this.letters);
        }  
        // console.log("bt", bt);
        return bt;
    }
    makeWord(){
        var word = '';
        for( var i=0; i < this.randomIntFromInterval(1,4); i++ ){
            word += this.possibleletters.charAt(this.randomIntFromInterval(0,this.possibleletters.length));
        }
        // console.log('word',word)
        return word;
    }
    datumColors = [this.yellow,this.blue,this.gold];
    makeDatum(datumLength){
        var datum = '';
        var datumval = 0;
        for( var i=0; i < datumLength; i++ ){
            datum += this.rifi(0,9);
            datumval = parseInt(datum)
        }
        var txt = new Text();
        txt.font='16px Okuda';
        txt.text = datum;
        txt.color=this.rae(this.datumColors);
        return txt;
    }
    randomButtonTitle(){
        var amount = this.rifi(2,3);
        var retval = '';
        for (var i = 0; i < amount; i++) {
            retval = retval+this.rifi(0,9).toString();
        }
        return retval; //randomFromArray(buttonTitles);
    }
    // changeRandomColors(){  
    //     $j('.random-color').each(function(){
    //         this.changeColor(this);
    //     });
    // }
    // changeDynamicColors(){  
    //     $j('.dynamic-color').each(function(){
    //         this.changeColor(this);
    //     });
    // }
    // changeColor(el){
    //     $j(el).removeClass('orange gray salmon tan blue peach purple pink white red yellow pale-yellow gold').addClass(this.randomColor());
    // }

/*
   /$$$$$$   /$$$$$$  /$$      /$$ /$$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$ /$$   /$$ /$$$$$$$$ /$$$$$$ 
  /$$__  $$ /$$__  $$| $$$    /$$$| $$__  $$ /$$__  $$| $$$ | $$| $$_____/| $$$ | $$|__  $$__//$$__  $$
 | $$  \__/| $$  \ $$| $$$$  /$$$$| $$  \ $$| $$  \ $$| $$$$| $$| $$      | $$$$| $$   | $$  | $$  \__/
 | $$      | $$  | $$| $$ $$/$$ $$| $$$$$$$/| $$  | $$| $$ $$ $$| $$$$$   | $$ $$ $$   | $$  |  $$$$$$ 
 | $$      | $$  | $$| $$  $$$| $$| $$____/ | $$  | $$| $$  $$$$| $$__/   | $$  $$$$   | $$   \____  $$
 | $$    $$| $$  | $$| $$\  $ | $$| $$      | $$  | $$| $$\  $$$| $$      | $$\  $$$   | $$   /$$  \ $$
 |  $$$$$$/|  $$$$$$/| $$ \/  | $$| $$      |  $$$$$$/| $$ \  $$| $$$$$$$$| $$ \  $$   | $$  |  $$$$$$/
  \______/  \______/ |__/     |__/|__/       \______/ |__/  \__/|________/|__/  \__/   |__/   \______/
*/
    elbow_lg_right = {
        h: 250,
        r: [120,0,-40,0],
        c: this.yellow,
        m: [0,0,0,0],
        t: null
    }
    elbow_md_right = {
        h: 150,
        r: [60,0,-20,0],
        c: this.yellow,
        m: [0,0,0,0],
        t: null
    }
    elbow_sm_right = {
        h: 50,
        r: [30,0,-10,0],
        c: this.yellow,
        m: [0,0,0,0],
        t: null
    }
    
    elbow_lg_left = {
        h: 250,
        r: [0,120,0,-40],
        c: this.yellow,
        m: [0,20,0,0],
        t: null
    }
    elbow_md_left = {
        h: 150,
        r: [0,60,0,-40],
        c: this.yellow,
        m: [0,20,0,0],
        t: null
    }
    elbow_sm_left = {
        h: 100,
        r: [0,50,0,-40],
        c: this.yellow,
        m: [0,20,0,0],
        t: null
    }
    joystick(x,y,c){
        var colors = [];
        if(Array.isArray(c)){
            colors = c;
        }else{
            colors[0]=c;
            colors[1]=c;
            colors[2]=c;
            colors[3]=c;
        }
        var def = {
            type: 'joystick',
            x:x,
            y:y,
            c1:colors[0],
            c2:colors[1],
            c3:colors[2],
            c4:colors[3]
        }
        return def;
    }
    scannerSection = {
        y: 0,
        w: 535,
        h: 650,
        header: {
            h: 0,
            r: [0,0,0,0],
            c: this.yellow,
            m: [0,0,0,0],
            t: null
        },
        leftSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        body: [
            this.joystick(95,10,this.gold),
            {
                type:'header',
                x:298,
                y:310,
                w:237,
                h:30,
                c:this.gold,
                r:[0,0,0,0],
                t:null
            },
            {
                type:'buttons',
                x:395,
                y:390,
                q:5,
                t:'pill',
                c:[this.gold,this.white,this.blue,this.gold,this.blue]
            },
            {
                type:'header',
                x:0,
                y:310,
                w:288,
                h:30,
                c:this.blue,
                r:[0,0,0,0],
                t:null
            },
            {
                type:'header',
                x:0,
                y:635,
                w:288,
                h:15,
                c:this.tan,
                r:[0,0,0,0],
                t:null
            },
            {
                type:'scanner',
                x:0,
                y:390,
                w:288,
                h:220,
                c:[this.white,this.tan,this.gold,this.white,this.tan],
                rx:194,
                ry:80
            }
        ],
        rightSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        footer: {
            h: 0,
            r: [0,0,0,0],
            c: this.tan,
            m: [0,0,0,0]
        }
    }
    navRefSection = {
        y: 0,
        w: 335,
        h: 650,
        header: this.elbow_lg_right,
        leftSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        body: [
            {
                type:'header',
                x:0,
                y:0,
                w:295,
                h:40,
                c:this.yellow,
                r:[0,0,0,0],
                t:{
                    x:290,
                    y:5,
                    t:'navigation reference',
                    a:null,
                    s:'30px',
                    c:null
                }
            },
            {
                type:'header',
                x:0,
                y:60,
                w:295,
                h:30,
                c:this.gold,
                r:[0,0,0,0],
                t:{
                    x:290,
                    y:5,
                    t:'cache select',
                    a:null,
                    s:'22px',
                    c:null
                }
            },
            {
                type:'header',
                x:0,
                y:140,
                w:295,
                h:260,
                c:this.yellow,
                r:[0,0,20,0],
                t:{
                    x:290,
                    y:10,
                    t:'lcars mode select',
                    a:null,
                    s:'22px',
                    c:null
                }
            },
            {
                type:'buttons',
                x:-33,
                y:140,
                q:5,
                t:'titled-pill-left',
                c:null
            }
        
        ],
        rightSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        footer: {
            h: 0,
            r: [0,0,0,0],
            c: this.tan,
            m: [0,0,0,0]
        }
    }
    flightSection = {
        y: 0,
        w: 420,
        h: 650,
        header: {
            h: 210,
            r: [0,0,0,0],
            c: this.yellow,
            m: [0,40,100,0],
            t: {
                x: -10,
                y: 5,
                t: "FLIGHT CONTROL",
                a: "end",
                s: "22px",
                c: null
            }
        },
        leftSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        body: [
            {
                type:'header',
                x:0,
                y:0,
                w:420,
                h:340,
                c:this.yellow,
                r:[50,0,0,50],
                t:{
                    x:410,
                    y:5,
                    t:'navigation to cache',
                    a:null,
                    s:'20px',
                    c:null
                }
            },
            {
                type:'header',
                x:85,
                y:30,
                w:445,
                h:295,
                c:'#000',
                r:[50,0,0,10],
                t:null
            },
            {
                type:'buttons',
                x:110,
                y:80,
                q:5,
                t:'rect-pill-right',
                c:[this.white,this.gold,this.yellow,this.yellow,this.gold]
            },
            {
                type:'buttons',
                x:235,
                y:80,
                q:5,
                t:'pill',
                c:[this.blue,this.none,this.white,this.none,this.none]
            },
            {
                type:'buttons',
                x:335,
                y:80,
                q:5,
                t:'pill',
                c:[this.white,this.none,this.blue,this.none,this.gold]
            }
        ],
        rightSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        footer: {
            h: 0,
            r: [0,0,0,0],
            c: this.tan,
            m: [0,0,0,0]
        }
    }
    joystickSection = {
        y: 0,
        w: 200,
        h: 650,
        header: {
            h: 210,
            r: [0,0,0,0],
            c: this.blue,
            m: [0,25,100,0],
            t: null
        },
        leftSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        body: [
            {
                type:'header',
                x:0,
                y:0,
                w:200,
                h:30,
                c:this.blue,
                r:[0,0,0,0],
                t:null
            },
            this.joystick(0,75,[this.red,this.gold,this.gold,this.gold])
        ],
        rightSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        footer: {
            h: 15,
            r: [0,0,0,0],
            c: this.tan,
            m: [0,0,0,0]
        }
    }
    //function btnClickFunc(){alert('func')}
    warpDriveSection = {
        y: 0,
        w: 410,
        h: 650,
        header: {
            h: 210,
            r: [0,0,0,0],
            c: this.yellow,
            m: [0,20,100,0],
            t: {
                "x": -10,
                "y": 5,
                "t": "warp drive systems",
                "a": "end",
                "s": "22px",
                "c": null
            }
        },
        leftSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        body: [                
            {
                type:'header',
                x:0,
                y:0,
                w:410,
                h:30,
                c:this.yellow,
                r:[0,0,0,0],
                t:{
                    x:400,
                    y:5,
                    t:'option select',
                    a:null,
                    s:'22px',
                    c:null
                }
            },
            {
                type:'buttons',
                x:15,
                y:80,
                q:5,
                t:'pill',
                c:[this.yellow,this.gold,this.white,this.blue,this.white]
            },
            {
                type:'buttons',
                x:120,
                y:80,
                q:5,
                t:'titled-pill-left',
                c:[this.gold,this.yellow,this.gold,this.gold,this.blue]
            },
            {
                type:'buttons',
                x:360,
                y:80,
                q:5,
                t:'tiny-rect-cap-left',
                c:[this.yellow,this.none,this.yellow,this.blue,this.tan]
            }
        ],
        rightSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        footer: {
            h: 15,
            r: [0,0,0,0],
            c: this.tan,
            m: [0,0,0,0]
        }
    }
    impulseSection = {
        y: 0,
        w: 177,
        h: 650,
        header: {
            h: 210,
            r: [0,0,0,0],
            c: this.yellow,
            m: [0,12,100,0],
            t: {
                "x": -10,
                "y": 5,
                "t": "impulse systems",
                "a": "end",
                "s": "22px",
                "c": null
            }
        },
        leftSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        body: [                
            {
                type:'header',
                x:0,
                y:0,
                w:177,
                h:30,
                c:this.gold,
                r:[0,0,0,0],
                t:{
                    x:167,
                    y:5,
                    t:'mode select',
                    a:null,
                    s:'22px',
                    c:null
                }
            },               
            {
                type:'header',
                x:0,
                y:80,
                w:50,
                h:220,
                c:this.tan,
                r:[0,20,20,0],
                t:null
            },              
            {
                type:'header',
                x:0,
                y:110,
                w:30,
                h:160,
                c:this.black,
                r:[0,10,10,0],
                t:null
            }
        ],
        rightSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        footer: {
            h: 15,
            r: [0,0,0,0],
            c: this.tan,
            m: [0,0,0,0]
        }
    }
    spacerSection = {
        y: 0,
        w: 45,
        h: 650,
        header: {
            h: 210,
            r: [0,0,0,0],
            c: this.blue,
            m: [0,15,100,0],
            t: null
        },
        leftSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        body: [
            {
                type:'header',
                x:0,
                y:0,
                w:45,
                h:30,
                c:this.tan,
                r:[0,0,0,0],
                t:null
            }
        ],
        rightSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        footer: {
            h: 0,
            r: [0,0,0,0],
            c: this.tan,
            m: [0,0,0,0]
        }
    }
    overrideSection = {
        y: 0,
        w: 200,
        h: 650,
        header: {
            h: 210,
            r: [0,20,20,0],
            c: this.yellow,
            m: [0,0,100,0],
            t: {
                "x": -10,
                "y": 5,
                "t": "emergency override",
                "a": "end",
                "s": "22px",
                "c": null
            }
        },
        leftSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        body: [               
            {
                type:'header',
                x:0,
                y:0,
                w:200,
                h:30,
                c:this.gold,
                r:[0,0,0,0],
                t:{
                    x:190,
                    y:5,
                    t:'helm / navigation',
                    a:null,
                    s:'22px',
                    c:null
                }
            }
        ],
        rightSidebar: {
            w: 0,
            r: [0,0,0,0],
            c: this.gold
        },
        footer: {
            h: 15,
            r: [0,0,0,0],
            c: this.tan,
            m: [0,0,0,0]
        }
    }
    
    lcars__sec_h_xl = 200;
    lcars__sec_h_lg = 100;
    lcars__sec_h_md = 50;
    lcars__sec_h_sm = 25;
    lcars__sec_h_xs = 12;
    
    lcars__sec_w_xl = 500;
    lcars__sec_w_lg = 360;
    lcars__sec_w_md = 200;
    lcars__sec_w_sm = 110;
    lcars__sec_w_xs = 50;
    
    lcars__sec_gutter = 20;

        // opsDims = {
        //     w:[lcars__sec_w_md,lcars__sec_w_lg,lcars__sec_w_md,lcars__sec_w_lg,lcars__sec_w_sm,lcars__sec_w_lg,lcars__sec_w_sm,lcars__sec_w_lg]
        
        // }
/*
   /$$$$$$   /$$$$$$  /$$   /$$ /$$   /$$
  /$$__  $$ /$$__  $$| $$$ | $$| $$$ | $$
 | $$  \__/| $$  \ $$| $$$$| $$| $$$$| $$
 | $$      | $$  | $$| $$ $$ $$| $$ $$ $$
 | $$      | $$  | $$| $$  $$$$| $$  $$$$
 | $$    $$| $$  | $$| $$\  $$$| $$\  $$$
 |  $$$$$$/|  $$$$$$/| $$ \  $$| $$ \  $$
  \______/  \______/ |__/  \__/|__/  \__/
*/
        con = {
            name:'con',
            dim:{
                w:2500,
                h:700,
                g:20
            },
            elements: [
                this.scannerSection,
                this.navRefSection,
                this.flightSection,
                this.joystickSection,
                this.warpDriveSection,
                this.impulseSection,
                this.spacerSection,
                this.overrideSection
            ]
        } 
/*
  /$$$$$$$$ /$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$   /$$$$$$  /$$      
 |__  $$__//$$__  $$ /$$__  $$|__  $$__/|_  $$_/ /$$__  $$ /$$__  $$| $$      
    | $$  | $$  \ $$| $$  \__/   | $$     | $$  | $$  \__/| $$  \ $$| $$      
    | $$  | $$$$$$$$| $$         | $$     | $$  | $$      | $$$$$$$$| $$      
    | $$  | $$__  $$| $$         | $$     | $$  | $$      | $$__  $$| $$      
    | $$  | $$  | $$| $$    $$   | $$     | $$  | $$    $$| $$  | $$| $$      
    | $$  | $$  | $$|  $$$$$$/   | $$    /$$$$$$|  $$$$$$/| $$  | $$| $$$$$$$$
    |__/  |__/  |__/ \______/    |__/   |______/ \______/ |__/  |__/|________/
*/
        tactical = {
            name:'tactical',
            dim:{
                w:3100,
                h:600,
                g:20
            },
            elements: [
                {
                    y:0,w:300,
                    header: new LCARS__Header().H(200).T('phaser power status').C(this.tan).R([20,0,0,20]).M([0,20,100,0]),
                    body:[
                        new LCARS__Subheader().R([15,0,0,15]),
                        new LCARS__Tabs().X(10).Y(50)
                            .addTab('al hoc',this.blue)
                            .addTab('rh jus',this.white)
                            .addTab('ma kal',this.gold)
                            .addTab('we kep',this.yellow) 
                    ]
                },
                {
                    y:0,w:100,
                    header: new LCARS__Header().C(this.gold).H(200).T('ro esc').R([0,0,0,0]).M([0,30,100,0]),
                    body:[
                        new LCARS__Subheader().C(this.white),
                        new LCARS__ReadoutDisplay().Y(35).R(5).C([6,6,2]).H('status 2')
                    ]
                },
                {
                    y:0,w:420,
                    header: new LCARS__Header().H(200).C(this.white).T('weapons systems').R([0,0,0,0]).M([0,20,100,0]),
                    body:[
                        new LCARS__Readout().Y(-90).R(4).C([6,9,2]),
                        new LCARS__Subheader().C(this.blue),
                        new LCARS__Header().C(this.tan).R([0,0,0,35]).Y(50).H(200),
                        new LCARS__Header().C(this.black).Y(50).X(80).H(185),
                        new LCARS__ButtonGroups().X(100).Y(50).Q(4).T(['rect-cap-right','pill','pill'])
                    ]
                },
                {
                    y:0,w:400,
                    m:[0,20,0,0],
                    body: [
                        this.joystick(0,0,[this.red,this.red,this.red,this.red]),
                        new LCARS__Scanner().X(200).C([this.white,this.yellow,this.red,this.red,this.yellow]).R([100,80]),
                        new LCARS__Subheader().C(this.white).Y(300).W(510),
                        new LCARS__ReadoutDisplay().Y(335).R(5).C([6,2,6,6,2]).H('tactical analysis'),
                        new LCARS__Header().X(340).Y(350).W(280).C(this.tan).H(200).R([0,0,30,0]),
                        new LCARS__Header().X(335).Y(350).W(200).C(this.black).H(180).R([0,0,0,0]),
                        new LCARS__ButtonGroups().X(200).Y(350).Q(4).T(['pill','titled-pill-left']) 
                    ]
                },
                {
                    y:0,w:200,
                    header: new LCARS__Header().C(this.tan).H(200).R([0,90,0,0]).M([0,20,0,0]),
                    body:[
                        new LCARS__Header().X(30).W(170).C(this.tan).H(80).R([0,0,0,-80]).M([0,20,0,0]),
                        new LCARS__Header().X(110).Y(100).W(90).C(this.blue).H(30).R([0,0,0,0]).M([0,20,0,0])
                        //new LCARS__ButtonGroups().X(10).Y(40).Q(3).T(['titled-pill-left']) 
                    ]
                },
                {
                    y:0,w:400,
                    m:[0,20,0,0],
                    body:[
                        new LCARS__Tabs().X(85).Titled(false)
                            .addTab('torpedo control',this.white)
                            .addTab('intruder scan',this.gold)
                            .addTab('Long Range scan analysis',this.blue)
                            .addTab('deflector shield',this.blue),
                        new LCARS__Header().Y(300).W(400).C(this.tan).H(250).R([50,0,0,30]),   
                        new LCARS__Header().X(80).Y(330).W(400).C(this.black).H(210).R([30,0,0,0]),
                        new LCARS__ButtonGroups().X(90).Y(360).Q(4).T(['medium-rect-cap-right','pill']) 
                    ]
                },
                {
                    y:0,w:400,
                    header: new LCARS__Header().C(this.blue).H(200).M([0,20,100,0]).T('auxilliary targeting scanners','start'),
                    body:[
                        new LCARS__Readout().Y(-90).R(4).C([6,9,2,5,11,5,3,7,7,3]),
                        new LCARS__Subheader().C(this.yellow).W(500),
                        new LCARS__Header().C(this.tan).X(300).Y(50).W(200).R([0,0,40,0]),
                        new LCARS__Header().C(this.black).X(300).Y(50).W(120).H(190).R([0,0,20,0]),
                        new LCARS__ReadoutDisplay().Y(35).R(5).C([6,6,4,3,2,5,3,6]).H('shield harmonics'),
                        new LCARS__ButtonGroups().X(300).Y(50).Q(4).T(['rect-cap-left'])
                    ]
                },
                {
                    y:0,w:80,
                    header: new LCARS__Header().C(this.tan).H(200).M([0,20,0,0]).T('ge rod','left'),
                    body:[
                        
                    ]
                },
                {
                    y:0,w:190,
                    header: new LCARS__Header().C(this.yellow).H(200).M([0,30,100,0]).T('mode select','left'),
                    body:[
                        new LCARS__Subheader().C(this.blue).T('ae bfd','start'),
                        new LCARS__ButtonGroups().Y(50).Q(4).T(['titled-left'])
                    ]
                },
                {
                    y:0,w:370,
                    header: new LCARS__Header().C(this.tan).H(200).M([0,20,100,0]).R([0,20,20,0]).T('tactical analysis','left'),
                    body:[
                        new LCARS__Subheader().W(370).C(this.tan).T('ga pdf','start').R([0,10,10,0]),
                        new LCARS__Scanner().Y(50).W(370).C([this.white,this.white,this.blue,this.tan,this.white]).R([200,80])
                    ]
                }
            ]
        }
/*
   /$$$$$$  /$$$$$$$   /$$$$$$ 
  /$$__  $$| $$__  $$ /$$__  $$
 | $$  \ $$| $$  \ $$| $$  \__/
 | $$  | $$| $$$$$$$/|  $$$$$$ 
 | $$  | $$| $$____/  \____  $$
 | $$  | $$| $$       /$$  \ $$
 |  $$$$$$/| $$      |  $$$$$$/
  \______/ |__/       \______/ 
*/
        ops = {
            name:'ops',
            dim:{
                w:2500,
                h:700,
                g:20
            },
            elements: [
                {
                    y: 0,
                    w: 200, 
                    header: new LCARS__Header()
                        .H(200)
                        .R([20,0,0,20])
                        .C(this.yellow)
                        .M([0,20,100,0])
                        .T('emergency override'),
                    body: [               
                        new LCARS__Subheader().W(200).C(this.gold).R([15,0,0,15]).T('engineering systems'),
                        new LCARS__ButtonGroups().X(10).Y(40).Q(3).T(['titled-pill-left']),
                        new LCARS__ButtonGroups().X(10).Y(180).Q(3).T(['titled-pill-right'])
                    ],
                    footer: new LCARS__Header()
                        .H('xs')
                        .C(this.tan)
                },
                {
                    y: 0,
                    w: 400,
                    header: new LCARS__Header()
                        .H(200)
                        .R([0,0,0,0])
                        .C(this.yellow)
                        .M([0,40,100,0])
                        .T('warp drive systems'),
                    body: [                
                        new LCARS__Subheader().W(400).C(this.yellow).T('power consumption'),
                        // new LCARS__ButtonGroups().X(10).Y(40).Q(6).T(['pill','titled-pill-right'])
                        {
                            type:'textblock',
                            header:'atmospheric process',
                            rows:8,
                            cols:[6,2,6,6,2,6],
                            x:0,
                            y:40
                        },
                        {
                            type:'textblock',
                            header:'',
                            rows:8,
                            cols:[2,8,4],
                            x:210,
                            y:40
                        },
                        {
                            type:'textblock',
                            header:'',
                            rows:8,
                            cols:[3,2,4],
                            x:320,
                            y:40
                        }
                    ],
                    footer: new LCARS__Header()
                        .H('xs')
                        .C(this.tan)
                },
                // spacerSection,
                {
                    y: 0,
                    w: 200,
                    header: new LCARS__Header()
                        .H(200)
                        .R([0,0,0,0])
                        .C(this.yellow)
                        .M([0,20,100,0])
                        .T('operational priorities'),
                    body: [               
                        new LCARS__Subheader().W(200).C(this.gold).T('lcars mode select'),
                        new LCARS__ButtonGroups().X(10).Y(40).Q(6).T(['titled-pill-right'])
                    ],
                    footer: new LCARS__Header().H('xs').C(this.tan)
                },
                // joystickSection,
                {
                    y:0,
                    w:360,
                    header: new LCARS__Header()
                        .H(200)
                        .R([0,0,0,0])
                        .C(this.yellow)
                        .M([0,0,100,0])
                        .T('operations management','left'),
                    body: [               
                        new LCARS__Subheader().W(360),
                        new LCARS__ButtonGroups().X(10).Y(40).Q(6).T(['pill','titled-pill-left'])
                    ],
                    footer: new LCARS__Header().H('xs').C(this.yellow)
                },
                {
                    y:0,
                    w:110,
                    header: new LCARS__Header()
                        .H(240)
                        .R([0,120,0,-40])
                        .C(this.yellow)
                        .M([0,20,0,0]),
                        //elbow_lg_left,
                    body: [                                               
                        new LCARS__Header().X(40).W(70).H(40),                                             
                        new LCARS__Header().X(40).Y(60).W(70).H(30).C(this.blue),                                             
                        new LCARS__Header().X(40).Y(110).W(70).H(285)
                    ],
                    footer:  new LCARS__Header().H('xs').C(this.yellow).R([0,0,15,0])
                },
                {
                    y:0,
                    w:360,
                    m:[0,20,0,0],
                    body:[
                        new LCARS__Tabs().X(70)
                            .addTab('departmental',this.blue)
                            .addTab('status',this.blue)
                            .addTab('communications',this.white)
                            .addTab('mission status',this.gold),
                        new LCARS__Header().Y(300).W(350).R([50,0,0,50]).H(350),                        
                        new LCARS__Header().Y(330).W(250).R([30,0,0,10]).H(305).X(100).C(this.black),
                        new LCARS__ButtonGroups().X(130).Y(340).Q(6).T(['pill','pill'])
    
                    ]
                },
                {
                    y:0,
                    w:200,
                    header: new LCARS__Header()
                        .H(200)
                        .R([0,0,0,0])
                        .C(this.blue)
                        .M([0,20,100,0]),
                    body: [ 
                        new LCARS__Subheader().W(100), 
                        new LCARS__ButtonGroups().X(10).Y(40).Q(6).T(['pill','pill'])
                    ],
                    footer: new LCARS__Header().H('xs').C(this.yellow)
                },
                {
                    y:0,
                    w:400,
                    header: new LCARS__Header()
                        .H(200)
                        .R([0,20,20,0])
                        .C(this.yellow)
                        .M([0,20,100,0])
                        .T('communications'),
                    body: [ 
                        new LCARS__Subheader().W(360).T('channel select').R([0,15,15,0]), 
                        new LCARS__ButtonGroups().X(10).Y(40).Q(6).T(['rect-pill-left','rect','rect-pill-right'])
                    ],
                    footer: new LCARS__Header().H('xs').C(this.yellow)
                }
            ]
        }
        /**/
        mobile = {            
            name:'mobile',
            dim:{
                w:375,
                h:667,
                g:5
            },
            elements: [
                {
                    y: 0,
                    w: 50,
                    h: 662,
                    header: {
                        h: 100,
                        r: [50,0,-20,0],
                        c: this.yellow,
                        m: null,
                        t: null
                    },
                    leftSidebar: {
                        w: 30,
                        r: [0,0,0,0],
                        c: this.yellow
                    },
                    body: []
                },
                {
                    y: 0,
                    w: 300,
                    h: 662,
                    header: {
                        h: 80,
                        r: [0,0,0,0],
                        c: this.yellow,
                        m: null,
                        t:  {
                            x: -10,
                            y: 5,
                            t: "mobile lcars",
                            a: "end"
                        }
                    },
                    body: [               
                        this.joystick(0,10,[this.red,this.gold,this.gold,this.gold]),
                        new LCARS__ButtonGroups().X(215).Y(25).Q(4).T(['pill-left']),
                        new LCARS__ButtonGroups().X(-3).Y(235).Q(3).T(['pill','pill','pill']),
                        {
                            type: "textblock",
                            header: "atmospheric process",
                            rows: 4,
                            cols: [3,6,2,5],
                            x: 0,
                            y: 365
                        },
                        {
                            type: "textblock",
                            header: "biology readings",
                            rows: 4,
                            cols: [6,2,6,6],
                            x: 160,
                            y: 365
                        }
                    ],
                    footer: {
                        h: 15,
                        r: [0,0,0,0],
                        c: this.tan,
                        m: [0,0,0,0]
                    }
                }
            ]
        }
        padd = {
            name:'padd',
            dim:{
                w:1024,
                h:768,
                g:5
            },
            elements:[
                {
                    y:0,
                    w:100,
                    h:768,
                    m:[0,0,0,0],
                    body:[
                        new LCARS__Subheader().H(100),
                        new LCARS__Subheader().H(120).Y(105).R([0,0,0,50]).C(this.blue),
                        new LCARS__Subheader().H(230).Y(230).R([50,0,0,0]).C(this.tan),
                        new LCARS__Subheader().H(260).Y(465).C(this.gold),
                        new LCARS__Subheader().H(20).Y(730).C(this.yellow)
                    ]
                },
                {
                    y:0,w:30,m:[0,5,0,0],
                    body:[
                        new LCARS__Subheader().Y(165).W(30).H(60).R([0,-30,0,0]).C(this.blue),
                        new LCARS__Subheader().Y(230).W(30).H(60).R([0,0,-30,0]).C(this.tan)
                    ]
                },
                {
                    y:0,w:200,m:[0,5,0,0],
                    body:[
                        new LCARS__Readout().Y(5).R(4).C([10,10,10]),
                        new LCARS__Readout().Y(115).R(3).C([10,10,10]),
                        new LCARS__Subheader().Y(195).C(this.blue),
                        new LCARS__Subheader().Y(230).C(this.tan),
                        new LCARS__Readout().Y(275).R(7).C([10,10,10]),
                        new LCARS__ButtonGroups().X(30).Y(465).Q(6).T(['rect-cap-left','pill','pill','rect-pill-right'])
                    ]
                },
                {
                    y:0,w:200,m:[0,5,0,0],
                    body:[
                        new LCARS__Readout().Y(5).R(4).C([10,10,10]),
                        new LCARS__Readout().Y(115).R(3).C([10,10,10]),
                        new LCARS__Subheader().Y(195).C(this.blue),
                        new LCARS__Subheader().Y(230).C(this.tan),
                        new LCARS__Readout().Y(275).R(7).C([10,10,10])
                    ]
                },
                {
                    y:0,w:100,m:[0,5,0,0],
                    body:[
                        new LCARS__Readout().Y(5).R(4).C([5,5]),
                        new LCARS__Readout().Y(115).R(3).C([5,5]),
                        new LCARS__Subheader().Y(195).C(this.blue),
                        new LCARS__Subheader().Y(230).C(this.tan),
                        new LCARS__Readout().Y(275).R(7).C([5,5])
                    ]
                },
                {
                    y:0,w:350,m:[0,5,0,0],
                    body:[
                        // new LCARS__Readout().Y(5).R(4).C([10,10]),
                        new LCARS__Readout().Y(115).R(3).C([10,10,3,6,8,2]),
                        new LCARS__Tabs().X(35).Titled(false)
                            .addTab('starfleet operations',this.gold)
                            .addTab('ship status',this.blue)
                            // .addTab('communications',this.white)
                            // .addTab('mission status',this.gold),
                            ,
                        new LCARS__Subheader().Y(195).C(this.blue),
                        new LCARS__Subheader().Y(230).C(this.tan),
                        new LCARS__Scanner().Y(275).H(270).W(350).C([this.white,this.white,this.blue,this.gold,this.white]).R([250,145]),
                        new LCARS__ButtonGroups().Y(555).Q(4).T(['rect-cap-left']),
                        this.joystick(150,550,[this.gold,this.yellow,this.yellow,this.yellow])
                    ]
                }
            ]
        }
        paddPro = {
            name:'padd pro',
            dim:{
                w:1366,
                h:1024,
                g:5
            },
            elements:[
                {
                    y:0,
                    w:100,
                    h:768,
                    m:[0,0,0,0],
                    body:[
                        new LCARS__Subheader().H(100),
                        new LCARS__Subheader().H(120).Y(105).R([0,0,0,50]).C(this.blue),
                        new LCARS__Subheader().H(230).Y(230).R([50,0,0,0]).C(this.tan),
                        new LCARS__Subheader().H(260).Y(465).C(this.gold),
                        new LCARS__Subheader().H(30).Y(730).C(this.blue),
                        new LCARS__Subheader().H(220).Y(765).C(this.yellow)
                    ]
                },
                {
                    y:0,w:30,m:[0,5,0,0],
                    body:[
                        new LCARS__Subheader().Y(165).W(30).H(60).R([0,-30,0,0]).C(this.blue),
                        new LCARS__Subheader().Y(230).W(30).H(60).R([0,0,-30,0]).C(this.tan),
                        new LCARS__Subheader().X(5).W(320).H(30).Y(730).C(this.blue)
                    ]
                },
                {
                    y:0,w:200,m:[0,5,0,0],
                    body:[
                        new LCARS__Readout().Y(5).R(4).C([10,10,10]),
                        new LCARS__Readout().Y(115).R(3).C([10,10,10]),
                        new LCARS__Subheader().Y(195).C(this.blue),
                        new LCARS__Subheader().Y(230).C(this.tan),
                        new LCARS__Readout().Y(275).R(7).C([10,10,10]),
                        new LCARS__ButtonGroups().X(30).Y(465).Q(6).T(['rect-pill-left','pill','rect-pill-right']),
                        new LCARS__ButtonGroups().X(30).Y(770).Q(5).T(['rect-cap-left','rect-cap-right'])
                    ]
                },
                {
                    y:0,w:200,m:[0,5,0,0],
                    body:[
                        new LCARS__Readout().Y(5).R(4).C([10,10,10]),
                        new LCARS__Readout().Y(115).R(3).C([10,10,10]),
                        new LCARS__Subheader().Y(195).C(this.blue),
                        new LCARS__Subheader().Y(230).C(this.tan),
                        new LCARS__Readout().Y(275).R(7).C([10,10,10]),
                        new LCARS__Subheader().X(80).W(120).H(120).Y(730).C(this.blue).R([0,50,0,0]),
                        new LCARS__Subheader().X(80).W(120).H(125).Y(855).C(this.blue).R([0,0,0,50]),
                        new LCARS__Subheader().X(180).W(830).H(30).Y(950).C(this.blue).R([0,15,15,0])
                    ]
                },
                {
                    y:0,w:100,m:[0,5,0,0],
                    body:[
                        new LCARS__Readout().Y(5).R(4).C([5,5]),
                        new LCARS__Readout().Y(115).R(3).C([5,5]),
                        new LCARS__Subheader().Y(195).C(this.blue),
                        new LCARS__Subheader().Y(230).C(this.tan),
                        new LCARS__Readout().Y(275).R(7).C([5,5]),
                        new LCARS__ButtonGroups().X(30).Y(465).Q(10).T(['rect-pill-left','pill','rect-pill-right'])
                    ]
                },
                {
                    y:0,w:350,m:[0,5,0,0],
                    body:[
                        new LCARS__Readout().Y(5).R(4).C([5,5,8,4,3,6,7,9]),
                        new LCARS__Readout().Y(115).R(3).C([5,5,8,4,3,6,7,9]),
                        new LCARS__Subheader().Y(195).C(this.blue),
                        new LCARS__Subheader().Y(230).C(this.tan),
                        new LCARS__Readout().Y(275).R(7).C([5,5,8,4,3,6,7,9])
                    ]
                },
                {
                    y:0,w:350,m:[0,5,0,0],
                    body:[
                        // new LCARS__Readout().Y(5).R(4).C([10,10]),
                        new LCARS__Readout().Y(115).R(3).C([10,10,3,6,8,2]),
                        new LCARS__Tabs().X(35).Titled(false)
                            .addTab('starfleet operations',this.gold)
                            .addTab('ship status',this.blue)
                            // .addTab('communications',this.white)
                            // .addTab('mission status',this.gold),
                            ,
                        new LCARS__Subheader().Y(195).C(this.blue),
                        new LCARS__Subheader().Y(230).C(this.tan),
                        new LCARS__Scanner().Y(275).H(460).W(350).C([this.white,this.white,this.blue,this.gold,this.white]).R([250,245]),
                        new LCARS__ButtonGroups().Y(745).Q(4).T(['rect-cap-left']),
                        this.joystick(150,740,[this.gold,this.yellow,this.yellow,this.yellow])
                    ]
                }
            ]
        }
    randomColor(){
        return this.colors[this.randomIntFromInterval(0,(this.colors.length - 1))];
    }
    rifi(min,max){
        return this.randomIntFromInterval(min,max);
    }
    rae(a){
        return this.randomFromArray(a);
    }
    randomIntFromInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    randomFromArray(a){
        return a[this.randomIntFromInterval(0,(a.length - 1))];
    }
    makeCap(t){
        return t!=null?t.toUpperCase():'';
    } 
}

function LCARS__Section(){
    this.y=0;
    this.w=100;
    //this.h=768;
    this.m=[0,0,100,0];
	this.header={};
	this.leftSidebar={};
	this.body=[];
	this.rightSidebar={};
	this.footer={};
    
    this.Y=function(y){
        this.y=y;
        return this;
    }
    // this.H=function(h){
    //     this.h=h;
    //     return this;
    // }
    this.W=function(w){
        this.w=w;
        return this;
    }
    this.M=function(m){
        this.m=m;
        return this;
    }
	this.setHeader=function(header){
		this.header=header;
		return this;
	}
	this.setLeftSidebar=function(leftSidebar){
		this.leftSidebar=leftSidebar;
		return this;
	}
	this.setBody=function(body){
		this.body=body;
		return this;
	}
	this.setRightSidebar=function(rightSidebar){
		this.rightSidebar=rightSidebar;
		return this;
	}
	this.setFooter=function(footer){
		this.footer=footer;
		return this;
	}
}
function LCARS__Elbow(){
	this.h=250;
    this.r= [120,0,-40,0];
    this.c= yellow;
    this.m= [0,0,0,0];
    this.t= null;
    
	this.H=function(h){
		this.h=h;
		return this;
	}
	this.R=function(r){
		this.r=r;
		return this;
	}
	this.C=function(c){
		this.c=c;
		return this;
	}
	this.M=function(m){
		this.m=m;
		return this;
	}
	this.T=function(t){
		this.t=t;
		return this;
	}
}
function LCARS__Joystick(){
    this.type='joystick';
    this.n=null;
    this.x=0;
    this.y=0;
    this.c1=gold;
    this.c2=gold;
    this.c3=gold;
    this.c4=gold;

    this.X=function(x){
        this.x=x;
        return this;
    }
    this.Y=function(y){
        this.y=y;
        return this;
    }
    this.C=function(c){            	
        if(Array.isArray(c)){
            this.c1 = c[0];
            this.c2 = c[1];
            this.c3 = c[2];
            this.c4 = c[3];
        }else{
            this.c1 = c;
            this.c2 = c;
            this.c3 = c;
            this.c4 = c;
        }
        return this;
    }
    this.N=function(n){
        this.n=n;
        return this;
    }
}
function LCARS__HeaderText(t){
    this.x=0;
    this.y=5;
    this.t=t;
    this.a='end';
    this.s='22px';
    this.c=null;
    this.X=function(x){
        this.x = x;
        return this;
    };
    this.Y=function(y){
        this.y=y;
        return this;
    }
    this.A=function(a){
        this.a=a;
        return this;
    }
    this.S=function(s){
        this.s=s;
        return this;
    }
    this.C=function(c){
        this.c=c;
        return this;
    }
    this.T=function(t){
        this.t=t;
        return this;
    }
}

function LCARS__Header(){
    this.type='header';
    this.x=0; //x==null?0:x;
    this.y=0; //y==null?0:y;
    this.w=null; //w==null?45:w;
    this.h=200; //h==null?30:h;
    this.c=yellow; //c==null?this.tan:c;
    this.r=[0,0,0,0]; //r==null?[0,0,0,0]:r;
    this.t=new LCARS__HeaderText('');
    this.m=[0,0,0,0];
    this.X=function(x){
        this.x = x;
        return this;
    }
    this.Y=function(y){
        this.y=y;
        return this;
    }
    this.H=function(h){
        // console.log('typeof h',typeof(h));
        if(typeof(h)=='string'){
            if(h=='xl') h=240
            if(h=='lg') h=120
            if(h=='md') h=60
            if(h=='sm') h=30
            if(h=='xs') h=15
        }
        this.h=h;
        
        return this;
    }
    this.W=function(w){
        this.w=w;
        return this;
    }
    this.C=function(c){
        this.c=c;
        return this;
    }
    this.R=function(r){
        this.r=r;
        return this;
    }
    this.T=function(t,a){
        a=a==null?'end':a;
        this.t=new LCARS__HeaderText(t).A(a); //.X(this.w-10);
        return this;
    }
    this.T=function(t){
        //a=a==null?'end':a;
        this.t=new LCARS__HeaderText(t); //.X(this.w-10);
        return this;
    }
    this.M=function(m){
        this.m=m;
        return this;
    }
}
function LCARS__Subheader(){
    var h = new LCARS__Header().H(30);
    return h;
}
function LCARS__Tabs(){
    this.type='tabs'
    this.titled=true
    this.a='left'
    this.x=0
    this.y=0
    this.c=[]
    this.t=[]
    this.A=function(a){
        this.a=a;
        return this;
    }
    this.X=function(x){
        this.x=x;
        return this;
    }
    this.Y=function(y){
        this.y=y;
        return this;
    }
    this.C=function(c){
        this.c=c;
        return this;
    }
    this.T=function(t){
        this.t=t;
        return this;
    }
    this.Titled=function(t){
        this.titled=t;
        return this;
    }
    this.addTab=function(t,c){
        this.c.push(c);
        this.t.push(t);
        return this;
    }
}

function LCARS__ButtonGroups(){
    this.type='buttonGroups'
    this.x=10
    this.y=10
    this.q=5
    this.t=['pill'];
    this.s=1
    this.X=function(x){
        this.x = x;
        return this;
    }
    this.Y=function(y){
        this.y=y;
        return this;
    }
    this.Q=function(q){
        this.q=q;
        return this;
    }
    this.T=function(t){
        this.t=t;
        return this;
    }
    this.S=function(s){
        this.s=s;
        return this;
    }
}
function LCARS__Readout(){
    this.type='readout'
    this.x=0
    this.y=0
    this.rows=0
    this.cols=[]
    this.X=function(x){
        this.x = x;
        return this;
    }
    this.Y=function(y){
        this.y=y;
        return this;
    }
    this.R=function(r){
        this.rows=r;
        return this;
    }
    this.C=function(c){
        this.cols=c;
        return this;
    }
}
function LCARS__ReadoutDisplay(){
    this.type='textblock'
    this.header = ''
    this.x=0
    this.y=0
    this.rows=0
    this.cols=[]
    this.X=function(x){
        this.x = x;
        return this;
    }
    this.Y=function(y){
        this.y=y;
        return this;
    }
    this.R=function(r){
        this.rows=r;
        return this;
    }
    this.C=function(c){
        this.cols=c;
        return this;
    }
    this.H=function(h){
        this.header=h;
        return this;
    }
}
function LCARS__Scanner(){
    this.type='scanner';
    this.x=0;
    this.y=0;
    this.w=200;
    this.h=200;
    this.c=[white,yellow,gold,white,yellow];
    this.rx=200;
    this.ry=80
    this.X=function(x){
        this.x = x;
        return this;
    }
    this.Y=function(y){
        this.y=y;
        return this;
    }
    this.W=function(w){
        this.w=w;
        return this;
    }
    this.H=function(h){
        this.h=h;
        return this;
    }
    this.C=function(c){
        this.c=c;
        return this;
    }
    this.R=function(r){
        this.rx=r[0];
        this.ry=r[1];
        return this;
    }
}
function doFourTimesPerSecond(){}
function doTwicePerSecond(){}
function doOncePerSecond(){}
function LCARS__Text(){
    this.type='text';
    this.x=0,
    this.y=0,
    this.t='',
    this.a='start',
    this.s='22px',
    this.c=black,
    this.X=function(x){
        this.x = x;
        return this;
    },
    this.Y=function(y){
        this.y=y;
        return this;
    },
    this.A=function(a){
        this.a=a;
        return this;
    },
    this.S=function(s){
        this.s=s;
        return this;
    },
    this.C=function(c){
        this.c=c;
        return this;
    },
    this.T=function(t){
        this.t=t;
        return this;
    }
}
(function() {
    
    /**
     * Simple slider control for EaselJS examples.
     **/
    function Slider(min, max, width, height, radius) {
        this.Shape_constructor();
        
    // public properties:
        this.min = this.value = min||0;
        this.max = max||100;
        
        this.width = width||100;
        this.height = height||20;
        this.radius = radius||0;
        
        this.values = {};
        
        this.trackColor = black;
        this.thumbColor = gold;
        
        this.cursor = "pointer";
        this.on("mousedown", this._handleInput, this);
        this.on("pressmove", this._handleInput, this);
    }
    var p = createjs.extend(Slider, createjs.Shape);
    
    
// public methods:
    p.isVisible = function() { return true; };

    p.draw = function(ctx, ignoreCache) {
        if (this._checkChange()) {
            var x = (this.width-this.height) * Math.max(0,Math.min(1,(this.value-this.min) / (this.max-this.min)));
            this.graphics.clear()
                .beginFill(this.trackColor).s(black).ss(5).drawRoundRect(0,0,this.width,this.height,this.radius)
                .beginFill(this.thumbColor).drawRoundRect(x,0,this.height, this.height,this.radius+2);
        }
        this.Shape_draw(ctx, true);
    };
    

// private methods:
    p._checkChange = function() {
        var a = this, b = a.values;
        if (a.value !== b.value || a.min !== b.min || a.max !== b.max || a.width !== b.width || a.height !== b.height) {
            b.min = a.min;
            b.max = a.max;
            b.value = a.value;
            b.width = a.width;
            b.height = a.height;
            return true;
        }
        return false;
    };
    
    p._handleInput = function(evt) {
        var val = (evt.localX-this.height/2)/(this.width-this.height)*(this.max-this.min)+this.min;
        val = Math.max(this.min, Math.min(this.max, val));
        if (val == this.value) { return; }
        this.value = val;
        this.dispatchEvent("change");
    };

    
    window.Slider = createjs.promote(Slider, "Shape");
}());