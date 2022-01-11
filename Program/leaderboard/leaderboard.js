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
       newUser.result = $(this).val()
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
   var myArray = [{
           "name": "Mickey Mouse",
           "points": 10
       }, {
           "name": "Donald Duck",
           "points": 34
       }, {
           "name": "Rick Roll",
           "points": 15
       }, {
           "name": "Winnie the Pooh",
           "points": 32
       }, {
           "name": "Harley Quinn",
           "points": 13
       }, {
           "name": "Johnny Bravo",
           "points": 7
       }, {
           "name": "Cristiano Ronaldo",
           "points": 64
       }, {
           "name": "Weighted Companion Cube",
           "points": 115
       }, {
           "name": "The Huddle",
           "points": 34
       }, {
           "name": "Peter Pan",
           "points": 29
       }, {
           "name": "Dirk Gentley",
           "points": 28
       }, {
           "name": "Arthur Ford",
           "points": 61
       }, {
           "name": "Towelie",
           "points": 111
       }, {
           "name": "Eric Cartman",
           "points": 35
       }, {
           "name": "Peter Griffith",
           "points": 89
       }, {
           "name": "Stewie Griffith",
           "points": 5
       }, {
           "name": "Invader Zim",
           "points": 39
       }, {
           "name": "Girrrrr",
           "points": 48
       }, {
           "name": "Woody",
           "points": 44
       }, {
           "name": "Todd Sweeney",
           "points": 26
       }]
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


   function buildTable(data) {
       var table = document.getElementById('myTable')
       var counter = 1;
       table.innerHTML = ''
       for (var i = 0; i < data.length; i++) {
           var row = `<tr class="row-${counter}" id="row">
                           <td>${counter}</td>
                           <td>${data[i].name}</td>
                           <td>${data[i].points}</td>
                           <td>
                               <button onclick="deleteTest(${counter})" class="delete delete-${counter}">Delete</button>
                               <button onclick="edit(${counter})" class="Edit edit-${counter}">Edit</button>
                               
                               </td>
                     </tr>`
           table.innerHTML += row
           counter++;





       }


   }

   function edit(number) {
       var row = number
       console.log(row);
       var editBtn = $(`#edit-${row}`)
       editBtn.addClass('hidden')

   }

   function deleteTest(number) {
       var row = number
       var line = $(`.row-${row}`)
       var deleteBtn = $(`#delete-${row}`)
           // cancelBtn.removeClass('hidden')
       deleteBtn.addClass('hidden')
       console.log(row);
   }