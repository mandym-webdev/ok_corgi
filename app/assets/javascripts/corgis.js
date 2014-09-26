var OkCorgiApp = function() {

  function createCorgiThumbnail() {
    // Create new thumbnail list item from active corgi
    var corgiEl = $("li.corgi.active");
    var img = corgiEl.find("img").attr("src");
    var name = corgiEl.find("h3").text();

    var newEl = $("<li class=\"corgi\"><h4>" + name + "</h4><img src=\"" + img + "\" class=\"pic\" /></li>");

    return newEl;
  }

  function showNextCorgi() {
    var currentCorgiEl = $("li.corgi.active");

    if (currentCorgiEl.next().length > 0) {
      // Remove the class of hidden from the next corgi
      currentCorgiEl.next().removeClass("hidden").addClass("active");
    }
    else {
      alert("No more Corgis!");
    }

    // Remove active corgi from candidates
    currentCorgiEl.remove();
  }

  // When paw right is clicked
  $(".choose-corgi").on("click", function() {

    var elId = $(this).attr("id");
    var containerSelector = "";
    var match = "";
    var corgiId = $("li.active").attr("data-id");

    if (elId === "paw-left") {
      containerSelector = "#misses";
      match = "false"
    }
    else {
      containerSelector = "#matches";
      match = "true"
    }

    console.log(corgiId);
    // console.log(match);

    $.ajax({
      type: "PUT",
      url: "/corgis/" + corgiId,
      data: { corgi : { match : match } },
      dataType: "json"
    }); 


    // Append thumbnail list item to the #matches list
    $(containerSelector + " ul").append(createCorgiThumbnail());

    showNextCorgi();
  });
}


$(document).ready(function() {

  OkCorgiApp();

});



// - When a user goes to the home page, they should see their previous skips or matches already in the correct columns