// This is a javascript file for a shopping list application. It allows users to add items to a list, mark them as completed, and delete them.
// Get references to the DOM elements
const itemInput = document.getElementById('item-input');
const quantityInput = document.getElementById('quantity-input');
const priceInput = document.getElementById('price-input');
const addItemButton = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');
const purchasedTotalDisplay = document.getElementById('purchased-total');

// Event listener for the add item button
addItemButton.addEventListener('click', addItem);

// Function to add an item to the shopping list
function addItem() {
    // trim() removes whitespace from both ends
    const itemName = itemInput.value.trim();
    const quantity = Number(quantityInput.value.trim());
    const price = Number(priceInput.value.trim());
    // Validate inputs 
    if (itemName === '' || !quantity || isNaN(price)) {
        alert('Please fill in all fields'); // Displays a message to the user
        return;
    }
    // Calculate total price for the item and create list item element
    const total = (quantity * price).toFixed(2);
    const listItem = document.createElement('li');
    // manipulate the innerHTML of the list item to include the item details and buttons
    listItem.innerHTML = `
        <p>${itemName}</p>
        <p>Quantity: ${quantity}</p>
        <p>Price: $${price.toFixed(2)}</p>
        <p class="item-total">Total: $${total}</p>
        <button class="complete-button">Complete</button>
        <button class="delete-button">Delete</button>
    `;
    shoppingList.appendChild(listItem);
    itemInput.value = '';
    quantityInput.value = '';
    priceInput.value = '';
    updatePurchasedTotal();
    saveShoppingList();
}

// Function to update the total cost of purchased items
// AI generated
function updatePurchasedTotal() {
    const purchasedTotal = Array.from(shoppingList.querySelectorAll('li.purchased'))
        .reduce((sum, listItem) => {
            const totalText = listItem.querySelector('.item-total')?.textContent || '';
            return sum + (parseFloat(totalText.replace(/[^0-9.-]+/g, '')) || 0);
        }, 0);
    if (purchasedTotalDisplay) {
        purchasedTotalDisplay.textContent = `Purchased total: $${purchasedTotal.toFixed(2)}`;
    }
}

// Use event listener for complete and delete buttons
shoppingList.addEventListener('click', function(event) {
    const target = event.target;
    const listItem = target.closest('li');
    if (!listItem) return;

    if (target.classList.contains('complete-button')) {
        listItem.classList.toggle('purchased');
        target.textContent = listItem.classList.contains('purchased') ? 'Purchased' : 'Complete';
        updatePurchasedTotal();
        saveShoppingList();
        return;
    }

    if (target.classList.contains('delete-button')) {
        shoppingList.removeChild(listItem);
        updatePurchasedTotal();
        saveShoppingList();
        return;
    }
});

// Event listener for the clear list button
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', function() {
    shoppingList.innerHTML = '';
    updatePurchasedTotal();
    saveShoppingList();
});

// Function to save shopping list to localStorage
function saveShoppingList() {
    localStorage.setItem('shoppingList', shoppingList.innerHTML);
}

// Function to load shopping list from localStorage on page load
window.addEventListener('load', function() {
    const savedList = localStorage.getItem('shoppingList');
    if (savedList) {
        shoppingList.innerHTML = savedList;
        updatePurchasedTotal();
    }
});



