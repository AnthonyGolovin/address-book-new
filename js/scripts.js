// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Address (workEmailAddress, personalEmailAddress) {
  this.workEmailAddress = workEmailAddress,
  this.personalEmailAddress = personalEmailAddress
}
  function Contact(firstName, lastName, phoneNumber, Address) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.Address = Address
  }

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName +  "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
 var contact = addressBook.findContact(contactId);
 $("#show-contact").show();
 $(".first-name").html(contact.firstName);
 $(".last-name").html(contact.lastName);
 $(".phone-number").html(contact.phoneNumber);
 $(".work-email-address").html(contact.Address.workEmailAddress);
 $(".personal-email-address").html(contact.Address.personalEmailAddress);
 var buttons = $("#buttons");
 buttons.empty();
 buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    // console.log("The id of this <li> is " + this.id + ".");
     showContact(this.id);
  });
  // Code below here is new!
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();

  // Contact.keys = Address;

  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedWorkEmailAddress = $("input#work-email-address").val();
    var inputtedPersonalEmailAddress = $("input#personal-email-address").val();

    // The next three lines are new:
     $("input#new-first-name").val("");
     $("input#new-last-name").val("");
     $("input#new-phone-number").val("");
     $("input#work-email-address").val("");
     $("input#personal-email-address").val("");

     var newAddress = new Address(inputtedWorkEmailAddress, inputtedPersonalEmailAddress);

     var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newAddress);
     console.log($(".work-email-address"));
     alert();
     alert($(".work-email-address"));
    // console.log(Contact);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    console.log(addressBook.contacts);

  })
})
