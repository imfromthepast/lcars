# lcars
Cavnas library for making LCARS styled UI
This is a first pass at this readme, so it's going to be pretty rough.

To see how to create existing LCARS Panels, see the lcars.html page. I create Ops, Con, Tactical, Mobile, Padd, and PaddPro panels. The easy way is shown in the html file.

You basically create an instance of the LCARS object and pass in the id of your canvas tag in the constructor. Then call the build() method on your instance. You pass in JSON that is used to create the UI. The LCARS object comes preloaded with the above layouts. If you look further down in the lcars.js file you will see that a lot of the building blocks of these layouts are created using methods, so to create a custom layout using components, you would construct the JSON using these methods and then pass that JSON into the build() method.

If you're feeling especially adventurous, you could reverse engineer the JSON and write it our completely and pass that in the build() method.

When I get time I will document the JSON schema and all the construction methods here and comment the code.
