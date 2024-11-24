const tables = document.querySelectorAll('.table');
tables.forEach(table => {
  table.addEventListener('click', () => {
  tables.forEach(table => {
    table.classList.remove('active');
  })
  table.classList.add('active');
  if (table.classList.contains('categories')){
    document.querySelector('.add_row').textContent = 'Add new Category';
  }else {
    document.querySelector('.add_row').textContent = 'Add new Brand';
  }
  })
})

