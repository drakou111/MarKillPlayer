// script.js
const servicesConfig = {
  lifeSecurity: {
    startingMoney: 0,
    note: "Note:<br>- If you die from an attacker, you will be refunded 50% of the cost.",
    fields: [
      {
        key: 'lifeSecurity_name',
        label: 'Your in-game name',
        type: 'string',
        info: 'Self explanatory.',
      },
      {
        key: 'lifeSecurity_duration',
        label: 'Duration (minutes)',
        type: 'int',
        info: 'How long (in minutes) you want to have a security for.',
        min: 1,
        operation: { op: 'add', factor: 'constant', value: 2 }
      },
      {
        key: 'lifeSecurity_when',
        label: 'Preparation time',
        info: 'How long we have to prepare before securing.',
        type: 'enum',
        options: [
          { value: 0, label: 'Now (+256)' },
          { value: 1, label: '1 Hour (+64)' },
          { value: 2, label: '1 Day (+0)' }
        ],
        operation: { op: 'switch', cases: { '0': 256, '1': 64, '2' : 0 } }
      }
    ]
  },
  raidSecurity: {
    startingMoney: 0,
    note: "Note:<br>- For every unexpected attacker to deal with will require an extra +100 Diamonds.<br>- If your base gets raided, you will be refunded 50% of the cost.",
    fields: [
      {
        key: 'raidSecurity_name',
        label: 'Your in-game name',
        type: 'string',
        info: 'Self explanatory.',
      },
      {
        key: 'raidSecurity_chunks',
        label: 'Number of chunks',
        type: 'int',
        info: 'How many chunk protectors do you want to keep safe?',
        min: 1,
        operation: { op: 'add', factor: 'constant', value: 192 }
      },
      {
        key: 'raidSecurity_when',
        label: 'Preparation time',
        info: 'How long we have to prepare before securing.',
        type: 'enum',
        options: [
          { value: 0, label: 'Now (+256)' },
          { value: 1, label: '1 Hour (+64)' },
          { value: 2, label: '1 Day (+0)' }
        ],
        operation: { op: 'switch', cases: { '0': 256, '1': 64, '2' : 0 } }
      }
    ]
  },
  raid: {
    startingMoney: 128,
    fields: [
      {
        key: 'raid_name',
        label: 'Your in-game name',
        type: 'string',
        info: 'Self explanatory.',
      },
      {
        key: 'murder_target',
        label: 'Name of the base you want to raid.',
        type: 'string',
        info: 'What base you want to raid. Can just be someone\'s name',
      },
      {
        key: 'raid_anonymity',
        label: 'Anonymity',
        info: 'The anonymity of this hit.<br>None = We will say that you bought this.<br>Anonymous = No one will know.<br>Blame = We will blame ourselves for the cause.',
        type: 'enum',
        options: [
          { value: 0, label: 'None (+0)' },
          { value: 1, label: 'Anonymous (+128)' },
          { value: 2, label: 'Blame (+512)' }
        ],
        operation: { op: 'switch', cases: { '0': 0, '1': 128, '2' : 512 } }
      },
      {
        key: 'raid_priority',
        label: 'Priority',
        info: 'When we should perform the raid.',
        type: 'enum',
        options: [
          { value: 0, label: 'Whenever (+0)' },
          { value: 1, label: 'Within 2 Days (+128)' },
          { value: 2, label: 'Now (+512)' }
        ],
        operation: { op: 'switch', cases: { '0': 0, '1': 128, '2' : 512 } }
      },
      {
        key: 'raid_searchingTime',
        label: 'Max Searching Time (minutes)',
        info: 'How long we have to find the base.',
        type: 'int',
        min: 1,
        operation: { op: 'add', factor: 'constant', value: 2 }
      },
      {
        key: 'raid_percentageItems',
        label: 'Items Give-Back Percentage',
        type: 'int',
        info: 'What percentage of the loot should be given to you.',
        min: 0,
        max: 100,
        step: 1,
        display: 'slider',
        operation: { op: 'add', factor: 'percent' }
      }
    ]
  },
  murder: {
    startingMoney: 256,
    note: "Note:<br>- For every non-target enemy to deal with will require an extra +100 Diamonds.",
    fields: [
      {
        key: 'murder_name',
        label: 'Your in-game name',
        type: 'string',
        info: 'Self explanatory.',
      },
      {
        key: 'murder_target',
        label: 'In-game name of your target',
        type: 'string',
        info: 'Who you want to kill.',
      },
      {
        key: 'murder_anonymity',
        label: 'Anonymity',
        info: 'The anonymity of this hit.<br>None = We will say that you bought this.<br>Anonymous = No one will know.<br>Blame = We will blame ourselves for the cause.',
        type: 'enum',
        options: [
          { value: 0, label: 'None (+0)' },
          { value: 1, label: 'Anonymous (+256)' },
          { value: 2, label: 'Blame (+512)' }
        ],
        operation: { op: 'switch', cases: { '0': 0, '1': 256, '2' : 512 } }
      },
      {
        key: 'murder_priority',
        label: 'Priority',
        info: 'When we should perform the murder.',
        type: 'enum',
        options: [
          { value: 0, label: 'Whenever (+0)' },
          { value: 1, label: 'Within 2 Days (+256)' },
          { value: 2, label: 'Now (+512)' }
        ],
        operation: { op: 'switch', cases: { '0': 0, '1': 256, '2' : 512 } }
      },
      {
        key: 'murder_huntingTime',
        label: 'Max Hunting Time (minutes)',
        info: 'How long we have to hunt the player.',
        type: 'int',
        min: 1,
        operation: { op: 'add', factor: 'constant', value: 2 }
      },
      {
        key: 'murder_percentageItems',
        label: 'Items Give-Back Percentage',
        type: 'int',
        min: 0,
        max: 100,
        step: 1,
        display: 'slider',
        info: 'What percentage of the loot should be given to you.',
        operation: { op: 'add', factor: 'percent' }
      }
    ]
  }
};

