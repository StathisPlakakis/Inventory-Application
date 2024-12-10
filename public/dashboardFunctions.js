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
    document.querySelectorAll('button[type=submit]').forEach(button => {
      if (['updateCategory', 'updateBrand', 'updateBoat'].some(cls => button.classList.contains(cls))) {
        const params = new URLSearchParams(window.location.search);
        const active = params.get('active');
        const pathname = window.location.pathname;
        const parts = pathname.split('/');
        const endpoint = parts[parts.length - 1];
        if (active === 'categories' || endpoint === 'createCategory') {
          document.querySelector('#category').value = '';
          document.querySelector('.dialogCategory h2').textContent = 'Create new Category';
          document.querySelector('.dialogCategory .buttons').removeChild(document.querySelector('.updateCategory'));
          const createButton = document.createElement('button');
          createButton.textContent = 'Create';
          createButton.type = 'submit';
          createButton.classList.add('createCategory');
          document.querySelector('.dialogCategory .buttons').appendChild(createButton);
        }else if (active === 'brands' || endpoint === 'createBrand') {
          document.querySelector('#brand').value = '';
          document.querySelector('.dialogBrand h2').textContent = 'Create new Brand';
          document.querySelector('.dialogBrand .buttons').removeChild(document.querySelector('.updateBrand'));
          const createButton = document.createElement('button');
          createButton.textContent = 'Create';
          createButton.type = 'submit';
          createButton.classList.add('createBrand');
          document.querySelector('.dialogBrand .buttons').appendChild(createButton);
        }else {
          document.querySelector('.dialogBoat #title').value = '';
          document.querySelector('.dialogBoat #price').value = '';
          document.querySelector('.dialogBoat #description').value = '';
          document.querySelector('.dialogBoat h2').textContent = 'Create new Boat';
          document.querySelector('.dialogBoat .buttons').removeChild(document.querySelector('.dialogBoat .updateBoat'));
          const createButton = document.createElement('button');
          createButton.textContent = 'Create';
          createButton.type = 'submit';
          createButton.classList.add('createBoat');
          document.querySelector('.dialogBoat .buttons').appendChild(createButton);
        }
      }
    })
  })
})

dialogs.forEach(dialog => {
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
      document.querySelectorAll('button[type=submit]').forEach(button => {
        if (['updateCategory', 'updateBrand', 'updateBoat'].some(cls => button.classList.contains(cls))) {
          const params = new URLSearchParams(window.location.search);
          const active = params.get('active');
          const pathname = window.location.pathname;
          const parts = pathname.split('/');
          const endpoint = parts[parts.length - 1];
          if (active === 'categories' || endpoint === 'createCategory') {
            document.querySelector('#category').value = '';
            document.querySelector('.dialogCategory h2').textContent = 'Create new Category';
            document.querySelector('.dialogCategory .buttons').removeChild(document.querySelector('.updateCategory'));
            const createButton = document.createElement('button');
            createButton.textContent = 'Create';
            createButton.type = 'submit';
            createButton.classList.add('createCategory');
            document.querySelector('.dialogCategory .buttons').appendChild(createButton);
          }else if (active === 'brands' || endpoint === 'createBrand') {
            document.querySelector('#brand').value = '';
            document.querySelector('.dialogBrand h2').textContent = 'Create new Brand';
            document.querySelector('.dialogBrand .buttons').removeChild(document.querySelector('.updateBrand'));
            const createButton = document.createElement('button');
            createButton.textContent = 'Create';
            createButton.type = 'submit';
            createButton.classList.add('createBrand');
            document.querySelector('.dialogBrand .buttons').appendChild(createButton);
          }else {
            document.querySelector('.dialogBoat #title').value = '';
            document.querySelector('.dialogBoat #price').value = '';
            document.querySelector('.dialogBoat #description').value = '';
            document.querySelector('.dialogBoat h2').textContent = 'Create new Boat';
            document.querySelector('.dialogBoat .buttons').removeChild(document.querySelector('.dialogBoat .updateBoat'));
            const createButton = document.createElement('button');
            createButton.textContent = 'Create';
            createButton.type = 'submit';
            createButton.classList.add('createBoat');
            document.querySelector('.dialogBoat .buttons').appendChild(createButton);
          }
        }
      })
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
    const pathname = window.location.pathname;
    const parts = pathname.split('/');
    const endpoint = parts[parts.length - 1];

    if (active === 'categories' || endpoint === 'createCategory') {
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
    
    }else if (active === 'brands') {
      const response = await fetch(path + `brand?id=${rowId}`);
      const brand = await response.json();

      dialogBrand.showModal();
      document.querySelector('#brand').value = brand;
      document.querySelector('.dialogBrand h2').textContent = 'Edit Brand';
      const updateButton = document.createElement('button');
      document.querySelector('.dialogBrand .buttons').removeChild(document.querySelector('.createBrand'));
      updateButton.textContent = 'Save';
      updateButton.type = 'submit';
      updateButton.classList.add('updateBrand');
      document.querySelector('.dialogBrand .buttons').appendChild(updateButton);
      const updateBrand = async (e) => {
        e.preventDefault();
        const response = await fetch(`${path}brand?id=${rowId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brand: document.querySelector('#brand').value }),
        });
      
        const data = await response.json();
        if (data.success) {
          window.location.href = data.redirectUrl;
        } else {
          window.location.href = data.redirectUrl;
        };
      }
      const handleClick = (e) => {
        updateBrand(e);
        updateButton.removeEventListener('click', handleClick);
    };
    
    updateButton.addEventListener('click', handleClick);
    
    }else {
      const response = await fetch(path + `boat?id=${rowId}`);
      const boat = await response.json();
      dialogBoat.showModal();
      document.querySelector('.dialogBoat #brand').value = boat.brand;
      document.querySelector('.dialogBoat #category').value = boat.category;
      document.querySelector('.dialogBoat #title').value = boat.title;
      document.querySelector('.dialogBoat #price').value = boat.price;
      document.querySelector('.dialogBoat #description').value = boat.description;
      document.querySelector('.dialogBoat h2').textContent = 'Edit Boat';
      const updateButton = document.createElement('button');
      document.querySelector('.dialogBoat .buttons').removeChild(document.querySelector('.createBoat'));
      updateButton.textContent = 'Save';
      updateButton.type = 'submit';
      updateButton.classList.add('updateBoat');
      document.querySelector('.dialogBoat .buttons').appendChild(updateButton);
      const updateBoat = async (e) => {
        e.preventDefault();
        const response = await fetch(`${path}boat?id=${rowId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            brand: document.querySelector('.dialogBoat #brand').value,
            category: document.querySelector('.dialogBoat #category').value, 
            title: document.querySelector('.dialogBoat #title').value, 
            price: document.querySelector('.dialogBoat #price').value, 
            description: document.querySelector('.dialogBoat #description').value
          }),
        });
      
        const data = await response.json();
        if (data.success) {
          window.location.href = data.redirectUrl;
        } else {
          window.location.href = data.redirectUrl;
        };
      }
      const handleClick = (e) => {
        updateBoat(e);
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
  }else if (active === 'brands') {
    document.querySelector('.dialogDelete h2').textContent = 'Are you sure you want to delete this brand';
    document.querySelector('.dialogDelete form').action = `/api/deleteBrand/${rowId}`;
    document.querySelector('.dialogDelete').showModal();
  }
  })
})