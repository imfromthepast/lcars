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
class LCARS_OPS extends LCARS_Panel{
    id;
    name='ops';
    width=2500;
    height=630;
    padding=20;
    constructor(opt){
        super(opt);
        this.sections=[
            new LCARS_Section({
                name: 'override',
                width: 220, 
                header: new LCARS_Header({height:200,radius:[20,0,0,20],color:this.uiTheme.base,margin:[0,20,100,0],text:'emergency override'}),
                body: [               
                    new LCARS_Subheader({color:this.uiTheme.active,radius:[15,0,0,15],text:'engineering systems'}),
                    new LCARS_ButtonGroups({x:5,y:50,rows:5, cols:['titled-pill-left']})
                ],
                footer: new LCARS_Footer({color:this.uiTheme.neutral,radius:[10,0,0,10]})
            }),
            new LCARS_Section({
                name: '',
                width: 420,
                header: new LCARS_Header({height:200,margin:[0,40,100,0],text:'warp drive systems'}),
                body: [                
                    new LCARS_Subheader({color:this.uiTheme.emphasis,text:'power consumption'}),
                    new LCARS_ReadoutDisplay({header:'atmospheric process',rows:6,cols:[6,2,6,6,2,6],x:0,y:50}),
                    new LCARS_ReadoutDisplay({header:'',rows:6,cols:[2,8,4],x:210,y:50}),
                    new LCARS_ReadoutDisplay({header:'',rows:6,cols:[3,2,4],x:320,y:50})
                ],
                footer: new LCARS_Footer({color:this.uiTheme.neutral})
            }),
            new LCARS_Section({
                width:100,
                header: new LCARS_Header({margin:[0,40,100,0]}),
                body:[
                    new LCARS_Header({height:285})
                ],
                footer: new LCARS_Footer({color:this.uiTheme.neutral})
            }),
            new LCARS_Section({
                name: 'ops pri',
                width: 200,
                header: new LCARS_Header({height:200,margin:[0,20,100,0],text:'operational priorities'}), 
                body: [               
                    new LCARS_Subheader({color:this.uiTheme.emphasis,text:'lcars mode select'}),
                    new LCARS_ButtonGroups({x:0,y:50,rows:5,cols:['titled-pill-right']})
                ],
                footer: new LCARS_Footer({color:this.uiTheme.neutral})
            }),
            new LCARS_Section({
                name:'joystick',
                width:220,
                header:new LCARS_Header({height:200,margin:[0,20,100,0]}),
                body:[
                    new LCARS_Subheader({color:this.uiTheme.active}),
                    new LCARS_Readout({y:-90,x:90,rows:4,cols:[3,2,5,3]}),
                    new LCARS_Joystick({y:50,color:this.uiTheme.emphasis})
                ],
                footer:new LCARS_Footer()
            }),
            new LCARS_Section({
                name: 'ops man',
                width: 320,
                header: new LCARS_Header({height:200,width:280,margin:[0,0,100,0],text:'operations management',alignment:'start'}),
                body: [               
                    new LCARS_Subheader({}),
                    new LCARS_ButtonGroups({x:0,y:50,rows:5,cols:['pill','titled-pill-left']})
                ],
                footer: new LCARS_Footer({width:500})
            }),
            new LCARS_Section({
                name: 'elbow',
                width: 100,
                header: new LCARS_Elbow({size:'lg',dir:'left',height:240}),
                body: [                                               
                    new LCARS_Header({x:0,y:0,height:40}),                                            
                    new LCARS_Header({x:0,y:60,height:30,color:this.uiTheme.action}),                                             
                    new LCARS_Header({x:0,y:110,height:245})
                ],
                footer:  new LCARS_Footer({x:0,color:this.uiTheme.base,radius:[0,0,15,0]})
            }),
            new LCARS_Section({
                name: 'tabs',
                width: 360,
                margin:[0,20,0,0],
                body:[
                    new LCARS_TitledTabs({x:70,tabs:[
                        {text:'departmental',color:this.uiTheme.action},
                        {text:'status',color:this.uiTheme.action},
                        {text:'communications',color:this.uiTheme.accent},
                        {text:'mission status',color:this.uiTheme.emphasis},
                    ]}),
                    new LCARS_Header({y:300,radius:[50,0,0,50],height:310}),                       
                    new LCARS_Header({x:100,y:330,width:250,radius:[30,0,0,10],height:265,color:this.black}),
                    new LCARS_ButtonGroups({x:60,y:350,rows:5,cols:['pill','rect-pill-right']})
                ]
            }),
            new LCARS_Section({
                name: '',
                width: 150,
                header: new LCARS_Header({height:200,color:this.uiTheme.action,margin:[0,20,100,0],text:'mode select'}),
                body: [ 
                    new LCARS_Subheader({}),
                    new LCARS_ButtonGroups({x:0,y:50,rows:5,cols:['pill']})
                ],
                footer: new LCARS_Footer()
            }),
            new LCARS_Section({
                name: 'comms',
                width: 300,
                header: new LCARS_Header({height:200,margin:[0,20,100,0],text:'communications',radius:[0,20,20,0]}),
                body: [ 
                    new LCARS_Subheader({color:this.uiTheme.emphasis,text:'channel select',radius:[0,15,15,0]}), //.W(360).T('').R([0,15,15,0]), 
                    new LCARS_ButtonGroups({x:0,y:50,rows:5,cols:['rect','rect-pill-right']}) //.X(10).Y(40).Q(6).T(['rect-pill-left','rect','rect-pill-right'])
                ],
                footer: new LCARS_Footer({radius:[0,10,10,0]})
            })
        ];
        this.build();
    }
}