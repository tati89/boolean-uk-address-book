const viewSection = document.querySelector(".view-section");
const contactsSection = document.querySelector(".contacts-section");

const state = {
  contacts: [],
  selectedContact: null,
};

/* [START] NO NEED TO EDIT */

function getContacts() {
  fetch("http://localhost:3000/contacts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.contacts = data;

      renderContactsList();
    });
}

function renderContactsList() {
  const listEl = document.createElement("ul");
  listEl.className = "contacts-list";

  // for (let i = 0; i < state.contacts.length; i++) {
  //   if (state.contacts[i].blockContact != true) {
  //     const contact = state.contacts[i];
  //     const listItemEl = renderContactListItem(contact);

  //     listEl.append(listItemEl);
  //   }
  // }

  //trying forEach loop :)
  state.contacts.forEach(function (contact) {
    if (!contact.blockContact) {
      const listItemEl = renderContactListItem(contact);
      listEl.append(listItemEl);
    }
  });

  contactsSection.append(listEl);
}

function renderAddressSection(address) {
  const containerEl = document.createElement("section");

  const headingEl = document.createElement("h2");
  headingEl.innerText = "Address";

  containerEl.append(headingEl);

  const streetText = document.createElement("p");
  streetText.innerText = address.street;

  containerEl.append(streetText);

  const cityText = document.createElement("p");
  cityText.innerText = address.city;

  containerEl.append(cityText);

  const postCodeText = document.createElement("p");
  postCodeText.innerText = address.postCode;

  containerEl.append(postCodeText);

  return containerEl;
}

function renderContactView() {
  const contact = state.selectedContact;

  if (!contact) return;

  viewSection.innerHTML = "";

  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card";

  const headingEl = document.createElement("h1");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  headingEl.innerText = fullName;

  containerEl.append(headingEl);

  const addressSectionEl = renderAddressSection(contact.address);

  containerEl.append(addressSectionEl);

  viewSection.append(containerEl);
}

/* [END] NO NEED TO EDIT */

function renderContactListItem(contact) {
  const listItemEl = document.createElement("li");

  const headingEl = document.createElement("h3");

  const fullName = `${contact.firstName} ${contact.lastName}`;

  headingEl.innerText = fullName;

  listItemEl.append(headingEl);

  const viewBtn = document.createElement("button");
  viewBtn.className = "button grey";
  viewBtn.innerText = "View";

  viewBtn.addEventListener("click", function () {
    state.selectedContact = contact;

    renderContactView();
  });

  listItemEl.append(viewBtn);

  const editBtn = document.createElement("button");
  editBtn.className = "button blue";
  editBtn.innerText = "Edit";

  const delitBtn = document.createElement("button");
  delitBtn.className = "button blue";
  delitBtn.innerText = "Deliete";

  delitBtn.addEventListener("click", function () {
    state.selectedContact = contact;
    viewSection.innerHTML = "";
    deleteContact();
  });

  editBtn.addEventListener("click", function () {
    // [TODO] Write Code
    state.selectedContact = contact;
    viewSection.innerHTML = "";
    renderUpdateForm(contact);
  });

  listItemEl.append(editBtn, delitBtn);

  return listItemEl;
}

function deleteContact() {
  fetch(`http://localhost:3000/addresses/${state.selectedContact.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      fetch(`http://localhost:3000/contacts/${state.selectedContact.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (response) {
        return response.json();
      });
      const contactListEl = document.querySelector(".contacts-list");
      contactListEl.innerHTML = "";

      main();
    });
}

