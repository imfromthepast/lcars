/*
   /$$$$$$   /$$$$$$  /$$   /$$
  /$$__  $$ /$$__  $$| $$$ | $$
 | $$  \__/| $$  \ $$| $$$$| $$
 | $$      | $$  | $$| $$ $$ $$
 | $$      | $$  | $$| $$  $$$$
 | $$    $$| $$  | $$| $$\  $$$
 |  $$$$$$/|  $$$$$$/| $$ \  $$
  \______/  \______/ |__/  \__/
*/
class LCARS__CON extends LCARS{
    constructor(id,debug){
        super({n:'con',w:2500,h:700,g:20,id:id},debug);
        this.setSections([
            new LCARS__Section().N('scanners').W(535)
            .setBody([
                new LCARS__Joystick().X(95).Y(0).C(gold),
                new LCARS__Header().X(298).Y(310).W(237).H(30).C(gold),
                new LCARS__Header().X(0).Y(310).W(288).H(30).C(blue),
                new LCARS__Header().X(0).Y(645).W(288).H(14).C(tan),
                new LCARS__ButtonGroups().X(395).Y(390).Q(5).T(['pill']),
                new LCARS__Scanner().X(0).Y(390).W(288).H(220).C([white,tan,gold,white,tan]).R([194,80])
            ]),
            new LCARS__Section().N('nav ref').W(335)
            .setHeader(new LCARS__Elbow('lg-right'))
            .setBody([
                new LCARS__Header('navigation reference').W(295).H(40),
                new LCARS__Header('cache select').Y(60).W(295).H(30).C(gold),
                new LCARS__Header('lcars mode select').Y(140).W(295).H(270).R([0,0,20,0]),
                new LCARS__ButtonGroups().X(-33).Y(140).Q(5).T(['titled-pill-left'])
            ]),
            new LCARS__Section().N('flight').W(420)
            .setHeader(new LCARS__Header().H(210).M([0,40,100,0]).T('flight control'))
            .setBody([
                new LCARS__Header('navigation to cache').H(350).R([50,0,0,50]),
                new LCARS__Header().H(295).W(445).X(75).Y(30).C(black).R([50,0,0,10]),
                new LCARS__ButtonGroups().X(90).Y(80).Q(5).T(['rect-pill-right','pill','pill'])
            ]),
            new LCARS__Section().N('joystick').W(200)
            .setHeader( new LCARS__Header().H(210).C(blue).M([0,25,100,0]))
            .setBody([
                new LCARS__Header().H(30).C(blue),
                new LCARS__Joystick().Y(75).C([red,gold,gold,gold])
            ])
            .setFooter(new LCARS__Header().H('xs').C(tan)),
            new LCARS__Section().N('warp drive systems').W(410)
            .setHeader(new LCARS__Header('warp drive systems').H(210).M([0,20,100,0]))
            .setBody([
                new LCARS__Header('option select').H(30),
                new LCARS__ButtonGroups().X(15).Y(80).Q(5).T(['pill','titled-pill-left','tiny-rect-cap-left'])
            ])
            .setFooter(new LCARS__Header().H('xs').C(tan)),
            new LCARS__Section().N('impulse').W(177)
            .setHeader(new LCARS__Header('impulse systems').H(210).M([0,12,100,0]))
            .setBody([
                new LCARS__Header('mode select').H(30).C(gold),
                new LCARS__ButtonGroups().X(0).Y(50).Q(6).T(['titled-pill-right'])
            ])
            .setFooter(new LCARS__Header().H('xs').C(tan)),
            new LCARS__Section().W(45)
            .setHeader(new LCARS__Header().H(210).M([0,15,100,0]).C(blue))
            .setBody([
                new LCARS__Header().H('sm').C(tan)
            ]),
            new LCARS__Section().W(200)
            .setHeader(new LCARS__Header('emergency override').H(210).M([0,0,100,0]).R([0,20,20,0]))
            .setBody([
                new LCARS__Header('helm / navigation').C(gold).H(30),
                new LCARS__ButtonGroups().X(0).Y(50).Q(6).T(['pill','pill'])
            ])
            .setFooter(new LCARS__Header().H('xs').C(tan))
        ]);
        this.build();
    }
}