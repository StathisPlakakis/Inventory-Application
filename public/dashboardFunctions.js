const tables = document.querySelectorAll('.table');
tables.forEach(table => {
  table.addEventListener('click', () => {
    tables.forEach(table => {
      table.classList.remove('active');
    })
    table.classList.add('active');
    if (table.classList.contains('categories')){
      window.location.href = '/dashboard?active=categories';

    }else if (table.classList.contains('brands')){
      window.location.href = '/dashboard?active=brands';
    }else {
      window.location.href = '/dashboard?active=boats';
    }
  })
})

const addTable = document.querySelector('.add_row');
const dialogs = document.querySelectorAll('dialog');
const dialogCategory = document.querySelector('.dialogCategory');
const dialogBrand = document.querySelector('.dialogBrand');
const dialogBoat = document.querySelector('.dialogBoat');
const dialogDelete = document.querySelector('.dialogDelete');


addTable.addEventListener('click', () => {
  if (addTable.classList.contains('categories')) {
    dialogCategory.showModal();
  }else if (addTable.classList.contains('brands')) {
    dialogBrand.showModal();
  }else {
    dialogBoat.showModal();
  }
})

const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(closeButton => {
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialogCategory.close();
    dialogBrand.close();
    dialogBoat.close();
    dialogDelete.close();
    if ( document.querySelector('button[type=submit]').classList.contains('updateCategory')) {
      const params = new URLSearchParams(window.location.search);
      const active = params.get('active');
      if (active === 'categories') {
        document.querySelector('#category').value = '';
        document.querySelector('.dialogCategory h2').textContent = 'Create new Category';
        document.querySelector('.dialogCategory .buttons').removeChild(document.querySelector('.updateCategory'));
        const createButton = document.createElement('button');
        createButton.textContent = 'Create';
        createButton.type = 'submit';
        createButton.classList.add('createCategory');
        document.querySelector('.dialogCategory .buttons').appendChild(createButton);
      }
    }
  })
})

dialogs.forEach(dialog => {
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
      if ( document.querySelector('button[type=submit]').classList.contains('updateCategory')) {
        const params = new URLSearchParams(window.location.search);
        const active = params.get('active');
        if (active === 'categories') {
          document.querySelector('#category').value = '';
          document.querySelector('.dialogCategory h2').textContent = 'Create new Category';
          document.querySelector('.dialogCategory .buttons').removeChild(document.querySelector('.updateCategory'));
          const createButton = document.createElement('button');
          createButton.textContent = 'Create';
          createButton.type = 'submit';
          createButton.classList.add('createCategory');
          document.querySelector('.dialogCategory .buttons').appendChild(createButton);
        }
      }
    }
})
});

const editButtons = document.querySelectorAll('.edit');
editButtons.forEach(editButton => {
  const rowId = editButton.getAttribute('id');
  editButton.addEventListener('click', async () => {
    const params = new URLSearchParams(window.location.search);
    const active = params.get('active');
    const path = 'http://localhost:3000/api/';
    if (active === 'categories') {
      const response = await fetch(path + `category?id=${rowId}`);
      const category = await response.json();

      dialogCategory.showModal();
      document.querySelector('#category').value = category;
      document.querySelector('.dialogCategory h2').textContent = 'Edit Category';
      const updateButton = document.createElement('button');
      document.querySelector('.dialogCategory .buttons').removeChild(document.querySelector('.createCategory'));
      updateButton.textContent = 'Save';
      updateButton.type = 'submit';
      updateButton.classList.add('updateCategory');
      document.querySelector('.dialogCategory .buttons').appendChild(updateButton);
      const updateCategory = async (e) => {
        e.preventDefault();
        const response = await fetch(`${path}category?id=${rowId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: document.querySelector('#category').value }),
        });
      
        const data = await response.json();
        if (data.success) {
          window.location.href = data.redirectUrl;
        } else {
          window.location.href = data.redirectUrl;
        };
      }
      const handleClick = (e) => {
        updateCategory(e);
        updateButton.removeEventListener('click', handleClick);
    };
    
    updateButton.addEventListener('click', handleClick);
    
    }
  })
})

const deleteButtons = document.querySelectorAll('.columns .delete');
deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', () => {
  const rowId = deleteButton.getAttribute('id');
  console.log(rowId)
  const params = new URLSearchParams(window.location.search);
  const active = params.get('active');
  if (active === 'categories') {
    document.querySelector('.dialogDelete h2').textContent = 'Are you sure you want to delete this category';
    document.querySelector('.dialogDelete form').action = `/api/deleteCategory/${rowId}`;
    document.querySelector('.dialogDelete').showModal();
  }
  })
})