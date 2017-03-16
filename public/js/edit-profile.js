$(document).ready(initializePage);

function initializePage() {
  $("input[type='image']").click(function(e) {
    e.preventDefault();
    $("input[type='file']").click();
  });

  $.get('/data', addData);

  $("#img-selector").change(function(){
    readURL(this);
  });
}

function addData(result) {
  var user = result.students[0];
  var years = ['', '1st', '2nd', '3rd', '4th', '5th+'];
  for (let year of years) {
    $('#inputYear').append('<option>' + year + '</option>');
    if (user.year === year)
      $('#inputYear option').last().attr('selected', 'selected');
  }
  var locations = ['', 'On-campus', 'Off-campus'];
  for (let loc of locations) {
    $('#inputLocation').append('<option>' + loc + '</option>');
    if (user.location === loc)
      $('#inputLocation option').last().attr('selected', 'selected');
  }
  var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  for (let day of days) {
    let from = $('#input' + day + 'From');
    let to = $('#input' + day + 'To');
    from.timepicker({ defaultTime : user.availability[day][0] || false });
    to.timepicker({ defaultTime : user.availability[day][1] || false });
    let fromCallback = function() {
      if (!checkTimes(from, to))
        from.val('');
     };
     let toCallback = function() {
       if (!checkTimes(from, to))
         to.val('');
      };
    from.change(fromCallback);
    to.change(toCallback);
  }
}

function checkTimes(from, to) {
  var fromValue = Date.parse(from.val());
  var toValue = Date.parse(to.val());
  if (fromValue && toValue)
   return fromValue.getTime() < toValue.getTime();
  return true;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.edit-image').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
