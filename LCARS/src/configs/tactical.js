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
const tactical = {
    name:'tactical',
    dim:{
        w:3100,
        h:600,
        g:20
    },
    elements: [
        new LCARS__Section().N('Phaser Power').W(300)
        .setHeader(new LCARS__Header().H(200).T('phaser power status').C(tan).R([20,0,0,20]).M([0,20,100,0]))
        .setBody([
            new LCARS__Subheader().R([15,0,0,15]),
            new LCARS__Tabs().X(10).Y(50)
                .addTab('al hoc',blue)
                .addTab('rh jus',white)
                .addTab('ma kal',gold)
                .addTab('we kep',yellow) 
        ]),
        new LCARS__Section().N('Status').W(100)
        .setHeader(new LCARS__Header().C(gold).H(200).T('ro esc').R([0,0,0,0]).M([0,30,100,0]))
        .setBody([
            new LCARS__Subheader().C(white),
            new LCARS__ReadoutDisplay().Y(35).setRows(5).setCols([6,6,2]).setHeader('status 2')
        ]),
        new LCARS__Section().N('Weapons').W(420)
        .setHeader(new LCARS__Header().H(200).C(white).T('weapons systems').R([0,0,0,0]).M([0,20,100,0]))
        .setBody([
            new LCARS__Readout().Y(-90).R(4).C([6,9,2]),
            new LCARS__Subheader().C(blue),
            new LCARS__Header().C(tan).R([0,0,0,35]).Y(50).H(200),
            new LCARS__Header().C(black).Y(50).X(80).H(185),
            new LCARS__ButtonGroups().X(100).Y(50).Q(4).T(['rect-cap-right','pill','pill'])
        ]),
        new LCARS__Section().N('Targeting').W(400).M([0,20,0,0])
        .setBody([
            new LCARS__Joystick().C(red),
            new LCARS__Scanner().X(200).C([white,yellow,red,red,yellow]).R([100,80]),
            new LCARS__Subheader().C(white).Y(300).W(510),
            new LCARS__ReadoutDisplay().Y(335).setRows(5).setCols([6,2,6,6,2]).setHeader('tactical analysis'),
            new LCARS__Header().X(340).Y(350).W(280).C(tan).H(200).R([0,0,30,0]),
            new LCARS__Header().X(335).Y(350).W(200).C(black).H(180).R([0,0,0,0]),
            new LCARS__ButtonGroups().X(200).Y(350).Q(4).T(['pill','titled-pill-left']) 
        ]),
        new LCARS__Section().N('Elbow').W(200)
        .setHeader(new LCARS__Header().C(tan).H(200).R([0,90,0,0]).M([0,20,0,0]))
        .setBody([
            new LCARS__Header().X(30).W(170).C(tan).H(80).R([0,0,0,-80]).M([0,20,0,0]),
            new LCARS__Header().X(110).Y(100).W(90).C(blue).H(30).R([0,0,0,0]).M([0,20,0,0])
            //new LCARS__ButtonGroups().X(10).Y(40).Q(3).T(['titled-pill-left']) 
        ]),
        new LCARS__Section().N('Tabs').W(400).M([0,20,0,0])
        .setBody([
            new LCARS__Tabs().X(85).Titled(false)
                .addTab('torpedo control',white)
                .addTab('intruder scan',gold)
                .addTab('Long Range scan analysis',blue)
                .addTab('deflector shield',blue),
            new LCARS__Header().Y(300).W(400).C(tan).H(250).R([50,0,0,30]),   
            new LCARS__Header().X(80).Y(330).W(400).C(black).H(210).R([30,0,0,0]),
            new LCARS__ButtonGroups().X(90).Y(360).Q(4).T(['medium-rect-cap-right','pill']) 
        ]),
        new LCARS__Section().N('Scanners').W(400)
        .setHeader(new LCARS__Header().C(blue).H(200).M([0,20,100,0]).T('auxilliary targeting scanners','start'))
        .setBody([
            new LCARS__Readout().Y(-90).R(4).C([6,9,2,5,11,5,3,7,7,3]),
            new LCARS__Subheader().C(yellow).W(500),
            new LCARS__Header().C(tan).X(300).Y(50).W(200).R([0,0,40,0]),
            new LCARS__Header().C(black).X(300).Y(50).W(120).H(190).R([0,0,20,0]),
            new LCARS__ReadoutDisplay().Y(35).setRows(5).setCols([6,6,4,3,2,5,3,6]).setHeader('shield harmonics'),
            new LCARS__ButtonGroups().X(300).Y(50).Q(4).T(['rect-cap-left'])
        ]),
        new LCARS__Section().W(80).setHeader(new LCARS__Header().C(tan).H(200).M([0,20,0,0]).T('ge rod','left')),
        
        new LCARS__Section().N('Mode').W(190)
        .setHeader(new LCARS__Header().C(yellow).H(200).M([0,30,100,0]).T('mode select','left'))
        .setBody([
            new LCARS__Subheader().C(blue).T('ae bfd','start'),
            new LCARS__ButtonGroups().Y(50).Q(4).T(['titled-left'])
        ]),
        new LCARS__Section().N('Tac Analyst').W(370)
        .setHeader(new LCARS__Header().C(tan).H(200).M([0,20,100,0]).R([0,20,20,0]).T('tactical analysis','left'))
        .setBody([
            new LCARS__Subheader().W(370).C(tan).T('ga pdf','start').R([0,10,10,0]),
            new LCARS__Scanner().Y(50).W(370).C([white,white,blue,tan,white]).R([200,80])
        ])
    ]
}