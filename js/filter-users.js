/* jshint undef: true, unused: true */
/* globals chrome */
(function () {

  // Add the checkbox
  let addToggle = function() {
    console.log("Adding toggle!");
    let disabledRows = Array.prototype.filter.call(document.getElementsByTagName("tr"), function(el) {
      return el.classList.value.indexOf("is-disabled") > -1;
    });
    let toggleDiv = document.createElement("div");
    toggleDiv.setAttribute("style", "padding:10px 10px 15px; margin:10px; float:right; border:1px solid #efbf00;");
    let toggleLabel = document.createElement("label");
    toggleLabel.setAttribute("for", "user-toggle");
    toggleLabel.setAttribute("style", "font-size:0.9em; font-family:Verdana;");
    let toggleLabelContent = document.createTextNode("Hide disabled users");
    let toggleInput = document.createElement("input");
    toggleInput.setAttribute("id", "user-toggle");
    toggleInput.setAttribute("type", "checkbox");
    toggleInput.setAttribute('style', "margin:7px 0 0 10px;")
    toggleInput.addEventListener("change", function() {
      if (toggleInput.checked) {
          // do something if checked
          console.log("Hide them");
          disabledRows.forEach(function(r) {
            r.style.display = "none";
          });
      } else {
          // do something else otherwise
          console.log("Show them");
          disabledRows.forEach(function(r) {
            r.style.display = "table-row";
          });
      }
    });
    let tabbedBlock = document.getElementById("tabbedblock");
    toggleLabel.appendChild(toggleLabelContent);
    toggleDiv.appendChild(toggleLabel);
    toggleDiv.appendChild(toggleInput);
    tabbedBlock.parentElement.insertBefore(toggleDiv, tabbedBlock);


    // Add before #tabbedblock
    // Toggle visibility on rownames
  }

  // Add classname to table rows
  let fixRows = function(userArray) {
    let rows = document.getElementsByTagName("tr");
    if (rows.length === 0) {
      console.log("Trying again...");
      setTimeout(fixRows, 2000, userArray);
    } else {
      for (let row of rows) {
        let firstTd = row.cells[0];
        let username = firstTd.textContent.trim();
        if (userArray.indexOf(username) > -1) {
          row.classList.add("is-disabled");
        }
      }
      addToggle();
    }
  }

  // Go get the list
  let sheetURL = chrome.extension.getURL("data/userlist.txt");

  let request = new XMLHttpRequest();
  request.open('GET', sheetURL, true);

  request.onload = function() {
    console.log(request);
    if (request.status >= 200 && request.status < 400) {
      // Success!
      let userArray = request.responseText.split('\n');
      console.log(userArray);
      fixRows(userArray);

    } else {
      // We reached our target server, but it returned an error
      console.log("Could not fetch the data.");
      console.log(request);
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
      console.log("Could not reach the server.");
      console.log(request);
  };

  request.send();

})();