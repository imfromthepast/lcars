
const scannerSection = new LCARS__Section().N('scanners').W(535)
    .setHeader(
        //new LCARS__Header().C(yellow)
    )
    .setBody([
        new LCARS__Joystick().X(95).Y(0).C(gold),
        new LCARS__Header().X(298).Y(310).W(237).H(30).C(gold),
        new LCARS__Header().X(0).Y(310).W(288).H(30).C(blue),
        new LCARS__Header().X(0).Y(645).W(288).H(14).C(tan),
        new LCARS__ButtonGroups().X(395).Y(390).Q(5).T(['pill']),
        new LCARS__Scanner().X(0).Y(390).W(288).H(220).C([white,tan,gold,white,tan]).R([194,80])
    ])

const navRefSection = new LCARS__Section().N('nav ref').W(335)
    .setHeader(
        new LCARS__Elbow()
    )
    .setBody([
        new LCARS__Header().W(295).H(40).T('navigation reference'),
        new LCARS__Header().Y(60).W(295).H(30).T('cache select').C(gold),
        new LCARS__Header().Y(140).W(295).H(270).T('lcars mode select').R([0,0,20,0]),
        new LCARS__ButtonGroups().X(-33).Y(140).Q(5).T(['titled-pill-left'])
    ])

// {
//     y: 0,
//     w: 335,
//     h: 660,
//     header: elbow_lg_right,
//     leftSidebar: {
//         w: 0,
//         r: [0,0,0,0],
//         c: gold
//     },
//     body: [
//         {
//             type:'header',
//             x:0,
//             y:0,
//             w:295,
//             h:40,
//             c:yellow,
//             r:[0,0,0,0],
//             t:{
//                 x:290,
//                 y:5,
//                 t:'navigation reference',
//                 a:null,
//                 s:'30px',
//                 c:null
//             }
//         },
//         {
//             type:'header',
//             x:0,
//             y:60,
//             w:295,
//             h:30,
//             c:gold,
//             r:[0,0,0,0],
//             t:{
//                 x:290,
//                 y:5,
//                 t:'cache select',
//                 a:null,
//                 s:'22px',
//                 c:null
//             }
//         },
//         {
//             type:'header',
//             x:0,
//             y:140,
//             w:295,
//             h:260,
//             c:yellow,
//             r:[0,0,20,0],
//             t:{
//                 x:290,
//                 y:10,
//                 t:'lcars mode select',
//                 a:null,
//                 s:'22px',
//                 c:null
//             }
//         },
//         {
//             type:'buttons',
//             x:-33,
//             y:140,
//             q:5,
//             t:'titled-pill-left',
//             c:null
//         }
    
