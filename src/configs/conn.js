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
    height=680;
    padding=20;
    constructor(opt){
        super(opt);
        this.sections=[
            new LCARS_Section({
                name:'scanners',
                width:535,
                body:[
                    new LCARS_Joystick({x:95,y:0,colorClass:'emphasis'}),
                    new LCARS_Header({x:298,y:310,width:237,height:30,colorClass:'emphasis'}),
                    new LCARS_Header({x:0,y:310,width:288,height:30,colorClass:'action'}),
                    new LCARS_Header({x:0,y:645,width:288,height:14,colorClass:'neutral'}),
                    new LCARS_ButtonGroups({x:175,y:390,rows:5,cols:['pill']}),
                    new LCARS_Scanner({x:0,y:390,width:288,height:220,colors:['accent','neutral','emphasis','accent','neutral'],reticule:{x:194,y:80}})
                ]
            }),
            new LCARS_Section({
                name:'nav ref',
                width:355,
                header: new LCARS_Elbow({size:'lg',dir:'right',height:250}),
                body:[
                    new LCARS_Header({text:'navigation reference',x:0,xxwidth:295,height:40}),
                    new LCARS_Subheader({text:'cache select',y:60,xxwidth:295,height:30,colorClass:'emphasis'}),
                    new LCARS_Subheader({text:'lcars mode select',y:140,xxwidth:295,height:270,radius:[0,0,20,0],valign:'top'}),
                    new LCARS_ButtonGroups({x:-17,y:140,rows:5,cols:['titled-pill-left']})
                ]
            }),
            new LCARS_Section({
                name:'flight',
                width:400,
                header:new LCARS_Header({height:210,margin:[0,40,100,0],text:'flight control'}),
                body:[
                    new LCARS_Subheader({text:'navigation to cache'}),
                    new LCARS_Header({height:295,width:445,x:75,y:30,colorClass:'black',radius:[50,0,0,10]}),
                    new LCARS_ButtonGroups({y:90,rows:6,cols:['rect-pill-right','pill','pill']})
                ]
            }),
            new LCARS_Section({
                name:'joystick',
                width:220,
                header:new LCARS_Header({height:210,colorClass:'action',margin:[0,25,100,0]}),
                body:[
                    new LCARS_Subheader({colorClass:'action'}),
                    new LCARS_Joystick({y:75,colorClass:['alert','emphasis','emphasis','emphasis']})
                ],
                footer:new LCARS_Footer({colorClass:'neutral'})
            }),
            new LCARS_Section({
                name:'warp drive systems',
                width:410,
                header:new LCARS_Header({text:'warp drive systems',height:210,margin:[0,20,100,0]}),
                body:[
                    new LCARS_Subheader({text:'option select',height:30}),
                    new LCARS_ButtonGroups({x:15,y:80,rows:5,cols:['pill','titled-pill-left','tiny-rect-cap-left']})
                ],
                footer: new LCARS_Footer({colorClass:'neutral'})
            }),
            new LCARS_Section({
                name:'impulse',
                width:200,
                header:new LCARS_Header({text:'impulse systems',height:210,margin:[0,12,100,0]}),
                body:[
                    new LCARS_Subheader({text:'mode select',height:30,colorClass:'emphasis'}),
                    new LCARS_ButtonGroups({x:0,y:50,rows:6,cols:['titled-pill-right']})
                ],
                footer: new LCARS_Footer({colorClass:'neutral'})
            }),
            new LCARS_Section({
                name:'',
                width:45,
                header:new LCARS_Header({height:210,margin:[0,15,100,0],colorClass:'action'}),
                body:[
                    new LCARS_Header({height:30,colorClass:'neutral'})
                ]
            }),
            new LCARS_Section({
                name:'emergency override',
                width:220,
                header:new LCARS_Header({text:'emergency override',height:210,margin:[0,0,100,0],radius:[0,20,20,0]}),
                body:[
                    new LCARS_Subheader({text:'helm / navigation',colorClass:'emphasis',height:30}),
                    new LCARS_ButtonGroups({x:0,y:50,rows:6,cols:['pill','pill']})
                ],
                footer: new LCARS_Footer({colorClass:'neutral'})
            })
        ];
        this.build();
    }
}