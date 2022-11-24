
let unregisterFilterEventListener = null;
let unregisterMarkSelectionEventListener = null;
let worksheet = null;
let worksheetName = null;
let categoryColumnNumber = null;
let valueColumnNumber = null;





$(document).ready(function () {
   tableau.extensions.initializeAsync().then(function () {
      // Draw the chart when initialising the dashboard.
      getSettings();
      drawChartJS();
      // Set up the Settings Event Listener.
      unregisterSettingsEventListener = tableau.extensions.settings.addEventListener(tableau.TableauEventType.SettingsChanged, (settingsEvent) => {
         // On settings change.
      getSettings();
       drawChartJS();
      });
   }, function () { console.log('Error while Initializing: ' +err.toString()); });
});









function getSettings() {
   // Once the settings change populate global variables from the settings.

   const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

   var worksheet = worksheets.find(function (sheet) {
     return sheet.name === "fraud";
   });

   // If settings are changed we will unregister and re register the listener.
   if (unregisterFilterEventListener != null) {
      unregisterFilterEventListener();
   }

   // If settings are changed we will unregister and re register the listener.
   if (unregisterMarkSelectionEventListener != null) {
      unregisterMarkSelectionEventListener();
   }

   // Get worksheet


   // Add listener
   unregisterFilterEventListener = worksheet.addEventListener(tableau.TableauEventType.FilterChanged, (filterEvent) => {
      drawChartJS();
   });

   unregisterMarkSelectionEventListener = worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, (filterEvent) => {
      drawChartJS();
   });
}




