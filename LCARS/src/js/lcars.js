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
const colorList = [white,yellow,gold,blue,tan,red,salmon,gray,none];
function randomColor(){
    return colorList[rifi(0,(colorList.length - 1))];
} 
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
    constructor(a,b){
        if(typeof(a)==='string'){
            // is canvasId
            this.bind(a);
        }
        if(typeof(a)==='object'){
            if(a.name) this.name=a.name;
            if(a.height) this.height=a.height;
            if(a.width) this.width=a.width;
            if(a.gutters) this.gutters=a.gutters;
            if(a.id) this.bind(a.id);
        }
        this.debug = false;
        if(typeof(b)==='boolean'){
            this.debug = b;
        }
    }
    bind(canvasId){
        this.canvasId = canvasId;
        this.lcarsCanvas = new Stage(canvasId);
        Ticker.on("tick", this.lcarsCanvas);
    }
    debug = false;
    lcarsCanvas;
    name;
    height=700;
    width=2500;
    gutters=20;
    sections=[];
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
    
    circleColors = [this.white,this.yellow,this.gold];
    buttonMargin = 12;
    bg = new Shape();
    uilayer = new Container();
    tick = 0;
    handleTick(event){
        if (!event.paused) {
            // 4 times a second
            if(this.tick==0 || this.tick==6 || this.tick==12 || this.tick == 18){
                this.doFourTimesPerSecond();
            }
            // twice a second
            if(this.tick==0 || this.tick==12){
                this.doTwicePerSecond();
            }
            // once a second
            if(this.tick==0){  
                this.doOncePerSecond();                                  
            }
            this.lcarsCanvas.update();
            var top = 24;
            this.tick = this.tick<top?this.tick+1:0;
        }
    }
    setHeight(h){
        this.height=h;
    }
    setWidth(w){
        this.width=w;
    }
    addSection(sec){
        this.sections.push(sec);
    }
    setSections(els){
        this.sections = els;
    }
    build(json){
        let cnvs = document.getElementById(this.canvasId);
        if(json){                
            this.name = json.name;
            this.height = json.dim.h;
            this.width = json.dim.w;
            this.gutters = json.dim.g;
            this.sections = json.sections;
        }
        cnvs.width = this.width;
        cnvs.height = this.height;
        this.buildUI();
    }
    buildUI(){
        console.log('sections',this.sections)
        // add black background to canvas
        if(this.debug)
            this.bg.graphics.ss(2).beginStroke(white).drawRect(0,0,this.width,this.height);;
        this.bg.graphics.beginFill('#555').drawRect(0, 0, this.width, this.height);
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
        // loop through json sections and create sections to add to uilayer
        var x = 0,y = 0;
        for (var i = 0; i < this.sections.length; i++) {
            var sec = this.sections[i]
            //sec=sec.isObject?sec.config:sec;
            var header = sec.header;
            console.log('section',sec)
            var headerMargins = [0,0,0,0];
            if(is.not.undefined(header)){
                //if(header.m!=null){
                if(header.margin!=null){
                    headerMargins = header.margin; //header.m;
                }
            }
            var elementMargins = [0,0,0,0];
            //if(sec.cont.m!=null){
            if(sec.margin!=null){
                elementMargins = sec.margin; //sec.m;
            }
			const margin_left = header?headerMargins[3]:elementMargins[3];
			const margin_right = header?headerMargins[1]:elementMargins[1];
			const margin_top = header?headerMargins[0]:elementMargins[0];
            x+=margin_left;
            y+=margin_top;
            if(sec.header) sec.header.width = sec.width;
            sec.x=x;
            sec.y=y;
            this.uilayer.addChild(sec.build()); //this.lcarsSection(x,y,sec,null));
            x+=sec.width+(margin_right);
        }
        // add uilayer to canvas
        this.lcarsCanvas.addChild(this.uilayer);
        if(this.debug){
            let n = new Text(makeCap(this.name+' ('+this.width+'x'+this.height+')'),"18px Arial",'#fff');
            n.x=5;
            n.y=5;
            this.lcarsCanvas.addChild(n);
        }
        this.lcarsCanvas.update();
    }
    output = function(){
        let outputJson = {
            dim:{
                w:this.width,
                h:this.height,
                g:this.gutters
            },
            sections:[]
        };
        for(let i = 0; i < this.sections.length; i++){
            outputJson.sections.push(this.sections[i]);
        }
        return outputJson;
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
    lcarsSection(x,y,sec,s){
        let o = sec.config;
        console.log('o',o)
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
        //console.log('header',header);
        
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
        cont.x = x; //o.x;
        cont.y = y; //o.y;
        leftSidebar.y=midY;
        body.x=leftSidebarWidth; //o.leftSidebar.w;
        body.y=midY;
        body.name='body';
        for (var i = 0; i < o.body.length; i++) {
            var el = o.body[i];
            el = el.isObject?el.config:el;
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
                if(el.isObject){
                    body.addChild(el.cont);
                }else{
                    body.addChild(this.buildHeader(el.x,el.y,w,el.h,el.c,el.r,text));
                }
                
            }
            if(el.type=='buttonGroups'){
                var size = el.s;
                var btns = this.addButtonGroupTo(el.x,el.y,el.q,el.t,size);
                // console.log("btns", btns);
                for (var iii = 0; iii < btns.length; iii++) {
                    body.addChild(btns[iii]);
                }
            }    
            if(el.type=='buttons')body.addChild(this.addButtonsTo(el.x,el.y,el.q,el.t,el.c));
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
            
            // if(o.header.children){
            //     console.log('header',o.header.children[0])
            //     console.log('it worked')
            //     header=o.header.children[0];
            // }else{
            //     console.log('oops')
            //     header.addChild(
            //         this.buildHeader(0,0,o.w,o.header.h,o.header.c,o.header.r)
            //     )
            // }
            
            // if(is.not.undefined(o.header.t) && o.header.t!= null){    
            //     var textAlign = is.undefined(o.header.t.a)?'end':o.header.t.a;
            //     // console.log("textAlign", textAlign);
            //     var textX = textAlign=='end'?o.w - 10:10;
            //     // console.log("textX", textX);
            //     var textY = is.not.undefined(o.header)?(o.header.h+headerMargins[0])-35:0;
            //     var textVal = o.header.t==null?'':o.header.t.t;
            //     // console.log("o.header.t", o.header.t);
            //     var txt = this.addText(textX,textY,textVal,textAlign,'30px');
            //     header.addChild(
            //         txt
            //     )
            // }
        }
        console.log('sec.header',sec.header)
        if(sec.header!=null) header.addChild(sec.header.build());
        if(is.not.undefined(o.leftSidebar)) leftSidebar.addChild(this.buildHeader(0,0,o.leftSidebar.w,bodyHeight,o.leftSidebar.c,o.leftSidebar.r))
        if(is.not.undefined(o.rightSidebar)) rightSidebar.addChild(this.buildHeader(0,0,o.rightSidebar.w,bodyHeight,o.rightSidebar.c,o.rightSidebar.r))
        if(is.not.undefined(o.footer)) footer.addChild(this.buildHeader(0,0,o.w,o.footer.h,o.footer.c,o.footer.r))
        //body.addChild(s);
        // console.log('cont x',cont.x);
        cont.addChild(header,leftSidebar,body,rightSidebar,footer);
        if(this.debug){
            const name = new Text(o.n+' ('+o.w+'x'+o.h+')','18px Arial','#fff');
            name.x=5;
            name.y=5;
            cont.addChild(boundingBox, name);
        }
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
        for (var i = 0; i < rifi(10,20); i++) {
            var star = new Shape();
            var r = rifi(2,7);
            star.graphics.beginFill(rae(this.circleColors)).dc(rifi(20,w-20),rifi(20,h-20),r);
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
        cross.addEventListener("click", handleJoystickClick);
        js.addChild(base);
        js.addChild(buttons);

        return js;
    }
    buildHeader(x,y,w,h,c,r,t){
        // console.log('header y',y);
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
        var txt = new Text(makeCap(t),s+" Okuda",c);
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
        return this.buildButton(x,y,w,h,c,'cap-left',null,s);
    }
    addCapRightButton(x,y,c,w,h,s,t){
        // w = w==null?buttonWidth:w;
        // h = h==null?buttonHeight:h;
        t = t==null?this.randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'cap-right',null,s);
    }
    addRectButton(x,y,c,w,h,s,t){
        // w = w==null?buttonWidth:w;
        // h = h==null?buttonHeight:h;
        t = t==null?this.randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'rect',t,s);
    }
    addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,s,l){
        // console.log("x", x);
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(0,0,c,buttonWidth-20,buttonHeight,s,l));
        btnCont.addChild(this.addCapRightButton(buttonWidth-20,0,randomColor(),buttonHeight,buttonHeight,s,''));
        return btnCont;
    }
    addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,s){
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(buttonHeight,0,c,buttonWidth-20,buttonHeight,s));
        btnCont.addChild(this.addCapLeftButton(0,0,randomColor(),buttonHeight,buttonHeight,s,''));
        return btnCont;
    }
    addTinyRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,s){
        // console.log("x", x);
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(0,0,c,(buttonWidth*0.20),buttonHeight,s));
        btnCont.addChild(this.addCapRightButton(buttonWidth-10,0,randomColor(),buttonHeight,buttonHeight,s,''));
        return btnCont;
    }
    addTinyRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,s){
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(buttonHeight,0,c,(buttonWidth*0.20),buttonHeight,s,''));
        btnCont.addChild(this.addCapLeftButton(0,0,randomColor(),buttonHeight,buttonHeight,s,''));
        return btnCont;
    }
    addRectWithPillLeftButton(x,y,c,buttonWidth,buttonHeight,s){
        var btnCont = new Container();
        btnCont.x = x-30;
        btnCont.y = y;
        btnCont.addChild(this.addPillLeftButton(0,0,c,buttonWidth,buttonHeight,s));
        btnCont.addChild(this.addRectButton(buttonWidth+10,0,randomColor(),15,buttonHeight,s,''));
        return btnCont;
    }
    addRectWithPillRightButton(x,y,c,buttonWidth,buttonHeight,s){
        var btnCont = new Container();
        btnCont.x = x-30;
        btnCont.y = y;
        btnCont.addChild(this.addPillRightButton(25,0,c,buttonWidth,buttonHeight,s));
        btnCont.addChild(this.addRectButton(0,0,randomColor(),15,buttonHeight,s,''));
        return btnCont;
    }
    addTitledLeftPillButton(x,y,c,buttonWidth,buttonHeight,s){
        var cont = new Container();
        var crbtn = this.addRectWithCapLeftButton(x,0,c,buttonWidth,buttonHeight,s);
        crbtn.x = 0;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton((s==1?75:90)+buttonWidth,0,randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(buttonWidth+(s==1?67:86),-8,this.randomButtonTitle(),null,(s==1?46:56)+'px',randomColor()))
        return cont;
    }
    addTitledRightPillButton(x,y,c,buttonWidth,buttonHeight,s){
        var cont = new Container();
        var crbtn = this.addRectWithCapRightButton(x,0,c,buttonWidth,buttonHeight,s);
        crbtn.x = s==1?75:85;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton(0,0,randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(20,-8,this.randomButtonTitle(),'start',(s==1?46:56)+'px',randomColor()))
        return cont;
    }

    addTitledLeftButton(x,y,c,buttonWidth,buttonHeight,s){
        var cont = new Container();
        var crbtn = this.addRectButton(x,0,c,buttonWidth,buttonHeight,s);
        crbtn.x = 0;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton((s==1?75:90)+buttonWidth,0,randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(buttonWidth+(s==1?67:86),-8,this.randomButtonTitle(),null,(s==1?46:56)+'px',randomColor()))
        return cont;
    }
    addTitledRightButton(x,y,c,buttonWidth,buttonHeight,s){
        var cont = new Container();
        var crbtn = this.addRectButton(x,0,c,buttonWidth,buttonHeight,s);
        crbtn.x = s==1?75:85;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton(0,0,randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(20,-8,this.randomButtonTitle(),'start',(s==1?46:56)+'px',randomColor()))
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
            //console.log('x',x)
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
                color = randomColor();
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
        for (var i = 0; i < el.tabs.length; i++) {                
            let tab = el.tabs[i];
            //console.log('tab',tab);
            tabCont.addChild(this.addButtonType(el.x,y,tab.color,titled+'tab-'+el.a,buttonWidth,buttonHeight,2,tab.text));
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
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handlePillClick);
        }
        if(t=='pill-left'){
            btn = this.addPillLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handlePillClick);
        }
        if(t=='pill-right'){
            btn = this.addPillRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handlePillClick);
        }
        if(t=='cap-left'){
            btn = this.addCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handleCapClick);
        }
        if(t=='cap-right'){
            btn = this.addCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handleCapClick);
        }
        if(t=='rect'){
            btn = this.addRectButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectClick);
        }
        // button types
        if(t=='rect-pill-right'){
            btn = this.addRectWithPillRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectPillClick);
        }
        if(t=='rect-pill-left'){
            btn = this.addRectWithPillLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectPillClick);
        }
        if(t=='rect-cap-right'){
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='rect-cap-left'){
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='tiny-rect-cap-right'){
            btn = this.addTinyRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='tiny-rect-cap-left'){
            btn = this.addTinyRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='medium-rect-cap-right'){
            buttonWidthPlusMargin = buttonWidthPlusMargin+buttonWidth;
            buttonWidth = buttonWidth*2;
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='medium-rect-cap-left'){
            buttonWidth = buttonWidth*2;
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='wide-rect-cap-right'){
            buttonWidthPlusMargin = buttonWidthPlusMargin+(buttonWidth*2);
            buttonWidth = buttonWidth*3;
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='wide-rect-cap-left'){
            buttonWidth = buttonWidth*3;
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='titled-pill-left'){
            btn = this.addTitledLeftPillButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }
        if(t=='titled-pill-right'){
            btn = this.addTitledRightPillButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }

        if(t=='titled-left'){
            btn = this.addTitledLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }
        if(t=='titled-right'){
            btn = this.addTitledRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }

        if(t=='titled-tab-left'){
            btn = this.addTitledLeftTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
        }
        if(t=='titled-tab-right'){
            btn = this.addTitledRightTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
        }
        if(t=='tab-left'){
            btn = this.addLeftTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
        }
        if(t=='tab-right'){
            btn = this.addRightTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
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
                var datum = this.makeDatum(rifi((el.cols[i]<4?2:el.cols[i]-2),el.cols[i]));
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
        header.text = el.header==''?this.makeDatum(6).text:makeCap(el.header);
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
                var datum = this.makeDatum(rifi((el.cols[i]<4?2:el.cols[i]-2),el.cols[i]));
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
        hbg.graphics.f(rae(this.datumColors)).mt(0,0)
            .lt(5,0)
            .lt(5,25)
            .lt(maxX,25)
            .lt(maxX,35)
            .lt(maxX*0.66,35)
            .lt(maxX*0.66,30)
            .lt(0,30)
        var ftr = new Shape();
        ftr.graphics.f(rae(this.datumColors)).mt(0,y+5)
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
        var l = rifi(1,5);
        var r = rifi(0,99999);
        var t = r.toString();
        var bt = t.substr(0,l);
        var btnLblTp = randomFromArray(this.buttonLabelType);
        if(btnLblTp == 'a'){
            bt = randomFromArray(this.letters);
        }else if(btnLblTp == '#,a'){
            bt = bt+' '+randomFromArray(this.letters);
        }else if(btnLblTp == 'a,a'){
            bt = randomFromArray(this.letters)+' '+randomFromArray(this.letters);
        }  
        // console.log("bt", bt);
        return bt;
    }
    makeWord(){
        var word = '';
        for( var i=0; i < rifi(1,4); i++ ){
            word += this.possibleletters.charAt(rifi(0,this.possibleletters.length));
        }
        // console.log('word',word)
        return word;
    }
    datumColors = [this.yellow,this.blue,this.gold];
    makeDatum(datumLength){
        var datum = '';
        var datumval = 0;
        for( var i=0; i < datumLength; i++ ){
            datum += rifi(0,9);
            datumval = parseInt(datum)
        }
        var txt = new Text();
        txt.font='16px Okuda';
        txt.text = datum;
        txt.color=rae(this.datumColors);
        return txt;
    }
    randomButtonTitle(){
        var amount = rifi(2,3);
        var retval = '';
        for (var i = 0; i < amount; i++) {
            retval = retval+rifi(0,9).toString();
        }
        return retval; //randomFromArray(buttonTitles);
    }
       
    doFourTimesPerSecond(){}
    doTwicePerSecond(){}
    doOncePerSecond(){}
}
/*
/$$   /$$ /$$$$$$$$ /$$$$$$ /$$       /$$$$$$ /$$$$$$$$ /$$$$$$ /$$$$$$$$  /$$$$$$ 
| $$  | $$|__  $$__/|_  $$_/| $$      |_  $$_/|__  $$__/|_  $$_/| $$_____/ /$$__  $$
| $$  | $$   | $$     | $$  | $$        | $$     | $$     | $$  | $$      | $$  \__/
| $$  | $$   | $$     | $$  | $$        | $$     | $$     | $$  | $$$$$   |  $$$$$$ 
| $$  | $$   | $$     | $$  | $$        | $$     | $$     | $$  | $$__/    \____  $$
| $$  | $$   | $$     | $$  | $$        | $$     | $$     | $$  | $$       /$$  \ $$
|  $$$$$$/   | $$    /$$$$$$| $$$$$$$$ /$$$$$$   | $$    /$$$$$$| $$$$$$$$|  $$$$$$/
\______/    |__/   |______/|________/|______/   |__/   |______/|________/ \______/ 
*/        
    

