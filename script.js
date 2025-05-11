const config = { /* same as before */ };

const categorySelect = document.getElementById('category');
const fieldsContainer = document.getElementById('fields-container');
const totalPriceEl = document.getElementById('total-price');

categorySelect.addEventListener('change', () => {
  const key = categorySelect.value;
  fieldsContainer.innerHTML = '';
  if (!key) { updatePrice(0); return; }
  config[key].fields.forEach(f => {
    const div = document.createElement('div');
    div.className = 'field';
    const lbl = document.createElement('label');
    lbl.textContent = f.label + ':';
    lbl.htmlFor = f.name;
    lbl.className = 'block text-purple-light mb-1';
    const inp = document.createElement('input');
    inp.type = f.type; inp.id = f.name; inp.name = f.name;
    if (f.min !== undefined) inp.min = f.min;
    if (f.max !== undefined) inp.max = f.max;
    inp.value = f.min || 0;
    inp.className = 'w-full p-2 rounded bg-black border border-purple-light text-white';
    inp.addEventListener('input', () => calculateAndShow(key));
    div.append(lbl, inp);
    fieldsContainer.append(div);
  });
  calculateAndShow(key);
});

function calculateAndShow(categoryKey) {
  if (!categoryKey) { updatePrice(0); return; }
  let total = config[categoryKey].base;
  config[categoryKey].fields.forEach(f => {
    const val = parseFloat(document.getElementById(f.name).value) || 0;
    total += val * f.factor;
  });
  updatePrice(total);
}

function updatePrice(amount) {
  totalPriceEl.textContent = amount;
}
