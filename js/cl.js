/*====================================================
__                .__                        __
|  | ______   ____ |  |__  __ __  ________  _|  | __
|  |/ /  _ \_/ ___\|  |  \|  |  \/     \  \/ /  |/ /
|    <  <_> )  \___|   Y  \  |  /  Y Y  \   /|    <
|__|_ \____/ \___  >___|  /____/|__|_|  /\_/ |__|_ \
    \/          \/     \/            \/          \/
====================================================*/

function codeLane(holder,width,height,data){
var selection_wrapper;
var zoomWedgeHeight = 50;
var zoomHeight = 100;
var pointerLabel;
var callBacks = {};
//================ SET-UP CANVAS ====================
var laneHolder = document.getElementById(holder);
var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
canvas.id = "lane_canvas";
laneHolder.appendChild(canvas);

//================ SET-UP STAGE =====================
var locScale = canvas.height/data.total_loc;
var markerGroups = [];
var stage = new createjs.Stage("lane_canvas");
    stage.enableMouseOver(10);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

//========= OPTIMISE FOR HIGH PIXEL DENSITY =========
  if (window.devicePixelRatio) {
  var height = canvas.getAttribute('height');
  var width = canvas.getAttribute('width');
  canvas.setAttribute('width', Math.round(width * window.devicePixelRatio));
  canvas.setAttribute('height', Math.round( height * window.devicePixelRatio));
  canvas.style.width = width+"px";
  canvas.style.height = height+"px";
  stage.scaleX = stage.scaleY = window.devicePixelRatio;
}

//================= RENDER LANES =====================
// Many additional options will be made available as
// parameters later! Until then there will be magic
// numbers.

var laneWidth = 20;
var laneHeight = height;
  renderSelection();
  prepareLane();

function prepareLane(){
  var lanes = data.lanes;
  for (var j = 0; j < lanes.length; j++) {
    var lane = new createjs.Container();
    lane.x = 20+j*25;
    var path = new createjs.Shape();
      path.graphics.clear().s("#F2F2F2").ss(1,"round").moveTo(laneWidth/2,0);
      path.graphics.lineTo(laneWidth/2,laneHeight);
      lane.addChild(path);
      stage.addChild(lane);
      renderMarkers(data.lanes[j],lane);
  }

}

//================= RENDER MARKERS ===================
function renderMarkers(data,lane){
var markers = data.markers;
var markerGroup = [];
for (var i = 0; i < markers.length; i++) {
  markers[i]
  var marker_wrapper = new createjs.Container();
  marker_wrapper.y = markers[i].loc*locScale;
  marker_wrapper.data = {};
  marker_wrapper.data.originalY = marker_wrapper.y;
  markerGroup.push(marker_wrapper);
  var marker = new createjs.Shape();
  drawMarker(marker,markers[i]);
      marker.data = markers[i];
      marker.addEventListener("mouseover", handleMarkerHover);
      marker.addEventListener("mouseout", handleMarkerOut);
      marker.addEventListener("click", handleMarkerClick);
      marker_wrapper.addChild(marker);
      lane.addChild(marker_wrapper);
}
markerGroups.push(markerGroup);
  stage.addChild(lane);
  stage.addEventListener("stagemousemove", handleMouseMove);
}

function drawMarker(holder,marker,hover_mode) {
var fillColor;
var strokeColor;
if(hover_mode){
  fillColor = strokeColor = marker.color.stroke;
}
else{
  fillColor = marker.color.fill;
  strokeColor = marker.color.stroke;
}

switch(marker.shape) {
    case "diamond":
      holder.graphics.clear().s(strokeColor).ss(1,"round").beginFill(fillColor).drawPolyStar(10,0,5,4,0);
    break;
    case "hexagon":
      holder.graphics.clear().s(strokeColor).ss(1,"round").beginFill(fillColor).drawPolyStar(10,0,5,6,0);
    break;
    case "square":
      holder.graphics.clear().s(strokeColor).ss(1,"round").beginFill(fillColor).drawRect(6,0-4,8,8);
    break;
    default:
    holder.graphics.clear().s(strokeColor).ss(1,"round").beginFill(fillColor).drawPolyStar(10,0,5,3,0);
    }
}

//================= RENDER SELECTION =============
function renderSelection(){
       selection_wrapper = new createjs.Container();
       selection_wrapper.alpha=0;
   var selection = new createjs.Shape();
       selection.graphics.clear().s("#4A90E2").ss(1,"round").beginFill("#ECF3FC").drawRect(0,0,width,zoomWedgeHeight);
         pointer = new createjs.Shape();
         pointer.graphics.clear().s("#4A90E2").ss(1,"round").moveTo(0,zoomWedgeHeight/2);
         pointer.graphics.lineTo(5,zoomWedgeHeight/2);
         pointerLabel = new createjs.Text("ggg", "11px Ubuntu Condensed", "#4A90E2");
         pointerLabel.x = 7;
         pointerLabel.y = (zoomWedgeHeight/2)-6;
       selection_wrapper.addChild(pointer,pointerLabel);
       stage.addChild(selection_wrapper);
       stage.addEventListener("mouseleave", handleMouseLeave);
       stage.addEventListener("mouseenter", handleMouseEnter);
}
//==================== EVENTS =====================
function handleMarkerHover(event){
   var data = event.target.data;
   drawMarker(event.target,data,true);
   var blade_wrapper = new createjs.Container();
       blade_wrapper.y = 0;
   var blade = new createjs.Shape();
       blade.graphics.s(data.color.stroke).ss(1,"round").beginFill(data.color.fill).drawRoundRect(1,-10,18,120,2);
   var label = new createjs.Text(data.label, "11px Ubuntu Condensed", data.color.stroke);
       label.x = 15;
       label.y = 10;
       label.rotation = 90;
   var location = new createjs.Text(data.location, "11px Ubuntu Condensed", data.color.stroke);
       location.textAlign = "right";
       location.x = 15;
       location.y = 120-10-5;
       location.rotation = 90;
       blade_wrapper.addChild(blade);
       blade_wrapper.addChild(label);
       blade_wrapper.addChild(location);
       if(height-event.target.parent.y < 120){
         blade_wrapper.regX = +20;
         blade_wrapper.rotation = 180;
       }
       event.target.data.blade_wrapper = blade_wrapper;
       event.target.parent.addChild(blade_wrapper);
       event.target.parent.parent.addChild(event.target.parent);
       blade_wrapper.alpha=0;
       createjs.Tween.get(blade_wrapper).to({ alpha: 1}, 300, createjs.Ease.getPowInOut(2));
       event.target.parent.swapChildren( event.target, blade_wrapper);
       stage.update();
}

function handleMarkerOut(event){
       var data = event.target.data;
           drawMarker(event.target,event.target.data);
          createjs.Tween.get(event.target.data.blade_wrapper,{onComplete:function(){event.target.parent.removeChild(event.target.data.blade_wrapper);}})
      .to({ alpha: 0}, 300, createjs.Ease.getPowInOut(2));
}

function handleMouseMove(event) {
  pointerLabel.text = parseInt((stage.mouseY/window.devicePixelRatio)/locScale);
  var mouseY = stage.mouseY/window.devicePixelRatio;
  var pointerY = mouseY-zoomWedgeHeight/2 ;
  if(pointerY <-(zoomWedgeHeight/2)+8){
    pointerY = -(zoomWedgeHeight/2)+8;
  }
  else if(pointerY >height-(zoomWedgeHeight/2)-8){
    pointerY = height-(zoomWedgeHeight/2)-8
  }
  selection_wrapper.y = pointerY;
  if(data.total_loc>height){

  var ar1 = [0,mouseY-zoomWedgeHeight/2];
  var br1 = [mouseY-zoomWedgeHeight/2,mouseY+zoomWedgeHeight/2];
  var cr1 = [mouseY+zoomWedgeHeight/2,height];

  var ar2 = [0,mouseY-zoomHeight/2];
  var br2 = [mouseY-zoomHeight/2,mouseY+zoomHeight/2];
  var cr2 = [mouseY+zoomHeight/2,height];

  for (var j = 0; j < markerGroups.length; j++) {
  var mg = markerGroups[j];
  for (var i = 0; i < mg.length; i++) {
    if(mg[i].data.originalY <= mouseY-50){
      mg[i].y = convertToRange(ar1,ar2,mg[i].data.originalY);
    }
    else if(mg[i].data.originalY > mouseY-50 && mg[i].data.originalY <= mouseY+50){
      mg[i].y = convertToRange(br1,br2,mg[i].data.originalY);
    }
    else{
      mg[i].y = convertToRange(cr1,cr2,mg[i].data.originalY);
    }
    }
    }
}

}

function convertToRange(or,nr,val) {
  var oldRange = (or[1] - or[0]);
  var NewRange = (nr[1] - nr[0]);
  var NewValue = (((val - or[0]) * NewRange) / oldRange) + nr[0];
  return NewValue;
}

function handleMouseLeave(event) {
  selection_wrapper.alpha=0;
}
function handleMouseEnter(event) {
  selection_wrapper.alpha=.75;
}

function handleMarkerClick(event){
 var data = event.target.data;
     callBacks.click.call(this,data.loc);
     var fillColor = event.target.data.color.stroke;
     var dummy_marker = new createjs.Shape();
     switch(event.target.data.shape) {
         case "diamond":
           dummy_marker.graphics.clear().beginFill(fillColor).drawPolyStar(10,0,5,4,0);
         break;
         case "hexagon":
           dummy_marker.graphics.clear().beginFill(fillColor).drawPolyStar(10,0,5,6,0);
         break;
         case "square":
           dummy_marker.graphics.clear().beginFill(fillColor).drawRect(6,0-4,8,8);
         break;
         default:
         dummy_marker.graphics.clear().beginFill(fillColor).drawPolyStar(10,0,5,3,0);
         }
         dummy_marker.regX = 10;
         dummy_marker.x = 10;
         event.target.parent.addChild(dummy_marker);
         createjs.Tween.get(dummy_marker,{onComplete:function(){event.target.parent.removeChild(dummy_marker);}})
         .to({ alpha: 0,scale:4}, 300, createjs.Ease.getPowInOut(2));
}
//==================== RETURN =====================
return {
  onClick:function(callBack){
    callBacks.click = callBack;
  }
}
//=== END OF COMPONENT ===
}
