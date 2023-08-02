const myForm = document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const disInput = document.querySelector('#dis');
const catInput = document.querySelector('#cat');
const table1List = document.querySelector('#table1-list');
const table2List = document.querySelector('#table2-list');
const table3List = document.querySelector('#table3-list');


// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const amount = amountInput.value;
  const description = disInput.value;
  const category = catInput.value;
  if (amountInput.value === '' || disInput.value === '' || catInput.value === '') {
    alert("input all fields");
  } else {
    const formData = { Amount: amount, Description: description, Category: category, };
    postFormData(formData);
  }
}


async function postFormData(formData) {
  try {
    console.log(formData);
    const response = await axios.post('http://localhost:3000/AddOder', formData);
    const user = response.data.Oder
    createListItem(user); // Create and append list item
    clearFields(); // Clear input fields
  } catch (err) {
    console.log(err);
  }
}

function createListItem(user) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(`  ${user.Description} => ${user.Amount} `));

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-end';
  deleteBtn.appendChild(document.createTextNode('Delete'));

  // Create update button
  const UpdateBtn = document.createElement('button');
  UpdateBtn.className = ' btn btn-primary btn-sm float-end';
  UpdateBtn.appendChild(document.createTextNode('Update'));

  // Create edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-warning btn-sm float-end';
  editBtn.appendChild(document.createTextNode('Edit'));

  // Append buttons to list item
  li.appendChild(deleteBtn);
  li.appendChild(UpdateBtn);
  li.appendChild(editBtn);


  // Append the list item to the appropriate list container based on the category
  if (user.Category === 'Table 1') {
    table1List.appendChild(li);
  } else if (user.Category === 'Table 2') {
    table2List.appendChild(li);
  } else if (user.Category === 'Table 3') {
    table3List.appendChild(li);
  }


  // Delete button click event handler
  deleteBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const userId = user.id;
      const response = await axios.delete(`http://localhost:3000/delete/${userId}`);
      console.log(response);
      li.remove();
    } catch (error) {
      console.log(error);
    }
  });

  // Edit button click event handler
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();

    amountInput.value = user.Amount;
    disInput.value = user.Description;
    catInput.value = user.Category;

  });
  UpdateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    performUpdate();
    clearFields();

    async function performUpdate() {
      const userId = user.id;
      const updatedamount = amountInput.value;
      const updateddiscription = disInput.value;
      const updatedcategory = catInput.value;

      // Update the user object
      const updatedUser = {
        id: userId,
        Amount: updatedamount,
        Description: updateddiscription,
        Category: updatedcategory
      };
      const newText = document.createTextNode(` ${updatedUser.Description} => ${updatedUser.Amount}`);

      if (li.firstChild) {
        li.removeChild(li.firstChild);
      }
      li.appendChild(newText);

      try {
        // Send a PUT request to the CRUD API to update the user
        const response = await axios.put(`http://localhost:3000/edit/${userId}`, updatedUser);
        console.log(response);
      } catch (error) {
        console.log(error);
      }

    }


  })



}
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get('http://localhost:3000/GetOder');
    const Oders = response.data.Oders;

    // Clear the user list
    table1List.innerHTML = '';
    table2List.innerHTML = '';
    table3List.innerHTML = '';

    // Iterate over each user and create list items
    for (const Oder of Oders) {
      createListItem(Oder);
    }
  } catch (err) {
    console.log(err);
  }
});

function clearFields() {
  amountInput.value = '';
  disInput.value = '';
  catInput.value = '';
}