const buttonLabelType = ['#','a','#,a','a,a'];
const letters = ['SDX','NAV','RCNT','COMM','CON','SYS','STR','RVOL','BT','ALPH','TCH','ro','al','luv','lef','mac','pe','lin','jl','pow','an','re'];
const possibleletters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const buttonTitles = ['B1','B4','XX','A6','P5','X1','Y8','Z9'];
function randomButtonLabel(){
    var l = rifi(1,5);
    var r = rifi(0,99999);
    var t = r.toString();
    var bt = t.substr(0,l);
    var btnLblTp = randomFromArray(buttonLabelType);
    if(btnLblTp == 'a'){
        bt = randomFromArray(letters);
    }else if(btnLblTp == '#,a'){
        bt = bt+' '+randomFromArray(letters);
    }else if(btnLblTp == 'a,a'){
        bt = randomFromArray(letters)+' '+randomFromArray(letters);
    }
    return bt;
}
function rifi(min,max){
    return randomIntFromInterval(min,max);
}
function rae(a){
    return randomFromArray(a);
}
function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function randomFromArray(a){
    return a[rifi(0,(a.length - 1))];
}
function makeCap(t){
    return t!=null?t.toUpperCase():'';
} 
function playSound(soundID) {
    //Sound.play(soundID.toString());
}
function handleClick(event){
    // this.playSound(rifi(1,4));
    if(rifi(0,10)>7) buildUI();
}
function handleRectClick(event){
    // this.playSound(6);
    console.log('btn',event.target.parent.name);
}
function handleRectPillClick(event){
    // this.playSound(1);
    console.log('btn',event.target.parent.name);
}
function handleRectCapClick(event){
    // this.playSound(2);
    console.log('btn',event.target.parent.name);
    if(rifi(0,10)>7) buildUI();
}
function handleTabClick(event){
    // this.playSound(3); 
    console.log('btn',event.target.parent.name);           
}
function handlePillClick(event){
    // this.playSound(4);
    console.log(event);
    console.log('btn',event.target.parent.name);
    // if(rifi(0,10)>7) this.buildUI();
}
function handleCapClick(event){
    // this.playSound(4);
    console.log(event);
    console.log('btn',event.target.parent.name);
    // if(rifi(0,10)>7) this.buildUI();
}
function handleTitledPillClick(event){
    // this.playSound(4);
    // this.playSound(6);
    if(rifi(0,10)>7) buildUI();
}
function handleJoystickClick(event){
    console.log('handleJoystickClick()');
    console.log("event", event);
    console.log("event.local ", event.localX+'x'+event.localY); 
    // console.log("event.stageY", event.stageY);            
    var x=event.localX,y=event.localY;
    if(x>=80 && y<=35 && x<=120){
        console.log('up');
        this.playSound(1);
        joystickButtonFunction(1,event.target.name);
    }else if(x>=165 & y>=80 && y<=120){
        console.log('right');
        this.playSound(2);
        joystickButtonFunction(2,event.target.name);
    }else if(x>=80 && y>=165 && x<=120){
        console.log('down');
        this.playSound(3);
        joystickButtonFunction(3,event.target.name);
    }else if(x<=35 && y>=80 && y<=120){
        console.log('left');
        this.playSound(4);
        joystickButtonFunction(4,event.target.name);
    }
}
function tabClick(i){
    //console.log('tab click',i);
}