const categorySelect = document.getElementById('category');
const fieldsContainer = document.getElementById('fields-container');
const totalPriceEl  = document.getElementById('total-price');

categorySelect.addEventListener('change', () => {
  const cfg = servicesConfig[categorySelect.value];
  fieldsContainer.innerHTML = '';
  if (!cfg) return;

  cfg.fields.forEach(f => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-center justify-between';

    const labelContainer = document.createElement('div');
    labelContainer.className = 'flex items-center space-x-1';

    const label = document.createElement('label');
    label.htmlFor = f.key;
    label.textContent = f.label;
    label.className = 'text-white font-semibold';

    labelContainer.appendChild(label);

    if (f.info) {
      const infoBadge = document.createElement('span');
      infoBadge.className = 'relative cursor-pointer text-purple-300';
      infoBadge.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>';
  
      // simple Tailwind tooltip on hover
      const tooltip = document.createElement('div');
      tooltip.className = `
        absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
        w-64 p-2 text-xs text-gray-100 bg-gray-800 rounded-lg
        opacity-0 group-hover:opacity-100 transition-opacity
        pointer-events-none
      `;
      tooltip.innerHTML = f.info;
  
      // wrap badge in a group so hover triggers the tooltip
      infoBadge.classList.add('group');
      infoBadge.appendChild(tooltip);
      labelContainer.appendChild(infoBadge);
    }

    let input;
    let valueDisplay; // for sliders

    if (f.display === 'slider' && (f.type === 'int' || f.type === 'number')) {
      input = document.createElement('input');
      input.type = 'range';
      input.min = f.min ?? 0;
      input.max = f.max ?? 100;
      input.step = f.step ?? 1;
      input.value = f.min ?? 0;
      input.id = input.name = f.key;
      input.className = 'accent-purple-300 background-purple-500 w-1/2'


      valueDisplay = document.createElement('span');
      valueDisplay.textContent = input.value + "%";
      valueDisplay.className = 'ml-2 text-sm font-mono text-purple-300';

      input.addEventListener('input', () => {
        valueDisplay.textContent = input.value + "%";
        calculateTotal();
      });

      wrapper.append(labelContainer, input, valueDisplay);
      fieldsContainer.appendChild(wrapper);
      return; // skip the rest, already appended
    }

    if (f.type === 'string' || f.type === 'int' || f.type === 'number') {
      input = document.createElement('input');
      input.type = f.type === 'string' ? 'text' : 'number';
      if (f.min != null) input.min = f.min;
      if (f.max != null) input.max = f.max;
      if (f.step != null) input.step = f.step;
      input.className = `w-1/2 bg-gray-800 text-white border border-purple-600 rounded-lg p-2 outline-none focus:outline-2 focus:outline-purple-500 focus:outline-offset-2`;
    } else if (f.type === 'enum') {
      input = document.createElement('select');
      input.className = `w-1/2 bg-gray-800 text-white border border-purple-600 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-2 focus:outline-offset-2 focus:outline-purple-500`
      f.options.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.value;
        opt.textContent = o.label;
        input.appendChild(opt);
      });
    }

    input.id = input.name = f.key;
    input.addEventListener('input', calculateTotal);

    wrapper.append(labelContainer, input);
    fieldsContainer.appendChild(wrapper);
  });
  
  if (cfg.note) {
    const noteWrapper = document.createElement('div');
    noteWrapper.className = 'pt-4 border-t border-purple-700';
    
    const noteText = document.createElement('p');
    noteText.className = 'mt-2 text-purple-200 text-sm italic';
    noteText.innerHTML = cfg.note;
    
    noteWrapper.appendChild(noteText);
    fieldsContainer.appendChild(noteWrapper);
  }

  // grab the new elements
  const summaryEl = document.getElementById('summary');
  const copyBtn = document.getElementById('copy-summary');
  const form = document.getElementById('service-form');

  // helper to build the summary text
  function updateSummary() {
    const category = document.getElementById('category');
    const categoryLabel = category.previousElementSibling.textContent.trim();
    const categoryValue = category.options[category.selectedIndex].text;
  
    const fields = Array.from(document.querySelectorAll('#fields-container > div'))
    .map(div => {
      const label = div.querySelector('label')?.textContent.trim() || '';
      const input = div.querySelector('input, select, textarea');

      let value = '—';
      if (input) {
        if (input.tagName.toLowerCase() === 'select') {
          value = input.options[input.selectedIndex]?.text?.trim() || '—';
        } else {
          value = input.value?.trim() || '—';
        }

        // Treat empty values as 0
        if (value == '—') {
          value = '0';
        }
      }

      return { label, value };
    })
    .filter(field => field.value !== '—') // skip empty or placeholder values
    .map(field => `${field.label}: ${field.value}`);
  
    const cost = document.getElementById('total-price').textContent;
  
    const lines = [
      `${categoryLabel}: ${categoryValue}`,
      ...fields,
      `Total Cost: ${cost} Diamonds`
    ];
  
    summaryEl.value = lines.join('\n');
  }
  
  // whenever the form changes, recalc both price and summary
  form.addEventListener('input', () => {
    calculateTotal();    // your existing function
    updateSummary();     // new
  });

  // initialize on load
  window.addEventListener('DOMContentLoaded', () => {
    updateSummary();
  });

  // copy-to-clipboard behavior
  copyBtn.addEventListener('click', () => {
    summaryEl.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy Summary', 1500);
  });

});

