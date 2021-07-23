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
    width=3000;
    height=600;
    padding=20;
    constructor(opt){
        super(opt);
        
        this.sections=[
            new LCARS_Section_3w({
                name:'Phaser Power Status',
                header:new LCARS_Header({
                    text:'phaser power status',
                    colorClass:'neutral',
                    radius:[20,0,0,20],
                    margin:[0,20,100,0]
                }),
                body:[
                    new LCARS_Subheader({name:'subheader',radius:[15,0,0,15]}),
                    new LCARS_TitledTabs({x:10,y:50,tabs:[
                        {text:'al hoc',colorClass:'action',onclick:tabClick(1)},
                        {text:'rh jus',colorClass:'accent',onclick:tabClick(2)},
                        {text:'ma kal',colorClass:'emphasis',onclick:tabClick(3)},
                        {text:'we kep',colorClass:'base',onclick:tabClick(4)}
                    ]}) 
                ]
            }),
            new LCARS_Section_1w({
                name:'status',
                header:new LCARS_Header({colorClass:'emphasis',text:'ro esc',margin:[0,20,100,0]}),
                body:[
                    new LCARS_Subheader({colorClass:'accent'}),
                    new LCARS_ReadoutDisplay({y:35,rows:5,cols:[6,2,2],header:'status'})
                ]
            }),
            new LCARS_Section_4w({
                name:'weapons',
                width:420,
                header:new LCARS_Header({colorClass:'accent',text:'weapons systems',margin:[0,20,100,0]}),
                body:[
                    new LCARS_Readout({y:-90,rows:4,cols:[6,9,2]}),
                    new LCARS_Subheader({colorClass:'action'}),
                    new LCARS_Header({colorClass:'neutral',radius:[0,0,0,35],y:50,height:200}),
                    new LCARS_Header({colorClass:this.black,radius:[0,0,0,15],y:50,x:80,height:185}),
                    new LCARS_ButtonGroups({x:50,y:50,rows:4,cols:['rect-cap-right','pill','cap-right']})
                ]
            }),
            new LCARS_Section_5w({
                name:'Targeting',
                margin:[0,20,0,0],
                body:[
                    new LCARS_Joystick({colorClass:'alert'}),
                    new LCARS_Scanner({x:200,width:280,colors:['accent','base','alert','alert','base'],reticule:{x:140,y:100}}),
                    new LCARS_Readout({x:200,y:210,rows:4,cols:[6,9,2,5,7,7]}),
                    new LCARS_Subheader({colorClass:'accent',y:300,width:560}),
                    new LCARS_ReadoutDisplay({y:335,rows:5,cols:[6,2,6,6,2,8,2,2],header:'tactical analysis'}),
                    new LCARS_Header({x:400,y:350,width:280,colorClass:'neutral',height:200,radius:[0,0,30,0]}),
                    new LCARS_Header({x:385,y:350,width:202,colorClass:'black',height:180,radius:[0,0,10,0]}),
                    new LCARS_ButtonGroups({y:350,x:137,rows:4,cols:['pill','titled-pill-left',]})
                ]
            }),
            new LCARS_Section_2w({
                name:'Elbow',
                header:new LCARS_Header({colorClass:'neutral',radius:[0,90,0,0],margin:[0,20,0,0]}),
                body:[
                    new LCARS_Header({x:10,width:170,colorClass:'neutral',height:80,radius:[0,0,0,-80], margin:[0,20,0,0]}),
                    new LCARS_Subheader({x:90,y:100,width:90,colorClass:'action',margin:[0,20,0,0]})
                ]
            }),
            new LCARS_Section_4w({
                name:'tabs',
                margin:[0,20,0,0],
                body:[
                    new LCARS_UntitledTabs({x:65,tabs:[
                        {text:'torpedo control',colorClass:'accent'},
                        {text:'intruder scan',colorClass:'emphasis'},
                        {text:'Long Range scan analysis',colorClass:'action'},
                        {text:'deflector shield',colorClass:'action'}
                    ]}),
                    new LCARS_Header({y:300,width:380,colorClass:'neutral',height:250,radius:[50,0,0,30]}),
                    new LCARS_Header({x:110,y:330,width:350,colorClass:'black',height:210,radius:[30,0,0,10]}),
                    new LCARS_ButtonGroups({x:80,y:360,rows:4,cols:['rect-cap-right','pill']}) 
                ]
            }),
            new LCARS_Section_4w({
                name:'scanners',
                header:new LCARS_Header({colorClass:'action',margin:[0,20,100,0],text:'auxilliary targeting scanners'}),
                body:[
                    new LCARS_Readout({y:-90,rows:4,cols:[6,9,2,5,11,5,3,7,7]}),
                    new LCARS_Subheader({xxwidth:500}),
                    new LCARS_Header({colorClass:'neutral',x:280,y:50,width:200,radius:[0,0,40,0]}),
                    new LCARS_Header({colorClass:'black',x:280,y:50,width:120,height:190,radius:[0,0,20,0]}),
                    new LCARS_ReadoutDisplay({y:35,rows:5,cols:[6,6,4,3,2,5,3],header:'shield harmonics'}),
                    new LCARS_ButtonGroups({x:140,y:50,rows:4,cols:['rect-cap-left']})
                ]
            }),            
            new LCARS_Section_1w({
                //width:80,
                header:new LCARS_Header({colorClass:'neutral',margin:[0,20,0,0],text:'ge rod'})
            }),            
            new LCARS_Section_2w({
                name:'mode',
                //width:190,
                header:new LCARS_Header({margin:[0,20,100,0],text:'mode select'}),
                body:[
                    new LCARS_Subheader({colorClass:'action',text:'ae bfd',alignment:'start'}),
                    new LCARS_ButtonGroups({y:50,rows:4,cols:['titled-left']})
                ]
            }),
            new LCARS_Section_4w({
                name:'Tac Analyst',
                //width:370,
                header:new LCARS_Header({colorClass:'neutral',margin:[0,20,100,0],radius:[0,20,20,0],text:'tactical analysis'}),
                body:[
                    new LCARS_Subheader_4w({width:370,colorClass:'neutral',text:'ga pdf',radius:[0,10,10,0],alignment:'start'}),
                    new LCARS_Scanner({y:50,width:380,colors:['accent','accent','action','neutral','accent'],reticule:{x:200,y:80}})
                ]
            })
        ];
        this.build();
    }
}