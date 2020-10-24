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
class LCARS_CON extends LCARS_Panel{
    id;
    name='con';
    width=2500;
    height=700;
    padding=20;
    debug=false;
    constructor(opt){
        super(opt);
        this.sections=[
            new LCARS_Section({
                name:'scanners',
                width:535,
                body:[
                    new LCARS_Joystick({x:95,y:0,color:this.uiTheme.emphasis}),
                    new LCARS_Header({x:298,y:310,width:237,height:30,color:this.uiTheme.emphasis}),
                    new LCARS_Header({x:0,y:310,width:288,height:30,color:this.uiTheme.action}),
                    new LCARS_Header({x:0,y:645,width:288,height:14,color:this.uiTheme.neutral}),
                    new LCARS_ButtonGroups({x:195,y:390,rows:5,cols:['pill']}),
                    new LCARS_Scanner({x:0,y:390,width:288,height:220,colors:[this.uiTheme.accent,this.uiTheme.neutral,this.uiTheme.emphasis,this.uiTheme.accent,this.uiTheme.neutral],reticule:{x:194,y:80}})
                ]
            }),
            new LCARS_Section({
                name:'nav ref',
                width:335,
                header: new LCARS_Elbow({size:'lg',dir:'right',height:250}),
                body:[
                    new LCARS_Header({text:'navigation reference',width:295,height:40}),
                    new LCARS_Subheader({text:'cache select',y:60,width:295,height:30,color:this.uiTheme.emphasis}),
                    new LCARS_Subheader({text:'lcars mode select',y:140,width:295,height:270,radius:[0,0,20,0],valign:'top'}),
                    new LCARS_ButtonGroups({x:-17,y:140,rows:5,cols:['titled-pill-left']})
                ]
            }),
            new LCARS_Section({
                name:'flight',
                width:420,
                header:new LCARS_Header({height:210,margin:[0,40,100,0],text:'flight control'}),
                body:[
                    new LCARS_Subheader({text:'navigation to cache',radius:[10,0,0,10]}),
                    new LCARS_Header({height:295,width:445,x:75,y:30,color:this.black,radius:[50,0,0,10]}),
                    new LCARS_ButtonGroups({x:50,y:90,rows:5,cols:['rect-pill-right','pill','pill']})
                ]
            }),
            new LCARS_Section({
                name:'joystick',
                width:200,
                header:new LCARS_Header({height:210,color:this.uiTheme.action,margin:[0,25,100,0]}),
                body:[
                    new LCARS_Subheader({color:this.uiTheme.action}),
                    new LCARS_Joystick({y:75,color:[this.uiTheme.alert,this.uiTheme.emphasis,this.uiTheme.emphasis,this.uiTheme.emphasis]})
                ],
                footer:new LCARS_Footer({color:this.uiTheme.neutral})
            }),
            new LCARS_Section({
                name:'warp drive systems',
                width:410,
                header:new LCARS_Header({text:'warp drive systems',height:210,margin:[0,20,100,0]}),
                body:[
                    new LCARS_Subheader({text:'option select',height:30}),
                    new LCARS_ButtonGroups({x:15,y:80,rows:5,cols:['pill','titled-pill-left','tiny-rect-cap-left']})
                ],
                footer: new LCARS_Footer({color:this.uiTheme.neutral})
            }),
            new LCARS_Section({
                name:'impulse',
                width:177,
                header:new LCARS_Header({text:'impuls systems',height:210,margin:[0,12,100,0]}),
                body:[
                    new LCARS_Subheader({text:'mode select',height:30,color:this.uiTheme.emphasis}),
                    new LCARS_ButtonGroups({x:0,y:50,rows:6,cols:['titled-pill-right']})
                ],
                footer: new LCARS_Footer({color:this.uiTheme.neutral})
            }),
            new LCARS_Section({
                name:'',
                width:45,
                header:new LCARS_Header({height:210,margin:[0,15,100,0],color:this.uiTheme.action}),
                body:[
                    new LCARS_Header({height:30,color:this.uiTheme.neutral})
                ]
            }),
            new LCARS_Section({
                name:'emergency override',
                width:200,
                header:new LCARS_Header({text:'emergency override',height:210,margin:[0,0,100,0],radius:[0,20,20,0]}),
                body:[
                    new LCARS_Subheader({text:'helm / navigation',color:this.uiTheme.emphasis,height:30}),
                    new LCARS_ButtonGroups({x:0,y:50,rows:6,cols:['pill','pill']})
                ],
                footer: new LCARS_Footer({color:this.uiTheme.neutral})
            })
        ];
        this.build();
    }
}