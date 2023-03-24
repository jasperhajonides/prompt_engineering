const submitPromptBtn = document.getElementById("submit-prompt-btn");
const closePopupBtn = document.getElementById("close-popup");
const popupOverlay = document.getElementById("popup-overlay");

function togglePopup() {
  popupOverlay.classList.toggle("hidden");
}

submitPromptBtn.addEventListener("click", togglePopup);
closePopupBtn.addEventListener("click", togglePopup);



/* Dropdown options */
const categorySelectBtn = document.getElementById('category-select-btn');
const categoryDropdown = document.getElementById('category-dropdown');

// Generate the dropdown options
function generateCategoryDropdownOptions() {
  const categories = ['persona', 'formatting', 'language', 'style', 'add new'];

  categories.forEach(category => {
    const dropdownOption = document.createElement('div');
    dropdownOption.classList.add('category-dropdown-option');
    dropdownOption.innerText = category;
    categoryDropdown.appendChild(dropdownOption);

    dropdownOption.addEventListener('click', (event) => {
      if (category !== 'add new') {
        categorySelectBtn.innerText = category;
        categoryDropdown.style.display = 'none';
      }

      if (category === 'add new') {
        event.stopPropagation(); // Stop the event propagation
        categorySelectBtn.contentEditable = 'false'; // Remove contentEditable attribute
        categorySelectBtn.style.backgroundColor = 'green';

        // Add an input and an OK button when the 'add new' option is selected
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('new-category-input');
        const okButton = document.createElement('div');
        okButton.classList.add('ok-button');
        okButton.innerText = 'OK';

         // Prevent the event from propagating when clicking inside the input field
         input.addEventListener('click', (event) => {
            event.stopPropagation();
         });


        // Append the input and OK button to the dropdown
        dropdownOption.innerHTML = ''; // Clear the content of the dropdownOption
        dropdownOption.appendChild(input);
        dropdownOption.appendChild(okButton);

        // Update the button text, color, and log the new category when the OK button is clicked
        okButton.addEventListener('click', (event) => {
          event.stopPropagation();
          const newCategory = input.value.trim();
          if (newCategory) {
            categorySelectBtn.innerText = newCategory;
            categoryDropdown.style.display = 'none';
            categorySelectBtn.style.backgroundColor = 'green';
            console.log('New category:', newCategory);
          }
        });

      } else {
        categorySelectBtn.contentEditable = 'false';
        categorySelectBtn.style.backgroundColor = 'grey';
      }
    });
  });
}




generateCategoryDropdownOptions();

// Show the category dropdown when clicking the button
categorySelectBtn.addEventListener('click', () => {
  categoryDropdown.style.display = 'block';
});



input.addEventListener('click', (event) => {
  event.stopPropagation();
});


// Close the dropdown when clicking outside
window.addEventListener('click', (event) => {
  if (
    event.target !== categorySelectBtn &&
    !categoryDropdown.contains(event.target)
  ) {
    categoryDropdown.style.display = 'none';
  }
});

//
//const mainContent = document.querySelector('.main-content');
//const popupOverlay = document.getElementById('popup-overlay');
//const closePopupBtn = document.getElementById('close-popup');
//
//closePopupBtn.addEventListener('click', () => {
//  popupOverlay.classList.add('hidden'); // Hide the popup overlay by adding the 'hidden' class
//  mainContent.style.opacity = 1; // Reset the opacity of the main content
//});


