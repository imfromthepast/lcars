# lcars
Canvas library for making LCARS styled UI

# Introduction
This project is designed to allow the creation of LCARS style UI using the HTML canvas tag. The library is dependant on createjs and isjs. It offers three levels of customization:
-Loading existing layouts
-Using pre-built components to built layouts
-extending existing components to build new ones

Examples for all three are included in this readme file.

# Getting Started
Include CreateJS, IsJs and the lcars.js files as well as the lcars.css stylesheet:

    <script type="text/javascript" src="https://code.createjs.com/easeljs-0.8.2.min.js"></script>
    <script type="text/javascript" src="https://code.createjs.com/tweenjs-0.6.2.min.js"></script>
    <script type="text/javascript" src="src/isjs.js"></script>
    <link rel="stylesheet" href="src/lcars.css"></link>    
    <script type="text/javascript" src="src/js/lcars.js"></script>
    <script type="text/javascript" src="src/configs/tactical.js"></script>
    <script type="text/javascript" src="src/configs/conn.js"></script>
    <script type="text/javascript" src="src/configs/ops.js"></script>

Add a canvas tag and give it a unique Id:

    <canvas id="tac"></canvas>        
    <canvas id="con"></canvas>      
    <canvas id="ops"></canvas>

In your script tag, instantiate the LCARS object and pass in an option object, with at least the id of the canvas tag. The rest of the options have default values:

    const tac = new LCARS({id:'tac'});
    const con = new LCARS({id:'con'});
    const ops = new LCARS({id:'ops'});

That is all you need to do to load existing layouts.

# Building your own layouts

The three included examples, the Tactical, Con, and Ops stations offer comprehensive examples of how to build custom layouts. Load the html file in your browser to see the layouts, and open the tactical.js, con.js, or ops.js files in your IDE to examine how they are built. You can change values and save and refresh to see the effects your changes have.

Below is a sample layout with the basic parts explained.

## Sample layout:
All LCARS layouts are instances of the LCARS_Layout class which has some pasic parameters that set up the canvas:

    class LCARS_SAMPLE extends LCARS_Panel{
        id;                     // the id used to identify the canvas tag
        name='tactical';        // name used when debugging
        width=3100;             // sets the width of the canvas tag
        height=600;             // sets the height of the canvas tag
        padding=20;             // established a buffer around the perimeter of the panel
        debug=false;            // determines whether to display the debug over lay
                                // next is the constructor
        constructor(opt){       // pass in the options
            super(opt);         // all layouts extend LCARS_Panel class, so pass the options to the parent class too
            this.sections=[];   // this is where you add LCARS_Section instances which act as containers for the vertical sections of the layout
            this.build();       // call the build function to paint your layout to the canvas.
        }
    }
That is the basic layout of LCARS_Panel. Where you will be doing most of your work is in adding LCARS_Section instances to the sections array:

    this.sections=[
        new LCARS_Section({                                             // instance of the LCARS_Section class
            name:'first section',                                       // name for debugging
            width:300,                                                  // width of the section
            header:                                                     // the header appears at the top of the section
                new LCARS_Header({                                      // instance of the LCARS_Header class
                    text:'test header',                                 // text that appears in the header
                    color:this.uiTheme.neutral,                         // color of the header, using the uiTheme object
                    radius:[20,0,0,20],                                 // radius array for setting the roundness of the corners of the headers
                                                                        //      [top-left,top-right,bottom-right,bottom-left]
                    margin:[0,20,100,0]                                 // margins around the header (used to define the seperation between sections
                                                                        //      as well as betweent eh ehader and the body)
                                                                        //      [top,right,bottom,left]
                }),
            body:[                                                      // content below the header
                new LCARS_Subheader({radius:[15,0,0,15]}),              // LCARS_Subheader is a subclass of LCARS_Header that is defaulted to 15px high 
                                                                        // and has smaller text as well as having left-aligned text
                                                                        // radius works as in LCARS_Header
                new LCARS_TitledTabs({x:10,y:50,tabs:[                  // there are an assortment of classes that render UI elements, such as buttons,
                    {text:'al hoc',color:this.uiTheme.action},          // readouts, scanners, joysticks, etc. They each have their own unique parameters
                    {text:'rh jus',color:this.uiTheme.accent},          // and will be documented fully at a later date. For now, look at the layout files
                    {text:'ma kal',color:this.uiTheme.emphasis},        // for examples
                    {text:'we kep',color:this.uiTheme.base}
                ]}) 
            ]
        })
    ]

When I get time I will document all the element classes here and comment the code.
