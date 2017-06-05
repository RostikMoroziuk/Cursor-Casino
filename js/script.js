(function () {
    function testMethod() {
      //Comma separate strings in different test 
      var text = ["Hi! First of all, I will show you that all method of Casino and SlotMachine work.\
    Press OK to get total sum.",
        "Great! To get number of slot machines press OK again.",
        "Great work! Now you can add new slot machine (start sum will be calculate as half of the biggest sum in slot machines)",
        "Nice! Now you can see all slots. Select one of it and this slot will be removed.",
        "Now enter amount you want to take.",
        "Good. We finish test Casino Class. Now, we will be test SlotMachine class. I select first slot machine.",
        "Press <code class='code'>OK</code> to get total sum in this slot machine.",
        "Take money from slot.",
        "Enter sum you want add to slot machine.",
        "Great! Now you can play."
      ]

      var textField = $(".method-test");

      //get total sum
      printText(text[0], testGetTotalSum);


      function testGetTotalSum() {
        textField.append($("<button>Ok</button>").addClass("btn").click(function () {
          textField.append(casino.getTotalSum());
          textField.append($("<br>"));
          //Get count of slots
          printText(text[1], testGetSlotMachineCount);
        }))

      }

      function testGetSlotMachineCount() {
        textField.append($("<button>Ok</button>").addClass("btn").click(function () {
          textField.append(casino.getMachineCount());
          textField.append($("<br>"));
          //Add new slotMachine
          printText(text[2], testAddNewSlotMachine);
        }))
      }

      function testAddNewSlotMachine() {
        textField.append($("<button>Ok</button>").addClass("btn").click(function () {
          casino.addNewSlotMachine()
          textField.append("Added new slot machine");
          textField.append($("<br>"));
          //Add new slotMachine
          printText(text[3], testRemoveSlotMachine);
        }))
      }

      function testRemoveSlotMachine() {
        var select = $("<select>Remove slot number</select>").addClass("select");
        for (var i = 0; i < casino.getMachineCount(); i++) {
          select.append(createOption(i));
        }
        textField.append(select);
        textField.append($("<br>"));
        textField.append($("<button>Ok</button>").addClass("btn").click(function () {
          casino.removeSlotMachine()
          textField.append("Slot machine removed");
          textField.append($("<br>"));
        }));
      }

      function createOption(index) {
        return $("<option></option>").val(index);
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
        }, 1)
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

        var self = this;

        createSlotMachines();
        setLucky(); //One slotMachine must be lucky

        //private function create slot machines
        function createSlotMachines() {
          var moneyForMachine = Math.floor(money / slotMachineCount)
          for (var i = 0; i < self._slotMachineCount; i++) {
            self._machines[i] = new SlotMachine(moneyForMachine);
            money -= moneyForMachine;
          }
          //first slotMachine recieve remainder
          self._machines[0].addMoney(money);

          //It is for supports and teachers
          for (i = 0; i < self._machines.length; i++) {
            console.log(self._machines[i]);
          }
        }

        function setLucky() {
          var luckyIndex = Math.round(Math.random() * (self._slotMachineCount));
          self._machines[luckyIndex].setLucky();
        }
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
        console.log(maxMoney);
        var newMachine = new SlotMachine(Math.floor(maxMoney / 2));
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
        this._money += money;
      }

      SlotMachine.prototype.getMoney = function () {
        return this._money;
      }

      var casino = new Casino(5, 10000002);
      testMethod();
    })();