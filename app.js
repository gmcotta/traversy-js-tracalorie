// Item controller
const ItemController = (() => {
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  const data = {
    items: [
      { id: 1, name: 'Steak Dinner', calories: 1200 },
      { id: 2, name: 'Cookies', calories: 400 },
      { id: 3, name: 'Eggs', calories: 300 },
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
      console.log(name, calories);
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
    }
  };
})();



// UI controller
const UIController = (() => {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories' 
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
    }
  };
})();



// App controller
const App = ((ItemController, UIController) => {

  const loadEventListeners = () => {
    const UISelectors = UIController.getSelectors();

    document.querySelector(UISelectors.addBtn).addEventListener(
      'click', itemAddSubmit);
  };

  const itemAddSubmit = evt => {
    evt.preventDefault();

    const input = UIController.getItemInput();
    
    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemController.addItem(input.name, input.calories);
      console.log(newItem);
    }
  }
  
  return {
    init: () => {
      console.log('Initializing app...');
      const items = ItemController.getItems();
      
      UIController.populateItemList(items);

      loadEventListeners();
    }
  };
})(ItemController, UIController);

App.init();
