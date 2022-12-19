// Recover the localStorage to bag
const bag =
  JSON.parse(localStorage.getItem('bag')) !== null
    ? JSON.parse(localStorage.getItem('bag'))
    : [];

const list = document.querySelector('.lista');

updateDOM();

// Listen form submit
document.querySelector('.adicionar').addEventListener('submit', submit);

function submit(event) {
  event.preventDefault();

  // Get form item
  const item = {
    name: event.target.elements.nome.value,
    amount: event.target.elements.quantidade.value,
  };

  const { exist, index } = isInBag(item);

  if (!exist) {
    insert(item);
  } else {
    update(bag[index], item.amount);
  }

  updateLocalStorage();
  updateDOM();
}

// Check if item already exists
function isInBag(item) {
  const index = bag.findIndex(i => i.name === item.name);
  const exist = index >= 0;
  return { exist, index };
}

// Push item to bag
function insert(item) {
  item.id = bag.length ? bag[bag.length - 1].id + 1 : 0;
  bag.push(item);
}

// Update item in bag
function update(item, amount) {
  item.amount = amount;
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem('bag', JSON.stringify(bag));
}

// Update DOM
function updateDOM() {
  const div = document.createElement('div');

  bag.forEach(item => {
    // Create list item
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    const button = document.createElement('button');

    // Add data into list item
    strong.textContent = item.amount;
    button.textContent = '-';
    button.classList.add('delete');
    li.innerHTML = strong.outerHTML + item.name + button.outerHTML;
    li.classList.add('item');
    li.id = item.id;

    // Push list item to div
    div.appendChild(li);
  });

  // Insert div into DOM
  list.innerHTML = div.outerHTML;

  document.querySelectorAll('.delete').forEach(item => {
    item.addEventListener('click', remove);
  });
}

function remove(event) {
  console.log(event);
  const idItem = event.target.parentNode.id;
  const index = bag.findIndex(item => item.id == idItem);
  bag.splice(index, 1);
  updateLocalStorage();
  updateDOM();
}
