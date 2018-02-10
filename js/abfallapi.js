$('document').ready(function() {
    setStreets();
    moment.locale("de-DE");

    $('#streets').on('change', function(e){
        setWasteAppointments($('#streets').val());
    })
})

var setStreets = function(streets) {
    $.ajax({
        url: 'https://abfallapi20180209115402.azurewebsites.net/api/appointments/streets',
        dataType: 'json',
        success: function( response ) {
            appendOptions(response);
        }
    });  
}

var appendOptions = function(options) {
    appendOption(null, "Bitte eine Straße auswählen");
    Object.keys(options).forEach(key => { 
        appendOption(key,options[key]);
    })
    $('#streets').chosen();
}

var appendOption = function(key, value) {
    $('#streets').append(new Option(value, key));
}

var setWasteAppointments = function(id) {
    $.ajax({
        url: 'https://abfallapi20180209115402.azurewebsites.net/api/appointments?id=' + id,
        dataType: 'json',
        success: function( response ) {
            $('#main table').show();
            appendWasteAppointments(response['wasteAppointments'])
        }
    });      
}

var appendWasteAppointments = function(appointments) {
    $('#next-waste-appointments').empty();
    for(var i = 0; i < appointments.length; i++) {
        appendAppointment(appointments[i]);
    }
}

var appendAppointment = function(appointment) {
    var date = moment(appointment["date"]);
    var daysTill = moment(appointment["date"]).add(1, 'days').fromNow();
    console.log(date);
    $('#next-waste-appointments').append('<tr class="' + appointment["cssClass"] + '"><td><i class="fas fa-trash"></i></td><td>' + appointment["name"] + "</td><td>" + date.format("dddd") + '</td><td>' + date.format("D. MMMM") + '</td><td>' + daysTill + '</td></tr>');
}