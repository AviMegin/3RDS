var req;
req = new XMLHttpRequest();
req.open("GET", 'https://i430712.hera.fhict.nl/Program/leaderboard/api/post.php', true);
req.send();

req.onload = function() {
    var json = JSON.parse(req.responseText);

    //limit data called
    var son = json.filter(function(val) {
        return (val.id >= 4);
    });

    var html = "";

    //loop and display data
    son.forEach(function(val) {
        var keys = Object.keys(val);

        html += "<div class = 'cat'>";
        keys.forEach(function(key) {
            html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
        });
        html += "</div><br>";
    });

    //append in message class
    document.getElementsByClassName('message')[0].innerHTML = html;
};