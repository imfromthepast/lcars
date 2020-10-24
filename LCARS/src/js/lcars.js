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
  /$$        /$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$ 
 | $$       /$$__  $$ /$$__  $$| $$__  $$ /$$__  $$
 | $$      | $$  \__/| $$  \ $$| $$  \ $$| $$  \__/
 | $$      | $$      | $$$$$$$$| $$$$$$$/|  $$$$$$ 
 | $$      | $$      | $$__  $$| $$__  $$ \____  $$
 | $$      | $$    $$| $$  | $$| $$  \ $$ /$$  \ $$
 | $$$$$$$$|  $$$$$$/| $$  | $$| $$  | $$|  $$$$$$/
 |________/ \______/ |__/  |__/|__/  |__/ \______/ 
*/

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
    
function randomButtonTitle(){
    var amount = rifi(2,3);
    var retval = '';
    for (var i = 0; i < amount; i++) {
        retval = retval+rifi(0,9).toString();
    }
    return retval; //randomFromArray(buttonTitles);
}
const buttonLabelType = ['#','a','#,a','a,a'];
const letters = ['SDX','NAV','RCNT','COMM','CON','SYS','STR','RVOL','BT','ALPH','TCH','ro','al','luv','lef','mac','pe','lin','jl','pow','an','re'];
const possibleletters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function makeWord(){
    var word = '';
    for( var i=0; i < rifi(1,4); i++ ){
        word += possibleletters.charAt(rifi(0,possibleletters.length));
    }
    // console.log('word',word)
    return word;
}
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
const yellowTheme = {
    base:'yellow',
    accent:'paleYellow',
    emphasis:'gold',
    neutral:'tan',
    action:'blue',
    warning:'paleRed',
    alert:'red'
}
const redTheme = {
    accent:'paleRed',
    base:'red',
    emphasis:'darkRed',
    neutral:'tan',
    action:'paleTan',
    warning:'paleRed',
    alert:'darkTan'
}
const blueTheme = {
    accent:'paleBlue',
    base:'blue',
    emphasis:'darkBlue',
    neutral:'gray',
    action:'paleGray',
    warning:'paleRed',
    alert:'darkGray'
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
    parentWidth;
    parentHeight;
    panel={};
    section={};

    white = '#ece6c1';  

    paleYellow = '#ece6c1';
    yellow = '#e1eea4';
    gold = '#eec331';

    paleBlue = '#cce5fc';
    blue = '#a0c0de';
    darkBlue='#728ea8';

    paleTan = '#facfa7';
    tan = '#d7a474';
    darkTan = '#997553';
    
    paleRed = 'salmon';
    red = '#d20a15';
    darkRed = 'darkred';
    
    paleGray='#ccc';
    gray = '#999';
    darkGray='#555';

    black = '#000';
    none = 'none';
    buttonMargin=12;
    uiTheme = {
        base:this.yellow,
        accent:this.white,
        emphasis:this.gold,
        action:this.blue,
        warning:this.paleRed,
        alert:this.red,
        neutral:this.tan
    }
    colorList = [this.white,this.yellow,this.gold,this.blue,this.darkBlue,this.tan,this.red,this.paleRed,this.gray,this.none];
    randomColor(){
        return this.colorList[rifi(0,(this.colorList.length - 1))];
    } 
    //color;
    getColorCode(c){
        if(c=='white'){return this.white;}

        else if(c=='paleYellow'){return this.paleYellow;}
        else if(c=='yellow'){return this.yellow;}
        else if(c=='gold'){return this.gold;}

        else if(c=='paleBlue'){return this.paleBlue;}
        else if(c=='blue'){return this.blue;}
        else if(c=='darkBlue'){return this.darkBlue;}

        else if(c=='paleTan'){return this.paleTan;}
        else if(c=='tan'){return this.tan;}
        else if(c=='darkTan'){return this.darkTan;}

        else if(c=='paleRed'){return this.paleRed;}
        else if(c=='red'){return this.red;}
        else if(c=='darkRed'){return this.darkRed;}

        else if(c=='paleGray'){return this.paleGray;}
        else if(c=='gray'){return this.gray;}
        else if(c=='darkGray'){return this.darkGray;}

        else if(c=='black'){return this.black;}
        else if(c=='none'){return this.none;}
        else{return c;}        
    }
    circleColors = [this.white,this.yellow,this.gold];
    constructor(opt){
        if(opt){
            if(opt.name)            this.name=opt.name;
            if(opt.x)               this.x=opt.x;
            if(opt.y)               this.y=opt.y;
            if(opt.width)           this.width=opt.width;
            if(opt.height)          this.height=opt.height;
            if(opt.parentWidth)     this.parentWidth=opt.parentWidth;
            if(opt.parentHeight)    this.parentHeight=opt.parentHeight;
            if(opt.color)           this.color=opt.color;
        }
        // console.log(this.name+' color',this.color);
    }
    get isObject(){return true;}
}
class LCARS_Element extends LCARS_Object{
    type='';
    margin=[0,0,0,0];
    radius=[0,0,0,0];
    text;
    // color=uiTheme.base;
    element;
    constructor(opt){
        super(opt);
        if(opt){
            if(opt.type)        this.type=opt.type;
            if(opt.margin)      this.margin=opt.margin;
            if(opt.radius)      this.radius=opt.radius;
            if(opt.color)       this.color=opt.color;
            if(opt.text)        this.text=opt.text;
        }
    }
    build(){}
}

