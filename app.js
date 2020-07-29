// BUDGET CONTROLLER
let budgetController = (function () {

    let Expense = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }

    let Income = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }

    let allExpenses = []
    let allIncomes = []
    let totalExpenses = 0

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function (type, des, val) {
            let newItem, ID

            //create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0
            }

            //create new item based on 'inc' or 'exp'
            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            //push it into out data structure
            data.allItems[type].push(newItem)

            //return the new item
            return newItem
        },

        testing: function () {
            console.log(data)
        }
    }

})();

//UI CONTROLLER
let UIController = (function () {

    DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: function (obj, type) {

            //Create HTML string with placeholder text

            let html, newHTML, element;

            if (type === 'inc') {
                element = DOMStrings.incomeContainer

                html = '<div class="item clearfix" id="income-%id%"><div' +
                    ' class="item__description">%description%</div><div' +
                    ' class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button' +
                    ' class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%' +
                    ' </div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }

            //Replace the placeholder text with some actual data
            newHTML = html.replace('%id%', obj.id)
            newHTML = newHTML.replace('%description%', obj.description)
            newHTML = newHTML.replace('%value%', obj.value)

            //insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML)
        },


        clearFields: function () {
            let fields, fieldsArr

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue)

            fieldsArr = Array.prototype.slice.call(fields)

            fieldsArr.forEach(function (current, index, array) {
                current.value = ""

            })

            fieldsArr[0].focus()

        },


        getDOMStrings: function () {
            return DOMStrings;
        }
    }


})();

//GLOBAL APP CONTROLLER
let controller = (function (budgetCtrl, UICtrl) {

    let setupEventListeners = function () {

        let DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    let updateBudget = function () {

        //1. Calculate the budget

        //2. Return the budget

        //3.Display the budget on the UI
    }

    let ctrlAddItem = function () {

        let input, newItem

        // 1. Get the field input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type)

            // 4. Clear the fields
            UICtrl.clearFields()

            // 5. Calculate and update budget
            updateBudget()
        }

    }

    return {
        init: function () {
            console.log('app has started')
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();