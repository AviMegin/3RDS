//fetching the data

// async function Users() {
//     let response = await fetch('https://i430712.hera.fhict.nl/Program/leaderboard/api/post.php')
//     let users = await response.json()
//     localStorage.setItem("quentinTarantino", JSON.stringify(users));

// }

// var retrievedData = localStorage.getItem("quentinTarantino");
// var myArray = JSON.parse(retrievedData);



// var myArray = []


fetch("https://i430712.hera.fhict.nl/Program/leaderboard/api/post.php").then(
    function(u) { return u.json(); }
).then(
    function(json) {
        data_function(json); //calling and passing json to another function data_function
    }
)

//another functions
function data_function(data) {
    var myArray = data;



    //adding new user
    var newId = 4
        //json for new user
    var newUser = {
        'name': null,
        'id': newId,
        'points': null
    }
    $('#add-test').on('click', function() {
        $('.form-wrapper').removeClass('hidden')
    })


    $('#test-result').on('keyup', function() {
        newUser.points = $(this).val()
        console.log(newUser)

    })

    $('#test-name').on('change', function() {
        newUser.name = $(this).val()
        console.log(newUser)
    })

    $('#create-test').on('click', function() {
            if (newUser.name == null) {
                alert('no input')
            } else {
                myArray.push({
                    newUser
                });
                console.log(newUser)
                $('#test-name').val('')
                $('#test-result').val('')
                addUser(newUser)

                $('.form-wrapper').addClass('hidden')
            }
        })
        //le data
        //    fetch("")
        //        .then((response) => response.json())
        //        .then(data => obj = data)
        //        .then(() => console.log(obj))
        //    var myArray = obj;


    //order by desc or asc event click
    $('th').on('click', function() {
        var column = $(this).data('column')
        var order = $(this).data('order')
        var text = $(this).html()
        text = text.substring(0, text.length - 1)

        if (order == 'desc') {
            $(this).data('order', "asc")
            myArray = myArray.sort((a, b) => a[column] > b[column] ? 1 : -1)
            text += '&#9660'

        } else {
            $(this).data('order', "desc")
            myArray = myArray.sort((a, b) => a[column] < b[column] ? 1 : -1)
            text += '&#9650'

        }
        $(this).html(text)
        buildTable(myArray)
    })

    //search bar

    $('#search-input').on('keyup', function() {
            var value = $(this).val()
            console.log(value) //console logging everything in input

            var data = searchTable(value, myArray)



            buildTable(data)
        })
        //search function

    function searchTable(value, data) {
        var filterData = []
        for (var i = 0; i < data.length; i++) {
            value = value.toLowerCase() //so search doesnt filter on caps
            var name = data[i].name.toLowerCase()
            if (name.includes(value)) {
                filterData.push(data[i])

            }

        }

        return filterData
    }

    //add single new user
    function addUser(newUser) {
        var table = document.getElementById('myTable')
        var counter = 21
        var row = `<tr class="row-${counter}" id="row">
                           <td>${counter}</td>
                           <td>${newUser.name}</td>
                           <td>${newUser.points}</td>
                           <td>
                               <button onclick="deleteTest(${counter})" class="delete delete-${counter}">Delete</button>
                               <button onclick="edit(${counter})" class="Edit edit-${counter}">Edit</button>
                               
                               </td>
                     </tr>`
        table.innerHTML += row
        counter++;

    }

    buildTable(myArray)

    //build the entire table
    function buildTable(data) {
        var table = document.getElementById('myTable')
        var counter = 1;
        table.innerHTML = ''
        for (var i = 0; i < data.length; i++) {
            var row = `<tr class="row-${counter}" id="row">
                           <td>${counter}</td>
                           <td id="result-${counter}">${data[i].name}</td>
                           <td id="result-${counter}">${data[i].points}</td>
                           <td>
                               <button onclick="deleteTest(${counter})" class="delete delete-${counter}">Delete</button>
                               <button onclick="edit(${counter})" class="Edit edit-${counter}" disabled>Save</button>
                               
                               </td>
                     </tr>`
                //    
            table.innerHTML += row
            counter++;
        }
    }
}
//edit
function edit(number) {
    var row = number
    console.log(row);
    var editBtn = $(`.row-${row}`)
    editBtn.addClass('hidden')

}
//delete row
function deleteTest(number) {
    var row = number

    var deleteBtn = $(`.row-${row}`)
        // cancelBtn.removeClass('hidden')
    deleteBtn.addClass('hidden')
    console.log(row);
}