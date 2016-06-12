$( document ).ready(function() {

  $('#relationship-button').click(function() {
    var x1 = $('#x1').val();
    var y1 = $('#x1').val();
    var width1 = $('#width1').val();
    var height1 = $('#height1').val();
    var x2 = $('#x2').val();
    var y2 = $('#x2').val();
    var width2 = $('#width2').val();
    var height2 = $('#height2').val();

    var rectangles = [];
    var rectangle1 = {x: x1, y: y1, height: height1 , width: width1};
    rectangles.push(rectangle1);
    var rectangle2 = {x: x2, y: y2, height: height2 , width: width2};
    rectangles.push(rectangle2);
    var request = {rectangles: rectangles}

    console.log(JSON.stringify(request));
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/relationship",
      data: JSON.stringify(request),
      success: function( data ) {
        var relationship = data['data']['relationship'];
        console.log(relationship);
        var relationshipType = "Unknown!";
        var relationshipMessage = "Congratulations you found a bug :(";
        if(relationship == 'INTERCEPTS') {
          relationshipType = "Intercepting";
          relationshipMessage = "Some portion of the rectangle is inside the other rectangle";
        } else if(relationship == 'CONTAINS') {
          relationshipType = "Enclosing";
          relationshipMessage = "The whole rectangle is inside the other rectangle, touching counts";
        } else if(relationship == 'ADJACENT') {
          relationshipType = "Adjacent";
          relationshipMessage = "One of the sides of the rectangle is touching the other rectangle";
        } else if(relationship == 'DISTANT') {
          relationshipType = "Distant";
          relationshipMessage = "These rectangles do not like each other and are far away";
        }
        $('#relationship-type').text(relationshipType);
        $('#relationship-text').text(relationshipMessage);
        $('#relationship-alert').removeClass('alert-info').removeClass('alert-danger').addClass('alert-success');
      },
      error: function() {
        console.log("FAILED");
        $('#relationship-type').text("Invalid Input!!!");
        $('#relationship-text').text("Inputs must be numeric and widths and heights must be greater than 0");
        $('#relationship-alert').removeClass('alert-info').removeClass('alert-success').addClass('alert-danger');
      },
      contentType: "application/json",
      dataType: "json",
    });

  });
});
