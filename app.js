// Item controller
const ItemController = (() => {
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  const data = {
    items: [
      // { id: 1, name: 'Steak Dinner', calories: 1200 },
      // { id: 2, name: 'Cookies', calories: 400 },
      // { id: 3, name: 'Eggs', calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0
  }

  return {
    getItems: () => {
      return data.items;
    },
    logData: () => {
      return data;
    },
    addItem: (name, calories) => {
      // console.log(name, calories);
      let id;
      if (data.items.length > 0) {
        id = data.items[data.items.length -1].id + 1;
      } else {
        id = 1;
      }

      calories = parseInt(calories);

      newItem = new Item(id, name, calories);
      data.items.push(newItem);

      return newItem;
    },
    getTotalCalories: () => {
      let total = 0;

      data.items.forEach(item => {
        total += item.calories;
      });

      data.totalCalories = total;

      return data.totalCalories;
    },
    getItemById: id => {
      return data.items.find(item => item.id === id);
    },
    setCurrentItem: item => {
      data.currentItem = item;
    },
    getCurrentItem: () => {
      return data.currentItem;
    }
  };
})();



// UI controller
const UIController = (() => {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories', 
  };

  return {
    populateItemList: items => {
      let html = '';

      items.forEach(item => {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>
        `;
      });

      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors: () => {
      return UISelectors;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: item => {
      document.querySelector(UISelectors.itemList).style.display = 'block';

      const li = document.createElement('li');
      
      li.className = 'collection-item';
      
      li.id = `item-${item.id}`;

      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;

      document.querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: totalCalories => {
      document.querySelector(UISelectors.totalCalories)
        .textContent = totalCalories;
    },
    clearEditState: () => {
      UIController.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    addItemToForm: () => {
      document.querySelector(UISelectors.itemNameInput).value = 
        ItemController.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = 
        ItemController.getCurrentItem().calories;
      UIController.showEditState();
    },
    showEditState: () => {
      UIController.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
  };
})();



// App controller
const App = ((ItemController, UIController) => {

  const loadEventListeners = () => {
    const UISelectors = UIController.getSelectors();

    document.querySelector(UISelectors.addBtn).addEventListener(
      'click', itemAddSubmit);

    document.querySelector(UISelectors.itemList).addEventListener(
      'click', itemEditClick);
  };

  const itemEditClick = evt => {
    evt.preventDefault();

    if (evt.target.classList.contains('edit-item')) {
      const listId = evt.target.parentNode.parentNode.id;

      const id = parseInt(listId.split('-')[1]);

      const itemToEdit = ItemController.getItemById(id);

      ItemController.setCurrentItem(itemToEdit);

      UIController.addItemToForm();
    }
  }

  const itemAddSubmit = evt => {
    evt.preventDefault();

    const input = UIController.getItemInput();
    
    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemController.addItem(input.name, input.calories);
      // console.log(newItem);
      UIController.addListItem(newItem);

      const totalCalories = ItemController.getTotalCalories();
      UIController.showTotalCalories(totalCalories);

      UIController.clearInput();
    }
  }
  
  return {
    init: () => {
      console.log('Initializing app...');
      UIController.clearEditState();

      const items = ItemController.getItems();

      if (items.length > 0) {
        UIController.populateItemList(items);
      } else {
        UIController.hideList();
      }
      
      const totalCalories = ItemController.getTotalCalories();
      UIController.showTotalCalories(totalCalories);

      loadEventListeners();
    }
  };
})(ItemController, UIController);

App.init();