function renderUpdateForm(contact) {
  const formEl = document.createElement("form");
  formEl.setAttribute("class", "form-stack light-shadow center contact-form");

  const h1El = document.createElement("h1");
  h1El.innerText = "Edit Contact";

  const firstNameLabel = document.createElement("label");
  firstNameLabel.setAttribute("for", "first-name-input");
  firstNameLabel.innerText = "First Name:";

  const firstNameInputEl = document.createElement("input");
  firstNameInputEl.setAttribute("class", "first-name-input");
  firstNameInputEl.setAttribute("id", "first-name-input");
  firstNameInputEl.setAttribute("type", "text");
  firstNameInputEl.setAttribute("value", contact.firstName);

  const lastNameLabel = document.createElement("label");
  lastNameLabel.setAttribute("for", "last-name-input");
  lastNameLabel.innerText = "Last Name:";

  const lastNameInputEl = document.createElement("input");
  lastNameInputEl.setAttribute("class", "last-name-input");
  lastNameInputEl.setAttribute("id", "last-name-input");
  lastNameInputEl.setAttribute("type", "text");
  lastNameInputEl.setAttribute("value", contact.lastName);

  const streetLabel = document.createElement("label");
  streetLabel.setAttribute("for", "street-input");
  streetLabel.innerText = "Street:";

  const streetInputEl = document.createElement("input");
  streetInputEl.setAttribute("class", "street-input");
  streetInputEl.setAttribute("id", "street-input");
  streetInputEl.setAttribute("type", "text");
  streetInputEl.setAttribute("value", contact.address.street);

  const cityLabel = document.createElement("label");
  cityLabel.setAttribute("for", "city-input");
  cityLabel.innerText = "City:";

  const cityInputEl = document.createElement("input");
  cityInputEl.setAttribute("class", "city-input");
  cityInputEl.setAttribute("id", "city-input");
  cityInputEl.setAttribute("type", "text");
  cityInputEl.setAttribute("value", contact.address.city);

  const postCodeLabel = document.createElement("label");
  postCodeLabel.setAttribute("for", "post-code-input");
  postCodeLabel.innerText = "Post Code:";

  const postCodeInputEl = document.createElement("input");
  postCodeInputEl.setAttribute("class", "post-code-input");
  postCodeInputEl.setAttribute("id", "post-code-input");
  postCodeInputEl.setAttribute("type", "text");
  postCodeInputEl.setAttribute("value", contact.address.postCode);

  const divEl = document.createElement("div");
  divEl.setAttribute("class", "checkbox-section");

  const checkBoxInputEl = document.createElement("input");
  checkBoxInputEl.setAttribute("class", "block-checkbox");
  checkBoxInputEl.setAttribute("id", "block-checkbox");
  checkBoxInputEl.setAttribute("type", "checkbox");
  checkBoxInputEl.setAttribute("checked", true);

  const checkBoxLabel = document.createElement("label");
  checkBoxLabel.setAttribute("for", "block-checkbox");
  checkBoxLabel.innerText = "Block";

  const actionDivEl = document.createElement("div");
  actionDivEl.setAttribute("class", "actions-section");

  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("class", "button blue");
  buttonEl.setAttribute("type", "submit");
  buttonEl.innerText = "Create";

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();

    fetch(`http://localhost:3000/addresses/${state.selectedContact.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        street: streetInputEl.value,
        city: cityInputEl.value,
        postCode: postCodeInputEl.value,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        fetch(`http://localhost:3000/contacts/${state.selectedContact.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstNameInputEl.value,
            lastName: lastNameInputEl.value,
            blockContact: checkBoxInputEl.checked,
          }),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            state.contacts.push(data);
          });
        const contactListEl = document.querySelector(".contacts-list");
        contactListEl.innerHTML = "";

        main();
      });
  });

  console.log(state);

  actionDivEl.append(buttonEl);

  divEl.append(checkBoxInputEl, checkBoxLabel);

  formEl.append(
    h1El,
    firstNameLabel,
    firstNameInputEl,
    lastNameLabel,
    lastNameInputEl,
    streetLabel,
    streetInputEl,
    cityLabel,
    cityInputEl,
    postCodeLabel,
    postCodeInputEl,
    divEl,
    actionDivEl
  );
  viewSection.append(formEl);

  return formEl;
}

function listenNewContactButton() {
  const btn = document.querySelector(".new-contact-btn");

  btn.addEventListener("click", function () {
    // [TODO] Write Code
    viewSection.innerHTML = "";
    contactForm();
  });
}

