const tables = document.querySelectorAll('.table');
tables.forEach(table => {
  table.addEventListener('click', () => {
  tables.forEach(table => {
    table.classList.remove('active');
  })
  table.classList.add('active');
  if (table.classList.contains('categories')){
    document.querySelector('.add_row').textContent = 'Add new Category';
    document.querySelector('.add_row').classList.add('categories');
    document.querySelector('.add_row').classList.remove('brands');

  }else {
    document.querySelector('.add_row').textContent = 'Add new Brand';
    document.querySelector('.add_row').classList.remove('categories');
    document.querySelector('.add_row').classList.add('brands');
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