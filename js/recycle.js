/* jshint undef: true, unused: true */

(function () {

  // Add the checkbox
  let addToggle = function(n) {
    console.log("Adding toggle!");
    let sectionTab = document.getElementById("tabs-1");
    let sectionRows = sectionTab.getElementsByTagName("tr");
    let recycleRows = Array.prototype.filter.call(sectionRows, function(el) {
      return el.classList.value.indexOf("is-recycle") > -1;
    });
    let toggleDiv = document.createElement("div");
    toggleDiv.setAttribute("style", "padding:10px 10px 15px; margin:10px; float:right; border:1px solid #efbf00;");
    let toggleLabel = document.createElement("label");
    toggleLabel.setAttribute("for", "recycle-toggle");
    toggleLabel.setAttribute("style", "font-size:0.9em; font-family:Verdana;");
    let toggleLabelContent = document.createTextNode("Toggle Recycle Bin content ("+n+" items)");
    let toggleInput = document.createElement("input");
    toggleInput.setAttribute("id", "recycle-toggle");
    toggleInput.setAttribute("type", "checkbox");
    toggleInput.setAttribute('style', "margin:7px 0 0 10px;")
    toggleInput.addEventListener("change", function() {
      recycleRows.forEach(function(r) {
        let lastTd = r.cells[3];
        let lastTdInput = lastTd.querySelector("input");
        //console.log(lastTdInput);
        if (toggleInput.checked) {
            //console.log("Check them");
            lastTdInput.checked = true;
        } else {
            //console.log("Uncheck them");
            lastTdInput.checked = false;
        }
      });
    });
    toggleLabel.appendChild(toggleLabelContent);
    toggleDiv.appendChild(toggleLabel);
    toggleDiv.appendChild(toggleInput);
    sectionTab.insertBefore(toggleDiv, sectionTab.firstChild);
    // Clear "Purge" button
    document.getElementById("tab-button-dd-menu-wrap-top").style.clear = "right";
  }

  // Add classname to table rows
  let fixRows = function() {
    let sectionTab = document.getElementById("tabs-1");
    if (sectionTab === null) {
        console.log("No sectionTab: trying again...");
        setTimeout(fixRows, 2000);
    } else {
      let sectionRows = sectionTab.getElementsByTagName("tr");
      let rowCount = sectionRows.length;
      let recycleCount = 0;
      if (sectionRows.length === 0) {
        console.log("No rows: trying again...");
        setTimeout(fixRows, 2000);
      } else {
        for (let row of sectionRows) {
          let secondTd = row.cells[1];
          if (!secondTd)  { continue; }
          let sectionLocation = secondTd.textContent.trim();
          //console.log(sectionLocation.substring(0, 18));
          if (sectionLocation.substring(0, 18) === "Root » Recycle bin") {
            row.classList.add("is-recycle");
            recycleCount++;
          }
        }
        addToggle(recycleCount);
        console.log("There are "+rowCount+" pieces of content in total");
        console.log("There are "+recycleCount+" pieces of content in the Recycle Bin");
      }
    }
  }

  fixRows();

})();