$(document).on("click", "#getComments", function () {
    var thisId = $(this).attr("data-id");
    $("#commentsModalBody").empty();
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    }).then(function (data) {
      $("#commentsTitle").text(data.title);
      $("#commentsModalBody").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#commentsModalBody").append("<button data-id='" + data._id + "' id='savenote' data-dismiss='modal'>Save Note</button>");    
    });  
  });
  
  $(document).on("click", "#viewComments", function () {
    var thisId = $(this).attr("data-id");
    $("#viewCommentsModalBody").empty();
    $("#viewCommentsTitle").empty();
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    }).then(function (data) {
      $("#viewCommentsTitle").text(data.title);
      $("#viewCommentsTitle").append("<h5>Comments</h5>");
      for (var i = 0; i < data.comments.length; i++) {
        var currentComment = data.comments[i];
        var singleComment = $("<p>");
        singleComment.append(currentComment.body);
        singleComment.append("<button data-id='"+ data._id + "' comment-id='" + data.comments[i]._id + "' id='deleteComment'>X</button>");
        $("#viewCommentsModalBody").append(singleComment);
      }
    }); 
    
  });
  // When you click the savenote button
  $(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function (data) {
        console.log(data);   
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  
  $(document).on("click", "#deleteComment", function () {
    var commentId = $(this).attr("comment-id");
    var dataId = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/articles/remove/"+dataId+"/"+commentId
    }).then(function(data){
      console.log(data);
      $("[comment-id='"+commentId+ "']").parent().empty();
    })
  });
  
  