# Codelane

Component to for interactive code navigation lanes

![Alt text](https://raw.githubusercontent.com/kochumvk/codelane/master/images/sample.png)


# Usage
Create a new codeLane instance

var cl = new codeLane("lane_holder",100,800,data);

Where:

"lane_holder" is the DOM element to which the lane camvas will be added.
Width of codeLne instance is 100.
Height of codeLane instance is 800
data is formatted data

# Handling Clicks
To navigate the code to appropriate lines on click of markers.

cl.onClick(function (loc) {console.log("Navigate code to :"+loc) });

# Example

Open index.html in a browser for a working example

# Dependencies

This component uses CreateJS to interact with c anvas.
https://github.com/createjs