/*
   /$$$$$$   /$$$$$$  /$$   /$$
  /$$__  $$ /$$__  $$| $$$ | $$
 | $$  \__/| $$  \ $$| $$$$| $$
 | $$      | $$  | $$| $$ $$ $$
 | $$      | $$  | $$| $$  $$$$
 | $$    $$| $$  | $$| $$\  $$$
 |  $$$$$$/|  $$$$$$/| $$ \  $$
  \______/  \______/ |__/  \__/
*/
class LCARS__CON extends LCARS{
    constructor(id,debug){
        super({n:'con',w:2500,h:700,g:20,id:id},debug);
        this.setSections([
            new LCARS__Section().N('scanners').W(535)
            .setBody([
                new LCARS__Joystick().X(95).Y(0).C(gold),
                new LCARS__Header().X(298).Y(310).W(237).H(30).C(gold),
                new LCARS__Header().X(0).Y(310).W(288).H(30).C(blue),
                new LCARS__Header().X(0).Y(645).W(288).H(14).C(tan),
                new LCARS__ButtonGroups().X(395).Y(390).Q(5).T(['pill']),
                new LCARS__Scanner().X(0).Y(390).W(288).H(220).C([white,tan,gold,white,tan]).R([194,80])
            ]),
            new LCARS__Section().N('nav ref').W(335)
            .setHeader(new LCARS__Elbow('lg-right'))
            .setBody([
                new LCARS__Header('navigation reference').W(295).H(40),
                new LCARS__Header('cache select').Y(60).W(295).H(30).C(gold),
                new LCARS__Header('lcars mode select').Y(140).W(295).H(270).R([0,0,20,0]),
                new LCARS__ButtonGroups().X(-33).Y(140).Q(5).T(['titled-pill-left'])
            ]),
            new LCARS__Section().N('flight').W(420)
            .setHeader(new LCARS__Header().H(210).M([0,40,100,0]).T('flight control'))
            .setBody([
                new LCARS__Header('navigation to cache').H(350).R([50,0,0,50]),
                new LCARS__Header().H(295).W(445).X(75).Y(30).C(black).R([50,0,0,10]),
                new LCARS__ButtonGroups().X(90).Y(80).Q(5).T(['rect-pill-right','pill','pill'])
            ]),
            new LCARS__Section().N('joystick').W(200)
            .setHeader( new LCARS__Header().H(210).C(blue).M([0,25,100,0]))
            .setBody([
                new LCARS__Header().H(30).C(blue),
                new LCARS__Joystick().Y(75).C([red,gold,gold,gold])
            ])
            .setFooter(new LCARS__Header().H('xs').C(tan)),
            new LCARS__Section().N('warp drive systems').W(410)
            .setHeader(new LCARS__Header('warp drive systems').H(210).M([0,20,100,0]))
            .setBody([
                new LCARS__Header('option select').H(30),
                new LCARS__ButtonGroups().X(15).Y(80).Q(5).T(['pill','titled-pill-left','tiny-rect-cap-left'])
            ])
            .setFooter(new LCARS__Header().H('xs').C(tan)),
            new LCARS__Section().N('impulse').W(177)
            .setHeader(new LCARS__Header('impulse systems').H(210).M([0,12,100,0]))
            .setBody([
                new LCARS__Header('mode select').H(30).C(gold),
                new LCARS__ButtonGroups().X(0).Y(50).Q(6).T(['titled-pill-right'])
            ])
            .setFooter(new LCARS__Header().H('xs').C(tan)),
            new LCARS__Section().W(45)
            .setHeader(new LCARS__Header().H(210).M([0,15,100,0]).C(blue))
            .setBody([
                new LCARS__Header().H('sm').C(tan)
            ]),
            new LCARS__Section().W(200)
            .setHeader(new LCARS__Header('emergency override').H(210).M([0,0,100,0]).R([0,20,20,0]))
            .setBody([
                new LCARS__Header('helm / navigation').C(gold).H(30),
                new LCARS__ButtonGroups().X(0).Y(50).Q(6).T(['pill','pill'])
            ])
            .setFooter(new LCARS__Header().H('xs').C(tan))
        ]);
        this.build();
    }
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
class LCARS__OPS extends LCARS{
    constructor(id,debug){
        super({n:'ops',w:2500,h:690,g:20,id:id},debug);
        this.setSections([
            {
                y: 0,
                w: 200, 
                header: new LCARS__Header()
                    .H(200)
                    .R([20,0,0,20])
                    .C(yellow)
                    .M([0,20,100,0])
                    .T('emergency override'),
                body: [               
                    new LCARS__Subheader().W(200).C(gold).R([15,0,0,15]).T('engineering systems'),
                    new LCARS__ButtonGroups().X(10).Y(40).Q(3).T(['titled-pill-left']),
                    new LCARS__ButtonGroups().X(10).Y(180).Q(3).T(['titled-pill-right'])
                ],
                footer: new LCARS__Header()
                    .H('xs')
                    .C(tan)
            },
            {
                y: 0,
                w: 400,
                header: new LCARS__Header()
                    .H(200)
                    .R([0,0,0,0])
                    .C(yellow)
                    .M([0,40,100,0])
                    .T('warp drive systems'),
                body: [                
                    new LCARS__Subheader().W(400).C(yellow).T('power consumption'),
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
                    .C(tan)
            },
            // spacerSection,
            {
                y: 0,
                w: 200,
                header: new LCARS__Header()
                    .H(200)
                    .R([0,0,0,0])
                    .C(yellow)
                    .M([0,20,100,0])
                    .T('operational priorities'),
                body: [               
                    new LCARS__Subheader().W(200).C(gold).T('lcars mode select'),
                    new LCARS__ButtonGroups().X(10).Y(40).Q(6).T(['titled-pill-right'])
                ],
                footer: new LCARS__Header().H('xs').C(tan)
            },
            // joystickSection,
            {
                y:0,
                w:360,
                header: new LCARS__Header()
                    .H(200)
                    .R([0,0,0,0])
                    .C(yellow)
                    .M([0,0,100,0])
                    .T('operations management','left'),
                body: [               
                    new LCARS__Subheader().W(360),
                    new LCARS__ButtonGroups().X(10).Y(40).Q(6).T(['pill','titled-pill-left'])
                ],
                footer: new LCARS__Header().H('xs').C(yellow)
            },
            {
                y:0,
                w:110,
                header: new LCARS__Header()
                    .H(240)
                    .R([0,120,0,-40])
                    .C(yellow)
                    .M([0,20,0,0]),
                    //elbow_lg_left,
                body: [                                               
                    new LCARS__Header().X(40).W(70).H(40),                                             
                    new LCARS__Header().X(40).Y(60).W(70).H(30).C(blue),                                             
                    new LCARS__Header().X(40).Y(110).W(70).H(285)
                ],
                footer:  new LCARS__Header().H('xs').C(yellow).R([0,0,15,0])
            },
            {
                y:0,
                w:360,
                m:[0,20,0,0],
                body:[
                    new LCARS_TitledTabs({x:70,tabs:[
                        {text:'departmental',color:blue},
                        {text:'status',color:blue},
                        {text:'communications',color:white},
                        {text:'mission status',color:gold},
                    ]}),
                    new LCARS__Header().Y(300).W(350).R([50,0,0,50]).H(350),                        
                    new LCARS__Header().Y(330).W(250).R([30,0,0,10]).H(305).X(100).C(black),
                    new LCARS__ButtonGroups().X(130).Y(340).Q(6).T(['pill','pill'])
    
                ]
            },
            {
                y:0,
                w:200,
                header: new LCARS__Header()
                    .H(200)
                    .R([0,0,0,0])
                    .C(blue)
                    .M([0,20,100,0]),
                body: [ 
                    new LCARS__Subheader().W(100), 
                    new LCARS__ButtonGroups().X(10).Y(40).Q(6).T(['pill','pill'])
                ],
                footer: new LCARS__Header().H('xs').C(yellow)
            },
            {
                y:0,
                w:400,
                header: new LCARS__Header()
                    .H(200)
                    .R([0,20,20,0])
                    .C(yellow)
                    .M([0,20,100,0])
                    .T('communications'),
                body: [ 
                    new LCARS__Subheader().W(360).T('channel select').R([0,15,15,0]), 
                    new LCARS__ButtonGroups().X(10).Y(40).Q(6).T(['rect-pill-left','rect','rect-pill-right'])
                ],
                footer: new LCARS__Header().H('xs').C(yellow)
            }
        ])
        this.build();
    }
}
function joystickButtonFunction(bid,name){}
/*
 
   /$$$$$$  /$$        /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$$$  /$$$$$$ 
  /$$__  $$| $$       /$$__  $$ /$$__  $$ /$$__  $$| $$_____/ /$$__  $$
 | $$  \__/| $$      | $$  \ $$| $$  \__/| $$  \__/| $$      | $$  \__/
 | $$      | $$      | $$$$$$$$|  $$$$$$ |  $$$$$$ | $$$$$   |  $$$$$$ 
 | $$      | $$      | $$__  $$ \____  $$ \____  $$| $$__/    \____  $$
 | $$    $$| $$      | $$  | $$ /$$  \ $$ /$$  \ $$| $$       /$$  \ $$
 |  $$$$$$/| $$$$$$$$| $$  | $$|  $$$$$$/|  $$$$$$/| $$$$$$$$|  $$$$$$/
  \______/ |________/|__/  |__/ \______/  \______/ |________/ \______/ 
                                                                       
                                                                       
                                                                       
 
*/
class LCARS_Object{
    name='';
    x=0;
    y=0;
    width;
    height;
    color=black;
    constructor(opt){
        if(opt.name)    this.name=opt.name;
        if(opt.x)       this.x=opt.x;
        if(opt.y)       this.y=opt.y;
        if(opt.width)   this.width=opt.width;
        if(opt.height)  this.height=opt.height;
        if(opt.color)   this.color=opt.color;
    }
    get isObject(){return true;}
}
class LCARS_Element extends LCARS_Object{
    type='';
    margin=[0,0,0,0];
    radius=[0,0,0,0];
    color=yellow;
    text;
    element;
    constructor(opt){
        super(opt);
        if(opt.type)        this.type=opt.type;
        if(opt.margin)      this.margin=opt.margin;
        if(opt.radius)      this.radius=opt.radius;
        if(opt.color)       this.color=opt.color;
        if(opt.text)        this.text=opt.text;
    }
    build(){}
}
class LCARS_Panel extends LCARS_Object{
    padding=20;
    sections=[];
    constructor(opt){
        super(opt);
        if(opt.padding) this.padding=opt.padding;
        if(opt.sections) this.sections=opt.sections;        
        let bg = new Shape();
        let uilayer = new Container();
        let lcarsCanvas= new Stage(opt.id);
        Ticker.on("tick", lcarsCanvas);
        bg.graphics.beginFill('#000').drawRect(0, 0, this.width, this.height);
        lcarsCanvas.addChild(bg);
        uilayer.removeAllChildren();
        // set up uilayer
        let innerHeight = this.height - (this.padding*2);
        let innerWidth = this.width - (this.padding*2);
        uilayer.name = 'uilayer';
        uilayer.x = this.padding;
        uilayer.y = this.padding;
        uilayer.width = innerWidth;
        uilayer.height = innerHeight;
        this.sections.forEach(sec=>{
            
            // var header = sec.header;
            // var headerMargins = [0,0,0,0];
            // if(is.not.undefined(header)){
            //     if(header.margin!=null){
            //         headerMargins = header.margin;
            //     }
            // }
            // var elementMargins = [0,0,0,0];
            // if(sec.margin!=null){
            //     elementMargins = sec.margin;
            // }
			// const margin_left = header?headerMargins[3]:elementMargins[3];
			// const margin_right = header?headerMargins[1]:elementMargins[1];
			// const margin_top = header?headerMargins[0]:elementMargins[0];
            // x+=margin_left;
            // y+=margin_top;
            uilayer.addChild(sec);
            //x+=sec.w+(margin_right);
        });
        // add uilayer to canvas
        lcarsCanvas.addChild(uilayer);
        lcarsCanvas.update();
    }
}
class LCARS_Section extends LCARS_Element {
    header;
    body=[];
    leftSidebar;
    rightSidebar;
    footer;
    margin=[0,0,0,20];
    constructor(opt){
        super(opt);
        if(opt.header)          this.header=opt.header;
        if(opt.leftSidebar)     this.leftSidebar=opt.leftSidebar;
        if(opt.body)            this.body=opt.body;
        if(opt.rightSidebar)    this.rightSidebar=opt.rightSidebar;
        if(opt.footer)          this.footer=opt.footer;
        if(opt.margin)          this.margin=opt.margin;
    }
    build(){
        let sectionCont = new Container();
        let headerCont = new Container();
        let rightSidebarCont = new Container();
        let bodyCont = new Container();
        let leftSidebarCont = new Container();
        let footerCont = new Container();

        //if(is.undefined(opt.height)) opt.height=this.innerHeight;
        var headerMargins = [0,0,0,0];
        if(is.not.undefined(this.header)){
            if(this.header.margin!=null){
                headerMargins = this.header.margin;
            }
        }
        var footerMargins = [0,0,0,0];
        if(is.not.undefined(this.footer)){
            if(this.footer.margin!=null){
                footerMargins = this.footer.margin;
            }
        }
        var headerHeight = is.not.undefined(this.header)?this.header.height+headerMargins[0]+headerMargins[2]:0;
        var rightSidebarWidth = is.not.undefined(this.rightSidebar)?this.rightSidebar.width:0;
        var leftSidebarWidth = is.not.undefined(this.leftSidebar)?this.leftSidebar.width:0;
        var bodyWidth = this.width - (rightSidebarWidth+leftSidebarWidth);
        console.log('leftSidebarWidth',leftSidebarWidth)
        var footerHeight = is.not.undefined(this.footer)?this.footer.height+footerMargins[0]+footerMargins[2]:0;
        var bodyHeight = this.height - (headerHeight+footerHeight);
        var midY = headerHeight;
        var footerY = headerHeight+bodyHeight+(is.not.undefined(this.footer)?footerMargins[0]:0);

        var boundingBox = new Shape();
        boundingBox.graphics.ss(2).beginStroke(white).drawRect(0,0,this.width,this.height);
        sectionCont.x = this.x; //this.x;
        sectionCont.y = this.y; //this.y;
        leftSidebarCont.y=midY;
        bodyCont.x=leftSidebarWidth; //this.leftSidebar.w;
        bodyCont.y=midY;
        bodyCont.name='body';
        this.body.forEach(el=>{
            if(el.isObject){
                console.log('el',el)
                if(is.undefined(el.width)) el.width=this.width;
                bodyCont.addChild(el.build());
            }
        })
        console.log('bodyCont',bodyCont)
        if(this.header!=null) headerCont.addChild(this.header.build());
        sectionCont.addChild(headerCont,leftSidebarCont,bodyCont,rightSidebarCont,footerCont);
        return sectionCont;
        
    }
}
class LCARS_Label extends LCARS_Element{
    alignment='end';
    size='18px';
    color=black;
    constructor(opt){
        super(opt);
        if(opt.alignment)this.alignment=opt.alignment;
        if(opt.size) this.size=opt.size;
        if(opt.text) this.text=opt.text;
    }
    build(){    
        var txt = new Text(makeCap(this.text),this.size+" Okuda",this.color);
        txt.x = this.x;
        txt.y = this.y;
        txt.textAlign=this.alignment; //Any of "start", "end", "left", "right", and "center"
        txt.textBaseLine = 'bottom';
        return txt;
    }

}
class LCARS_HeaderText extends LCARS_Label{ 
    size='22px';
    y=5;
    constructor(opt){
        super(opt);
        if(opt.alignment)this.alignment=opt.alignment;
        if(opt.size) this.size=opt.size;
        if(opt.y) this.y=opt.y;
    }
    build(){        
        this.x = this.alignment=='end'?this.width - 10:10;
        return new LCARS_Label({x:this.x,y:this.y,text:this.text,alignment:this.alignment,size:this.size}).build();
    }
}
class LCARS_Header extends LCARS_Element{ 
    height=200;   
    type = 'header';
    size='30px';
    constructor(opt){
        super(opt);
        if(opt.height) this.height=opt.height;
        if(opt.text) this.text=opt.text;
        if(opt.width) this.width= opt.width;
        if(opt.size) this.size=opt.size;
        if(opt.alignment) this.alignment=opt.alignment;
    }
    build(){
        console.log('building '+this.type)
        var hdrCont = new Container();
        hdrCont.x=this.x;
        hdrCont.y=this.y;
        var hdr = new Shape();
        hdr.graphics.beginFill(this.color).rc(0,0,this.width,this.height,this.radius[0],this.radius[1],this.radius[2],this.radius[3]);
        hdrCont.addChild(hdr);
        let textHeight = parseInt(this.size.split('px')[0])+5;
        let textY = (this.height+this.margin[0])-textHeight;
        console.log('textY for '+this.text,textY)
        hdrCont.addChild(new LCARS_HeaderText({text:this.text,width:this.width,y:textY,size:this.size,alignment:this.alignment}).build());
        return hdrCont;
    }
}
class LCARS_Subheader extends LCARS_Header{
    height=30;
    alignment='start';
    size='22px';
    constructor(opt){
        super(opt);
        if(opt.height) this.height=opt.height;
        if(opt.size) this.size=opt.size; 
        if(opt.alignment) this.opt.alignment;
    }
    build(){
        return super.build();
    }
}
class LCARS_Footer extends LCARS_Header{
    height=15;
    constructor(opt){
        super(opt);
        if(opt.height) this.height=opt.height;
    }
    build(){
        return super.build();
    }
}
class LCARS_Elbow extends LCARS_Header{
    size;
    dir;
    color=yellow;
    constructor(opt){
        super(opt);
        if(opt.size)    this.size=opt.size;
        if(opt.dir)     this.dir=opt.dir;
        if(opt.color)   this.color=opt.color;

        const rr=[30,0,-10,0];
        const lr=[0,30,0,-10];
        const sizes = ['sm','md','','lg'];
        const s = sizes.indexOf(this.size)+1;
        this.radius = [];
        if(this.dir=='left'){
            lr.forEach(e=>{
                this.radius.push(e*s)
            });
        }
        if(this.dir=='right'){
            rr.forEach(e=>{
                this.radius.push(e*s)
            });
        }
    }
    build(){
        return super.build();
    }
}
class LCARS_Joystick extends LCARS_Element{
    c1=gold;
    c2=gold;
    c3=gold;
    c4=gold;
    type='joystick';
    constructor(opt){
        super(opt);
        if(Array.isArray(opt.color)){
            this.c1 = opt.color[0];
            this.c2 = opt.color[1];
            this.c3 = opt.color[2];
            this.c4 = opt.color[3];
        }else{
            this.c1 = opt.color;
            this.c2 = opt.color;
            this.c3 = opt.color;
            this.c4 = opt.color;
        }
    }
    build(){

    }
}
class LCARS_Tabs extends LCARS_Element{
    tabs=[];
    alignment='left';
    constructor(opt){
        super(opt);
        if(opt.tabs) this.tabs=opt.tabs;
        if(opt.alignment) this.alignment=opt.alignment;
    }
}
class LCARS_TitledTabs extends LCARS_Tabs{
    titled=true;
    constructor(opt){
        super(opt);
    }
    build(){
        
    }
}
class LCARS_UntitledTabs extends LCARS_Tabs{
    titled=false;
    constructor(opt){
        super(opt);
    }
    build(){
        
    }
}
class LCARS_ButtonGroups extends LCARS_Element{
    cols=[];
    rows=0;
    constructor(opt){
        super(opt);
        if(opt.cols) this.cols=opt.cols;
        if(opt.rows) this.rows=opt.rows;
    }
    build(){
        let buttonCont = new Container();
        buttonCont.x=this.x;
        buttonCont.y=this.y;
        let incWidth = 0;
        for (var i = 0; i < this.cols.length; i++) {
            const colType=this.cols[i];
            this.x+=incWidth;
            //console.log('x',x)
            let btnCol = new LCARS_ButtonCol({x:this.x,type:colType,rows:this.rows}).build();
            incWidth=btnCol.getBounds().width;
            buttonCont.addChild(btnCol);
        }
        return buttonCont;
    }
}
class LCARS_Readout extends LCARS_Element{
    type='readout';
    rows=0;
    cols=[];
    constructor(opt){
        super(opt);
        if(opt.rows) this.rows=opt.rows;
        if(opt.cols) this.cols=opt.cols;
    }
    build(){
        
    }
}
class LCARS_ReadoutDisplay extends LCARS_Readout{
    header='';
    type='textblock';
    constructor(opt){
        super(opt);
        if(opt.header) this.header=opt.header;
    }
    build(){
        return super.build();
    }
}
class LCARS_Button extends LCARS_Element{
    height=33;
    width=85;
    btn;
    btnbg;
    buttonMargin=12;
    buttonWidthPlusMargin;
    buttonHeightPlusMargin;
    alignment = 'end';
    txtWidth;
    constructor(opt){
        super(opt);
        if(opt.text==null) this.text=randomButtonLabel();
        if(opt.txtWidth) this.txtWidth=opt.txtWidth;
        if(opt.alignment) this.alignment=opt.alignment;
        this.btn = new Shape();
        this.btnbg = new Shape();
        this.text = opt.text==null?randomButtonLabel():opt.text;
        this.buttonHeightPlusMargin=this.height+this.buttonMargin;
        this.buttonWidthPlusMargin=this.width+(this.buttonMargin*2);
    }
    build(){
        let s = 1;
        var btnCont = new Container();
        btnCont.x=this.x;
        btnCont.y=this.y;
        this.x=0;
        this.y=0;

        if(this.type=='pill'){
            // btn = this.addPillButton(x,y,c,buttonWidth,buttonHeight,scale);
            // btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            // btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            // btn.addEventListener("click", handlePillClick);
            this.btn.graphics.beginFill(this.color).rc(0,0,this.width,this.height,this.height*0.5,this.height*0.5,this.height*0.5,this.height*0.5);
            this.btnbg.graphics.beginFill(black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.txtWidth = this.width-15;        
        }
        if(this.type=='pill-left'){
            // btn = this.addPillLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            // btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            // btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            // btn.addEventListener("click", handlePillClick);
            this.btn.graphics.beginFill(this.color).rc(0,0,this.width,this.height,this.height*0.5,0,0,this.height*0.5);
            this.btnbg.graphics.beginFill(black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.txtWidth = this.width-10;
        }
        if(this.type=='pill-right'){
            // btn = this.addPillRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            // btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            // btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            // btn.addEventListener("click", handlePillClick);
            this.btn.graphics.beginFill(this.color).rc(0,0,this.width,this.height,0,this.height*0.5,this.height*0.5,0);
            this.btnbg.graphics.beginFill(black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.txtWidth = 5;
            this.alignment='start';
        }
        if(this.type=='cap-left'){
            // btn = this.addCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            // btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            // btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            // btn.addEventListener("click", handleCapClick);
            this.btn.graphics.beginFill(this.color).rc(-10,0,this.height,this.height,this.height*0.5,0,0,this.height*0.5);
            this.btnbg.graphics.beginFill(black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.txtWidth = this.width-10;
        }
        if(this.type=='cap-right'){
            // btn = this.addCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            // btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            // btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            // btn.addEventListener("click", handleCapClick);
            this.btn.graphics.beginFill(this.color).rc(10,0,this.height,this.height,0,this.height*0.5,this.height*0.5,0);
            this.btnbg.graphics.beginFill(black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.txtWidth = 5;
            this.alignment='start';
        }
        if(this.type=='rect'){
            // btn = this.addRectButton(x,y,c,buttonWidth,buttonHeight,scale); 
            // btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            // btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            // btn.addEventListener("click", handleRectClick);
            this.btn.graphics.beginFill(this.color).rect(0,0,this.width,this.height);
            this.btnbg.graphics.beginFill(black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),this.buttonWidthPlusMargin,this.buttonHeightPlusMargin);
            this.txtWidth = this.width-10;
        }
        /* button types
        if(this.type=='rect-pill-right'){
            btn = this.addRectWithPillRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectPillClick);
        }
        if(this.type=='rect-pill-left'){
            btn = this.addRectWithPillLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectPillClick);
        }
        if(this.type=='rect-cap-right'){
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(this.type=='rect-cap-left'){
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(this.type=='tiny-rect-cap-right'){
            btn = this.addTinyRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(this.type=='tiny-rect-cap-left'){
            btn = this.addTinyRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(this.type=='medium-rect-cap-right'){
            buttonWidthPlusMargin = buttonWidthPlusMargin+buttonWidth;
            buttonWidth = buttonWidth*2;
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(this.type=='medium-rect-cap-left'){
            buttonWidth = buttonWidth*2;
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(this.type=='wide-rect-cap-right'){
            buttonWidthPlusMargin = buttonWidthPlusMargin+(buttonWidth*2);
            buttonWidth = buttonWidth*3;
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(this.type=='wide-rect-cap-left'){
            buttonWidth = buttonWidth*3;
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(this.type=='titled-pill-left'){
            btn = this.addTitledLeftPillButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }
        if(this.type=='titled-pill-right'){
            btn = this.addTitledRightPillButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }

        if(this.type=='titled-left'){
            btn = this.addTitledLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }
        if(this.type=='titled-right'){
            btn = this.addTitledRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }

        if(this.type=='titled-tab-left'){
            btn = this.addTitledLeftTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
        }
        if(this.type=='titled-tab-right'){
            btn = this.addTitledRightTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
        }
        if(this.type=='tab-left'){
            btn = this.addLeftTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
        }
        if(this.type=='tab-right'){
            btn = this.addRightTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill('#000').r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
        }
*/
        var txt = new LCARS_Label({x:this.txtWidth,y:(this.height/2)-10,text:this.text,alignment:this.alignment,size:(s==1?18:30)+'px'}).build(); // this.addText(txtWidth,(h/2)-10,l,textAlign,(s==1?18:30)+'px');
        console.log('txt',txt)
        if(this.color!=none){
            btnCont.addChild(this.btnbg);
            btnCont.addChild(this.btn);
            btnCont.addChild(txt);
            // btnCont.addEventListener("click", handleClick);
        }
        return btnCont;
    }
}
class LCARS_PillButton extends LCARS_Button{
    type='pill';
    constructor(opt){
        super(opt);     
    }
    build(){
        return super.build();
    }
}
class LCARS_PillLeftButton extends LCARS_Button{
    type='pill-left';
    constructor(opt){
        super(opt);
    }
    build(){
        return super.build();
    }
}
class LCARS_PillRightButton extends LCARS_Button{
    type='pill-right';
    constructor(opt){
        super(opt);
    }
    build(){
        return super.build();
    }
}
class LCARS_CapLeftButton extends LCARS_Button{
    type='cap-left';
    constructor(opt){
        super(opt);
    }
    build(){
        return super.build();
    }
}
class LCARS_CapRightButton extends LCARS_Button{
    type='cap-right';
    constructor(opt){
        super(opt);
    }
    build(){
        return super.build();
    }
}
class LCARS_RectangleButton extends LCARS_Button{
    type='rect';
    constructor(opt){
        super(opt);
    }
    build(){
        return super.build();
    }
}
class LCARS_ButtonCol extends LCARS_Button{
    //buttonCont;
    rows;
    colors=[];
    height=33;
    constructor(opt){
        super(opt);
        if(opt.rows) this.rows=opt.rows;
        if(opt.colors) this.colors=opt.colors;
    }
    build(){
        var scale = 1; //s==null?1:s;
        //scale=scale==1?1:1.25;
        // var buttonWidth = (bw==null?85:bw)*scale;
        // var buttonHeight = (bh==null?33:bh)*scale;
        let buttonCont = new Container();
        buttonCont.x=this.x;
        buttonCont.y=this.y;

        for (var i = 0; i < this.rows; i++) {
            var color = '';
            if(this.colors.length==0){
                color = randomColor();
            }else{
                color = this.colors[i];
            }
            // let btn = new LCARS_Button({type:this.type,x:0,y:i*(this.height+this.buttonMargin)});
            //btn.y
            buttonCont.addChild(new LCARS_Button({type:this.type,x:0,y:i*(this.height+this.buttonMargin),color:color}).build());
        }
        return buttonCont;
    }
}

function LCARS__Section(size){
    this.n='';
    this.y=0;
    this.w=0;
    //this.h=768;
    this.m=[0,0,0,20];
	this.header;
	this.leftSidebar;
	this.body=[];
	this.rightSidebar;
    this.footer;
    if(is.undefined(size)){
        this.w=100;
    }
    if(size=='xs'){
        this.w=50
    }
    if(size=='lg'){
        this.w=300;
    }
    this.N=function(n){
        this.n=n;
        return this;
    }
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
const elbow_lg_right = {
    h: 250,
    r: [120,0,-40,0],
    c: yellow,
    m: [0,0,0,0],
    t: null
}
const elbow_md_right = {
    h: 150,
    r: [60,0,-20,0],
    c: yellow,
    m: [0,0,0,0],
    t: null
}
const elbow_sm_right = {
    h: 50,
    r: [30,0,-10,0],
    c: yellow,
    m: [0,0,0,0],
    t: null
}
const elbow_lg_left = {
    h: 250,
    r: [0,120,0,-40],
    c: yellow,
    // m: [0,0,0,0],
    t: null
}
const elbow_md_left = {
    h: 150,
    r: [0,60,0,-20],
    c: yellow,
    // m: [0,0,0,0],
    t: null
}
const elbow_sm_left = {
    h: 50,
    r: [0,30,0,-10],
    c: yellow,
    // m: [0,0,0,0],
    t: null
}
function LCARS__Elbow(type){
    this.h=250;
    this.rr=[30,0,-10,0];
    this.lr=[0,30,0,-10];
    this.r= [];
    this.c= yellow;
    this.m= [0,0,0,0];
    this.t= null;
    type = is.undefined(type)?'sm-right':type;
    const sizes = ['sm','md','','lg'];
    const s = sizes.indexOf(type.split('-')[0])+1;
    const d = type.split('-')[1];
    if(d=='left'){
        this.lr.forEach(e=>{
            this.r.push(e*s)
        });
    }
    if(d=='right'){
        this.rr.forEach(e=>{
            this.r.push(e*s)
        });
    }
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
function LCARS__Header(t){
    this.type='header';
    this.x=0; //x==null?0:x;
    this.y=0; //y==null?0:y;
    this.w=null; //w==null?45:w;
    this.h=200; //h==null?30:h;
    this.c=yellow; //c==null?this.tan:c;
    this.r=[0,0,0,0]; //r==null?[0,0,0,0]:r;
    this.t=new LCARS__HeaderText(t);
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
    this.setRows=function(r){
        this.rows=r;
        return this;
    }
    this.setCols=function(c){
        this.cols=c;
        return this;
    }
    this.setHeader=function(h){
        this.header=h;
        return this;
    }
}
class LCARS_Scanner extends LCARS_Element{
    //type='scanner';
    reticule={x:200,y:80};
    colors=[white,yellow,gold,white,yellow];
    width=200;
    height=200;
    constructor(opt){
        super(opt);
        if(opt.reticule) this.reticule=opt.reticule;
        if(opt.colors) this.colors=opt.colors;
        if(opt.width) this.width=opt.width;
        if(opt.height) this.height=opt.height;
        // this.config.type='scanner';
        // this.config.rx=this.reticule.x;
        // this.config.ry=this.reticule.y;
        // this.config.c=this.colors;
        // this.config.h=this.height;
        // this.config.w=this.width;
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