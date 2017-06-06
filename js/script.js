(function () {
  function testMethod() {
    //Comma separate strings in different test 
    var text = ["Hi! First of all, I will show you that all method of Casino and SlotMachine work.\
    Current state of casino you can watch in console.\
    Press `Get total sum` to get total sum.",
      "Great! To get number of slot machines press `Get slot count`.",
      "Great work! Now you can add new slot machine (start sum will be calculate as half of the biggest sum in slot machines)",
      "Nice! Now you can see all slots. Select one of it and this slot will be removed.",
      "Now enter amount you want to take.",
      "Good. We finish test Casino Class. Now, we will test SlotMachine class. Select slot machine for manipulation.",
      "Press `Get sum in slot` to get total sum in this slot machine.",
      "Now you can take money from slot.",
      "Enter sum you want add to slot machine.",
      "Great! Now you can play."
    ]

    var textField = $(".method-test");

    printText(text[0], testGetTotalSum);

    function testGetTotalSum() {
      textField.append($("<button>Get total Sum</button>").addClass("btn").click(function () {
        textField.append(casino.getTotalSum());
        textField.append($("<br>"));

        casino.showInConsole();

        printText(text[1], testGetSlotMachineCount);
      }))

    }

    function testGetSlotMachineCount() {
      textField.append($("<button>Get slot count</button>").addClass("btn").click(function () {
        textField.append(casino.getMachineCount());
        textField.append($("<br>"));

        casino.showInConsole();

        printText(text[2], testAddNewSlotMachine);
      }))
    }

    function testAddNewSlotMachine() {
      textField.append($("<button>Add new slot</button>").addClass("btn").click(function () {
        casino.addNewSlotMachine()
        textField.append("Added new slot machine");
        textField.append($("<br>"));

        casino.showInConsole();

        printText(text[3], testRemoveSlotMachine);
      }))
    }

    function testRemoveSlotMachine() {
      var select = createActiveSlotMachines();
      select.attr("id", "remove-machine");
      textField.append(select);
      textField.append($("<button>Remove slot</button>").addClass("btn").click(function () {
        casino.removeSlotMachine($("#remove-machine").val())
        textField.append("Slot machine removed");
        textField.append($("<br>"));

        casino.showInConsole();

        printText(text[4], testTakeMoney);
      }));
    }

    function testTakeMoney() {
      var takeMoneyInput = createInputForMoney();
      takeMoneyInput.attr("id", "take-from-casino");
      textField.append(takeMoneyInput);
      textField.append($("<button>Take money from casino</button>").addClass("btn").click(function () {
        var moneyValue = $("#take-from-casino").val();
        if (validMoneyInput(moneyValue)) {
          textField.append("You take " + casino.takeMoney(moneyValue) + "$");
          textField.append($("<br>"));

          casino.showInConsole();

          printText(text[5], testSelectSlotMachine);
        }
      }));
    }

    function testSelectSlotMachine() {
      var select = createActiveSlotMachines();
      select.attr("id", "select-machine")
      textField.append(select);

      textField.append($("<button>Select machine</button>").addClass("btn").click(function () {
        casino.selectSlotMachine($("#select-machine").val());
        textField.append("Slot machine selected. Watch in console.");
        textField.append($("<br>"));

        casino.showInConsole();

        printText(text[6], testGetMoneyFromSlotMachine);
      }));
    }

    function testGetMoneyFromSlotMachine() {
      textField.append($("<button>Get sum in slot</button>").addClass("btn").click(function () {
        var slotMachine = casino.getSelectedSlotMachine();
        textField.append(slotMachine.getMoney());
        textField.append($("<br>"));

        casino.showInConsole();

        printText(text[7], testTakeMoneyFromSlotMachine);
      }));
    }

    function testTakeMoneyFromSlotMachine() {
      var takeMoneyInput = createInputForMoney();
      takeMoneyInput.attr("id", "take-from-slot");
      textField.append(takeMoneyInput);
      textField.append($("<button>Take money from slot</button>").addClass("btn").click(function () {
        var moneyValue = $("#take-from-slot").val();
        var slotMachine = casino.getSelectedSlotMachine();
        if (validMoneyInput(moneyValue)) {
          textField.append("You take " + slotMachine.takeMoney(moneyValue) + "$");
          textField.append($("<br>"));

          casino.showInConsole();

          printText(text[8], testAddMoneyToSlotMachine);
        }
      }));
    }

    function testAddMoneyToSlotMachine() {
      var addMoneyInput = createInputForMoney();
      addMoneyInput.attr("id", "add-to-slot");
      textField.append(addMoneyInput);
      textField.append($("<button>Add money to slot</button>").addClass("btn").click(function () {
        var moneyValue = $("#add-to-slot").val();
        console.log(moneyValue);
        var slotMachine = casino.getSelectedSlotMachine();
        if (validMoneyInput(moneyValue)) {
          slotMachine.addMoney(moneyValue);
          textField.append("You add " + moneyValue + "$");
          textField.append($("<br>"));

          casino.showInConsole();

          printText(text[9], addPlayButton);
        }
      }));
    }
    //Testing finish

    function createInputForMoney() {
      return $("<input>").attr({
        "type": "number",
        "value": "1"
      }).addClass("take-money");
    }

    function validMoneyInput(money) {
      if (isNaN(+money)) {
        alert("You enter NaN. You did not take money");
        return false;
      } else if (money < 1) {
        alert("Not correct sum.")
        return false;
      }
      return true;
    }

    function createActiveSlotMachines() {
      var select = $("<select>Remove slot number</select>").addClass("select");
      for (var i = 0; i < casino.getMachineCount(); i++) {
        select.append(createOption(i));
      }
      return select;
    }

    function createOption(index) {
      var option = $("<option></option>").text(index);
      if (index === 0) {
        option.attr("selected", "selected");
      }
      return option;
    }
  }

  function printText(text, cb) {
    var i = 0; //counter
    var textField = $(".method-test")
    var timer = setInterval(function () {
      if (i === text.length) { //if end of text
        clearInterval(timer);
        //add button
        if (cb) {
          cb();
        }
      } else {
        textField.append(text.charAt(i++)); //print text
      }
    }, 30)
  }

  function addPlayButton() {
    var textField = $(".method-test");
    textField.append($("<button>Play</button>").addClass("btn").click(function () {
      play();
    }));
  }

  //Play Game!!!
  function play() {
    //Remove test bench
    $(".method-test").remove();

    //slider initialization
    $(".play").removeClass("hide");

    addSlotMachine();

    //slotMachine
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: true,
      centerMode: true,
      focusOnSelect: true
    });

    //drums in slot machine
    $(".drum1").slick({vertical: true, 
      prevArrow: "", 
      nextArrow: "",
      touchMove: false});
    $(".drum1").slick("slickNext");
    $(".drum2").slick({vertical: true, 
      prevArrow: "", 
      nextArrow: "",
      touchMove: false});
    $(".drum2").slick("slickNext");
    $(".drum3").slick({vertical: true, 
      prevArrow: "", 
      nextArrow: "",
      touchMove: false});
    $(".drum3").slick("slickNext");
  }

  //create slots and add to play field
  function addSlotMachine() {
    var slotMachines = casino.getSlotMachines();
    var sliderFor = $(".slider-for");
    console.log(sliderFor);
    var sliderNav = $(".slider-nav");
    for (var i = 0; i < slotMachines.length; i++) {
      console.log(i);
      var slotMachineElement = buildSlotMachineElement(i);
      sliderFor.append(slotMachineElement);
      var slotMachineIcon = buildSlotIcon(i);
      sliderNav.append(slotMachineIcon);
    }
  }

  function buildSlotIcon(i) {
    var icon = $("<div></div>").text("Slot Machine " + i).addClass("slotIcon");
    return icon;
  }

  function buildSlotMachineElement(i) {
    var slot = $("<div></div>").addClass("slot").attr("data-slot", i);

    var name = $("<h4></h4>").text("Slot Machine " + i).addClass("name");
    slot.append(name);
    //drums
    var carousels = $("<div></div>").addClass("carousels");
    carousels.append(createDrum(1));
    carousels.append(createDrum(2));
    carousels.append(createDrum(3));
    slot.append(carousels);

    var inputs = $("<div></div>").addClass("inputs");
    var addMoneyInput = $("<input>").addClass("money-input");
    inputs.append(addMoneyInput);
    var start = $("<button>Start</button>").addClass("start-btn").click(startGame);
    inputs.append(start);
    slot.append(inputs);

    return slot;
  }

  function createDrum(i) {
    var drum = $("<div></div>").addClass("drum" + i);
    drum.append($("<img>").attr("src", "img/bootstrap.png"));
    drum.append($("<img>").attr("src", "img/git.png"));
    drum.append($("<img>").attr("src", "img/jquery.png"));
    drum.append($("<img>").attr("src", "img/materialize.png"));
    drum.append($("<img>").attr("src", "img/nodejs.png"));
    drum.append($("<img>").attr("src", "img/Number-7.png"));
    drum.append($("<img>").attr("src", "img/sass.png"));
    return drum;
  }

  //TODO: play game!!!
  function startGame() {

  }

  //Class
  function Casino(slotMachineCount, money) {
    if (arguments.length < 2) {
      alert("Constructor Casino must recieve 2 arguments");
      return {};
    }
    if (isNaN(+slotMachineCount) || isNaN(+money)) {
      alert("Both arguments must be integer value");
      return {};
    }

    this._slotMachineCount = slotMachineCount;
    this._totalSum = money;
    this._machines = [];
    this._selectedMachine = null;

    var self = this;
  }

  //It is for supports and teachers
  Casino.prototype.showInConsole = function () {
    console.log("machines ", this._machines);
    console.log("total sum " + this._totalSum);
    console.log("selected machine ", this._selectedMachine);
  }

  Casino.prototype.init = function () {
    var self = this;

    createSlotMachines();
    setLucky(); //One slotMachine must be lucky

    //private function create slot machines
    function createSlotMachines() {
      var money = self._totalSum;
      var moneyForMachine = Math.floor(money / self._slotMachineCount)
      for (var i = 0; i < self._slotMachineCount; i++) {
        self._machines[i] = new SlotMachine(moneyForMachine);
        money -= moneyForMachine;
      }
      //first slotMachine recieve remainder
      self._machines[0].addMoney(money);
    }

    function setLucky() {
      var luckyIndex = Math.floor(Math.random() * (self._slotMachineCount));
      self._machines[luckyIndex].setLucky();
    }
  }

  Casino.prototype.getSlotMachines = function () {
    return this._machines;
  }

  Casino.prototype.getTotalSum = function () {
    return this._totalSum;
  }

  Casino.prototype.getMachineCount = function () {
    return this._slotMachineCount;
  }

  Casino.prototype.addNewSlotMachine = function () {
    //find slot with max money
    var maxMoney = this._machines.reduce(function (first, second) {
      return (first.getMoney() > second.getMoney()) ? first : second;
    }).getMoney();
    var newMachine = new SlotMachine(Math.floor(maxMoney / 2));
    this._machines.push(newMachine);
    this._slotMachineCount++;
    this.calcTotalSum();
  }

  Casino.prototype.removeSlotMachine = function (removeMachineIndex) {
    var removingSlot = this._machines.splice(removeMachineIndex, 1);
    this._slotMachineCount--;

    //divide money
    var money = removingSlot[0].getMoney();
    var moneyPerSlot = Math.floor(money / this._machines.length);
    for (var i = 0; i < this._machines.length; i++) {
      this._machines[i].addMoney(moneyPerSlot);
      money -= moneyPerSlot;
    }
    this._machines[0].addMoney(money);
  }

  Casino.prototype.calcTotalSum = function () {
    this._totalSum = this._machines.reduce(function (prev, next) {
      return (prev + next.getMoney());
    }, 0)
  }

  Casino.prototype.takeMoney = function (value) {
    if (value > this.getTotalSum()) {
      alert("You enter value greater than casino has. Will be return all money");
      value = this.getTotalSum();
    }
    var money = 0;
    var takeMoney = 0;
    while (money < value) {
      //find slot with max sum
      var slot = findMaxMoney.call(this);
      if (slot.getMoney() > (value - money)) {
        takeMoney = value - money
        money += takeMoney;
        slot.takeMoney(takeMoney);
        this.calcTotalSum();
      } else {
        money += slot.getMoney();
        this.calcTotalSum();
        slot.takeMoney(slot.getMoney());
      }
    }

    function findMaxMoney() {
      return this._machines.reduce(function (prev, cur) {
        return (prev.getMoney() >= cur.getMoney()) ? prev : cur;
      })
    }
    return money;
  }

  Casino.prototype.selectSlotMachine = function (index) {
    if (index < 0 || index > this._machines.length) {
      alert("Not correct index");
      return;
    }
    this._selectedMachine = this._machines[index];
  }

  Casino.prototype.getSelectedSlotMachine = function () {
    return this._selectedMachine;
  }

  //Class
  function SlotMachine(money) {
    this._money = money;
    this._lucky = false;
  }

  SlotMachine.prototype.setLucky = function () {
    this._lucky = true;
  }

  SlotMachine.prototype.addMoney = function (money) {
    this._money += +money;
    casino.calcTotalSum();
  }

  SlotMachine.prototype.takeMoney = function (money) {
    if (money > this._money) {
      alert("You enter value greater than slot machine has. Will be return all money");
      money = this._money;
    }
    this._money -= money;
    casino.calcTotalSum();
    return money;
  }

  SlotMachine.prototype.getMoney = function () {
    return this._money;
  }

  var casino = new Casino(5, 1002);
  casino.init(); //create all slot machines
  //TODO: delete comment
  //testMethod();
  addPlayButton();
})();