function calculateTotal() {
  const cfg = servicesConfig[categorySelect.value];
  if (!cfg) return totalPriceEl.textContent = '0';
  
  let money = cfg.startingMoney;
  for (const f of cfg.fields) {
    const raw = document.getElementById(f.key)?.value;
    if (!raw || f.type === 'string') continue;
    const val = f.type === 'int' || f.type === 'enum' ? +raw : raw;
    
    switch (f.operation.op) {
      case 'add': {
        let addend = 0;
        switch (f.operation.factor) {
          case 'constant':
            addend = f.operation.value * val;
            break;
          case 'money':
            addend = money * val;
            break;
          case 'percent':
            addend = money * (val / 100);
            break;
          default:
            addend = val;
        }
        money += addend;
        break;
      }
        
        case 'multiply':
          let multiplier;
          if (f.operation.factor === 'constant') {
            multiplier = f.operation.value * val;
          } else if (f.operation.factor === 'money') {
            multiplier = money * val;
          } else if (f.operation.factor === 'percent') {
            multiplier = money * (val / 100);
          } else {
            multiplier = val;
          }
          money *= multiplier;
          break;
        
      case 'switch':
        const extra = f.operation.cases[val] || 0;
        money += extra;
        break;
    }
  }
  
  const finalMoney = Math.floor(money)

  const STACK_SIZE = 64;
  const stacks = Math.floor(finalMoney / STACK_SIZE);
  const remainder = finalMoney % STACK_SIZE;

  const text = stacks
  ? `${stacks} stacks${remainder > 0 ? ' + ' + remainder.toFixed(0) : ''} (${finalMoney})`
  : remainder.toFixed(0);

  totalPriceEl.textContent = text;
}
