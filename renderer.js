// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// Setup clicl events
$(".tTag").click(function(e) {
    console.log('click!: ' + e);
    if ($("#myChart").hasClass("hide")) {
        $("#myChart").removeClass("hide");
        $("#temp").addClass("hide");

        createChart();
    } else {
        $("#myChart").addClass("hide");
        $("#temp").removeClass("hide");

        $("#myChart").html = "";
    }
});

function createChart() {
    var ctx = document.getElementById("myChart").getContext('2d');
    var data = getData();

    if (data.length < 2) return;

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data[0],
            datasets: [{
                label: '# of Votes',
                data: data.slice(1),
                /*
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ], */
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        //beginAtZero: true
                    }
                }]
            }
        }
    });
}

function getData() {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('data.db');

    var result;

    db.serialize(function() {
        
        var sql = "SELECT `time`,`tag_2` FROM `data` WHERE `time` < 1178763400;";
        
        db.all(sql, function(err, rows) {
            console.log(rows.length);
            result = rows;
        });
      });
       
      db.close();
      return result;
}