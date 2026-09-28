// 1
function extractNumbers(str) {
    return str.match(/\d/g)?.map(Number) || [];
}
console.log("Задание 1:", extractNumbers("a1fg5hj6"));

// 2
function printFibonacci(a = 0, b = 1) {
    console.log("Задание 2 (Фибоначчи):", a);
    if (a >= 144) return;
    setTimeout(() => {
        printFibonacci(b, a + b);
    }, 1000);
}
printFibonacci();

// 3
async function fetchProductTitles() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        
        const data = await response.json();
        console.log("--- Задание 3: Список товаров ---");
        data.products.forEach(product => console.log(product.title));
    } catch (error) {
        console.error('Ошибка в задании 3:', error.message);
    }
}
fetchProductTitles();

//4
const container = document.getElementById('btn-container');
if (container) {
    container.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const color = event.target.textContent.trim();
            document.body.style.backgroundColor = color;
        }
    });
}

//5
const toggleBtn = document.getElementById('toggle-btn');
const menu = document.getElementById('menu');

if (toggleBtn && menu) {
    const menuItems = menu.querySelectorAll('li');
    toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    menu.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            menuItems.forEach(item => item.classList.remove('active'));
            event.target.classList.add('active');
        }
    });
}

//6
const counterElement = document.getElementById('counter');
if (counterElement) {
    let count = 0;
    const intervalId = setInterval(() => {
        count++;
        counterElement.textContent = count;
        if (count >= 100) {
            clearInterval(intervalId);
        }
    }, 1);
}

//7
async function loadInStockProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
        
        const products = await response.json();
        const availableProducts = products.filter(product => product.inStock);
        
        productsContainer.innerHTML = '';
        availableProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p class="price">${product.price} сом</p>
            `;
            productsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка в задании 7:', error);
        productsContainer.innerHTML = '<p>Не удалось загрузить товары.</p>';
    }
}
document.addEventListener('DOMContentLoaded', loadInStockProducts);

//8
let allProducts = [];

const loadBtn = document.getElementById('load-btn');
const searchInput = document.getElementById('search-input');
const fakestoreContainer = document.getElementById('fakestore-container');

function renderProducts(products) {
    if (!fakestoreContainer) return;
    
    fakestoreContainer.innerHTML = '';
    if (!products || products.length === 0) {
        fakestoreContainer.innerHTML = '<p>Товары не найдены</p>';
        return;
    }
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
            <p class="rating">⭐ Рейтинг: ${product.rating}</p>
        `;
        fakestoreContainer.appendChild(card);
    });
}

if (loadBtn) {
    loadBtn.addEventListener('click', async () => {
        try {
            loadBtn.disabled = true;
            loadBtn.textContent = 'Загрузка...';

            const response = await fetch('https://dummyjson.com/products');
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            const data = await response.json();
            allProducts = data.products;

            renderProducts(allProducts);
            if (searchInput) searchInput.disabled = false;
            loadBtn.textContent = 'Загрузить снова';
        } catch (error) {
            console.error('Ошибка в задании 8:', error.message);
            if (fakestoreContainer) {
                fakestoreContainer.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
            }
        } finally {
            loadBtn.disabled = false;
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase().trim();
        const filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(query)
        );
        renderProducts(filteredProducts);
    });
}