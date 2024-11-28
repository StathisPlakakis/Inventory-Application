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
  })
})

dialogs.forEach(dialog => {
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
})
});