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
class LCARS_TACTICAL extends LCARS_Panel{
    id;
    name='tactical';
    width=3100;
    height=600;
    padding=20;
    debug=false;
    constructor(opt){
        super(opt);

        this.sections=[
            new LCARS_Section({
                name:'Phaser Power Status',
                width:300,
                header:new LCARS_Header({
                    text:'phaser power status',
                    color:this.uiTheme.neutral,
                    radius:[20,0,0,20],
                    margin:[0,20,100,0]
                }),
                body:[
                    new LCARS_Subheader({name:'subheader',radius:[15,0,0,15]}),
                    new LCARS_TitledTabs({x:10,y:50,tabs:[
                        {text:'al hoc',color:this.uiTheme.action,onclick:tabClick(1)},
                        {text:'rh jus',color:this.uiTheme.accent,onclick:tabClick(2)},
                        {text:'ma kal',color:this.uiTheme.emphasis,onclick:tabClick(3)},
                        {text:'we kep',color:this.uiTheme.base,onclick:tabClick(4)}
                    ]}) 
                ]
            }),
            new LCARS_Section({
                name:'status',
                width:100,
                header:new LCARS_Header({color:this.uiTheme.emphasis,text:'ro esc',margin:[0,20,100,0]}),
                body:[
                    new LCARS_Subheader({color:this.uiTheme.accent}),
                    new LCARS_ReadoutDisplay({y:35,rows:5,cols:[6,6,2],header:'status'})
                ]
            }),
            new LCARS_Section({
                name:'weapons',
                width:420,
                header:new LCARS_Header({color:this.uiTheme.accent,text:'weapons systems',margin:[0,20,100,0]}),
                body:[
                    new LCARS_Readout({y:-90,rows:4,cols:[6,9,2]}),
                    new LCARS_Subheader({color:this.uiTheme.action}),
                    new LCARS_Header({color:this.uiTheme.neutral,radius:[0,0,0,35],y:50,height:200}),
                    new LCARS_Header({color:this.black,radius:[0,0,0,15],y:50,x:80,height:185}),
                    new LCARS_ButtonGroups({x:50,y:50,rows:4,cols:['rect-cap-right','pill','pill']})
                ]
            }),
            new LCARS_Section({
                name:'Targeting',
                width:400,
                header:null,
                margin:[0,20,0,0],
                body:[
                    new LCARS_Joystick({color:this.uiTheme.alert}),
                    new LCARS_Scanner({x:200,colors:[this.uiTheme.accent,this.uiTheme.base,this.uiTheme.alert,this.uiTheme.alert,this.uiTheme.base],reticule:{x:100,y:80}}),
                    new LCARS_Subheader({color:this.uiTheme.accent,y:300,width:510}),
                    new LCARS_ReadoutDisplay({y:335,rows:5,cols:[6,2,6,6,2],header:'tactical analysis'}),
                    new LCARS_Header({x:340,y:350,width:280,color:this.uiTheme.neutral,height:200,radius:[0,0,30,0]}),
                    new LCARS_Header({x:335,y:350,width:200,color:this.black,height:180,radius:[0,0,10,0]}),
                    new LCARS_ButtonGroups({y:350,x:100,rows:4,cols:['pill','titled-pill-left']})
                ]
            }),
            new LCARS_Section({
                name:'Elbow',
                width:200,
                header:new LCARS_Header({color:this.uiTheme.neutral,radius:[0,90,0,0],margin:[0,20,0,0]}),
                body:[
                    new LCARS_Header({x:30,width:170,color:this.uiTheme.neutral,height:80,radius:[0,0,0,-80], margin:[0,20,0,0]}),
                    new LCARS_Subheader({x:110,y:100,width:90,color:this.uiTheme.action,margin:[0,20,0,0]})
                ]
            }),
            new LCARS_Section({
                name:'tabs',
                width:400,
                margin:[0,20,0,0],
                body:[
                    new LCARS_UntitledTabs({x:85,tabs:[
                        {text:'torpedo control',color:this.uiTheme.accent},
                        {text:'intruder scan',color:this.uiTheme.emphasis},
                        {text:'Long Range scan analysis',color:this.uiTheme.action},
                        {text:'deflector shield',color:this.uiTheme.action}
                    ]}),
                    new LCARS_Header({y:300,width:400,color:this.uiTheme.neutral,height:250,radius:[50,0,0,30]}),
                    new LCARS_Header({x:80,y:330,width:400,color:this.black,height:210,radius:[30,0,0,10]}),
                    new LCARS_ButtonGroups({x:45,y:360,rows:4,cols:['medium-rect-cap-right','pill']}) 
                ]
            }),
            new LCARS_Section({
                name:'scanners',
                width:400,
                header:new LCARS_Header({color:this.uiTheme.action,margin:[0,20,100,0],text:'auxilliary targeting scanners'}),
                body:[
                    new LCARS_Readout({y:-90,rows:4,cols:[6,9,2,5,11,5,3,7,7,3]}),
                    new LCARS_Subheader({width:500}),
                    new LCARS_Header({color:this.uiTheme.neutral,x:300,y:50,width:200,radius:[0,0,40,0]}),
                    new LCARS_Header({color:this.black,x:300,y:50,width:120,height:190,radius:[0,0,20,0]}),
                    new LCARS_ReadoutDisplay({y:35,rows:5,cols:[6,6,4,3,2,5,3,6],header:'shield harmonics'}),
                    new LCARS_ButtonGroups({x:150,y:50,rows:4,cols:['rect-cap-left']})
                ]
            }),            
            new LCARS_Section({
                width:80,
                header:new LCARS_Header({color:this.uiTheme.neutral,margin:[0,20,0,0],text:'ge rod'})
            }),            
            new LCARS_Section({
                name:'mode',
                width:190,
                header:new LCARS_Header({margin:[0,30,100,0],text:'mode select'}),
                body:[
                    new LCARS_Subheader({color:this.uiTheme.action,text:'ae bfd',alignment:'start'}),
                    new LCARS_ButtonGroups({y:50,rows:4,cols:['titled-left']})
                ]
            }),
            new LCARS_Section({
                name:'Tac Analyst',
                width:370,
                header:new LCARS_Header({color:this.uiTheme.neutral,margin:[0,20,100,0],radius:[0,20,20,0],text:'tactical analysis'}),
                body:[
                    new LCARS_Subheader({width:370,color:this.uiTheme.neutral,text:'ga pdf',radius:[0,10,10,0],alignment:'start'}),
                    new LCARS_Scanner({y:50,width:370,colors:[this.uiTheme.accent,this.uiTheme.accent,this.uiTheme.action,this.uiTheme.neutral,this.uiTheme.accent],reticule:{x:200,y:80}})
                ]
            })
        ];
        this.build();
    }
}