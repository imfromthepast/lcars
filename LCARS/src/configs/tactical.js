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
// console.log('cont',new LCARS_Header({
//     text:'phaser power status',
//     color:tan,
//     radius:[20,0,0,20],
//     margin:[0,20,100,0]
// }).cont)
class LCARS_TACTICAL extends LCARS{
    constructor(id,debug){
        super({name:'tactical',width:3100,height:600,gutters:20,id:id},debug);
        this.sections=[
            new LCARS_Section({
                name:'Phaser Power Test',
                width:300,
                header:new LCARS_Header({
                    text:'phaser power status',
                    color:tan,
                    radius:[20,0,0,20],
                    margin:[0,20,100,0]
                }),
                body:[
                    new LCARS_ButtonGroups({cols:['rect','pill','pill'],rows:5,x:0,y:50}),
                    
                    new LCARS_Subheader({radius:[15,0,0,15]}),
                    new LCARS_TitledTabs({x:10,y:50,tabs:[
                        {text:'al hoc',color:blue,onclick:tabClick(1)},
                        {text:'rh jus',color:white,onclick:tabClick(2)},
                        {text:'ma kal',color:gold,onclick:tabClick(3)},
                        {text:'we kep',color:yellow,onclick:tabClick(4)}
                    ]}) 
                ]
            }) /*,
            new LCARS_Section({
                name:'status',
                width:100,
                header:new LCARS_Header({color:gold,text:'ro esc',margin:[0,20,100,0]}),
                body:[
                    new LCARS_Subheader({color:white}),
                    new LCARS_ReadoutDisplay({y:35,rows:5,cols:[6,6,2],header:'status'}) //.Y(35).setRows(5).setCols([6,6,2]).setHeader('status 2')
                ]
            }),
            new LCARS_Section({
                name:'weapons',
                width:420,
                header:new LCARS_Header({color:white,text:'weapons systems',margin:[0,20,100,0]}),
                body:[
                    new LCARS_Readout({y:-90,rows:4,cols:[6,9,2]}), //.Y(-90).R(4).C([6,9,2]),
                    new LCARS_Subheader({color:blue}),
                    new LCARS_Header({color:tan,radius:[0,0,0,35],y:50,height:200}),
                    new LCARS_Header({color:black,radius:[0,0,0,15],y:50,x:80,height:185}),
                    new LCARS_ButtonGroups({x:100,y:50,rows:4,cols:['rect-cap-right','pill','pill']}) //.X(100).Y(50).Q(4).T(['rect-cap-right','pill','pill'])
                ]
            }),
            new LCARS_Section({
                name:'Targeting',
                width:400,
                header:null,
                margin:[0,20,0,0],
                body:[
                    new LCARS_Joystick({color:red}), //.C(red),
                    new LCARS_Scanner({x:200,colors:[white,yellow,red,red,yellow],reticule:{x:100,y:80}}), //.X(200).C([white,yellow,red,red,yellow]).R([100,80]),
                    new LCARS_Subheader({color:white,y:300,width:510}),
                    new LCARS_ReadoutDisplay({y:335,rows:5,cols:[6,2,6,6,2],header:'tactical analysis'}), //.Y(335).setRows(5).setCols([6,2,6,6,2]).setHeader('tactical analysis'),
                    new LCARS_Header({x:340,y:350,width:280,color:tan,height:200,radius:[0,0,30,0]}),
                    new LCARS_Header({x:335,y:350,width:200,color:black,height:180,radius:[0,0,10,0]}),
                    new LCARS_ButtonGroups({y:350,x:200,rows:4,cols:['pill','titled-pill-left']}) //.X(200).Y(350).Q(4).T(['pill','titled-pill-left']) 
                ]
            }),
            new LCARS_Section({
                name:'Elbow',
                width:200,
                header:new LCARS_Header({color:tan,radius:[0,90,0,0],margin:[0,20,0,0]}),
                body:[
                    new LCARS_Header({x:30,width:170,color:tan,height:80,radius:[0,0,0,-80], margin:[0,20,0,0]}),
                    new LCARS_Subheader({x:110,y:100,width:90,color:blue,margin:[0,20,0,0]})
                ]
            }),
            new LCARS_Section({
                name:'tabs',
                width:400,
                margin:[0,20,0,0],
                body:[
                    new LCARS_UntitledTabs({x:85,tabs:[
                        {text:'torpedo control',color:white},
                        {text:'intruder scan',color:gold},
                        {text:'Long Range scan analysis',color:blue},
                        {text:'deflector shield',color:blue}
                    ]}),
                    new LCARS_Header({y:300,width:400,color:tan,height:250,radius:[50,0,0,30]}),
                    new LCARS_Header({x:80,y:330,width:400,color:black,height:210,radius:[30,0,0,10]}),
                    new LCARS_ButtonGroups({x:90,y:360,rows:4,cols:['medium-rect-cap-right','pill']}) //.X(90).Y(360).Q(4).T(['medium-rect-cap-right','pill']) 
                ]
            }),
            new LCARS_Section({
                name:'scanners',
                width:400,
                header:new LCARS_Header({color:blue,margin:[0,20,100,0],text:'auxilliary targeting scanners'}),
                body:[
                    new LCARS_Readout({y:-90,rows:4,cols:[6,9,2,5,11,5,3,7,7,3]}), //.Y(-90).R(4).C([6,9,2,5,11,5,3,7,7,3]),
                    new LCARS_Subheader({width:500}),
                    new LCARS_Header({color:tan,x:300,y:50,width:200,radius:[0,0,40,0]}),
                    new LCARS_Header({color:black,x:300,y:50,width:120,height:190,radius:[0,0,20,0]}),
                    new LCARS_ReadoutDisplay({y:35,rows:5,cols:[6,6,4,3,2,5,3,6],header:'shield harmonics'}), //.Y(35).setRows(5).setCols([6,6,4,3,2,5,3,6]).setHeader('shield harmonics'),
                    new LCARS_ButtonGroups({x:300,y:50,rows:4,cols:['rect-cap-left']}) //.X(300).Y(50).Q(4).T(['rect-cap-left'])
                ]
            }),            
            new LCARS_Section({
                width:80,
                header:new LCARS_Header({color:tan,margin:[0,20,0,0],text:'ge rod'})
            }),            
            new LCARS_Section({
                name:'mode',
                width:190,
                header:new LCARS_Header({margin:[0,30,100,0],text:'mode select'}),
                body:[
                    new LCARS_Subheader({color:blue,text:'ae bfd'}),
                    new LCARS_ButtonGroups({y:50,rows:4,cols:['titled-left']}) //.Y(50).Q(4).T(['titled-left'])
                ]
            }),
            new LCARS_Section({
                name:'Tac Analyst',
                width:370,
                header:new LCARS_Header({color:tan,margin:[0,20,100,0],radius:[0,20,20,0],text:'tactical analysis'}),
                body:[
                    new LCARS_Subheader({width:370,color:tan,text:'ga pdf',radius:[0,10,10,0]}),
                    new LCARS_Scanner({y:50,width:370,colors:[white,white,blue,tan,white],reticule:{x:200,y:80}}) //.Y(50).W(370).C([white,white,blue,tan,white]).R([200,80])
                ]
            })*/
        ];
        this.build();
    }
}
// let tacLayout = {
//     name:'tactical',
//     dim:{
//         w:3100,
//         h:600,
//         g:20
//     },
//     elements: [
//         new LCARS__Section('lg').N('Phaser Power')
//         .setHeader(new LCARS__Header().H(200).T('phaser power status').C(tan).R([20,0,0,20]).M([0,20,100,0]))
//         .setBody([
//             new LCARS__Subheader().R([15,0,0,15]),
//             new LCARS__Tabs().X(10).Y(50)
//                 .addTab('al hoc',blue)
//                 .addTab('rh jus',white)
//                 .addTab('ma kal',gold)
//                 .addTab('we kep',yellow) 
//         ]),
//         new LCARS__Section().N('Status')
//         .setHeader(new LCARS__Header().C(gold).H(200).T('ro esc').R([0,0,0,0]).M([0,30,100,0]))
//         .setBody([
//             new LCARS__Subheader().C(white),
//             new LCARS__ReadoutDisplay().Y(35).setRows(5).setCols([6,6,2]).setHeader('status 2')
//         ]),
//         new LCARS__Section().N('Weapons').W(420)
//         .setHeader(new LCARS__Header().H(200).C(white).T('weapons systems').R([0,0,0,0]).M([0,20,100,0]))
//         .setBody([
//             new LCARS__Readout().Y(-90).R(4).C([6,9,2]),
//             new LCARS__Subheader().C(blue),
//             new LCARS__Header().C(tan).R([0,0,0,35]).Y(50).H(200),
//             new LCARS__Header().C(black).Y(50).X(80).H(185),
//             new LCARS__ButtonGroups().X(100).Y(50).Q(4).T(['rect-cap-right','pill','pill'])
//         ]),
//         new LCARS__Section().N('Targeting').W(400).M([0,20,0,0])
//         .setBody([
//             new LCARS__Joystick().C(red),
//             new LCARS__Scanner().X(200).C([white,yellow,red,red,yellow]).R([100,80]),
//             new LCARS__Subheader().C(white).Y(300).W(510),
//             new LCARS__ReadoutDisplay().Y(335).setRows(5).setCols([6,2,6,6,2]).setHeader('tactical analysis'),
//             new LCARS__Header().X(340).Y(350).W(280).C(tan).H(200).R([0,0,30,0]),
//             new LCARS__Header().X(335).Y(350).W(200).C(black).H(180).R([0,0,0,0]),
//             new LCARS__ButtonGroups().X(200).Y(350).Q(4).T(['pill','titled-pill-left']) 
//         ]),
//         new LCARS__Section().N('Elbow').W(200)
//         .setHeader(new LCARS__Header().C(tan).H(200).R([0,90,0,0]).M([0,20,0,0]))
//         .setBody([
//             new LCARS__Header().X(30).W(170).C(tan).H(80).R([0,0,0,-80]).M([0,20,0,0]),
//             new LCARS__Header().X(110).Y(100).W(90).C(blue).H(30).R([0,0,0,0]).M([0,20,0,0])
//             //new LCARS__ButtonGroups().X(10).Y(40).Q(3).T(['titled-pill-left']) 
//         ]),
//         new LCARS__Section().N('Tabs').W(400).M([0,20,0,0])
//         .setBody([
//             new LCARS__Tabs().X(85).Titled(false)
//                 .addTab('torpedo control',white)
//                 .addTab('intruder scan',gold)
//                 .addTab('Long Range scan analysis',blue)
//                 .addTab('deflector shield',blue),
//             new LCARS__Header().Y(300).W(400).C(tan).H(250).R([50,0,0,30]),   
//             new LCARS__Header().X(80).Y(330).W(400).C(black).H(210).R([30,0,0,0]),
//             new LCARS__ButtonGroups().X(90).Y(360).Q(4).T(['medium-rect-cap-right','pill']) 
//         ]),
//         new LCARS__Section().N('Scanners').W(400)
//         .setHeader(new LCARS__Header().C(blue).H(200).M([0,20,100,0]).T('auxilliary targeting scanners','start'))
//         .setBody([
//             new LCARS__Readout().Y(-90).R(4).C([6,9,2,5,11,5,3,7,7,3]),
//             new LCARS__Subheader().C(yellow).W(500),
//             new LCARS__Header().C(tan).X(300).Y(50).W(200).R([0,0,40,0]),
//             new LCARS__Header().C(black).X(300).Y(50).W(120).H(190).R([0,0,20,0]),
//             new LCARS__ReadoutDisplay().Y(35).setRows(5).setCols([6,6,4,3,2,5,3,6]).setHeader('shield harmonics'),
//             new LCARS__ButtonGroups().X(300).Y(50).Q(4).T(['rect-cap-left'])
//         ]),
//         new LCARS__Section().W(80).setHeader(new LCARS__Header().C(tan).H(200).M([0,20,0,0]).T('ge rod','left')),
        
//         new LCARS__Section().N('Mode').W(190)
//         .setHeader(new LCARS__Header().C(yellow).H(200).M([0,30,100,0]).T('mode select','left'))
//         .setBody([
//             new LCARS__Subheader().C(blue).T('ae bfd','start'),
//             new LCARS__ButtonGroups().Y(50).Q(4).T(['titled-left'])
//         ]),
//         new LCARS__Section().N('Tac Analyst').W(370)
//         .setHeader(new LCARS__Header().C(tan).H(200).M([0,20,100,0]).R([0,20,20,0]).T('tactical analysis','left'))
//         .setBody([
//             new LCARS__Subheader().W(370).C(tan).T('ga pdf','start').R([0,10,10,0]),
//             new LCARS__Scanner().Y(50).W(370).C([white,white,blue,tan,white]).R([200,80])
//         ])
//     ]
// }