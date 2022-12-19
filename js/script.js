// Recover the localStorage to bag
const bag =
  JSON.parse(localStorage.getItem('bag')) !== null
    ? JSON.parse(localStorage.getItem('bag'))
    : [];

const list = document.querySelector('.lista');

//Update DOM
updateDOM();

// Listen form submit
document.querySelector('.adicionar').addEventListener('submit', submit);

// Insert an item when form submitted
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

  // Update localStorage
  localStorage.setItem('bag', JSON.stringify(bag));

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
  bag.push(item);
}

// Update item in bag
function update(item, amount) {
  item.amount = amount;
}

// Update DOM
function updateDOM() {
  const div = document.createElement('div');

  bag.forEach(item => {
    // Create list item
    const li = document.createElement('li');
    const strong = document.createElement('strong');

    // Add data into list item
    strong.textContent = item.amount;
    li.innerHTML = strong.outerHTML + item.name;
    li.classList.add('item');

    // Push list item to div
    div.appendChild(li);
  });

  // Insert div into DOM
  list.innerHTML = div.outerHTML;
}
