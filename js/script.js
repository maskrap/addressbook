function Contact(fname, lname){
  this.firstName = fname;
  this.lastName = lname;
  this.addresses = [];
}

Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
}

function Address(street, city, state, postal, tag = ""){
  this.street = street;
  this.city = city;
  this.state = state;
  this.postal = postal;
  this.tag = tag;
}
Address.prototype.fullAddress = function(){
  return this.tag + ": " + this.street + ", " + this.city + ",  " + this.state + "  " + this.postal;
}
var removeActive = function(selector){
  if($(selector + '.active')){
    $(selector + '.active').removeClass("active");
  }
}

$(function(){


  var addtlAddr = '<div class="address">' +
                  '<fieldset>' +
                  '<div class="form-group">' +
                  '<label for="street">Street</label> ' +
                  '<input type="text" name="street" class="form-control new-street">' +
                  '</div>' +
                  '<div class="form-group">' +
                  '<label for="city">City</label>' +
                  '<input type="text" name="city" class="form-control new-city">' +
                  '</div>' +
                  '<div class="form-group">' +
                  '<label for="state">State</label>' +
                  '<input type="text" name="state" class="form-control new-state">' +
                  '</div>' +
                  '<div class="form-group">' +
                  '<label for="zip">Postal Code</label>' +
                  '<input type="text" name="zip" class="form-control new-postal">' +
                  '</div>' +
                  '<div class="form-group">' +
                  '<label for="tags">Tags</label>' +
                  '<input type="text" name="tags" class="form-control new-tags" placeholder="comma separated values: [home, work, blah]">'+
                  '</div>' +
                  '</fieldset>' +
                  '</div>';
  $('#additional-addr').click(function(){
    $('.addresses').append(addtlAddr);
  });

  $('form#addcontact').submit(function(event){
    event.preventDefault();
    var firstName = $("#first-name").val();
    var lastName = $("#last-name").val();
    var myContact = new Contact(firstName, lastName);
    var inputFlag = false;

    $(".address").each(function(){
      var inputStreet = $(this).find("input.new-street").val();
      var inputCity = $(this).find("input.new-city").val();
      var inputState = $(this).find("input.new-state").val();
      var inputPostal = $(this).find("input.new-postal").val();
      var inputTags = $(this).find("input.new-tags").val();
      var newAddr = new Address(inputStreet, inputCity, inputState, inputPostal, inputTags);
      if(inputCity && inputStreet){
        myContact.addresses.push(newAddr);
        inputFlag = true;
      }
      console.log(JSON.stringify(newAddr));
    });
    // remove the current active item
    if(inputFlag){
      removeActive("li.list-item");
      $('ul#contact-list').append('<li class="list-item active"><a href="#">' + myContact.fullName() + '</a></li>');
      $('.show-contact').hide();
      $('.list-item').last().click(function(){
        $('.show-contact h3').text("");
        $('.show-contact h4').text("");
        removeActive("li.list-item");
        $(this).addClass("active");
        $('.show-contact').show();
        $('.show-contact h3').text(myContact.fullName());
        $('.show-addresses').text("");
        myContact.addresses.forEach(function(address){
          $('ul.show-addresses').append('<li>' + address.fullAddress() + "</li>");
        });
      })
      $('form#addcontact')[0].reset();
    } else {
      alert("street and city must not be empty");
    }
     // console.log(JSON.stringify(myContact))
  });

});