class LCARS_Panel extends LCARS_Object{    
    debug = false;
    lcarsCanvas;
    padding=20;
    sections=[];
    innerHeight;
    innerWidth;
    canvasId;
    tick = 0;
    constructor(opt){
        super(opt);
        if(opt.padding) this.padding=opt.padding;
        if(opt.height) this.height=opt.height;
        if(opt.width) this.width=opt.width;
        if(opt.name) this.name=opt.name;
        if(opt.debug) this.debug=opt.debug;
        if(opt.sections) this.sections=opt.sections;        
        if(opt.id) this.canvasId = opt.id;
        // add uilayer to canvas
        if(opt.uiTheme) {
            if(opt.uiTheme.base) this.uiTheme.base=this.getColorCode(opt.uiTheme.base);
            if(opt.uiTheme.accent) this.uiTheme.accent=this.getColorCode(opt.uiTheme.accent);
            if(opt.uiTheme.emphasis) this.uiTheme.emphasis=this.getColorCode(opt.uiTheme.emphasis);
            if(opt.uiTheme.action) this.uiTheme.action=this.getColorCode(opt.uiTheme.action);
            if(opt.uiTheme.warning) this.uiTheme.warning=this.getColorCode(opt.uiTheme.warning);
            if(opt.uiTheme.alert) this.uiTheme.alert=this.getColorCode(opt.uiTheme.alert);
            if(opt.uiTheme.neutral) this.uiTheme.neutral=this.getColorCode(opt.uiTheme.neutral);
            // console.log('theme', this.uiTheme);
        }else{
            //this.uiTheme = yellowTheme;
            this.uiTheme.base=this.getColorCode(yellowTheme.base); //this.yellow;
            this.uiTheme.accent=this.getColorCode(yellowTheme.accent); //this.paleYellow;
            this.uiTheme.emphasis=this.getColorCode(yellowTheme.emphasis); //this.gold;
            this.uiTheme.neutral=this.getColorCode(yellowTheme.neutral); //this.tan;
            this.uiTheme.action=this.getColorCode(yellowTheme.action); //this.blue;
            this.uiTheme.warning=this.getColorCode(yellowTheme.warning); //this.paleRed;
            this.uiTheme.alert=this.getColorCode(yellowTheme.alert); //this.red;
        }
    }
    build(){
        let cnvs = document.getElementById(this.canvasId);
        cnvs.width = this.width+this.padding;
        cnvs.height = this.height+this.padding;
        let bg = new Shape();
        let uilayer = new Container();
        this.lcarsCanvas= new Stage(this.canvasId);
        Ticker.on("tick", this.lcarsCanvas);
        bg.graphics.beginFill(this.black).drawRect(0, 0, cnvs.width, cnvs.height);
        this.lcarsCanvas.addChild(bg);
        uilayer.removeAllChildren();
        // set up uilayer
        this.innerHeight = this.height; // - (this.padding*2);
        this.innerWidth = this.width; // - (this.padding*2);
        uilayer.name = 'uilayer';
        uilayer.x = this.padding/2;
        uilayer.y = this.padding/2;
        uilayer.width = innerWidth;
        uilayer.height = innerHeight;
        var x = 0,y = 0;
        this.sections.forEach(sec=>{
            // let sec = s.build();
            sec.panel=this;
            var header = sec.header;
            console.log('section',sec)
            /*
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
            */
            if(sec.header){
                sec.header.width = sec.width-this.padding;
                if(!sec.header.color) sec.header.color=this.uiTheme.base;
            }
            if(sec.body){
                sec.body.forEach(el=>{                    
                    if(!el.color) el.color=this.uiTheme.base;
                })
            }
            if(sec.footer){
                sec.footer.width = sec.width-this.padding;
                if(!sec.footer.color) sec.footer.color=this.uiTheme.base;
            }
            sec.x=x;
            sec.y=y;
            sec.y=0;
            sec.height=this.innerHeight;
            uilayer.addChild(sec.build()); //this.lcarsSection(x,y,sec,null));
            x+=sec.width; //+(margin_right);
        });
        this.lcarsCanvas.addChild(uilayer);
        this.lcarsCanvas.update();
    }
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
    doFourTimesPerSecond(){}
    doTwicePerSecond(){}
    doOncePerSecond(){}
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
        let cont = new Container();
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
        // console.log('leftSidebarWidth',leftSidebarWidth)
        var footerHeight = is.not.undefined(this.footer)?this.footer.height+footerMargins[0]+footerMargins[2]:0;
        var bodyHeight = this.height - (headerHeight+footerHeight);
        var midY = headerHeight;
        var footerY = headerHeight+bodyHeight+footerMargins[0];
        // sectionCont.x = this.x; //this.x;
        // sectionCont.y = this.y; //this.y;
        leftSidebarCont.y=midY;
        bodyCont.x=leftSidebarWidth; //this.leftSidebar.w;
        bodyCont.y=midY;
        bodyCont.name='body';
        this.body.forEach(el=>{
            if(el.isObject){
                // console.log('el',el)
                el.section=this;
                if(is.undefined(el.width)) el.width=this.width-20; //this.padding;
                bodyCont.addChild(el.build());
            }
        })
        //headerCont.x=10; //this.padding/2;
        footerCont.y=footerY;
        if(this.footer!= null) footerCont.addChild(this.footer.build());
        //console.log('footerCont',footerCont)
        if(this.header!=null) headerCont.addChild(this.header.build());
        sectionCont.addChild(headerCont,leftSidebarCont,bodyCont,rightSidebarCont,footerCont);
        sectionCont.y=10; //this.padding/2;
        sectionCont.x=10; //this.padding/2;
        cont.addChild(sectionCont);
        if(this.panel.debug){            
            var boundingBox = new Shape();
            boundingBox.graphics.ss(2).beginStroke('#fff').drawRect(0,0,this.width,this.height);
            var txtbg = new Shape();
            txtbg.graphics.beginFill('rgba(255,255,255,0.75)').rect(5,5,this.width-10,25);
            var txt = new Text(makeCap(this.width+'x'+this.height),"20px Arial",'#000');
            txt.x=8;
            txt.y=8;
            cont.addChild(boundingBox,txtbg,txt);
        }
        cont.x=this.x;
        cont.y=this.y;
        return cont;        
    }
}
class LCARS_Section_1w extends LCARS_Section{
    constructor(opt){
        super(opt);
        this.width=100;
    }
}
class LCARS_Section_2w extends LCARS_Section{
    constructor(opt){
        super(opt);
        this.width=200;
    }
}
class LCARS_Section_3w extends LCARS_Section{
    constructor(opt){
        super(opt);
        this.width=300;
    }
}
class LCARS_Section_4w extends LCARS_Section{
    constructor(opt){
        super(opt);
        this.width=400;
    }
}
class LCARS_Section_5w extends LCARS_Section{
    constructor(opt){
        super(opt);
        this.width=500;
    }
}
class LCARS_Label extends LCARS_Element{
    alignment='end'; //Any of "start", "end", "left", "right", and "center"
    size='18px';
    color=this.black;
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
        txt.textAlign=this.alignment;
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
    valign='bottom';
    constructor(opt){
        super(opt);
        if(opt){
            if(opt.height) this.height=opt.height;
            if(opt.text) this.text=opt.text;
            if(opt.width) this.width= opt.width;
            if(opt.size) this.size=opt.size;
            if(opt.alignment) this.alignment=opt.alignment;
            if(opt.valign) this.valign=opt.valign;
        }
    }
    build(){
        // console.log('building '+this.type)
        var hdrCont = new Container();
        hdrCont.x=this.x;
        hdrCont.y=this.y;
        var hdr = new Shape();
        hdr.graphics.beginFill(this.color).rc(0,0,this.width,this.height,this.radius[0],this.radius[1],this.radius[2],this.radius[3]);
        hdrCont.addChild(hdr);
        let textHeight = parseInt(this.size.split('px')[0])+5;
        let textY = 0;
        // console.log('this.valign',this.valign)
        switch(this.valign){
            case 'top':
                textY = 5;
                break;
            case 'bottom':
                textY = (this.height+this.margin[0])-textHeight;
                break;
        }
        // console.log('textY for '+this.text,textY);
        hdrCont.addChild(new LCARS_HeaderText({text:this.text,width:this.width,y:textY,size:this.size,alignment:this.alignment,valign:this.valign}).build());
        return hdrCont;
    }
}
class LCARS_Subheader extends LCARS_Header{
    height=30;
    alignment='end';
    size='22px';
    valign='top';
    constructor(opt){
        super(opt);
        //if(opt.height) this.height=opt.height;
        if(opt.size) this.size=opt.size; 
        if(opt.alignment) this.alignment = opt.alignment;
        if(opt.valign) this.valign=opt.valign;
    }
    build(){
        return super.build();
    }
}
class LCARS_Subheader_1w extends LCARS_Subheader{
    constructor(opt){
        super(opt);
        this.width=100;
    }
}
class LCARS_Subheader_2w extends LCARS_Subheader{
    constructor(opt){
        super(opt);
        this.width=180;
    }
}
class LCARS_Subheader_3w extends LCARS_Subheader{
    constructor(opt){
        super(opt);
        this.width=280;
    }
}
class LCARS_Subheader_4w extends LCARS_Subheader{
    constructor(opt){
        super(opt);
        this.width=380;
    }
}
class LCARS_Subheader_5w extends LCARS_Subheader{
    constructor(opt){
        super(opt);
        this.width=480;
    }
}
class LCARS_Footer extends LCARS_Header{
    height=15;
    margin=[0,0,0,0];
    alignment='end';
    constructor(opt){
        super(opt);
        if(opt){
            if(opt.height) this.height=opt.height;
        }
    }
    build(){
        return super.build();
    }
}
class LCARS_Elbow extends LCARS_Header{
    size;
    dir;
    //color=this.uiTheme.base;
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
    c1=this.uiTheme.emphasis;
    c2=this.uiTheme.emphasis;
    c3=this.uiTheme.emphasis;
    c4=this.uiTheme.emphasis;
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
        var cont = new Container();
        cont.x=this.x;
        cont.y=this.y;
        var base = new Shape();
        base.graphics.beginFill(this.uiTheme.action).dc(100,100,100);
        var buttons = new Container();
        var cross = new Shape();    
        var w = 40;
        var l = 130;
        var w1 = 100-(w/2);
        var w2 = w1+w;
        var l1 = (200-l)/2;
        var l2 = l1+l;
        cross.graphics.beginFill(this.uiTheme.base).setStrokeStyle(4).beginStroke(this.black).lt(w1,l1).lt(w2,l1).lt(w2,w1).lt(l2,w1).lt(l2,w2).lt(w2,w2).lt(w2,l2).lt(w1,l2).lt(w1,w2).lt(l1,w2).lt(l1,w1).lt(w1,w1).cp().beginFill(this.c1).dr(w1,0-5,w,w).beginFill(this.c2).dr(l2,w1,w,w).beginFill(this.c3).dr(w1,l2,w,w).beginFill(this.c4).dr(l1-w,w1,w,w);
        var accents = new Shape();
        accents.graphics.ss(2).beginStroke(this.black).mt(w1,74).lt(w2,74).mt(w1,152).lt(w2,152).ss(3).mt(w1,45).lt(w2,45).mt(w1,69).lt(w2,69).mt(w1,128).lt(w2,128).mt(w1,138).lt(w2,138).mt(w1+16,15).lt(w1+16,30).mt(w1+23,15).lt(w1+23,30).ss(6).mt(w1+30,15).lt(w1+30,30).mt(l2+5,w2-10).lt(l2+20,w2-10).mt(w1+10,l2+5).lt(w1+10,l2+20).mt(l1-w+20,w1+10).lt(l1-w+35,w1+10)
        cross.clip = base;  
        cross.name = this.name;              
        buttons.addChild(cross);
        buttons.addChild(accents);
        // cross.addEventListener("click", function(evt) {
        //     console.log("evt", evt);
        //     console.log("type: "+evt.type+" target: "+evt.target+" stageX: "+evt.stageX);

