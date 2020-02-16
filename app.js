// Item controller
const ItemController = (function() {
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  const data = {
    items: [
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 1, name: 'Cookies', calories: 400 },
      { id: 2, name: 'Eggs', calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0
  }

  return {
    logData: function() {
      return data;
    }
  };
})();



// UI controller
const UIController = (function() {

  return {};
})();

// App controller
const App = (function(ItemController, UIController) {
  
  return {
    init: function() {
      console.log('Initializing app...')
    }
  };
})(ItemController, UIController);

App.init();
