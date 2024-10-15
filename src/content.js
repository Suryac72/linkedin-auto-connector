Linkedin = {
  isActive: false,

  config: {
    scrollDelay: 3000,
    actionDelay: 3000,
    nextPageDelay: 3000,
    maxRequests: -1,
    totalRequestsSent: 0,
    addNote: false,
    note: "Hey {{name}}, I'm looking forward to connecting with you!",
  },

  init: function (data, config) {
    this.isActive = true;
    console.info("INFO: script initialized on the page...");
    setTimeout(() => this.scrollBottom(data, config), config.actionDelay);
  },

  stop: function () {
    this.isActive = false; 
    console.info("INFO: script stopped");
  },

  scrollBottom: function (data, config) {
    if (!this.isActive) return; 
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    setTimeout(() => this.scrollTop(data, config), config.scrollDelay);
  },

  scrollTop: function (data, config) {
    if (!this.isActive) return; 
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => this.inspect(data, config), config.scrollDelay);
  },

  inspect: function (data, config) {
    if (!this.isActive) return; 
    var totalRows = this.totalRows();
    if (totalRows >= 0) {
      this.compile(data, config);
    } else {
      this.complete(config);
    }
  },

  compile: function (data, config) {
    var elements = document.querySelectorAll("button");
    data.pageButtons = [...elements].filter((element) => element.textContent.trim() === "Connect");

    if (!data.pageButtons || data.pageButtons.length === 0) {
      this.complete(config);
    } else {
      data.pageButtonTotal = data.pageButtons.length;
      data.pageButtonIndex = 0;
      var names = document.getElementsByClassName("entity-result__title-text");
      names = [...names].filter((element) => element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.textContent.includes("Connect\n"));
      data.connectNames = [...names].map((element) => element.innerText.split(" ")[0]);
      setTimeout(() => this.sendInvites(data, config), config.actionDelay);
    }
  },

  sendInvites: function (data, config) {
    if (!this.isActive) return; 
    if (config.maxRequests === 0) {
      this.complete(config);
    } else {
      var button = data.pageButtons[data.pageButtonIndex];
      button.click();

      if (config.addNote && config.note) {
        setTimeout(() => this.clickAddNote(data, config), config.actionDelay);
      } else {
        setTimeout(() => this.clickDone(data, config), config.actionDelay);
      }
    }
  },

  clickAddNote: function (data, config) {
    var buttons = document.querySelectorAll("button");
    var addNoteButton = Array.prototype.filter.call(buttons, (el) => el.textContent.trim() === "Add a note");
    if (addNoteButton && addNoteButton[0]) {
      addNoteButton[0].click();
      setTimeout(() => this.pasteNote(data, config), config.actionDelay);
    } else {
      setTimeout(() => this.clickDone(data, config), config.actionDelay);
    }
  },

  pasteNote: function (data, config) {
    let noteTextBox = document.getElementById("custom-message");
    noteTextBox.value = config.note.replace("{{name}}", data.connectNames[data.pageButtonIndex]);
    noteTextBox.dispatchEvent(new Event("input", { bubbles: true }));
    setTimeout(() => this.clickDone(data, config), config.actionDelay);
  },

  clickDone: function (data, config) {
    var buttons = document.querySelectorAll("button");
    var doneButton = Array.prototype.filter.call(buttons, (el) => el.textContent.trim() === "Send without a note");
    if (doneButton && doneButton[0]) {
      doneButton[0].click();
    }
    setTimeout(() => this.clickClose(data, config), config.actionDelay);
  },

  clickClose: function (data, config) {
    var closeButton = document.querySelector(".artdeco-modal__dismiss");
    if (closeButton) closeButton.click();

    config.totalRequestsSent++;
    chrome.runtime.sendMessage({ type: "updateCount", count: config.totalRequestsSent });

    if (data.pageButtonIndex === data.pageButtonTotal - 1) {
      this.complete(config);
    } else {
      data.pageButtonIndex++;
      setTimeout(() => this.sendInvites(data, config), config.actionDelay);
    }
  },

  complete: function (config) {
    this.isActive = false;
    console.info("INFO: Script completed after sending " + config.totalRequestsSent + " connection requests");
  },

  totalRows: function () {
    return document.getElementsByClassName("search-result").length;
  },
};


Linkedin.init({}, Linkedin.config);
