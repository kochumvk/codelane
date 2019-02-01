var data0 = {total_loc:800,
  lanes:[
    {markers:[{loc:15,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"15-18"},
              {loc:45,shape:'hexagon',color:{stroke:"#A060AD",fill:"#D7AEDE"},label:"Shotgun Surgery",location:"45"},
              {loc:60,shape:'square',color:{stroke:"#FF8F17",fill:"#FDE5A5"},label:"Memory Leak",location:"60-70"},
              {loc:445,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"445-510"},
              {loc:605,shape:'diamond2',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"605-620"}
    ],name:"Code Issues"},
    {markers:[{loc:200,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"15-18"},
              {loc:250,shape:'hexagon',color:{stroke:"#A060AD",fill:"#D7AEDE"},label:"Shotgun Surgery",location:"45"},
              {loc:300,shape:'square',color:{stroke:"#FF8F17",fill:"#FDE5A5"},label:"Memory Leak",location:"60-70"},
              {loc:350,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"445-510"},
              {loc:400,shape:'diamond2',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"605-620"}
    ],name:"Code Issues"},
    {markers:[{loc:15,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"15-18"},
              {loc:45,shape:'hexagon',color:{stroke:"#A060AD",fill:"#D7AEDE"},label:"Shotgun Surgery",location:"45"},
              {loc:60,shape:'square',color:{stroke:"#FF8F17",fill:"#FDE5A5"},label:"Memory Leak",location:"60-70"},
              {loc:445,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"445-510"},
              {loc:605,shape:'diamond2',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"605-620"}
    ],name:"Code Issues"}
  ]
};

var data1 = {total_loc:620,
  lanes:[
    {markers:[{loc:15,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"15-18"},
              {loc:45,shape:'hexagon',color:{stroke:"#A060AD",fill:"#D7AEDE"},label:"Shotgun Surgery",location:"45"},
              {loc:60,shape:'square',color:{stroke:"#FF8F17",fill:"#FDE5A5"},label:"Memory Leak",location:"60-70"},
              {loc:445,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"445-510"},
              {loc:605,shape:'diamond2',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"605-620"}
    ],name:"Code Issues"},
    {markers:[{loc:200,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"15-18"},
              {loc:250,shape:'hexagon',color:{stroke:"#A060AD",fill:"#D7AEDE"},label:"Shotgun Surgery",location:"45"},
              {loc:300,shape:'square',color:{stroke:"#FF8F17",fill:"#FDE5A5"},label:"Memory Leak",location:"60-70"},
              {loc:350,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"445-510"},
              {loc:400,shape:'diamond2',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"605-620"}
    ],name:"Code Issues"},
    {markers:[{loc:15,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"15-18"},
              {loc:45,shape:'hexagon',color:{stroke:"#A060AD",fill:"#D7AEDE"},label:"Shotgun Surgery",location:"45"},
              {loc:60,shape:'square',color:{stroke:"#FF8F17",fill:"#FDE5A5"},label:"Memory Leak",location:"60-70"},
              {loc:445,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"445-510"},
              {loc:605,shape:'diamond2',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"605-620"}
    ],name:"Code Issues"}
  ]
};

var data2 = {total_loc:2000,
  lanes:[
    {markers:[{loc:15,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"15-18"},
              {loc:45,shape:'hexagon',color:{stroke:"#A060AD",fill:"#D7AEDE"},label:"Shotgun Surgery",location:"45"},
              {loc:60,shape:'square',color:{stroke:"#FF8F17",fill:"#FDE5A5"},label:"Memory Leak",location:"60-70"},
              {loc:445,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"445-510"},
              {loc:605,shape:'diamond2',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"605-620"}
    ],name:"Code Issues"},
    {markers:[{loc:200,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"15-18"},
              {loc:250,shape:'hexagon',color:{stroke:"#A060AD",fill:"#D7AEDE"},label:"Shotgun Surgery",location:"45"},
              {loc:300,shape:'square',color:{stroke:"#FF8F17",fill:"#FDE5A5"},label:"Memory Leak",location:"60-70"},
              {loc:350,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"445-510"},
              {loc:400,shape:'diamond2',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"605-620"}
    ],name:"Design Issues"},
    {markers:[{loc:15,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"15-18"},
              {loc:45,shape:'hexagon',color:{stroke:"#A060AD",fill:"#D7AEDE"},label:"Shotgun Surgery",location:"45"},
              {loc:60,shape:'square',color:{stroke:"#FF8F17",fill:"#FDE5A5"},label:"Memory Leak",location:"60-70"},
              {loc:445,shape:'diamond',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"445-510"},
              {loc:605,shape:'diamond2',color:{stroke:"#D35353",fill:"#F1CBCB"},label:"Bug",location:"605-620"}
    ],name:"Bugs"}
  ]
};


function init() {
  var cl = new codeLane("lane_holder",100,800,data0);
  cl.onClick(function (loc) {console.log("Navigate code to :"+loc) });
}
