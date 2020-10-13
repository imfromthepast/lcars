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
ops = {
    name:'ops',
    dim:{
        w:2500,
        h:700,
        g:20
    },
    elements: [
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
                new LCARS__Tabs().X(70)
                    .addTab('departmental',blue)
                    .addTab('status',blue)
                    .addTab('communications',white)
                    .addTab('mission status',gold),
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
    ]
}