//     ],
//     rightSidebar: {
//         w: 0,
//         r: [0,0,0,0],
//         c: gold
//     },
//     footer: {
//         h: 0,
//         r: [0,0,0,0],
//         c: tan,
//         m: [0,0,0,0]
//     }
// }
const flightSection = {
    y: 0,
    w: 420,
    h: 660,
    header: {
        h: 210,
        r: [0,0,0,0],
        c: yellow,
        m: [0,40,100,0],
        t: {
            x: -10,
            y: 5,
            t: "FLIGHT CONTROL",
            a: "end",
            s: "22px",
            c: null
        }
    },
    leftSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    body: [
        {
            type:'header',
            x:0,
            y:0,
            w:420,
            h:340,
            c:yellow,
            r:[50,0,0,50],
            t:{
                x:410,
                y:5,
                t:'navigation to cache',
                a:null,
                s:'20px',
                c:null
            }
        },
        {
            type:'header',
            x:85,
            y:30,
            w:445,
            h:295,
            c:'#000',
            r:[50,0,0,10],
            t:null
        },
        {
            type:'buttons',
            x:110,
            y:80,
            q:5,
            t:'rect-pill-right',
            c:[white,gold,yellow,yellow,gold]
        },
        {
            type:'buttons',
            x:235,
            y:80,
            q:5,
            t:'pill',
            c:[blue,none,white,none,none]
        },
        {
            type:'buttons',
            x:335,
            y:80,
            q:5,
            t:'pill',
            c:[white,none,blue,none,gold]
        }
    ],
    rightSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    footer: {
        h: 0,
        r: [0,0,0,0],
        c: tan,
        m: [0,0,0,0]
    }
}
const joystickSection = {
    y: 0,
    w: 200,
    h: 660,
    header: {
        h: 210,
        r: [0,0,0,0],
        c: blue,
        m: [0,25,100,0],
        t: null
    },
    leftSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    body: [
        {
            type:'header',
            x:0,
            y:0,
            w:200,
            h:30,
            c:blue,
            r:[0,0,0,0],
            t:null
        },
        new LCARS__Joystick().Y(75).C([red,gold,gold,gold])
    ],
    rightSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    footer: {
        h: 15,
        r: [0,0,0,0],
        c: tan,
        m: [0,0,0,0]
    }
}
//function btnClickFunc(){alert('func')}
const warpDriveSection = {
    y: 0,
    w: 410,
    h: 660,
    header: {
        h: 210,
        r: [0,0,0,0],
        c: yellow,
        m: [0,20,100,0],
        t: {
            "x": -10,
            "y": 5,
            "t": "warp drive systems",
            "a": "end",
            "s": "22px",
            "c": null
        }
    },
    leftSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    body: [                
        {
            type:'header',
            x:0,
            y:0,
            w:410,
            h:30,
            c:yellow,
            r:[0,0,0,0],
            t:{
                x:400,
                y:5,
                t:'option select',
                a:null,
                s:'22px',
                c:null
            }
        },
        {
            type:'buttons',
            x:15,
            y:80,
            q:5,
            t:'pill',
            c:[yellow,gold,white,blue,white]
        },
        {
            type:'buttons',
            x:120,
            y:80,
            q:5,
            t:'titled-pill-left',
            c:[gold,yellow,gold,gold,blue]
        },
        {
            type:'buttons',
            x:360,
            y:80,
            q:5,
            t:'tiny-rect-cap-left',
            c:[yellow,none,yellow,blue,tan]
        }
    ],
    rightSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    footer: {
        h: 15,
        r: [0,0,0,0],
        c: tan,
        m: [0,0,0,0]
    }
}
const impulseSection = {
    y: 0,
    w: 177,
    h: 660,
    header: {
        h: 210,
        r: [0,0,0,0],
        c: yellow,
        m: [0,12,100,0],
        t: {
            "x": -10,
            "y": 5,
            "t": "impulse systems",
            "a": "end",
            "s": "22px",
            "c": null
        }
    },
    leftSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    body: [                
        {
            type:'header',
            x:0,
            y:0,
            w:177,
            h:30,
            c:gold,
            r:[0,0,0,0],
            t:{
                x:167,
                y:5,
                t:'mode select',
                a:null,
                s:'22px',
                c:null
            }
        },               
        {
            type:'header',
            x:0,
            y:80,
            w:50,
            h:220,
            c:tan,
            r:[0,20,20,0],
            t:null
        },              
        {
            type:'header',
            x:0,
            y:110,
            w:30,
            h:160,
            c:black,
            r:[0,10,10,0],
            t:null
        }
    ],
    rightSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    footer: {
        h: 15,
        r: [0,0,0,0],
        c: tan,
        m: [0,0,0,0]
    }
}
const spacerSection = {
    y: 0,
    w: 45,
    h: 660,
    header: {
        h: 210,
        r: [0,0,0,0],
        c: blue,
        m: [0,15,100,0],
        t: null
    },
    leftSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    body: [
        {
            type:'header',
            x:0,
            y:0,
            w:45,
            h:30,
            c:tan,
            r:[0,0,0,0],
            t:null
        }
    ],
    rightSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    footer: {
        h: 0,
        r: [0,0,0,0],
        c: tan,
        m: [0,0,0,0]
    }
}
const overrideSection = {
    y: 0,
    w: 200,
    h: 660,
    header: {
        h: 210,
        r: [0,20,20,0],
        c: yellow,
        m: [0,0,100,0],
        t: {
            "x": -10,
            "y": 5,
            "t": "emergency override",
            "a": "end",
            "s": "22px",
            "c": null
        }
    },
    leftSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    body: [               
        {
            type:'header',
            x:0,
            y:0,
            w:200,
            h:30,
            c:gold,
            r:[0,0,0,0],
            t:{
                x:190,
                y:5,
                t:'helm / navigation',
                a:null,
                s:'22px',
                c:null
            }
        }
    ],
    rightSidebar: {
        w: 0,
        r: [0,0,0,0],
        c: gold
    },
    footer: {
        h: 15,
        r: [0,0,0,0],
        c: tan,
        m: [0,0,0,0]
    }
}

// lcars__sec_h_xl = 200;
// lcars__sec_h_lg = 100;
// lcars__sec_h_md = 50;
// lcars__sec_h_sm = 25;
// lcars__sec_h_xs = 12;

// lcars__sec_w_xl = 500;
// lcars__sec_w_lg = 360;
// lcars__sec_w_md = 200;
// lcars__sec_w_sm = 110;
// lcars__sec_w_xs = 50;

// lcars__sec_gutter = 20;

    // opsDims = {
    //     w:[lcars__sec_w_md,lcars__sec_w_lg,lcars__sec_w_md,lcars__sec_w_lg,lcars__sec_w_sm,lcars__sec_w_lg,lcars__sec_w_sm,lcars__sec_w_lg]
    
    // }
/*
/$$$$$$   /$$$$$$  /$$   /$$ /$$   /$$
/$$__  $$ /$$__  $$| $$$ | $$| $$$ | $$
| $$  \__/| $$  \ $$| $$$$| $$| $$$$| $$
| $$      | $$  | $$| $$ $$ $$| $$ $$ $$
| $$      | $$  | $$| $$  $$$$| $$  $$$$
| $$    $$| $$  | $$| $$\  $$$| $$\  $$$
|  $$$$$$/|  $$$$$$/| $$ \  $$| $$ \  $$
\______/  \______/ |__/  \__/|__/  \__/
*/
con = {
    name:'con',
    dim:{
        w:2500,
        h:700,
        g:20
    },
    elements: [
        scannerSection,
        navRefSection,
        flightSection,
        joystickSection,
        warpDriveSection,
        impulseSection,
        spacerSection,
        overrideSection
    ]
} 