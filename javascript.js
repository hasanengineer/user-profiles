$(document).ready(function () {
  var usersData = [];
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    context: document.body,
    beforeSend: function () {
      $("#loaderDiv").show();
    },
    success: function (results) {
      $("#loaderDiv").hide();
      usersData = results;
      $.each(results, (index, user) => {
        addUser(user);
      });
    }
  });

  // Open and Close Modal Actions
  var $modal = $('#newUserModal');
  $('#addUser').click(function() {
    showModal();
  });
  $('#closeModal').click(function() {
    closeModal();
  });

  // Submit Form Data Action
  $('#submitData').click(function() {
    // get all the inputs into an array.
    var $inputs = $('#userForm :input');

    var data = {};
    $inputs.each(function() {
        data[this.name] = $(this).val();
    });

    data['id'] = usersData.length+1;
    data['company'] = {};
    data['company']['name'] = data['companyName'];
    data['company']['zip'] = data['zipCode'];
    data['address'] = {};
    data['address']['suite'] = data['addSuit'];
    data['address']['street'] = data['addStreet'];
    usersData.push(data);
    sortData();
    // addUser(data);
    closeModal();
  });

  function addUser(user){
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
  }
  function showModal() {
    if (!$modal.is(':visible')) {
      // Slide in
      $modal.show().animate({left: 0});
      document.body.style.overflow = "hidden"
    }
  }
  function closeModal() {
    if ($modal.is(':visible')) {
      // Slide away
      $modal.animate({left: -($modal.outerWidth() + 10)}, function() {
        $modal.hide();
      });
      document.body.style.overflow = "auto"
    }
  }

  $('#sortOPt').on('change', function() {
    sortData();
  });

  $('#sortOrder').on('change', function() {
    sortData();
  });

  function sortData() {
    var $sortOrder = $('#sortOrder').val();
    var $sortOption =$('#sortOPt').val();
    var temp = [];
    if($sortOption == 'zip') {
      temp = usersData.sort((a,b)=>
      $sortOrder == 'desc' ? (a.address.zipcode < b.address.zipcode ? 1 : -1) :
      (a.address.zipcode > b.address.zipcode ? 1 : -1));
    } else {
      temp = usersData.sort((a,b)=>
      $sortOrder == 'desc' ? (a.name.split(' ')[1] < b.name.split(' ')[1] ? 1 : -1) :
      (a.name.split(' ')[1] > b.name.split(' ')[1] ? 1 : -1));
    }
    usersData = temp; 
    upDateDOM();
  }

  function upDateDOM(){
    $("#cardsContainer").empty();
    $.each(usersData, (index, user) => {
      addUser(user);
    });
  }
});
