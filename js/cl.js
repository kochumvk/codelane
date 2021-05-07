/*====================================================
__                .__                        __
|  | ______   ____ |  |__  __ __  ________  _|  | __
|  |/ /  _ \_/ ___\|  |  \|  |  \/     \  \/ /  |/ /
|    <  <_> )  \___|   Y  \  |  /  Y Y  \   /|    <
|__|_ \____/ \___  >___|  /____/|__|_|  /\_/ |__|_ \
    \/          \/     \/            \/          \/
====================================================*/

function codeLane(holder,width,height,data,custom_options){
    

    
var options = {
  zoom:{enable:true,mode:"manual",width:100,wedgeHeight:50,targetHeight:100,stroke:"rgba(74,144,226,.4)",fill:"rgba(74,144,226,.05)",text:"rgba(74,144,226,1)"},
  marker:{size:10},
  blade:{height:120,width:20,angle:"vertical",fontSize:11,fontFamily:"Ubuntu Condensed"},
  lane:{width:20,trackColor:"",thickness:""},
  graduation:{color:"",prefix:"LOC:",width:28}
}

options = mergeDeep(options, custom_options);
var zoomControl;
var zoomWedgeHeight = options.zoom.wedgeHeight;
var zoomHeight = options.zoom.targetHeight;
var pointerLabel;
var callBacks = {};
var mouseLeft = false;
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

var laneHeight = height;
  renderZoom();
  prepareLane();

function prepareLane(){
  var lanes = data.lanes;
  for (var j = 0; j < lanes.length; j++) {
    var lane = new createjs.Container();
    lane.x = options.graduation.width+(j*options.lane.width)+5;
    var path = new createjs.Shape();
      path.graphics.clear().s("#F2F2F2").ss(1,"round").moveTo(options.lane.width/2,0);
      path.graphics.lineTo(options.lane.width/2,laneHeight);
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
  marker_wrapper.x = options.lane.width/2;
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
      holder.graphics.clear().s(strokeColor).ss(1,"round").beginFill(fillColor).drawPolyStar(0,0,options.marker.size/2,4,0);
    break;
    case "hexagon":
      holder.graphics.clear().s(strokeColor).ss(1,"round").beginFill(fillColor).drawPolyStar(0,0,options.marker.size/2,6,0);
    break;
    case "square":
      holder.graphics.clear().s(strokeColor).ss(1,"round").beginFill(fillColor).drawRect(-options.marker.size/2,0-options.marker.size/2,options.marker.size,options.marker.size);
    break;
    default:
    holder.graphics.clear().s(strokeColor).ss(1,"round").beginFill(fillColor).drawPolyStar(0,0,options.marker.size/2,3,0);
    }
}

//================= RENDER ZOOM =============
function renderZoom(){
   //     zoom_wrapper = new createjs.Container();
   //     zoom_wrapper.alpha=0;
   // var selection = new createjs.Shape();
   //     selection.graphics.clear().s("#4A90E2").ss(1,"round").beginFill("#ECF3FC").drawRect(0,0,width,options.zoom.targetHeight);
   //       pointer = new createjs.Shape();
   //       pointer.graphics.clear().s("#4A90E2").ss(1,"round").moveTo(0,options.zoom.targetHeight/2);
   //       pointer.graphics.lineTo(5,options.zoom.targetHeight/2);
   //       pointerLabel = new createjs.Text("ggg", "11px Ubuntu Condensed", "#4A90E2");
   //       pointerLabel.x = 7;
   //       pointerLabel.y = (options.zoom.targetHeight/2)-6;
   //     zoom_wrapper.addChild(selection,pointer,pointerLabel);
   //     stage.addChild(zoom_wrapper);
   //     stage.addEventListener("mouseleave", handleMouseLeave);
   //     stage.addEventListener("mouseenter", handleMouseEnter);

       zoomControl = new zoom();

}

function zoom(){
        zoom_wrapper = new createjs.Container();
        zoom_wrapper.alpha=0;
    var wedge_base = new createjs.Shape();
    //options.graduation.width+10+(options.lane.width*data.lanes.length)
        wedge_base.graphics.s(options.zoom.stroke).ss(1,"round").beginFill(options.zoom.fill).drawRect(0,0,options.zoom.width,options.zoom.wedgeHeight);
        wedge_base.y = options.zoom.targetHeight/2 - options.zoom.wedgeHeight/2;
    var zoom_base = new createjs.Shape();
        zoom_base.graphics.s(options.zoom.stroke).ss(1,"round").beginFill(options.zoom.fill).drawRect(0,0,options.zoom.width,options.zoom.targetHeight);
    var zoom_margin = new createjs.Shape();
        zoom_margin.graphics.beginFill(options.zoom.stroke).drawRect(0,0,options.graduation.width,options.zoom.targetHeight);
    var pointer_label_start = new createjs.Text("", "11px Ubuntu Condensed", "white");
        pointer_label_start.x = pointer_label_start.y = 2;
    var pointer_label_end = new createjs.Text("", "11px Ubuntu Condensed", "white");
        pointer_label_end.x = 2;
        pointer_label_end.y = options.zoom.targetHeight - 13;

        pointer = new createjs.Shape();
        pointer.graphics.clear().s(options.zoom.text).ss(1,"round").moveTo(0,options.zoom.targetHeight/2);
        pointer.graphics.lineTo(5,options.zoom.targetHeight/2);
        pointer_label_mid = new createjs.Text("", "11px Ubuntu Condensed", options.zoom.text);
        pointer_label_mid.x = 7;
        pointer_label_mid.y = (options.zoom.targetHeight/2)-6;


     //zoom_wrapper.addChild(zoom_base,zoom_margin,pointer_label_start,pointer_label_end);
     zoom_wrapper.addChild(zoom_base,pointer,pointer_label_mid);

     stage.addChild(zoom_wrapper);
     stage.addEventListener("mouseleave", handleMouseLeave);
     stage.addEventListener("mouseenter", handleMouseEnter);

     return {
       setY:function(currentY){
         zoom_wrapper.y = currentY-(options.zoom.targetHeight/2);
         var x = parseInt((stage.mouseY/window.devicePixelRatio)/locScale);
         pointer_label_start.text = parseInt((currentY / locScale)-(options.zoom.wedgeHeight/locScale));
         pointer_label_end.text = parseInt((currentY / locScale)+(options.zoom.wedgeHeight/locScale));
         pointer_label_mid.text = parseInt((currentY / locScale));
       },
       setAlpha:function(alpha){
         zoom_wrapper.alpha = alpha;
       }

     }
}
//==================== EVENTS =====================
function handleMarkerHover(event){
   var data = event.target.data;
   drawMarker(event.target,data,true);
   var blade_wrapper = new createjs.Container();



       blade_wrapper.y = -(options.blade.width - options.marker.size)/2 - options.marker.size/2;
       blade_wrapper.x = - options.blade.width/2 ;
   var blade = new createjs.Shape();
       blade.graphics.s(data.color.stroke).ss(1,"round").beginFill(data.color.fill).drawRoundRect(0,0,options.blade.width,options.blade.height,2);
   var label = new createjs.Text(data.label, options.blade.fontSize+"px "+options.blade.fontFamily, data.color.stroke);

      var availabletextHeight = options.blade.height - (options.blade.width/2 +options.blade.fontSize/2) -(options.blade.width - options.blade.fontSize)/2 ;
       label.x = options.blade.width/2 +options.blade.fontSize/2;
       label.y = options.blade.width;
       label.rotation = 90;

       var labelMask = new createjs.Shape();
       labelMask.graphics.beginFill("blue").drawRect(0,options.blade.width,options.blade.width,(availabletextHeight*70/100));

       labelMask.visible = false;
       label.mask = labelMask;

   var location = new createjs.Text(data.location, options.blade.fontSize+"px "+options.blade.fontFamily, data.color.stroke);
       location.textAlign = "right";
       location.x = options.blade.width/2 +options.blade.fontSize/2;
       location.y = options.blade.height-(options.blade.width - options.blade.fontSize)/2;
       location.rotation = 90;
       if(label.getBounds().width> (availabletextHeight*70/100)){
         var diff = label.getBounds().width - (availabletextHeight*70/100);
         createjs.Tween.get(label,{loop:true}).to({ y: label.y-diff}, 3000, createjs.Ease.getPowInOut(2));
       }

       blade_wrapper.addChild(blade);
       blade_wrapper.addChild(label);
       blade_wrapper.addChild(labelMask);
       blade_wrapper.addChild(location);
       if(options.blade.angle == "horizontal"){
         blade_wrapper.regX  = options.blade.width;
         blade_wrapper.rotation = 270;
       }else{
         if(height-event.target.parent.y < options.blade.height){
           blade_wrapper.regX = options.blade.width;
           blade_wrapper.rotation = 180;
           blade_wrapper.y = (options.blade.width - options.marker.size)/2 + options.marker.size/2
         }
       }

       event.target.data.blade_wrapper = blade_wrapper;
       event.target.parent.addChild(blade_wrapper);
       event.target.parent.parent.addChild(event.target.parent);
       blade_wrapper.alpha=0;
       createjs.Tween.get(blade_wrapper).to({ alpha: 1}, 300, createjs.Ease.getPowInOut(2));
       event.target.parent.swapChildren( event.target, blade_wrapper);
       event.target.parent.parent.parent.setChildIndex(event.target.parent.parent,event.target.parent.parent.parent.numChildren-1);
       stage.update();
}

function handleMarkerOut(event){
       var data = event.target.data;
           drawMarker(event.target,event.target.data);
          createjs.Tween.get(event.target.data.blade_wrapper,{onComplete:function(){event.target.parent.removeChild(event.target.data.blade_wrapper);}})
      .to({ alpha: 0}, 300, createjs.Ease.getPowInOut(2));
}

function handleMouseMove(event) {
  //pointerLabel.text = parseInt((stage.mouseY/window.devicePixelRatio)/locScale);
  var mouseY = stage.mouseY/window.devicePixelRatio;
  var pointerY = mouseY-options.zoom.targetHeight/2 ;
  if(pointerY <-(options.zoom.targetHeight/2)+8){
    pointerY = -(options.zoom.targetHeight/2)+8;
  }
  else if(pointerY >height-(options.zoom.targetHeight/2)-8){
    pointerY = height-(options.zoom.targetHeight/2)-8
  }

  zoomControl.setY(mouseY);

  if(mouseLeft == false && options.zoom.enable){

  var ar1 = [0,mouseY-options.zoom.wedgeHeight/2];
  var br1 = [mouseY-options.zoom.wedgeHeight/2,mouseY+options.zoom.wedgeHeight/2];
  var cr1 = [mouseY+options.zoom.wedgeHeight/2,height];

  var ar2 = [0,mouseY-options.zoom.targetHeight/2];
  var br2 = [mouseY-options.zoom.targetHeight/2,mouseY+options.zoom.targetHeight/2];
  var cr2 = [mouseY+options.zoom.targetHeight/2,height];

  for (var j = 0; j < markerGroups.length; j++) {
  var mg = markerGroups[j];
  for (var i = 0; i < mg.length; i++) {
    if(mg[i].data.originalY <= mouseY-options.zoom.wedgeHeight/2){
      mg[i].y = convertToRange(ar1,ar2,mg[i].data.originalY);
      mg[i].scale = 1;
    }
    else if(mg[i].data.originalY > mouseY-options.zoom.wedgeHeight/2 && mg[i].data.originalY <= mouseY+options.zoom.wedgeHeight/2){
      mg[i].y = convertToRange(br1,br2,mg[i].data.originalY);
      mg[i].scale = 1;
    }
    else{
      mg[i].y = convertToRange(cr1,cr2,mg[i].data.originalY);
      mg[i].scale = 1;
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
  mouseLeft = true;
  zoomControl.setAlpha(0);
  for (var k = 0; k < markerGroups.length; k++) {
  var mg = markerGroups[k];
  for (var l = 0; l < mg.length; l++) {
      mg[l].y = mg[l].data.originalY;
      }
    }
}
function handleMouseEnter(event) {
  mouseLeft = false;
  zoomControl.setAlpha(1);
}

function handleMarkerClick(event){
 var data = event.target.data;
     callBacks.click.call(this,data.loc);
     var fillColor = event.target.data.color.stroke;
     var dummy_marker = new createjs.Shape();
     switch(event.target.data.shape) {
         case "diamond":
           dummy_marker.graphics.clear().beginFill(fillColor).drawPolyStar(0,0,options.marker.size/2,4,0);
         break;
         case "hexagon":
           dummy_marker.graphics.clear().beginFill(fillColor).drawPolyStar(0,0,options.marker.size/2,6,0);
         break;
         case "square":
           dummy_marker.graphics.clear().beginFill(fillColor).drawRect(-options.marker.size/2,0-options.marker.size/2,options.marker.size,options.marker.size);
         break;
         default:
         dummy_marker.graphics.clear().beginFill(fillColor).drawPolyStar(0,0,options.marker.size/2,3,0);
         }

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
//==================== UTILITY ====================
function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }else{
          target[key] = Object.assign({}, target[key])
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}
//=== END OF COMPONENT ===
}
