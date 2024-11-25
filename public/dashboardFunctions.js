const tables = document.querySelectorAll('.table');
tables.forEach(table => {
  table.addEventListener('click', (e) => {
    e.stopPropagation();
    tables.forEach(table => {
      table.classList.remove('active');
    })
    table.classList.add('active');
    if (table.classList.contains('categories')){
      window.location.href = '/dashboard?active=categories';

    }else {
      window.location.href = '/dashboard?active=brands';
    }
  })
})

const addTable = document.querySelector('.add_row');
const dialogs = document.querySelectorAll('dialog');
const dialogCategory = document.querySelector('.dialogCategory');
const dialogBrand = document.querySelector('.dialogBrand');
addTable.addEventListener('click', () => {
  addTable.classList.contains('categories') ? dialogCategory.showModal() : dialogBrand.showModal()
})

const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(closeButton => {
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialogCategory.close();
    dialogBrand.close();
  })
})

dialogs.forEach(dialog => {
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
})
});