function drawChartJS() {

   const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

   var worksheet = worksheets.find(function (sheet) {
     return sheet.name === "fraud";
   });

   

   worksheet.getSummaryDataAsync().then(function (sumdata) {
     
     const RoundTime = 0,
           UserId = 5,
           UserName= 6,
           CompanyCode = 1;
           RoundID = 2,
           GameType = 4,
           BetPosition = 7,
           DealerName = 3,
           TableName = 6,
           BetEUR = 8,
           NetEUR = 9;

           let RoundSkipp = 0;
           let ShortBreak = 0;
           let LongBreak = 0;
           let SequentialGame = 0;

           let indexStart,
               indexNext;
          
           let TotalBet = 0;
           let TotalNet = 0;

           let RoundArry= [];
           let RoundArry2= [];
           let RatioArry= [];

            let totaltest = 0;
            var worksheetData = sumdata.data;
     
            let DealerArry =[];
            let BetPositionArry =[];
            let TableArry = [];



function Trigger(){

  $('.UserName').text(worksheetData[0][UserId].formattedValue);
  $('.CompanyCode').text(worksheetData[0][CompanyCode].formattedValue);

  for (var i = 0; i < worksheetData.length; i++) {

    indexStart = i;
      
    if(i == worksheetData.length - 1){

      indexNext =  worksheetData.length -1


    }else{
      indexNext = i + 1
    }
                              
    if(worksheetData.length > 4){
    //  BreakCounter(indexStart,indexNext)
    }
    totalCounter(indexStart)
    RoundTotla(indexStart,indexNext)
  }

}
Trigger();

  function totalCounter(indexStart){
//Tableau Bet and Net messure Sum
   TotalBet += worksheetData[indexStart][BetEUR].value;
   TotalNet += worksheetData[indexStart][NetEUR].value;

  }

  let Margin = TotalNet / TotalBet * 100;
  console.log("Margin : " + Margin)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $('.Totalbet').text("€ " + TotalBet.toFixed(2));
  $('.Totalnet').text("€ " + TotalNet.toFixed(2));
  $('.Margin').text(Margin.toFixed(2) + "%");
  $('.margin-bar').css('width', Margin.toFixed(2) + "%");




/*

  function BreakCounter(indexStart,indexNext){

   // console.log("start index " + indexStart)
 //   console.log("end index "+ indexNext)

   //console.log(worksheetData[0][UserId])

    var startTime=moment(worksheetData[indexStart][RoundTime].formattedValue, "DD-MM-YYYY HH:mm:ss a");
    var endTime=moment(worksheetData[indexNext][RoundTime].formattedValue, "DD-MM-YYYY HH:mm:ss a");
    var duration = moment.duration(endTime.diff(startTime));
    var hours = parseInt(duration.asHours());
    var minutes = parseInt(duration.asMinutes())-hours*60;

//    console.log((hours + ' hour and '+ minutes+' minutes.'))
       
   //    var result = endTime.diff(startTime, 'hours') + " Hrs and " +     
   //                     endTime.diff(startTime, 'minutes') + " Mns";
//SKIP
      if(hours == 0 && minutes > 2 && minutes <= 10 && worksheetData[indexStart][RoundID].formattedValue !== worksheetData[indexNext][RoundID].formattedValue){
        RoundSkipp += 1;
        $('.skipcnt').text("format");
        $('.break-Heat-Map').append('<div class="badge-sqr badge-skip-c"></div>')
//SHORT        
      }else if(hours == 0 && minutes > 10 && minutes <= 30 && worksheetData[indexStart][RoundID].formattedValue !== worksheetData[indexNext][RoundID].formattedValue){
        ShortBreak += 1;
        $('.break-Heat-Map').append('<div class="badge-sqr badge-short-c"></div>')
//LONG        
      }else if(hours >= 1 || minutes >= 31 && worksheetData[indexStart][RoundID].formattedValue !== worksheetData[indexNext][RoundID].formattedValue){
        LongBreak += 1;
        $('.break-Heat-Map').append('<div class="badge-sqr badge-long-c"></div>')
// Sequential        
      }else if(worksheetData[indexStart][RoundID].formattedValue !== worksheetData[indexNext][RoundID].formattedValue || indexStart == 0){
        SequentialGame += 1;
        $('.break-Heat-Map').append('<div class="badge-sqr badge-sql-c"></div>')
      }

   $('.skipcnt').text(RoundSkipp);
  $('.shortcnt').text(ShortBreak);
  $('.longcnt').text(LongBreak);
  $('.seqcnt').text(SequentialGame);


              
  }


*/

function RoundTotla(indexStart,indexNext){

  let index = RoundArry.findIndex(object => object.RoundId === worksheetData[indexStart][RoundID].formattedValue);
  let index2 = DealerArry.findIndex(object => object.DealerName === worksheetData[indexStart][DealerName].formattedValue);
  let index3 = BetPositionArry.findIndex(object => object.BetPosition === worksheetData[indexStart][BetPosition].formattedValue);
  let index4 = TableArry.findIndex(object => object.TableName === worksheetData[indexStart][TableName].formattedValue);

  if (index === -1) {

    RoundArry.push({
      RoundId: worksheetData[indexStart][RoundID].formattedValue,
      TotalRoundBet: 0,
      TotalRoundNet:0,
      DealerName: worksheetData[indexStart][DealerName].formattedValue,
      TableName: worksheetData[indexStart][TableName].formattedValue,
      Margin: 0,
      RoundTime: worksheetData[indexStart][RoundTime].formattedValue

    })
  }
  
  if (index2 === -1) {
    DealerArry.push({
      DealerName: worksheetData[indexStart][DealerName].formattedValue,
      TotalBet: 0,
      TotalNet:0,
      RoundCount :0

    })
  }

////// IF INCLUDES

/*
  const sentence = 'The quick brown foxxxx jumps over the lazy dog.';

  const word = 'fox';
  
  //console.log(`The word "${word}" ${sentence.includes(word) ? 'is' : 'is not'} in the sentence`);
  // expected output: "The word "fox" is in the sentence"
  if(sentence.includes(word) == true){
  console.log("hellow")
  }
*/
  if (index3 === -1) {

    let word = "asdads"

    let Category = ["Split","Black","Red",];
    let BetPositionT = worksheetData[indexStart][BetPosition].formattedValue;
    if(BetPositionT.includes(word) == true){

    }
    BetPositionArry.push({
      BetPosition: worksheetData[indexStart][BetPosition].formattedValue,
      TotalBet: 0,
      TotalNet:0,
      RoundCount :0,


    })
  }



  let element = RoundArry.find(e => e.RoundId === worksheetData[indexStart][RoundID].formattedValue);
  if (element) {
    element.TotalRoundBet += worksheetData[indexStart][BetEUR].value;
    element.TotalRoundNet += worksheetData[indexStart][NetEUR].value;
}

let element2 = DealerArry.find(e => e.DealerName === worksheetData[indexStart][DealerName].formattedValue);
if (element2 ) {
  element2.TotalBet += worksheetData[indexStart][BetEUR].value;
  element2.TotalNet += worksheetData[indexStart][NetEUR].value;
 
}

let element3 = BetPositionArry.find(e => e.BetPosition === worksheetData[indexStart][BetPosition].formattedValue);
if (element3 ) {
  element3.TotalBet += worksheetData[indexStart][BetEUR].value;
  element3.TotalNet += worksheetData[indexStart][NetEUR].value;
  element3.RoundCount += 1;
 
}

}


console.log(BetPositionArry)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function BreakCounter(){

  // console.log("start index " + indexStart)
//   console.log("end index "+ indexNext)

  //console.log(worksheetData[0][UserId])

  for(i = 0; i < RoundArry.length; i++){

    let indexStart = i;
    let indexNext = 0;
      
    if(i == RoundArry.length - 1){

      indexNext =  RoundArry.length -1


    }else{
      indexNext = i + 1
    }
    
    var startTime=moment(RoundArry[indexStart].RoundTime, "DD-MM-YYYY HH:mm:ss a");
    var endTime=moment(RoundArry[indexNext].RoundTime, "DD-MM-YYYY HH:mm:ss a");
    var duration = moment.duration(endTime.diff(startTime));
    var hours = parseInt(duration.asHours());
    var minutes = parseInt(duration.asMinutes())-hours*60;

 
 //    console.log((hours + ' hour and '+ minutes+' minutes.'))
       
   //    var result = endTime.diff(startTime, 'hours') + " Hrs and " +     
   //                     endTime.diff(startTime, 'minutes') + " Mns";
 //SKIP
      if(hours == 0 && minutes > 2 && minutes <= 10 && RoundArry[indexStart].RoundId !== RoundArry[indexNext].RoundId){
        RoundSkipp += 1;
        $('.skipcnt').text("format");
        $('.break-Heat-Map').append('<div class="badge-sqr badge-skip-c"></div>')
 //SHORT        
      }else if(hours == 0 && minutes > 10 && minutes <= 30 &&  RoundArry[indexStart].RoundId !== RoundArry[indexNext].RoundId){
        ShortBreak += 1;
        $('.break-Heat-Map').append('<div class="badge-sqr badge-short-c"></div>')
 //LONG        
      }else if(hours >= 1 || minutes >= 31 &&  RoundArry[indexStart].RoundId !== RoundArry[indexNext].RoundId){
        LongBreak += 1;
        $('.break-Heat-Map').append('<div class="badge-sqr badge-long-c"></div>')
 // Sequential        
      }else if( RoundArry[indexStart].RoundId !== RoundArry[indexNext].RoundId || indexStart == 0){
        SequentialGame += 1;
        $('.break-Heat-Map').append('<div class="badge-sqr badge-sql-c"></div>')
      }
 
      
   $('.skipcnt').text(RoundSkipp);
  $('.shortcnt').text(ShortBreak);
  $('.longcnt').text(LongBreak);
  $('.seqcnt').text(SequentialGame);
 
  let indexID = i + 3
  let CurrentSqe = $(".badge-sqr")[indexID];


if(RoundArry[indexStart].TotalRoundNet > 0.0){
  console.log("Win")
}


  }
 
let SkippProcent = RoundSkipp / RoundArry.length * 100;
let ShortProcent = ShortBreak / RoundArry.length * 100;
let LongProcent = LongBreak / RoundArry.length * 100;
let SequentialProcent = SequentialGame / RoundArry.length * 100;
//$('.WinProcent').text(WinProcent.toFixed(2) + "%");
//$('.WinProcent-bar').css('width', WinProcent.toFixed(2) + "%");
let BetContinuty;
let BetContinuty2;

if(RoundArry.length  <= 10){
  BetContinuty = "Short Session"
}else if (SkippProcent <= 5 && RoundArry.length >= 11){
  BetContinuty = "Mainly sequentail"
}else if (SkippProcent > 5 && RoundArry.length >= 11){
  BetContinuty = "Mainly sequentail games, however at some passages skips rounds"
}else if (RoundArry.length == 1){
  BetContinuty = "Only One game round held"
}

if(RoundArry.length == 1){
  BetContinuty2 = "Only one game round held"
}else if (ShortBreak == 1 && LongBreak == 0){
  BetContinuty2 = "One short break"
}else if (ShortBreak == 2 && LongBreak == 0 ){
  BetContinuty2 = "Two short break"
}else if (ShortBreak > 3 && LongBreak == 0 ){
  BetContinuty2 = "Several short breaks"
}else if (LongBreak == 1 && ShortBreak == 0 ){
  BetContinuty2 = "One long break"
}else if (LongBreak == 2 && ShortBreak == 0 ){
  BetContinuty2 = "Two long break"
}else if (LongBreak > 3 && ShortBreak == 0 ){
  BetContinuty2 = "Several long break"
}else if (LongBreak == 1 && ShortBreak == 1 ){
  BetContinuty2 = "One short and one long break"
}else if (LongBreak == 2 && ShortBreak == 2 ){
  BetContinuty2 = "Two short and two long break"
}else if (LongBreak > 2 && ShortBreak > 2 ){
  BetContinuty2 = "Several long and short"
}else if (LongBreak == 1 && ShortBreak ==  2 ){
  BetContinuty2 = "One long and two short breaks"
}else if (LongBreak == 2 && ShortBreak ==  1 ){
  BetContinuty2 = "Two long and one short break"
}
else if (LongBreak == 1 && ShortBreak ==  2 ){
  BetContinuty2 = "Two short and one long break"
}

    console.log(SkippProcent) 
   // Betcontinuty    
    $('.Betcontinuty').text(BetContinuty);    
    
    $('.Betcontinuty2').text(BetContinuty2); 
 }
 BreakCounter()
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log(RoundArry)
console.log(BetPositionArry)

//const results = RoundArry.filter(({ DealerName: id1 }) => !DealerArry.some(({ DealerName: id2 }) => id2 === id1));


let WinRoundCnt = 0;
let LossRoundCnt = 0;
let TieRoundCnt = 0;

function RoundTotals (){

  

  for(let i = 0; i < RoundArry.length; i++){
    if(RoundArry[i].TotalRoundNet > 0){
      WinRoundCnt += 1;
    }else if(RoundArry[i].TotalRoundNet < 0){
      LossRoundCnt += 1;
    }else{
      TieRoundCnt += 1;
    }

  }


}

RoundTotals ()

///////////////////////////////////////////////////
$('.total-round-cnt').text(RoundArry.length)
$('.win-round-cnt').text(WinRoundCnt)
$('.loss-round-cnt').text(LossRoundCnt)
$('.tie-round-cnt').text(TieRoundCnt)



let WinProcent = WinRoundCnt / RoundArry.length * 100;
$('.WinProcent').text(WinProcent.toFixed(2) + "%");
$('.WinProcent-bar').css('width', WinProcent.toFixed(2) + "%");



// output = [3,7,5,2]
  // console.log(RoundArry2)


   // let result = RoundArry.map(a => a.RoundId);
   // console.log(RoundArry.map(a => a.RoundId))
   // console.log(RoundArry.map(a => a.TotalRoundBet))
   //console.log(RoundArry)

function DealerTop (){

  for(x = 0; x < RoundArry.length; x++){
    RoundTop(x)
    let element = DealerArry.find(e => e.DealerName === RoundArry[x].DealerName);
if (element ) {
  element.RoundCount += 1;
}
  }

  for(i = 0; i < DealerArry.length; i++){

    $(".DealerTop").append(`
    <tr>
      <td>` + DealerArry[i].DealerName + `</td>
      <td>` + DealerArry[i].TotalBet.toFixed(2) + `</td>
      <td>` + DealerArry[i].TotalNet.toFixed(2) + `</td>
      <td>`+ DealerArry[i].RoundCount +` </td>
      <td>`+ (DealerArry[i].TotalNet.toFixed(2) /  DealerArry[i].TotalBet.toFixed(2) * 100).toFixed(2) +` </td>
      </tr>
      `
    )



  }

  $('.table-DealerTop').DataTable()
  $('.table-roundTop').DataTable()
}

function RoundTop(x){

  $(".RoundTop").append(`
  <tr>
    <td>` + RoundArry[x].RoundId + `</td>
    <td>` + RoundArry[x].TotalRoundBet.toFixed(2) + `</td>
    <td>` + RoundArry[x].TotalRoundNet.toFixed(2) + `</td>
    <td>`+ (RoundArry[x].TotalRoundNet.toFixed(2) /  RoundArry[x].TotalRoundBet.toFixed(2) * 100).toFixed(2)+` % </td>
    <td>
        <div class="d-flex align-items-center">
            <span class="badge badge-success badge-dot m-r-10"></span>
            <span>Approved</span>
        </div>
    </td>
    </tr>
    `
  )

}

DealerTop ()


function BetPositionTop(){
  
  for(i = 0; i < BetPositionArry.length ; i++){

  


    $(".BetPosTop").append(`
      <tr>
                                          <td>`+ BetPositionArry[i].BetPosition + `</td>
                                            <td>` + BetPositionArry[i].TotalBet.toFixed(2) +`</td>
                                                <td>` + BetPositionArry[i].TotalNet.toFixed(2) +`</td>
                                                <td>`+ (BetPositionArry[i].TotalNet.toFixed(2) /  BetPositionArry[i].TotalBet.toFixed(2) * 100).toFixed(2)+` % </td>
                                                <td>` + BetPositionArry[i].RoundCount +`</td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <span class="badge badge-success badge-dot m-r-10"></span>
                                                        <span>Approved</span>
                                                    </div>
                                                </td>
                                            </tr>
    `)
  }
  $('.table-bettop').DataTable()

}


BetPositionTop()

  $("#bar-chart").remove();

  $(".roulette-container").append('<canvas id="bar-chart" style="height: 168px;" ></canvas>');
  $(".roulette-container2").append('<canvas id="bar-chart2" style="height: 80px;" ></canvas>');

  new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: RoundArry.map(a => a.RoundId),
      datasets: [
        {
          barPercentage: 0.9,
          categoryPercentage: 1,
          label: "Bet Amount Eur",
          backgroundColor: ["#5903af",],
         data: RoundArry.map(a => a.TotalRoundBet)
         //          data: RoundArry.map(a => a.TotalRoundBet)
        }
      ]
    },
    options: {

      responsive: true,
      maintainAspectRatio: false,
      scales:{
        x:{
            display: false,
          grid:{
            display: false
          }
        },
        y:{
          display: false,
          grid:{
              display: false
          }
        }
      },

      

      
      legend: 'none',
      title: {
        display: true,
        text: 'Bet Amount Eur'
      },
      plugins:{
        legend:{
          display: false
        }
      }
    },

    
      
  });

  








     

     



      

    
     



     
   });


  
 }




 






