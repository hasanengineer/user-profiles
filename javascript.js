$(document).ready(function () {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    context: document.body,
    beforeSend: function () {
      $("#loaderDiv").show();
    },
    success: function (result) {
      $("#loaderDiv").hide();
      $.each(result, (index, user) => {
        $('#cardsContainer').append(`
          <div class="card-wrapper">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87" />
            <div class="card-details">
              <img src="https://d2jyir0m79gs60.cloudfront.net/prime/tutor-video-m.svg" alt="profile-sample4"
                class="profile" />
              <h2>${user.name}<span>${user.company.name}</span></h2>
              <ul>
                <li>Email: <a href="mailto:${user.email}">${user.email}</a></li>
                <li>Phone: <a href="tel:${user.phone}">${user.phone}</a></li>
                <li>Website: <a href=${user.website}>${user.website}</a></li>
                <li>Address: ${user.address.street}, ${user.address.suite}</li>
              </ul>
            </div>
          </div>
        `)
      });
    }
  });
});
$(document).ready(function() {
  $('#addUser').click(function() {
    var $modal = $('#newUserModal');
    if (!$modal.is(':visible')) {
      // Slide in
      $modal.show().animate({left: 0});
    }
  });
});
$(document).ready(function() {
  $('#closeModal').click(function() {
    var $modal = $('#newUserModal');
    if ($modal.is(':visible')) {
      // Slide away
      $modal.animate({left: -($modal.outerWidth() + 10)}, function() {
        $modal.hide();
      });
    }
  });
});
