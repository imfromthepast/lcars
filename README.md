# lcars
Canvas library for making LCARS styled UI

# Introduction
This project is designed to allow the creation of LCARS style UI using the HTML canvas tag. The library is dependant on createjs. It offers three levels of customization:
-Loading existing layouts
-Using pre-built components to built layouts
-Pass in JSON to built layout from scratch

Examples for all three are included in the lcars.html example. The Tactical layout is loaded from an existing layout, the Ops, layout is built from existing components, and the Con layout is built from JSON.

# Getting Started
Include CreateJS, IsJs and the lcars.js files as well as the lcars.css stylesheet:

    <script type="text/javascript" src="https://code.createjs.com/easeljs-0.8.2.min.js"></script>
    <script type="text/javascript" src="https://code.createjs.com/tweenjs-0.6.2.min.js"></script>
    <script type="text/javascript" src="src/isjs.js"></script>
    <link rel="stylesheet" href="src/lcars.css"></link>

Add a canvas tag and give it a unique Id:

    <canvas id="tac"></canvas>        
    <canvas id="con"></canvas>      
    <canvas id="ops"></canvas>

In your script tag, instantiate the LCARS object and pass in the canvas tag id:

    const tac = new LCARS('tac');
    const con = new LCARS('con');
    const ops = new LCARS('ops');

Then load your layout using one of the three methods listed in the Intrduction:

    // loading existing layouts:
    tac.build(tac.tactical);

    // using pre-built components to build layouts:
    const conLayout = {
            name:'con',
            dim:{
                w:2500,
                h:700,
                g:20
            },
            elements: [
                con.scannerSection,
                con.navRefSection,
                con.flightSection,
                con.joystickSection,
                con.warpDriveSection,
                con.impulseSection,
                con.spacerSection,
                con.overrideSection
            ]
    };
    con.build(conLayout);

    // passing in JSON to build layout from scratch
    const opsJSON = {
            "name": "ops",
            "dim": {
                "w": 2500,
                "h": 700,
                "g": 20
            },
            "elements": [
                {
                    "y": 0,
                    "w": 200,
                    "h": 650,
                    "header": {
                        "type": "header",
                        "x": 0,
                        "y": 0,
                        "w": null,
                        "h": 200,
                        "c": "#e1eea4",
                        "r": [
                            20,
                            0,
                            0,
                            20
                        ],
                        "t": {
                            "x": 0,
                            "y": 5,
                            "t": "emergency override",
                            "a": "end",
                            "s": "22px",
                            "c": null
                        },
                        "m": [
                            0,
                            20,
                            100,
                            0
                        ]
                    },
                    "body": [
                        {
                            "type": "header",
                            "x": 0,
                            "y": 0,
                            "w": 200,
                            "h": 30,
                            "c": "#eec331",
                            "r": [
                                15,
                                0,
                                0,
                                15
                            ],
                            "t": {
                                "x": 0,
                                "y": 5,
                                "t": "engineering systems",
                                "a": "end",
                                "s": "22px",
                                "c": null
                            },
                            "m": [
                                0,
                                0,
                                0,
                                0
                            ]
                        },
                        {
                            "type": "buttonGroups",
                            "x": 10,
                            "y": 40,
                            "q": 3,
                            "t": [
                                "titled-pill-left"
                            ],
                            "s": 1
                        },
                        {
                            "type": "buttonGroups",
                            "x": 10,
                            "y": 180,
                            "q": 3,
                            "t": [
                                "titled-pill-right"
                            ],
                            "s": 1
                        }
                    ],
                    "footer": {
                        "type": "header",
                        "x": 0,
                        "y": 0,
                        "w": null,
                        "h": 15,
                        "c": "#d7a474",
                        "r": [
                            0,
                            0,
                            0,
                            0
                        ],
                        "t": {
                            "x": 0,
                            "y": 5,
                            "t": "",
                            "a": "end",
                            "s": "22px",
                            "c": null
                        },
                        "m": [
                            0,
                            0,
                            0,
                            0
                        ]
                    }
                },
                // etc...
            ]
        }
        // note: the above is truncated for the purpose of saving space, a real layout would have a lot more elements
        ops.build(opsJSON);

# LCARS Layout JSON documentation
The basic schea of the JSON for the layout is a name, some overall dimensions and the elements that make up the layout:

    {
        name:'con',
        dim:{
            w:2500, // width
            h:700,  // height
            g:20    // gutter space surrounding the panel
        },
        elements: [] // Array of element objects
    }

The name is cosmetic and has no effect on the resulting layout. The dim object defines the size of the entire panel and sets the width and height of the canvas tag. The gutter value creates a border around the entire layout so it does not bleed onto the edge.

Elements share a basic layout and are built in the layout from left to right. The element schema looks like this:

    {
        y: 0,           // vertical alignment (there is no x coordinate because this is calculated automatically by the system)
        w: 535,         // width
        h: 650,         // height
        header: {               // top most header for the elements
            h: 0,               // height
            r: [0,0,0,0],       // array of radius values for each corner, starting at the top left and working around clockwise
            c: yellow,          // color of the header using color keywords. To find a list of all the colors used by the library look at the top of the lcars.js file
            m: [0,0,0,0],       // array of margins starting with thte top and going clockwise
            t: null             // any text to add to the header
        },
        leftSidebar: {          // colored shape on the left side of the element.
            w: 0,               // width
            r: [0,0,0,0],       // array of radius values
            c: gold             // color of sidebar
        },
        body: [                 // array of elements that will be added to this element
            con.joystick(95,10,gold),     // the library contains methods for building standard controls, such as joysticks
            {
                type:'header',  // JSON for a header element
                x:298,          // x coordinates
                y:310,          // y coordinates
                w:237,          // width
                h:30,           // height
                c:gold,         // color
                r:[0,0,0,0],    // array of radius values
                t:null          // text
            },
            {
                type:'buttons',     // JSON for buttons
                x:395,              // x coordinates
                y:390,              // y coordinates
                q:5,                // quantity of buttons
                t:'pill',           // type of buttons
                c:[gold,white,blue,gold,blue]   // array of colors for each of the buttons specified by the 'q' field
            },
            {
                type:'header',
                x:0,
                y:310,
                w:288,
                h:30,
                c:blue,
                r:[0,0,0,0],
                t:null
            },
            {
                type:'header',
                x:0,
                y:635,
                w:288,
                h:15,
                c:tan,
                r:[0,0,0,0],
                t:null
            },
            {
                type:'scanner',     // JSON for a scanner
                x:0,
                y:390,
                w:288,
                h:220,
                c:[white,tan,gold,white,tan],   // array of colors for the stars
                rx:194,                         // x coordinates for positioning the reticule
                ry:80                           // y coordinate for positioning the reticule
            }
        ],
        rightSidebar: {             // JSON for the right sidebar
            w: 0,
            r: [0,0,0,0],
            c: gold
        },
        footer: {                   // JSON for the footer section
            h: 0,
            r: [0,0,0,0],
            c: tan,
            m: [0,0,0,0]
        }
    }

If you're feeling especially adventurous, you could reverse engineer the JSON and write it our completely and pass that in the build() method.

When I get time I will document all the construction methods here and comment the code.