// [TODO] Write Code
function contactForm() {
  const formEl = document.createElement("form");
  formEl.setAttribute("class", "form-stack light-shadow center contact-form");

  const h1El = document.createElement("h1");
  h1El.innerText = "Create Contact";

  const firstNameLabel = document.createElement("label");
  firstNameLabel.setAttribute("for", "first-name-input");
  firstNameLabel.innerText = "First Name:";

  const firstNameInputEl = document.createElement("input");
  firstNameInputEl.setAttribute("class", "first-name-input");
  firstNameInputEl.setAttribute("id", "first-name-input");
  firstNameInputEl.setAttribute("type", "text");

  const lastNameLabel = document.createElement("label");
  lastNameLabel.setAttribute("for", "last-name-input");
  lastNameLabel.innerText = "Last Name:";

  const lastNameInputEl = document.createElement("input");
  lastNameInputEl.setAttribute("class", "last-name-input");
  lastNameInputEl.setAttribute("id", "last-name-input");
  lastNameInputEl.setAttribute("type", "text");

  const streetLabel = document.createElement("label");
  streetLabel.setAttribute("for", "street-input");
  streetLabel.innerText = "Street:";

  const streetInputEl = document.createElement("input");
  streetInputEl.setAttribute("class", "street-input");
  streetInputEl.setAttribute("id", "street-input");
  streetInputEl.setAttribute("type", "text");

  const cityLabel = document.createElement("label");
  cityLabel.setAttribute("for", "city-input");
  cityLabel.innerText = "City:";

  const cityInputEl = document.createElement("input");
  cityInputEl.setAttribute("class", "city-input");
  cityInputEl.setAttribute("id", "city-input");
  cityInputEl.setAttribute("type", "text");

  const postCodeLabel = document.createElement("label");
  postCodeLabel.setAttribute("for", "post-code-input");
  postCodeLabel.innerText = "Post Code:";

  const postCodeInputEl = document.createElement("input");
  postCodeInputEl.setAttribute("class", "post-code-input");
  postCodeInputEl.setAttribute("id", "post-code-input");
  postCodeInputEl.setAttribute("type", "text");

  const divEl = document.createElement("div");
  divEl.setAttribute("class", "checkbox-section");

  const checkBoxInputEl = document.createElement("input");
  checkBoxInputEl.setAttribute("class", "block-checkbox");
  checkBoxInputEl.setAttribute("id", "block-checkbox");
  checkBoxInputEl.setAttribute("type", "checkbox");

  const checkBoxLabel = document.createElement("label");
  checkBoxLabel.setAttribute("for", "block-checkbox");
  checkBoxLabel.innerText = "Block";

  const actionDivEl = document.createElement("div");
  actionDivEl.setAttribute("class", "actions-section");

  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("class", "button blue");
  buttonEl.setAttribute("type", "submit");
  buttonEl.innerText = "Create";

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    const contacDetails = {
      firstName: firstNameInputEl.value,
      lastName: lastNameInputEl.value,
      blockContact: checkBoxInputEl.checked,
      addressId: null,
    };

    const addressDetails = {
      street: streetInputEl.value,
      city: cityInputEl.value,
      postCode: postCodeInputEl.value,
    };

    fetch("http://localhost:3000/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressDetails),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        contacDetails.addressId = data.id;

        fetch("http://localhost:3000/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contacDetails),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            state.contacts.push(data);
          });
        const contactListEl = document.querySelector(".contacts-list");
        contactListEl.innerHTML = "";
        main();
      });
  });

  console.log(state);

  actionDivEl.append(buttonEl);

  divEl.append(checkBoxInputEl, checkBoxLabel);

  formEl.append(
    h1El,
    firstNameLabel,
    firstNameInputEl,
    lastNameLabel,
    lastNameInputEl,
    streetLabel,
    streetInputEl,
    cityLabel,
    cityInputEl,
    postCodeLabel,
    postCodeInputEl,
    divEl,
    actionDivEl
  );
  viewSection.append(formEl);

  return formEl;
}

function main() {
  listenNewContactButton();
  getContacts();
}

main();
