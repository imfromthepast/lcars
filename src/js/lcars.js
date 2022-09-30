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
    return retval;
}
const buttonLabelType = ['#','a','#,a','a,a'];
const letters = ['SDX','NAV','RCNT','COMM','CON','SYS','STR','RVOL','BT','ALPH','TCH','ro','al','luv','lef','mac','pe','lin','jl','pow','an','re'];
const possibleletters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function makeWord(){
    var word = '';
    for( var i=0; i < rifi(1,4); i++ ){
        word += possibleletters.charAt(rifi(0,possibleletters.length));
    }
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
function loadSounds(){
    // two tone chirp
    Sound.registerSound("./src/sfx/1.wav", '1');
    // three tone chirp
    Sound.registerSound("./src/sfx/2.wav", '2');
    // chime
    Sound.registerSound("./src/sfx/3.wav", '3');
    // beep
    Sound.registerSound("./src/sfx/4.wav", '4');
    // see 1
    Sound.registerSound("./src/sfx/5.wav", '5');
    // short chirp
    Sound.registerSound("./src/sfx/6.wav", '6');
    // error
    Sound.registerSound("./src/sfx/7.wav", '7');
}
function playSound(soundID) {
    Sound.play(soundID.toString());
}
function handleClick(event){
    //console.log(event);
    playSound(rifi(1,4));
}
function handleRectClick(event){
    playSound(4);
    //console.log(event);
    //console.log('btn',event.target.parent.name);
}
function handleRectPillClick(event){
    playSound(1);
    //console.log(event);
    //console.log('btn',event.target.parent.name);
}
function handleRectCapClick(event){
    playSound(2);
    //console.log(event);
    //console.log('btn',event.target.parent.name);
}
function handleTabClick(event){
    playSound(3); 
    //console.log(event);
    //console.log('btn',event.target.parent.name);           
}
function handlePillClick(event){
    playSound(rifi(2,4));
    //console.log(event);
    //console.log('btn',event.target.parent.name);
}
function handleCapClick(event){
    playSound(4);
    //console.log(event);
    //console.log('btn',event.target.parent.name);
}
function handleTitledPillClick(event){
    playSound(4);
    // playSound(6);
    //console.log(event);
}
function handleJoystickClick(event){
    //console.log('handleJoystickClick()');         
    var x=event.localX,y=event.localY;
    if(x>=80 && y<=35 && x<=120){
        //console.log('up');
        playSound(1);
        joystickButtonFunction(1,event.target.name);
    }else if(x>=165 & y>=80 && y<=120){
        //console.log('right');
        playSound(2);
        joystickButtonFunction(2,event.target.name);
    }else if(x>=80 && y>=165 && x<=120){
        //console.log('down');
        playSound(3);
        joystickButtonFunction(3,event.target.name);
    }else if(x<=35 && y>=80 && y<=120){
        //console.log('left');
        playSound(4);
        joystickButtonFunction(4,event.target.name);
    }
}
function tabClick(i){
    ////console.log('tab click',i);
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
    alert:'red'
}
const grayTheme = {
    accent:'paleGray',
    base:'gray',
    emphasis:'darkGray',
    neutral:'gray',
    action:'paleGray',
    warning:'paleGray',
    alert:'gray'
}

colorList = []
function randomColor(){
    return this.colorList[rifi(0,(this.colorList.length - 1))];
} 
function joystickButtonFunction(bid,name){
    //console.log('bid',bid);
    //console.log('name',name);
}
/*
Ticker.addEventListener("tick", handleTick);
let tick=0;
function handleTick(event){
    if (!event.paused) {
        // 4 times a second
        if(tick==0 || tick==6 || tick==12 || tick == 18){
            doFourTimesPerSecond();
        }
        // twice a second
        if(tick==0 || tick==12){
            doTwicePerSecond();
        }
        // once a second
        if(tick==0){  
            doOncePerSecond();                                  
        }
        updateCanvas();
        var top = 24;
        tick = tick<top?tick+1:0;
    }
}
*/
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
    strClassName='Object';
    constructorOptions={};
    name='';
    x=0;
    y=0;
    width;
    height;  
    panel={};
    section={};
    colorClass='base';
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
        neutral:this.tan,
        black:this.black
    }
    circleColors = ['accent','base','emphasis'];
    constructor(opt){
        if(opt){
            this.constructorOptions = opt;
            if(opt.name)            this.name=opt.name;
            if(opt.x)               this.x=opt.x;
            if(opt.y)               this.y=opt.y;
            if(opt.width)           this.width=opt.width;
            if(opt.height)          this.height=opt.height;
            if(opt.colorClass)      this.colorClass=opt.colorClass;
        }
    }
    get isObject(){return true;}
    stringify(){
        return 'new LCARS_'+this.strClassName+'('+
            JSON.stringify(this.constructorOptions)+
        +')';
    }
}
class LCARS_Element extends LCARS_Object{
    strClassName='Element';
    type='';
    margin=[0,0,0,0];
    radius=[0,0,0,0];
    radiusTop=0;
    radiusBottom=0;
    radiusRight=0;
    radiusLeft=0;
    radiusTopRight=0;
    radiusTopLeft=0;
    radiusBottomRight=0;
    radiusBottomLeft=0;
    text='';
    constructor(opt){
        super(opt);
        if(opt){
            if(opt.type)                this.type=opt.type;
            if(opt.margin)              this.margin=opt.margin;
            if(opt.radius)              this.radius=opt.radius;
            if(opt.text)                this.text=opt.text;
            if(opt.radiusTop)           this.radiusTop=opt.radiusTop;
            if(opt.radiusTopRight)      this.radiusTopRight=opt.radiusTopRight;
            if(opt.radiusTopLeft)       this.radiusTopLeft=opt.radiusTopLeft;
            if(opt.radiusBottom)        this.radiusBottom=opt.radiusBottom;
            if(opt.radiusBottomRight)   this.radiusBottomRight=opt.radiusBottomRight;
            if(opt.radiusBottomLeft)    this.radiusBottomLeft=opt.radiusBottomLeft;
            if(opt.radiusRight)         this.radiusRight=opt.radiusRight;
            if(opt.radiusLeft)          this.radiusLeft=opt.radiusLeft;
        }
        if(this.radiusTop>0)
            this.radius=[this.radiusTop,this.radiusTop,0,0];
        else if(this.radiusRight>0)
            this.radius=[0,this.radiusRight,this.radiusRight,0];
        else if(this.radiusLeft>0)
            this.radius=[this.radiusLeft,0,0,this.radiusLeft];
        else if(this.radiusBottom>0)
            this.radius=[0,0,this.radiusBottom,this.radiusBottom];
        if(this.radiusTopRight>0 || this.radiusTopLeft>0 || this.radiusBottomRight>0 || this.radiusBottomLeft>0)
            this.radius=[this.radiusTopLeft,this.radiusTopRight,this.radiusBottomRight,this.radiusBottomLeft];
    }
    setText(t){
        this.text = t;
    }
    build(){}
}
/*
 /$$        /$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$        /$$$$$$$                               /$$
| $$       /$$__  $$ /$$__  $$| $$__  $$ /$$__  $$      | $$__  $$                             | $$
| $$      | $$  \__/| $$  \ $$| $$  \ $$| $$  \__/      | $$  \ $$ /$$$$$$  /$$$$$$$   /$$$$$$ | $$
| $$      | $$      | $$$$$$$$| $$$$$$$/|  $$$$$$       | $$$$$$$/|____  $$| $$__  $$ /$$__  $$| $$
| $$      | $$      | $$__  $$| $$__  $$ \____  $$      | $$____/  /$$$$$$$| $$  \ $$| $$$$$$$$| $$
| $$      | $$    $$| $$  | $$| $$  \ $$ /$$  \ $$      | $$      /$$__  $$| $$  | $$| $$_____/| $$
| $$$$$$$$|  $$$$$$/| $$  | $$| $$  | $$|  $$$$$$/      | $$     |  $$$$$$$| $$  | $$|  $$$$$$$| $$
|________/ \______/ |__/  |__/|__/  |__/ \______//$$$$$$|__/      \_______/|__/  |__/ \_______/|__/
                                                |______/


*/
class LCARS_Panel extends LCARS_Object{  
    strClassName='Panel';  
    debug = false;
    lcarsCanvas;
    padding=20;
    sections=[];
    canvasId;
    tick = 0;
    constructor(opt){
        super(opt);
        if(opt.padding) this.padding=opt.padding;
        if(opt.debug) this.debug=opt.debug;
        if(opt.sections) this.sections=opt.sections;        
        if(opt.id) this.canvasId = opt.id;
        if(opt.bgimgsrc) this.bgimgsrc = opt.bgimgsrc;
        if(opt.uiTheme) {
            if(opt.uiTheme.base) this.uiTheme.base=this[opt.uiTheme.base];
            if(opt.uiTheme.accent) this.uiTheme.accent=this[opt.uiTheme.accent];
            if(opt.uiTheme.emphasis) this.uiTheme.emphasis=this[opt.uiTheme.emphasis];
            if(opt.uiTheme.action) this.uiTheme.action=this[opt.uiTheme.action];
            if(opt.uiTheme.warning) this.uiTheme.warning=this[opt.uiTheme.warning];
            if(opt.uiTheme.alert) this.uiTheme.alert=this[opt.uiTheme.alert];
            if(opt.uiTheme.neutral) this.uiTheme.neutral=this[opt.uiTheme.neutral];
        }else{
            this.uiTheme.base=this[yellowTheme.base];
            this.uiTheme.accent=this[yellowTheme.accent];
            this.uiTheme.emphasis=this[yellowTheme.emphasis];
            this.uiTheme.neutral=this[yellowTheme.neutral];
            this.uiTheme.action=this[yellowTheme.action];
            this.uiTheme.warning=this[yellowTheme.warning];
            this.uiTheme.alert=this[yellowTheme.alert];
        }
        colorList = [this.uiTheme.action,this.uiTheme.alert,this.uiTheme.base,this.uiTheme.accent,this.uiTheme.emphasis,this.uiTheme.neutral,this.uiTheme.warning];
    }
    build(){
        let cnvs = document.getElementById(this.canvasId);
        cnvs.width = parseInt(this.width)+parseInt(this.padding);
        cnvs.height = parseInt(this.height)+parseInt(this.padding);
        let bg = new Shape();
        let bitmap = new createjs.Bitmap(this.bgimgsrc);        
        let uilayer = new Container();
        this.lcarsCanvas= new Stage(this.canvasId);
        this.lcarsCanvas.enableMouseOver(10);
        createjs.Touch.enable(this.lcarsCanvas); //,false,true);
        Ticker.on("tick", this.lcarsCanvas);
        bg.graphics.beginFill(this.black).drawRect(0, 0, cnvs.width, cnvs.height);
        if(this.bgimgsrc){
            this.lcarsCanvas.addChild(bitmap);
        }else{
            this.lcarsCanvas.addChild(bg);
        }
        uilayer.removeAllChildren();
        uilayer.name = 'uilayer';
        uilayer.x = this.padding/2;
        uilayer.y = this.padding/2;
        uilayer.width = this.width;
        uilayer.height = this.height;
        var x = 0,y = 0;
        //console.log('setting up sections');
        this.sections.forEach(sec=>{
            sec.panel=this.config();
            if(sec.header){
                //console.log('sec.header.colorClass',sec.header.colorClass);
                //console.log('!sec.header.colorClass',!sec.header.colorClass);
                if(!sec.header.colorClass) 
                    sec.header.colorClass= 'base';
            }
            if(sec.body){
                sec.body.forEach(el=>{                    
                    if(!el.colorClass) el.colorClass='base'; //this.uiTheme.base;
                })
            }
            if(sec.footer){
                if(!sec.footer.width) sec.footer.width = sec.width-this.padding;
                if(!sec.footer.colorClass) sec.footer.colorClass='base'; //this.uiTheme.base;
            }
            sec.x=x;
            sec.y=y;
            sec.y=0;
            sec.height=this.height;
            uilayer.addChild(sec.build());
            x+=sec.width;
        });
        this.lcarsCanvas.addChild(uilayer);
        this.lcarsCanvas.update();
        //console.log('panel build complete')
    }
    refresh(){
        //console.log('refresh');
        
        this.lcarsCanvas.update();
    }
    setUiTheme(theme){
        //console.log(' ');
        //console.log('set theme');
        //console.log('theme',theme);
        //this.panel.uiTheme = theme;
        if(theme.base) this.uiTheme.base=this[theme.base];
        if(theme.accent) this.uiTheme.accent=this[theme.accent];
        if(theme.emphasis) this.uiTheme.emphasis=this[theme.emphasis];
        if(theme.action) this.uiTheme.action=this[theme.action];
        if(theme.warning) this.uiTheme.warning=this[theme.warning];
        if(theme.alert) this.uiTheme.alert=this[theme.alert];
        if(theme.neutral) this.uiTheme.neutral=this[theme.neutral];
        colorList = [this.uiTheme.action,this.uiTheme.alert,this.uiTheme.base,this.uiTheme.accent,this.uiTheme.emphasis,this.uiTheme.neutral,this.uiTheme.warning];
    
        //console.log('this.uiTheme',this.uiTheme);
        this.lcarsCanvas.removeAllChildren();
        this.build();
        this.refresh();
    }
    config(){
        return {
            x:this.x,
            y:this.y,
            width:this.width,
            height:this.height,
            padding:this.padding,
            uiTheme:this.uiTheme,
            debug:this.debug
        }
    }
}
/*
$$\       $$$$$$\   $$$$$$\  $$$$$$$\   $$$$$$\        $$$$$$\                        $$\     $$\
$$ |     $$  __$$\ $$  __$$\ $$  __$$\ $$  __$$\      $$  __$$\                       $$ |    \__|
$$ |     $$ /  \__|$$ /  $$ |$$ |  $$ |$$ /  \__|     $$ /  \__| $$$$$$\   $$$$$$$\ $$$$$$\   $$\  $$$$$$\  $$$$$$$\
$$ |     $$ |      $$$$$$$$ |$$$$$$$  |\$$$$$$\       \$$$$$$\  $$  __$$\ $$  _____|\_$$  _|  $$ |$$  __$$\ $$  __$$\
$$ |     $$ |      $$  __$$ |$$  __$$<  \____$$\       \____$$\ $$$$$$$$ |$$ /        $$ |    $$ |$$ /  $$ |$$ |  $$ |
$$ |     $$ |  $$\ $$ |  $$ |$$ |  $$ |$$\   $$ |     $$\   $$ |$$   ____|$$ |        $$ |$$\ $$ |$$ |  $$ |$$ |  $$ |
$$$$$$$$\\$$$$$$  |$$ |  $$ |$$ |  $$ |\$$$$$$  |     \$$$$$$  |\$$$$$$$\ \$$$$$$$\   \$$$$  |$$ |\$$$$$$  |$$ |  $$ |
\________|\______/ \__|  \__|\__|  \__| \______/$$$$$$\\______/  \_______| \_______|   \____/ \__| \______/ \__|  \__|
                                                \______|


*/
class LCARS_Section extends LCARS_Element {
    strClassName='Section';
    header;
    body=[];
    leftSidebar;
    rightSidebar;
    footer;
    margin=[0,0,0,20];
    bodyCont;
    constructor(opt){
        super(opt);
        if(opt.header)          this.header=opt.header;
        if(opt.leftSidebar)     this.leftSidebar=opt.leftSidebar;
        if(opt.body)            this.body=opt.body;
        if(opt.rightSidebar)    this.rightSidebar=opt.rightSidebar;
        if(opt.footer)          this.footer=opt.footer;
        if(opt.margin)          this.margin=opt.margin;
        if(opt.onClickFunction) this.onClickFunction=opt.onClickFunction;
    }
    build(){
        let cont = new Container();
        let sectionCont = new Container();
        let headerCont = new Container();
        let rightSidebarCont = new Container();
        this.bodyCont = new Container();
        let leftSidebarCont = new Container();
        let footerCont = new Container();
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
        var footerHeight = is.not.undefined(this.footer)?this.footer.height+footerMargins[0]+footerMargins[2]:0;
        var bodyHeight = this.height - (headerHeight+footerHeight);
        var midY = headerHeight;
        var footerY = headerHeight+bodyHeight+footerMargins[0];
        leftSidebarCont.y=midY;
        this.bodyCont.removeAllChildren();
        this.bodyCont.x=leftSidebarWidth; //this.leftSidebar.w;
        this.bodyCont.y=midY;
        this.bodyCont.name='body';
        this.body.forEach(el=>{
            this.addToBody(el);
            // if(el.isObject){
            //     el.panel = this.panel;
            //     el.section=this.config();
            //     if(is.undefined(el.width)) el.width=this.width-this.panel.padding;
            //     this.bodyCont.addChild(el.build());
            // }
        })
        if(this.panel.debug) this.bodyCont.addChild(new LCARS_Debug({colorClass:'green',width:this.width-this.panel.padding,height:bodyHeight}).build());
        footerCont.y=this.height-footerHeight-this.panel.padding;
        if(this.footer!= null){
            if(!this.footer.width) this.footer.width=this.width-this.panel.padding;
            this.footer.panel=this.panel;
            footerCont.addChild(this.footer.build());
        }        
        if(this.header!=null){
            if(!this.header.width) this.header.width=this.width-this.panel.padding;
            this.header.section=this.config();
            this.header.panel=this.panel;
            headerCont.addChild(this.header.build());
        }
        sectionCont.addChild(headerCont,leftSidebarCont,this.bodyCont,rightSidebarCont,footerCont);
        sectionCont.y=10; //this.padding/2;
        sectionCont.x=10; //this.padding/2;
        if(this.panel.debug) sectionCont.addChild(new LCARS_Debug({colorClass:'purple',width:this.width-this.panel.padding,height:this.height-this.panel.padding}).build());
        sectionCont.name=this.name;
        if(this.onClickFunction) sectionCont.addEventListener('click',this.onClickFunction);
        cont.addChild(sectionCont);
        if(this.panel.debug) cont.addChild(new LCARS_Debug({colorClass:this.white,width:this.width,height:this.height,text:this.width+'x'+this.height}).build());
        cont.x=this.x;
        cont.y=this.y;
        return cont;        
    }
    removeFromBodyAt(i){
        this.bodyCont.removeChildAt(i);
        // this.panel.refresh();
    }
    addToBody(el){
        if(el.isObject){
            el.panel = this.panel;
            el.section=this.config();
            if(is.undefined(el.width)) el.width=this.width-this.panel.padding;
            this.bodyCont.addChild(el.build());
        }
    }
    config(){
        return {
            x:this.x,
            y:this.y,
            width:this.width,
            height:this.height
        }
    }
}
class LCARS_Debug extends LCARS_Element{
    constructor(opt){
        super(opt);
    }
    build(){
        var cont = new Container();
        var boundingBox = new Shape();
        boundingBox.graphics.ss(4).beginStroke(this.colorClass).drawRect(0,0,this.width,this.height);
        var txtbg = new Shape();
        if(this.text) txtbg.graphics.beginFill('rgba(255,255,255,0.75)').rect(5,5,this.width-10,25);
        var txt = new Text(makeCap(this.text),"20px Arial",'#000');
        txt.x=8;
        txt.y=8;
        cont.addChild(boundingBox,txtbg,txt);
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
    colorClass=this.black;
    constructor(opt){
        super(opt);
        if(opt.alignment)this.alignment=opt.alignment;
        if(opt.size) this.size=opt.size;
        if(opt.text) this.text=opt.text;
    }
    build(){    
        var txt = new Text(makeCap(this.text),this.size+" Okuda",this.colorClass);
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
/*
 /$$        /$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$        /$$   /$$                           /$$
| $$       /$$__  $$ /$$__  $$| $$__  $$ /$$__  $$      | $$  | $$                          | $$
| $$      | $$  \__/| $$  \ $$| $$  \ $$| $$  \__/      | $$  | $$  /$$$$$$   /$$$$$$   /$$$$$$$  /$$$$$$   /$$$$$$
| $$      | $$      | $$$$$$$$| $$$$$$$/|  $$$$$$       | $$$$$$$$ /$$__  $$ |____  $$ /$$__  $$ /$$__  $$ /$$__  $$
| $$      | $$      | $$__  $$| $$__  $$ \____  $$      | $$__  $$| $$$$$$$$  /$$$$$$$| $$  | $$| $$$$$$$$| $$  \__/
| $$      | $$    $$| $$  | $$| $$  \ $$ /$$  \ $$      | $$  | $$| $$_____/ /$$__  $$| $$  | $$| $$_____/| $$
| $$$$$$$$|  $$$$$$/| $$  | $$| $$  | $$|  $$$$$$/      | $$  | $$|  $$$$$$$|  $$$$$$$|  $$$$$$$|  $$$$$$$| $$
|________/ \______/ |__/  |__/|__/  |__/ \______//$$$$$$|__/  |__/ \_______/ \_______/ \_______/ \_______/|__/
                                                |______/


*/
class LCARS_Header extends LCARS_Element{ 
    height=200;   
    type = 'header';
    size='30px';
    valign='bottom';
    constructor(opt){
        super(opt);
        if(opt){
            if(opt.colorClass) this.colorClass=opt.colorClass;
            if(opt.height) this.height=opt.height;
            if(opt.text) this.text=opt.text;
            if(opt.width) this.width=opt.width;
            if(opt.size) this.size=opt.size;
            if(opt.alignment) this.alignment=opt.alignment;
            if(opt.valign) this.valign=opt.valign;
            if(opt.onClickFunction) this.onClickFunction=opt.onClickFunction;
        }
    }
    build(){
        let colorVal = !this.panel.uiTheme?'green':this.panel.uiTheme[this.colorClass];
        ////console.log('--- '+this.text+' Header ---');
        ////console.log('this.panel',this.panel);
        ////console.log('LCARS_Header this.colorClass',this.colorClass);
        ////console.log('LCARS_Header colorVal',colorVal);
        var hdrCont = new Container();
        hdrCont.x=this.x;
        hdrCont.y=this.y;
        var hdr = new Shape();
        hdr.graphics.beginFill(colorVal).rc(0,0,this.width,this.height,this.radius[0],this.radius[1],this.radius[2],this.radius[3]);
        hdrCont.addChild(hdr);
        let textHeight = parseInt(this.size.split('px')[0])+5;
        let textY = 0;
        switch(this.valign){
            case 'top':
                textY = 5;
                break;
            case 'bottom':
                textY = (this.height+this.margin[0])-textHeight;
                break;
        }
        hdrCont.addChild(new LCARS_HeaderText({text:this.text,width:this.width,y:textY,size:this.size,alignment:this.alignment,valign:this.valign}).build());
        if(this.onClickFunction) 
        hdrCont.addEventListener('click',this.onClickFunction);
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
        if(opt.height) this.height=opt.height;
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
    constructor(opt){
        super(opt);
        if(opt.size)    this.size=opt.size;
        if(opt.dir)     this.dir=opt.dir;
        if(opt.colorClass)   this.colorClass=opt.colorClass;

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
        var cont = new Container();
        let widthMod = 0;
        let heightMod = 0;
        let xMod = 0;
        const widthVal = this.width;
        const xVal = this.x;
        if(this.size=='sm'){
            widthMod=-10;
            heightMod=30;
            xMod=-10;
        }
        if(this.size=='md'){
            widthMod=0;
            heightMod=20;
            xMod=-20;
        }
        if(this.size=='lg'){
            widthMod=20;
            heightMod=0;
            xMod=-40;
        }
        this.height=this.height-heightMod;
        this.width = this.width+this.panel.padding+widthMod;
        this.x=this.dir=='left'?this.x+xMod:this.x;
        cont = super.build();
        this.width = widthVal;
        this.x=xVal;
        return cont;
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
        if(Array.isArray(opt.colorClass)){
            this.c1 = opt.colorClass[0];
            this.c2 = opt.colorClass[1];
            this.c3 = opt.colorClass[2];
            this.c4 = opt.colorClass[3];
        }else{
            this.c1 = opt.colorClass;
            this.c2 = opt.colorClass;
            this.c3 = opt.colorClass;
            this.c4 = opt.colorClass;
        }
    }
    build(){
        var cont = new Container();
        cont.x=this.x;
        cont.y=this.y;
        var base = new Shape();
        base.graphics.beginFill(this.panel.uiTheme.action).dc(100,100,100);
        var buttons = new Container();
        var cross = new Shape();    
        var w = 40;
        var l = 130;
        var w1 = 100-(w/2);
        var w2 = w1+w;
        var l1 = (200-l)/2;
        var l2 = l1+l;
        cross.graphics.beginFill(this.panel.uiTheme.base).setStrokeStyle(4).beginStroke(this.black).lt(w1,l1).lt(w2,l1).lt(w2,w1).lt(l2,w1).lt(l2,w2).lt(w2,w2).lt(w2,l2).lt(w1,l2).lt(w1,w2).lt(l1,w2).lt(l1,w1).lt(w1,w1).cp().beginFill(this.panel.uiTheme[this.c1]).dr(w1,0-5,w,w).beginFill(this.panel.uiTheme[this.c2]).dr(l2,w1,w,w).beginFill(this.panel.uiTheme[this.c3]).dr(w1,l2,w,w).beginFill(this.panel.uiTheme[this.c4]).dr(l1-w,w1,w,w);
        var accents = new Shape();
        accents.graphics.ss(2).beginStroke(this.black).mt(w1,74).lt(w2,74).mt(w1,152).lt(w2,152).ss(3).mt(w1,45).lt(w2,45).mt(w1,69).lt(w2,69).mt(w1,128).lt(w2,128).mt(w1,138).lt(w2,138).mt(w1+16,15).lt(w1+16,30).mt(w1+23,15).lt(w1+23,30).ss(6).mt(w1+30,15).lt(w1+30,30).mt(l2+5,w2-10).lt(l2+20,w2-10).mt(w1+10,l2+5).lt(w1+10,l2+20).mt(l1-w+20,w1+10).lt(l1-w+35,w1+10)
        cross.clip = base;  
        cross.name = this.name;              
        buttons.addChild(cross);
        buttons.addChild(accents);
        cont.setBounds(0,0,200,200);
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
            tabCont.addChild(new LCARS_Button({
                x:this.x,
                y:y,
                colorClass:this.panel.uiTheme[tab.colorClass],
                type:titled+'tab-'+this.alignment,
                width:buttonWidth,
                height:buttonHeight,
                size:2,
                text:tab.text,
                onClickFunction:tab.onClickFunction
            }).build());
            y+=  buttonHeight + 12;
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
    x=0;
    onClickFunctions=[];
    labels=[];
    colors=[];
    buttonCont;
    onClickFunction;
    constructor(opt){
        super(opt);
        if(opt.cols) this.cols=opt.cols;
        if(opt.rows) this.rows=opt.rows;
        if(opt.x) this.x=opt.x;
        if(opt.onClickFunctions) this.onClickFunctions=opt.onClickFunctions;
        if(opt.onClickFunction) this.onClickFunction=opt.onClickFunction;
        if(opt.labels) this.labels=opt.labels;
        if(opt.colors) this.colors=opt.colors;
    }
    build(){
        this.buttonCont = new Container();
        this.buttonCont.x=this.x;
        this.buttonCont.y=this.y;
        let tempX = this.x;
        let incWidth = 0;
        for (var i = 0; i < this.cols.length; i++) {
            const colType=this.cols[i];
            let onClickFunctionCol=[];
            let labelCol=[];
            let colorCol=[];
            //if(this.onClickFunctions[i]) onClickFunctionCol=this.onClickFunctions[i];
            
            for(let j=0;j<this.onClickFunctions.length;j++){
                if(this.onClickFunctions[j]) onClickFunctionCol.push(this.onClickFunctions[j][i])
            }
            
            for(let j=0;j<this.labels.length;j++){
                if(this.labels[j]) labelCol.push(this.labels[j][i])
            }
            
            
            for(let j=0;j<this.colors.length;j++){
                if(this.colors[j]) colorCol.push(this.panel.uiTheme[this.colors[j][i]])
            }
            
            //if(this.colors[i]) colorCol=this.colors[i];
            tempX+=incWidth;
            let btnCol = new LCARS_ButtonCol({x:tempX,type:colType,rows:this.rows,onClickFunction:this.onClickFunction,onClickFunctions:onClickFunctionCol,colors:colorCol,labels:labelCol}).build();
            incWidth=btnCol.getBounds().width;
            this.buttonCont.addChild(btnCol);
        }
        tempX = this.x;
        return this.buttonCont;
    }
    changeLabels(i,arr){
        console.log('changeLabels('+i+',['+arr+'])');
        console.log('this.labels[i]',this.labels[i])
        this.labels[i]=arr;
        console.log('this.labels[i]',this.labels[i])
        this.build();
    }
    changeColors(i,arr){
        console.log('changeColors('+i+',['+arr+'])');
        this.colors[i]=arr;
        this.build();
    }
}
class LCARS_Readout extends LCARS_Element{
    type='readout';
    rows=0;
    cols=[];
    vals=[];
    fontSize=16;
    value='';
    datumColors = [];
    textAlign='end';
    colorClass='action';
    cont=new Container();
    lineWidth=200;
    lineHeight=20;
    constructor(opt){
        super(opt);
        if(opt.rows) this.rows=opt.rows;
        if(opt.cols) this.cols=opt.cols;
        if(opt.vals) this.vals=opt.vals;
        if(opt.value) this.value=opt.value;
        if(opt.fontSize) this.fontSize=opt.fontSize;
        if(opt.textAlign) this.textAlign=opt.textAlign;
        if(opt.colorClass) this.colorClass=opt.colorClass;
        if(opt.lineWidth) this.lineWidth=opt.lineWidth;
        if(opt.lineHeight) this.lineHeight=opt.lineHeight;
    }
    build(){
        this.cont.removeAllChildren();
        this.cont.x = this.x;
        this.cont.y = this.y;
        var x = 0;
        var y = 0;
        var maxX = 0;
        this.datumColors = [this.panel.uiTheme.base,this.panel.uiTheme.action,this.panel.uiTheme.emphasis];
        //console.log('vals',this.vals);
        if(this.value!=''){
            this.textAlign = 'start';
            this.addText(this.value,0,0,this.panel.uiTheme[this.colorClass]);
        }else if(this.vals.length>0){
            this.setVal();
        }else{
            for (var ri = 0; ri < this.rows; ri++) {
                for (var i = 0; i < this.cols.length; i++) {
                    x+=(this.cols[i]+2)*5;
                    this.addText(this.makeDatum(rifi((this.cols[i]<4?2:this.cols[i]-2),this.cols[i])),x,y,rae(this.datumColors));
                    maxX=x;
                }
                y+=this.fontSize+4;
                x=0;
            }
        }
        return this.cont;
    }
    setValue(value){
        this.cont.removeAllChildren();
        this.textAlign = 'start';
        this.value+=value;
        this.addText(this.value,0,0,this.panel.uiTheme[this.colorClass]);
    }
    addText(t,x,y,c){
        var txt = new Text();
        txt.set({
            font:this.fontSize+'px Okuda',
            text:t,
            color:c,
            textAlign:this.textAlign,
            x:x,
            y:y,
            lineWidth: this.lineWidth,
            lineHeight: this.lineHeight
        });

        // txt.font=this.fontSize+'px Okuda';
        // txt.text=t;
        // txt.color=c;
        // txt.textAlign=this.textAlign;
        // txt.x=x;
        // txt.y=y;
        this.cont.addChild(txt);
    }
    addVals(vals){
        this.vals.push(vals);
        this.setVal(this.vals);
    }
    setVal(vals){
        let x=0;
        let y=0;
        let maxX=0;
        if(vals) this.vals = vals;
        let colWidths = []; 
        this.cont.removeAllChildren();           
        for(var ri=0;ri<this.vals.length;ri++){                
            for(var i=0;i<this.vals[ri].length;i++){
                let colWidth=(this.vals[ri][i].length+2)*5;
                if(colWidths.length>=i){
                    if(colWidths[i]==null)colWidths[i]=0;
                    colWidths[i]=colWidths[i]<=colWidth?colWidth:colWidths[i];
                }
            }
        }
        for(var ri=0;ri<this.vals.length;ri++){
            for(var i=0;i<this.vals[ri].length;i++){
                x+=colWidths[i];
                this.addText(this.vals[ri][i],x,y,rae(this.datumColors));
                maxX=x;
            }
            y+=this.fontSize+4;
            x=0;
        }
    }
    makeDatum(datumLength){
        var datum = '';
        var datumval = 0;
        for( var i=0; i < datumLength; i++ ){
            datum += rifi(0,9);
            datumval = parseInt(datum);
        }
        // var txt = new Text();
        // txt.font='16px Okuda';
        // txt.text = datum;
        // txt.color=rae(this.datumColors);
        return datum; //txt;
    }
    refresh(){
        this.build();
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
        super.build();
        var header = new Text();
        header.font='20px Okuda';
        header.text = this.header==''?this.makeDatum(6).text:makeCap(this.header);
        header.colorClass = this.panel.uiTheme.accent;
        header.textAlign='end';
        var bbg = new Shape();
        bbg.graphics.f(this.black).r(5,0,165,25);
        this.cont.removeAllChildren();
        this.cont.x = this.x;
        this.cont.y = this.y;
        this.cont.addChild(header);
        var x = 0;
        var y = 40;
        var maxX = 0;
        for (var ri = 0; ri < this.rows; ri++) {
            for (var i = 0; i < this.cols.length; i++) {
                x+=(this.cols[i]+2)*5;
                this.addText(this.makeDatum(rifi((this.cols[i]<4?2:this.cols[i]-2),this.cols[i])),x,y);
                // var txt = new Text();
                // txt.font = '16px Okuda';
                // txt.text = this.makeDatum(rifi((this.cols[i]<4?2:this.cols[i]-2),this.cols[i]));
                // txt.color=rae(this.datumColors);
                // txt.textAlign='end';
                // txt.x=x;
                // txt.y=y;
                // this.cont.addChild(txt);
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
        this.cont.addChildAt(hbg,0);
        this.cont.addChild(ftr);
        return this.cont;
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
        //if(opt.text) 
        this.text = opt.text;
        if(opt.width) this.width=opt.width;
        if(opt.height) this.height=opt.height;
        if(opt.txtWidth) this.txtWidth=opt.txtWidth;
        if(opt.alignment) this.alignment=opt.alignment;
        if(opt.onClickFunction) this.onClickFunction=opt.onClickFunction;
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
        let btn = this.addButtonType(this.x,this.y,this.colorClass,this.type,this.width,this.height,1,this.text);
        if(this.onClickFunction){
            btn.removeAllEventListeners('click');
            // btn.removeEventListener('click',handlePillClick);
            // btn.removeEventListener('click',handleCapClick);
            // btn.removeEventListener('click',handleRectClick);
            // btn.removeEventListener('click',handleRectPillClick);
            // btn.removeEventListener('click',handleRectCapClick);
            // btn.removeEventListener('click',handleTitledPillClick);
            // btn.removeEventListener('click',handleTabClick);
            btn.addEventListener('click',this.onClickFunction);
        }
        return btn;
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
            btn = this.addPillButton(x,y,c,buttonWidth,buttonHeight,scale,l);
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handlePillClick);
        }
        if(t=='pill-left'){
            btn = this.addPillLeftButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handlePillClick);
        }
        if(t=='pill-right'){
            btn = this.addPillRightButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handlePillClick);
        }
        if(t=='cap-left'){
            btn = this.addCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handleCapClick);
        }
        if(t=='cap-right'){
            btn = this.addCapRightButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handleCapClick);
        }
        if(t=='rect'){
            btn = this.addRectButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectClick);
        }
        if(t=='rect-pill-right'){
            btn = this.addRectWithPillRightButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectPillClick);
        }
        if(t=='rect-pill-left'){
            btn = this.addRectWithPillLeftButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
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
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+15,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='tiny-rect-cap-right'){
            btn = this.addTinyRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='tiny-rect-cap-left'){
            btn = this.addTinyRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),(buttonWidth*0.20)+15+(this.buttonMargin*2),buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='medium-rect-cap-right'){
            buttonWidthPlusMargin = buttonWidthPlusMargin+buttonWidth;
            buttonWidth = buttonWidth*2;
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='medium-rect-cap-left'){
            buttonWidth = buttonWidth*2;
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='wide-rect-cap-right'){
            buttonWidthPlusMargin = buttonWidthPlusMargin+(buttonWidth*2);
            buttonWidth = buttonWidth*3;
            btn = this.addRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-(this.buttonMargin/2),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='wide-rect-cap-left'){
            buttonWidth = buttonWidth*3;
            btn = this.addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleRectCapClick);
        }
        if(t=='titled-pill-left'){
            btn = this.addTitledLeftPillButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }
        if(t=='titled-pill-right'){
            btn = this.addTitledRightPillButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }

        if(t=='titled-left'){
            btn = this.addTitledLeftButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
            btnbg.graphics.beginFill(this.black).r(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin)
            btn.setBounds(-((this.buttonMargin/2)+10),-(this.buttonMargin/2),75+buttonWidthPlusMargin+25,buttonHeightPlusMargin);
            btn.addEventListener("click", handleTitledPillClick);
        }
        if(t=='titled-right'){
            btn = this.addTitledRightButton(x,y,c,buttonWidth,buttonHeight,scale,l); 
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
        btn.name=l;
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
        //btn.cache(x,y,w,h);
        var txt = this.addText(txtWidth,(h/2)-10,l,textAlign,(s==1?18:30)+'px');
        if(c!='none'){
            btnCont.addChild(btn);
            btnCont.addChild(txt);
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
        btnCont.addChild(this.addCapRightButton(buttonWidth-20,0,randomColor(),buttonHeight,buttonHeight,s,''));
        return btnCont;
    }
    addRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,s,l){
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(buttonHeight,0,c,buttonWidth-20,buttonHeight,s,l));
        btnCont.addChild(this.addCapLeftButton(0,0,randomColor(),buttonHeight,buttonHeight,s,l));
        return btnCont;
    }
    addTinyRectWithCapRightButton(x,y,c,buttonWidth,buttonHeight,s,l){
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(0,0,c,(buttonWidth*0.20),buttonHeight,s,''));
        btnCont.addChild(this.addCapRightButton(buttonWidth-10,0,randomColor(),buttonHeight,buttonHeight,s,l));
        return btnCont;
    }
    addTinyRectWithCapLeftButton(x,y,c,buttonWidth,buttonHeight,s,l){
        var btnCont = new Container();
        btnCont.x = x;
        btnCont.y = y;
        btnCont.addChild(this.addRectButton(buttonHeight,0,c,(buttonWidth*0.20),buttonHeight,s,''));
        btnCont.addChild(this.addCapLeftButton(0,0,randomColor(),buttonHeight,buttonHeight,s,l));
        return btnCont;
    }
    addRectWithPillLeftButton(x,y,c,buttonWidth,buttonHeight,s,l){
        var btnCont = new Container();
        btnCont.x = x-30;
        btnCont.y = y;
        btnCont.addChild(this.addPillLeftButton(0,0,c,buttonWidth,buttonHeight,s,l));
        btnCont.addChild(this.addRectButton(buttonWidth+10,0,randomColor(),15,buttonHeight,s,''));
        return btnCont;
    }
    addRectWithPillRightButton(x,y,c,buttonWidth,buttonHeight,s,l){
        var btnCont = new Container();
        btnCont.x = x-30;
        btnCont.y = y;
        btnCont.addChild(this.addPillRightButton(25,0,c,buttonWidth,buttonHeight,s,l));
        btnCont.addChild(this.addRectButton(0,0,randomColor(),15,buttonHeight,s,''));
        return btnCont;
    }
    addTitledLeftPillButton(x,y,c,buttonWidth,buttonHeight,s,l){
        var cont = new Container();
        var crbtn = this.addRectWithCapLeftButton(x,0,c,buttonWidth,buttonHeight,s,l);
        crbtn.x = 0;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton((s==1?75:90)+buttonWidth,0,randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(buttonWidth+(s==1?67:86),-8,randomButtonTitle(),null,(s==1?46:56)+'px',randomColor()))
        return cont;
    }
    addTitledRightPillButton(x,y,c,buttonWidth,buttonHeight,s,l){
        var cont = new Container();
        var crbtn = this.addRectWithCapRightButton(x,0,c,buttonWidth,buttonHeight,s,l);
        crbtn.x = s==1?75:85;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton(0,0,randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(20,-8,randomButtonTitle(),'start',(s==1?46:56)+'px',randomColor()))
        return cont;
    }

    addTitledLeftButton(x,y,c,buttonWidth,buttonHeight,s,l){
        var cont = new Container();
        var crbtn = this.addRectButton(x,0,c,buttonWidth,buttonHeight,s,l);
        crbtn.x = 0;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton((s==1?75:90)+buttonWidth,0,randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(buttonWidth+(s==1?67:86),-8,randomButtonTitle(),null,(s==1?46:56)+'px',randomColor()))
        return cont;
    }
    addTitledRightButton(x,y,c,buttonWidth,buttonHeight,s,l){
        var cont = new Container();
        var crbtn = this.addRectButton(x,0,c,buttonWidth,buttonHeight,s,l);
        crbtn.x = s==1?75:85;
        cont.addChild(crbtn);
        cont.addChild(this.addRectButton(0,0,randomColor(),15,buttonHeight,s,''));
        cont.addChild(this.addText(20,-8,randomButtonTitle(),'start',(s==1?46:56)+'px',randomColor()))
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
    rows;
    colors=[];
    height=33;
    onClickFunctions=[];
    labels=[];
    onClickFunction;
    constructor(opt){
        super(opt);
        if(opt.rows) this.rows=opt.rows;
        if(opt.colors) this.colors=opt.colors;
        if(opt.labels) this.labels=opt.labels;
        if(opt.onClickFunctions) this.onClickFunctions=opt.onClickFunctions;
        if(opt.onClickFunction) this.onClickFunction=opt.onClickFunction;
    }
    build(){
        var scale = 1;
        let buttonCont = new Container();
        buttonCont.x=this.x;
        buttonCont.y=this.y;
        for (var i = 0; i < this.rows; i++) {
            var colorClass = '';
            let text = null;
            if(this.colors.length==0){
                colorClass = randomColor();
            }else{
                colorClass = this.colors[i];
            }
            let onClickFunctionRow;
            if(this.onClickFunctions[i]){
                onClickFunctionRow=this.onClickFunctions[i];
            }else{
                onClickFunctionRow = this.onClickFunction;
            }
            text=this.labels[i];
            buttonCont.addChild(new LCARS_Button({type:this.type,x:0,y:i*(this.height+this.buttonMargin),colorClass:colorClass,text:text,onClickFunction:onClickFunctionRow}).build());
        }
        return buttonCont;
    }
}
class LCARS_Scanner extends LCARS_Element{
    reticule={x:200,y:80};
    colors=['accent','base','emphasis','accent','base'];
    width=200;
    height=200;
    scannerCont;
    screen;
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
		this.scannerCont = new Container();
        this.scannerCont.name='lcarsScanner';
        // var topLeftFrame = new Shape();
        // var frame = new Shape();
        // var reticule = new Shape();
        this.screen = new Container();
        this.scannerCont.x=x;
        this.scannerCont.y=y;
        // topLeftFrame.graphics.f(this.panel.uiTheme[c[0]]).mt(0,0).lt(rx-25,0).lt(rx-25,30).lt(0,30).cp();
        // frame.graphics.f(this.panel.uiTheme[c[1]]).mt(rx+25,0).lt(w,0).lt(w,h).lt(0,h).lt(0,h-15).lt(w-20,h-15).lt(w-20,30).lt(rx+25,30).cp();
        // reticule.graphics.f(this.panel.uiTheme[c[2]]).mt(rx-20,0).lt(rx+20,0).lt(rx+20,ry-30).lt(w-40,ry-30).lt(w-40,ry).lt(w-50,ry).lt(w-50,ry-20).lt(40,ry-20).lt(40,ry).lt(30,ry).lt(30,ry-30).lt(rx-20,ry-30).cp().f(c[3]).dr(30,ry+70,w-70,10).f(this.black).dr(rx-20,20,40,2).dr(rx-20,30,40,2).dr(rx-20,40,40,5).f(c[3]).ss(5).s(this.black).dr(rx-22,h-38,45,40);
        this.screen.removeAllChildren();
        for (var i = 0; i < rifi(10,20); i++) {
            var star = new Shape();
            var r = rifi(2,7);
            star.graphics.beginFill(this.panel.uiTheme[rae(this.circleColors)]).dc(rifi(20,w-20),rifi(20,h-20),r);
            star.name=r;
            this.screen.addChild(star);
        }
        // this.scannerCont.addChild(screen); //,frame,topLeftFrame,reticule);
        this.drawReticule(rx,ry);
        return this.scannerCont;
	}
    drawReticule(rx,ry){
        this.reticule = {x:rx,y:ry};
		let w = this.width;
		let h = this.height;
		let c = this.colors;	
        var topLeftFrame = new Shape();
        var frame = new Shape();
        var reticule = new Shape();
        // var screen = new Container();
        topLeftFrame.graphics.f(this.panel.uiTheme[c[0]]).mt(0,0).lt(rx-25,0).lt(rx-25,30).lt(0,30).cp();
        frame.graphics.f(this.panel.uiTheme[c[1]]).mt(rx+25,0).lt(w,0).lt(w,h).lt(0,h).lt(0,h-15).lt(w-20,h-15).lt(w-20,30).lt(rx+25,30).cp();
        reticule.graphics.f(this.panel.uiTheme[c[2]]).mt(rx-20,0).lt(rx+20,0).lt(rx+20,ry-30).lt(w-40,ry-30).lt(w-40,ry).lt(w-50,ry).lt(w-50,ry-20).lt(40,ry-20).lt(40,ry).lt(30,ry).lt(30,ry-30).lt(rx-20,ry-30).cp().f(c[3]).dr(30,ry+70,w-70,10).f(this.black).dr(rx-20,20,40,2).dr(rx-20,30,40,2).dr(rx-20,40,40,5).f(c[3]).ss(5).s(this.black).dr(rx-22,h-38,45,40);
        // screen.removeAllChildren();
        // for (var i = 0; i < rifi(10,20); i++) {
        //     var star = new Shape();
        //     var r = rifi(2,7);
        //     star.graphics.beginFill(this.panel.uiTheme[rae(this.circleColors)]).dc(rifi(20,w-20),rifi(20,h-20),r);
        //     star.name=r;
        //     screen.addChild(star);
        // }
        this.scannerCont.removeAllChildren();
        this.scannerCont.addChild(this.screen,frame,topLeftFrame,reticule);
    }
}
class LCARS_Slider extends LCARS_Element {
    ticks=7;
    colorClass=this.uiTheme.base;
    val=0;
    bar;
    tickHeight;
    constructor(opt){
        super(opt);
        if(opt.colorClass) this.colorClass=opt.colorClass;
        if(opt.val) this.val=opt.val;
        if(opt.ticks) this.ticks=opt.ticks;
        if(opt.name) this.name = opt.name;
    }
    build(){
        const padding = 5;
        let cont = new Container();
        cont.removeAllChildren();
        this.tickHeight=(this.height-((this.ticks-1)*padding))/this.ticks;
        //console.log('tickHeight',this.tickHeight);
        for(let i=0;i<this.ticks;i++){
            let tlr=0,trr=0,blr=0,brr=0;
            let tick=new Shape();
            if(i==0){
                tlr=this.width/2;
                trr=this.width/2;
            }
            if(i==(this.ticks-1)){
                blr=this.width/2;
                brr=this.width/2;
            }
            tick.name=i;
            tick.alpha=i<=this.val?0.5:1;
            tick.graphics.beginFill(this.panel.uiTheme[this.colorClass]).rc(0,i*(this.tickHeight+padding),this.width,this.tickHeight,tlr,trr,brr,blr);
            cont.addChild(tick);
        }
        cont.x=this.x;
        cont.y=this.y;
        this.bar=cont;
        cont.name = this.name;
        //console.log('this slider name:',cont.name);
        cont.addEventListener('pressmove',handleSliderMouseover);
        cont.addEventListener('pressup',handleSliderMouseout);
        return cont;
    }
    handleSliderStopInteraction(){
        for(var i=0; i<this.bar.children.length; i++){
            this.bar.getChildAt(i).alpha=0.5;
        }
    }
    handleSliderInteraction(y){
        this.handleSliderStopInteraction();
        for(let i=0;i<this.ticks;i++){
            if(y>0&&y<this.height-(i*this.height/this.ticks)){
                this.bar.getChildAt(this.ticks-(i+1)).alpha=1;
            }
        }
    }
    setVal(v){
        ////console.log('setVal',v);
        this.val=v;
        for(var i=0;i<this.bar.children.length;i++){
            let tick = this.bar.children[i];
            tick.alpha=i<=this.val?0.5:1;
        }
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