        // });
        cross.addEventListener("click", handleJoystickClick);
        cont.addChild(base);
        cont.addChild(buttons);

        return cont;
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
    build(){
        var tabCont = new Container();
        var buttonWidth = 85*1.25;
        var buttonHeight = 33*1.25;
        var y = this.y;
        var titled = this.titled?'titled-':'';
        for (var i = 0; i < this.tabs.length; i++) {                
            let tab = this.tabs[i];
            //console.log('tab',tab);
            tabCont.addChild(new LCARS_Button({x:this.x,y:y,color:tab.color,type:titled+'tab-'+this.alignment,width:buttonWidth,height:buttonHeight,size:2,text:tab.text}).build());
            y+=  buttonHeight + 12; //this.buttonMargin;    
        }
        return tabCont;
    }
}
class LCARS_TitledTabs extends LCARS_Tabs{
    titled=true;
    constructor(opt){
        super(opt);
    }
    build(){
        return super.build();
    }
}
class LCARS_UntitledTabs extends LCARS_Tabs{
    titled=false;
    constructor(opt){
        super(opt);
    }
    build(){
        return super.build();
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
        var readout = new Container();
        readout.x = this.x;
        readout.y = this.y;
        var x = 0;
        var y = 0;
        var maxX = 0;
        for (var ri = 0; ri < this.rows; ri++) {
            for (var i = 0; i < this.cols.length; i++) {
                var datum = this.makeDatum(rifi((this.cols[i]<4?2:this.cols[i]-2),this.cols[i]));
                datum.textAlign='end';
                x+=(this.cols[i]+2)*5;
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
    datumColors = [this.uiTheme.base,this.uiTheme.action,this.uiTheme.emphasis];
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
}
class LCARS_ReadoutDisplay extends LCARS_Readout{
    header='';
    type='textblock';
    constructor(opt){
        super(opt);
        if(opt.header) this.header=opt.header;
    }
    build(){
        var header = new Text();
        header.font='20px Okuda';
        header.text = this.header==''?this.makeDatum(6).text:makeCap(this.header);
        header.color = this.uiTheme.accent;
        header.textAlign='end';
        var bbg = new Shape();
        bbg.graphics.f(this.black).r(5,0,165,25);
        var data = new Container();
        data.x = this.x;
        data.y = this.y;
        data.addChild(header);
        var x = 0;
        var y = 40;
        var maxX = 0;
        for (var ri = 0; ri < this.rows; ri++) {
            for (var i = 0; i < this.cols.length; i++) {
                var datum = this.makeDatum(rifi((this.cols[i]<4?2:this.cols[i]-2),this.cols[i]));
                datum.textAlign='end';
                x+=(this.cols[i]+2)*5;
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
        hbg.graphics.f(rae(this.datumColors)).mt(0,0).lt(5,0).lt(5,25).lt(maxX,25).lt(maxX,35).lt(maxX*0.66,35).lt(maxX*0.66,30).lt(0,30)
        var ftr = new Shape();
        ftr.graphics.f(rae(this.datumColors)).mt(0,y+5).lt(maxX*0.66,y+5).lt(maxX*0.66,y).lt(maxX,y).lt(maxX,y+75).lt(0,y+75).lt(0,y+60).lt(maxX/3,y+60).lt(maxX/3,y+70).lt(maxX-20,y+70).lt(maxX-20,y+10).lt(0,y+10)
        data.addChildAt(hbg,0);
        data.addChild(ftr);
        return data;
    }
}
class LCARS_Button extends LCARS_Element{   
    height=33;
    width=85;
    btn;
    btnbg;
    btnCont;
    buttonParts;
    buttonWidthPlusMargin;
    buttonHeightPlusMargin;
    alignment = 'end';
    txtWidth;
    constructor(opt){
        super(opt);
        if(opt.text) this.text = opt.text;
        if(opt.width) this.width=opt.width;
        if(opt.height) this.height=opt.height;
        if(opt.txtWidth) this.txtWidth=opt.txtWidth;
        if(opt.alignment) this.alignment=opt.alignment;
        this.btn = new Shape();
        this.btnbg = new Shape();
        this.btnCont = new Container();
        this.buttonParts = new Container();
        this.text = is.undefined(this.text)?randomButtonLabel():this.text;
        this.buttonHeightPlusMargin=this.height+this.buttonMargin;
        this.buttonWidthPlusMargin=this.width+(this.buttonMargin*2);
        this.buttonHeightPlusMargin=this.height+this.buttonMargin;
        this.buttonWidthPlusMargin=this.width+(this.buttonMargin*2);
    }
    
    build(){
        super.build();
        return this.addButtonType(this.x,this.y,this.color,this.type,this.width,this.height,1,this.text);
    }
    addText(x,y,t,a,s,c){
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
    addButtonType(x,y,c,t,buttonWidth,buttonHeight,scale,l){
        var buttonHeightPlusMargin = buttonHeight+this.buttonMargin;
        var buttonWidthPlusMargin = buttonWidth+(this.buttonMargin*2);

        var btn = new Container();
        var btnbg = new Shape();
        if(t=='pill'){
            btn = this.addPillButton(x,y,c,buttonWidth,buttonHeight,scale);
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handlePillClick);
        }
        if(t=='pill-left'){
            btn = this.addPillLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handlePillClick);
        }
        if(t=='pill-right'){
            btn = this.addPillRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handlePillClick);
        }
        if(t=='cap-left'){
            btn = this.addCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handleCapClick);
        }
        if(t=='cap-right'){
            btn = this.addCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handleCapClick);
        }
        if(t=='rect'){
            btn = this.addRectButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectClick);
        }
        if(t=='rect-pill-right'){
            btn = this.addRectWithPillRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectPillClick);
        }
        if(t=='rect-pill-left'){
            btn = this.addRectWithPillLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectPillClick);
        }
        if(t=='rect-cap-right'){
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='rect-cap-left'){
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='tiny-rect-cap-right'){
            btn = this.addTinyRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='tiny-rect-cap-left'){
            btn = this.addTinyRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='medium-rect-cap-right'){
            buttonWidthPlusMargin = buttonWidthPlusMargin+buttonWidth;
            buttonWidth = buttonWidth*2;
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='medium-rect-cap-left'){
            buttonWidth = buttonWidth*2;
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='wide-rect-cap-right'){
            buttonWidthPlusMargin = buttonWidthPlusMargin+(buttonWidth*2);
            buttonWidth = buttonWidth*3;
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='wide-rect-cap-left'){
            buttonWidth = buttonWidth*3;
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='titled-pill-left'){
            btn = this.addTitledLeftPillButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }
        if(t=='titled-pill-right'){
            btn = this.addTitledRightPillButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }

        if(t=='titled-left'){
            btn = this.addTitledLeftButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }
        if(t=='titled-right'){
            btn = this.addTitledRightButton(x,y,c,buttonWidth,buttonHeight,scale); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }

        if(t=='titled-tab-left'){
            btn = this.addTitledLeftTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
        }
        if(t=='titled-tab-right'){
            btn = this.addTitledRightTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
        }
        if(t=='tab-left'){
            btn = this.addLeftTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
        }
        if(t=='tab-right'){
            btn = this.addRightTab(x,y,c,buttonWidth,buttonHeight,l); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTabClick);
        }
        btn.x=x;
        btn.y=y;
        btn.addChildAt(btnbg,0);
        return btn;
    }
    buildButton(x,y,w,h,c,t,l,s){
        var btnCont = new Container();
        btnCont.x=x;
        btnCont.y=y;
        x=0;
        y=0;
        var txtWidth; 
        var textAlign = 'end';
        var btn = new Shape();
        if(t=='pill'){
            btn.graphics.beginFill(c).rc(x,y,w,h,h*0.5,h*0.5,h*0.5,h*0.5);
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
        t = t==null?randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'pill',t,s);
    }
    addPillLeftButton(x,y,c,w,h,s,t){
        t = t==null?randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'pill-left',t,s);
    }
    addPillRightButton(x,y,c,w,h,s,t){
        t = t==null?randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'pill-right',t,s);
    }
    addCapLeftButton(x,y,c,w,h,s,t){
        t = t==null?randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'cap-left',null,s);
    }
    addCapRightButton(x,y,c,w,h,s,t){
        t = t==null?randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'cap-right',null,s);
    }
    addRectButton(x,y,c,w,h,s,t){
        t = t==null?randomButtonLabel():t;
        return this.buildButton(x,y,w,h,c,'rect',t,s);
    }
    addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,s,l){
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(0,0,c,buttonWidth-20,buttonHeight,s,l));
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
        cont.addChild(this.addText(buttonWidth+(s==1?67:86),-8,randomButtonTitle(),null,(s==1?46:56)+'px',this.randomColor()))
        return cont;
    }
    addTitledRightPillButton(x,y,c,buttonWidth,buttonHeight,s){
        var cont = new Container();
        var crbtn = this.addRectWithCapRightButton(x,0,c,buttonWidth,buttonHeight,s);
        crbtn.x = s==1?75:85;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton(0,0,this.randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(20,-8,randomButtonTitle(),'start',(s==1?46:56)+'px',this.randomColor()))
        return cont;
    }

    addTitledLeftButton(x,y,c,buttonWidth,buttonHeight,s){
        var cont = new Container();
        var crbtn = this.addRectButton(x,0,c,buttonWidth,buttonHeight,s);
        crbtn.x = 0;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton((s==1?75:90)+buttonWidth,0,this.randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(buttonWidth+(s==1?67:86),-8,randomButtonTitle(),null,(s==1?46:56)+'px',this.randomColor()))
        return cont;
    }
    addTitledRightButton(x,y,c,buttonWidth,buttonHeight,s){
        var cont = new Container();
        var crbtn = this.addRectButton(x,0,c,buttonWidth,buttonHeight,s);
        crbtn.x = s==1?75:85;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton(0,0,this.randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(20,-8,randomButtonTitle(),'start',(s==1?46:56)+'px',this.randomColor()))
        return cont;
    }

    addTitledRightTab(x,y,c,buttonWidth,buttonHeight,l){
        var s=2;
        var cont = new Container();
        cont.addChild(this.addRectButton(0,0,c,150,buttonHeight,s,l));
        cont.addChild(this.addText(155,-8,randomButtonTitle()+randomButtonTitle(),'start','56px',c))
        cont.addChild(this.addCapRightButton(245,0,c,buttonHeight,buttonHeight,s,''));
        return cont;
    }
    addTitledLeftTab(x,y,c,buttonWidth,buttonHeight,l){
        var s=2;
        var cont = new Container();
        cont.addChild(this.addCapLeftButton(0,0,c,buttonHeight,buttonHeight,s,''));
        cont.addChild(this.addText(130,-8,randomButtonTitle()+randomButtonTitle(),null,'56px',c))
        cont.addChild(this.addRectButton(135,0,c,135,buttonHeight,s,l));
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
                color = this.randomColor();
            }else{
                color = this.colors[i];
            }
            // console.log('x,y',i*(this.height+this.buttonMargin))
            buttonCont.addChild(new LCARS_Button({type:this.type,x:0,y:i*(this.height+this.buttonMargin),color:color,text:''}).build());
            
        }
        // console.log(buttonCont.getBounds())
        return buttonCont;
    }
}
class LCARS_Scanner extends LCARS_Element{
    //type='scanner';
    reticule={x:200,y:80};
    colors=[this.uiTheme.accent,this.uiTheme.base,this.uiTheme.emphasis,this.uiTheme.accent,this.uiTheme.base];
    width=200;
    height=200;
    constructor(opt){
        super(opt);
        if(opt.reticule) this.reticule=opt.reticule;
        if(opt.colors) this.colors=opt.colors;
        if(opt.width) this.width=opt.width;
        if(opt.height) this.height=opt.height;
    }
	build(){
		let x = this.x;
		let y = this.y;
		let c = this.colors;
		let rx = this.reticule.x;
		let ry = this.reticule.y;
		let w = this.width;
		let h = this.height;
		
		var scannerCont = new Container();
        scannerCont.name='lcarsScanner';
        var topLeftFrame = new Shape();
        var frame = new Shape();
        var reticule = new Shape();
        var screen = new Container();
        scannerCont.x=x;
        scannerCont.y=y;
        topLeftFrame.graphics.f(c[0]).mt(0,0).lt(rx-25,0).lt(rx-25,30).lt(0,30).cp();
        frame.graphics.f(c[1]).mt(rx+25,0).lt(w,0).lt(w,h).lt(0,h).lt(0,h-15).lt(w-20,h-15).lt(w-20,30).lt(rx+25,30).cp();
        reticule.graphics.f(c[2]).mt(rx-20,0).lt(rx+20,0).lt(rx+20,ry-30).lt(w-40,ry-30).lt(w-40,ry).lt(w-50,ry).lt(w-50,ry-20).lt(40,ry-20).lt(40,ry).lt(30,ry).lt(30,ry-30).lt(rx-20,ry-30).cp().f(c[3]).dr(30,ry+70,w-70,10).f(this.black).dr(rx-20,20,40,2).dr(rx-20,30,40,2).dr(rx-20,40,40,5).f(c[3]).ss(5).s(this.black).dr(rx-22,h-38,45,40);
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