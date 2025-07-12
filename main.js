const items = ['Hout', 'Graan', 'Erts', 'Wol', 'Steen'];
let minPrice = 1;
let maxPrice = 5;
let refreshInterval = 5 * 60 * 1000;

const itemStates = {}; // 'overvloedig', 'normaal', of 'schaars'

// Init met alles op normaal
items.forEach(item => itemStates[item] = 'normaal');

function generatePrices() {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';

    items.forEach(item => {
        let price;

        switch (itemStates[item]) {
            case 'schaars':
                price = maxPrice + 3;
                break;
            case 'overvloedig':
                price = 1;
                break;
            default:
                price = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
        }

        const el = document.createElement('div');
        el.className = 'item';
        el.textContent = `${item}: €${price}`;
        container.appendChild(el);
    });
}

function generateScarcityControls() {
    const panel = document.getElementById('scarcityControls');
    panel.innerHTML = '';

    items.forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = '0.6rem';

        const label = document.createElement('label');
        label.textContent = `${item}: `;
        label.style.marginRight = '0.5rem';

        const select = document.createElement('select');
        select.innerHTML = `
            <option value="overvloedig">Overvloedig</option>
            <option value="normaal">Normaal</option>
            <option value="schaars">Schaars</option>
        `;
        select.value = itemStates[item];
        select.onchange = () => {
            itemStates[item] = select.value;
            generatePrices();
        };

        wrapper.appendChild(label);
        wrapper.appendChild(select);
        panel.appendChild(wrapper);
    });
}

let priceTimer;
function startPriceLoop() {
    clearInterval(priceTimer);
    generatePrices();
    generateScarcityControls();
    priceTimer = setInterval(generatePrices, refreshInterval);
}

function refresh() {
    generatePrices();
}

function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.toggle('hidden');
    generateScarcityControls();
}

function applySettings() {
    const min = parseFloat(document.getElementById('minPrice').value);
    const max = parseFloat(document.getElementById('maxPrice').value);
    const time = parseFloat(document.getElementById('refreshTime').value);

    if (min >= max) {
        alert("Min moet kleiner zijn dan Max.");
        return;
    }

    minPrice = min;
    maxPrice = max;
    refreshInterval = time * 60 * 1000;

    startPriceLoop();
}

startPriceLoop();
