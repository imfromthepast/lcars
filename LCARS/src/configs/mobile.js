/**/
const mobile = {            
    name:'mobile',
    dim:{
        w:375,
        h:667,
        g:5
    },
    elements: [
        {
            y: 0,
            w: 50,
            h: 662,
            header: {
                h: 100,
                r: [50,0,-20,0],
                c: yellow,
                m: null,
                t: null
            },
            leftSidebar: {
                w: 30,
                r: [0,0,0,0],
                c: yellow
            },
            body: []
        },
        {
            y: 0,
            w: 300,
            h: 662,
            header: {
                h: 80,
                r: [0,0,0,0],
                c: yellow,
                m: null,
                t:  {
                    x: -10,
                    y: 5,
                    t: "mobile lcars",
                    a: "end"
                }
            },
            body: [               
                new LCARS__Joystick().X(0).Y(10).C([red,gold,gold,gold]),
                new LCARS__ButtonGroups().X(215).Y(25).Q(4).T(['pill-left']),
                new LCARS__ButtonGroups().X(-3).Y(235).Q(3).T(['pill','pill','pill']),
                {
                    type: "textblock",
                    header: "atmospheric process",
                    rows: 4,
                    cols: [3,6,2,5],
                    x: 0,
                    y: 365
                },
                {
                    type: "textblock",
                    header: "biology readings",
                    rows: 4,
                    cols: [6,2,6,6],
                    x: 160,
                    y: 365
                }
            ],
            footer: {
                h: 15,
                r: [0,0,0,0],
                c: tan,
                m: [0,0,0,0]
            }
        }
    ]
}
const padd = {
    name:'padd',
    dim:{
        w:1024,
        h:768,
        g:5
    },
    elements:[
        {
            y:0,
            w:100,
            h:768,
            m:[0,0,0,0],
            body:[
                new LCARS__Subheader().H(100),
                new LCARS__Subheader().H(120).Y(105).R([0,0,0,50]).C(blue),
                new LCARS__Subheader().H(230).Y(230).R([50,0,0,0]).C(tan),
                new LCARS__Subheader().H(260).Y(465).C(gold),
                new LCARS__Subheader().H(20).Y(730).C(yellow)
            ]
        },
        {
            y:0,w:30,m:[0,5,0,0],
            body:[
                new LCARS__Subheader().Y(165).W(30).H(60).R([0,-30,0,0]).C(blue),
                new LCARS__Subheader().Y(230).W(30).H(60).R([0,0,-30,0]).C(tan)
            ]
        },
        {
            y:0,w:200,m:[0,5,0,0],
            body:[
                new LCARS__Readout().Y(5).R(4).C([10,10,10]),
                new LCARS__Readout().Y(115).R(3).C([10,10,10]),
                new LCARS__Subheader().Y(195).C(blue),
                new LCARS__Subheader().Y(230).C(tan),
                new LCARS__Readout().Y(275).R(7).C([10,10,10]),
                new LCARS__ButtonGroups().X(30).Y(465).Q(6).T(['rect-cap-left','pill','pill','rect-pill-right'])
            ]
        },
        {
            y:0,w:200,m:[0,5,0,0],
            body:[
                new LCARS__Readout().Y(5).R(4).C([10,10,10]),
                new LCARS__Readout().Y(115).R(3).C([10,10,10]),
                new LCARS__Subheader().Y(195).C(blue),
                new LCARS__Subheader().Y(230).C(tan),
                new LCARS__Readout().Y(275).R(7).C([10,10,10])
            ]
        },
        {
            y:0,w:100,m:[0,5,0,0],
            body:[
                new LCARS__Readout().Y(5).R(4).C([5,5]),
                new LCARS__Readout().Y(115).R(3).C([5,5]),
                new LCARS__Subheader().Y(195).C(blue),
                new LCARS__Subheader().Y(230).C(tan),
                new LCARS__Readout().Y(275).R(7).C([5,5])
            ]
        },
        {
            y:0,w:350,m:[0,5,0,0],
            body:[
                // new LCARS__Readout().Y(5).R(4).C([10,10]),
                new LCARS__Readout().Y(115).R(3).C([10,10,3,6,8,2]),
                new LCARS__Tabs().X(35).Titled(false)
                    .addTab('starfleet operations',gold)
                    .addTab('ship status',blue)
                    // .addTab('communications',white)
                    // .addTab('mission status',gold),
                    ,
                new LCARS__Subheader().Y(195).C(blue),
                new LCARS__Subheader().Y(230).C(tan),
                new LCARS__Scanner().Y(275).H(270).W(350).C([white,white,blue,gold,white]).R([250,145]),
                new LCARS__ButtonGroups().Y(555).Q(4).T(['rect-cap-left']),
                new LCARS__Joystick().X(150).Y(550).C([gold,yellow,yellow,yellow])
            ]
        }
    ]
}
const paddPro = {
    name:'padd pro',
    dim:{
        w:1366,
        h:1024,
        g:5
    },
    elements:[
        {
            y:0,
            w:100,
            h:768,
            m:[0,0,0,0],
            body:[
                new LCARS__Subheader().H(100),
                new LCARS__Subheader().H(120).Y(105).R([0,0,0,50]).C(blue),
                new LCARS__Subheader().H(230).Y(230).R([50,0,0,0]).C(tan),
                new LCARS__Subheader().H(260).Y(465).C(gold),
                new LCARS__Subheader().H(30).Y(730).C(blue),
                new LCARS__Subheader().H(220).Y(765).C(yellow)
            ]
        },
        {
            y:0,w:30,m:[0,5,0,0],
            body:[
                new LCARS__Subheader().Y(165).W(30).H(60).R([0,-30,0,0]).C(blue),
                new LCARS__Subheader().Y(230).W(30).H(60).R([0,0,-30,0]).C(tan),
                new LCARS__Subheader().X(5).W(320).H(30).Y(730).C(blue)
            ]
        },
        {
            y:0,w:200,m:[0,5,0,0],
            body:[
                new LCARS__Readout().Y(5).R(4).C([10,10,10]),
                new LCARS__Readout().Y(115).R(3).C([10,10,10]),
                new LCARS__Subheader().Y(195).C(blue),
                new LCARS__Subheader().Y(230).C(tan),
                new LCARS__Readout().Y(275).R(7).C([10,10,10]),
                new LCARS__ButtonGroups().X(30).Y(465).Q(6).T(['rect-pill-left','pill','rect-pill-right']),
                new LCARS__ButtonGroups().X(30).Y(770).Q(5).T(['rect-cap-left','rect-cap-right'])
            ]
        },
        {
            y:0,w:200,m:[0,5,0,0],
            body:[
                new LCARS__Readout().Y(5).R(4).C([10,10,10]),
                new LCARS__Readout().Y(115).R(3).C([10,10,10]),
                new LCARS__Subheader().Y(195).C(blue),
                new LCARS__Subheader().Y(230).C(tan),
                new LCARS__Readout().Y(275).R(7).C([10,10,10]),
                new LCARS__Subheader().X(80).W(120).H(120).Y(730).C(blue).R([0,50,0,0]),
                new LCARS__Subheader().X(80).W(120).H(125).Y(855).C(blue).R([0,0,0,50]),
                new LCARS__Subheader().X(180).W(830).H(30).Y(950).C(blue).R([0,15,15,0])
            ]
        },
        {
            y:0,w:100,m:[0,5,0,0],
            body:[
                new LCARS__Readout().Y(5).R(4).C([5,5]),
                new LCARS__Readout().Y(115).R(3).C([5,5]),
                new LCARS__Subheader().Y(195).C(blue),
                new LCARS__Subheader().Y(230).C(tan),
                new LCARS__Readout().Y(275).R(7).C([5,5]),
                new LCARS__ButtonGroups().X(30).Y(465).Q(10).T(['rect-pill-left','pill','rect-pill-right'])
            ]
        },
        {
            y:0,w:350,m:[0,5,0,0],
            body:[
                new LCARS__Readout().Y(5).R(4).C([5,5,8,4,3,6,7,9]),
                new LCARS__Readout().Y(115).R(3).C([5,5,8,4,3,6,7,9]),
                new LCARS__Subheader().Y(195).C(blue),
                new LCARS__Subheader().Y(230).C(tan),
                new LCARS__Readout().Y(275).R(7).C([5,5,8,4,3,6,7,9])
            ]
        },
        {
            y:0,w:350,m:[0,5,0,0],
            body:[
                // new LCARS__Readout().Y(5).R(4).C([10,10]),
                new LCARS__Readout().Y(115).R(3).C([10,10,3,6,8,2]),
                new LCARS__Tabs().X(35).Titled(false)
                    .addTab('starfleet operations',gold)
                    .addTab('ship status',blue)
                    // .addTab('communications',white)
                    // .addTab('mission status',gold),
                    ,
                new LCARS__Subheader().Y(195).C(blue),
                new LCARS__Subheader().Y(230).C(tan),
                new LCARS__Scanner().Y(275).H(460).W(350).C([white,white,blue,gold,white]).R([250,245]),
                new LCARS__ButtonGroups().Y(745).Q(4).T(['rect-cap-left']),
                new LCARS__Joystick().X(150).Y(740).C([gold,yellow,yellow,yellow])
            ]
        }
    ]
}