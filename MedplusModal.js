// ==UserScript==
// @name         Medplus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.medplusmart.com/product/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=medplusmart.com
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
    setTimeout(function () {
        var inputString = $(".composition-country.font-weight-bold:first").text().trim();
        var medicineEntries = inputString.split('+');
        var medicineList = $("<ul></ul>");
        for (var i = 0; i < medicineEntries.length; i++) {
            //alert('2');
            var entry = medicineEntries[i].trim();

            // Use regular expressions to extract the medicine name
            var regex = /(.+)\s\d+\s.+/;
            var match = entry.match(regex);

            if (match) {
                var medicineName = match[1].trim();
                var listItem = $("<li></li>").text(medicineName);
                listItem.on("click", function () {
                    //alert('3');
                    // Get the clicked medicine name
                    var clickedMedicine = $(this).text();

                    // Retrieve the existing medicine list from local storage
                    var existingMedicines = localStorage.getItem("medlists") || "";

                    // Check if the clicked medicine is already present in the list
                    if (existingMedicines.indexOf(clickedMedicine) === -1) {
                        //alert('4');
                        // Append the clicked medicine name to the existing list
                        var updatedMedicines = existingMedicines + (existingMedicines.length ? "," : "") + clickedMedicine;
                        // Store the updated medicine list in local storage
                        localStorage.setItem("medlists", updatedMedicines);
                    }
                });
                //alert('5');
                medicineList.append(listItem);
            }
        }
        $(".composition-country.font-weight-bold:first").after(medicineList);
        var medicineListModal = $("<ul></ul>");
        //
        //
        var modal = $("<div id='medpmodal'></div>").addClass("modal");
        var modalContent = $("<div id='medpmodalbody'></div>").addClass("modal-content");
        var closeButton = $("<button>Close</button>").addClass("modal-close");
        closeButton.on("click", function () {
            modal.hide();
        });
        $("body").append(modal);
        modal.append(modalContent);
        modalContent.append(medicineListModal);
        modalContent.append(closeButton);
        var modalStyles = `
  .modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
`;
        var styleElement = document.createElement('style');
        styleElement.innerHTML = modalStyles;
        document.head.appendChild(styleElement);
        //
        var modalButton = $("<button>Open Modal</button>");
        $(".composition-country.font-weight-bold:first").before(modalButton);
        modalButton.on("click", function () {
            var storedMedicines = localStorage.getItem("medlists") || "";
            var medicineArray = storedMedicines.split(",").filter(Boolean);
            for (var j = 0; j < medicineArray.length; j++) {
                var listItemModal = $("<li></li>").text(medicineArray[j]);
                medicineListModal.append(listItemModal);
            }
            $('#medpmodal').show();
            modal.css("z-index", "9999");
        });

    }, 7000);
})();