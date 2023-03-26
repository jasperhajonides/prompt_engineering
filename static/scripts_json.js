const contextBtns = document.querySelectorAll('.context-btn');
const generateBtn = document.getElementById('generate-btn');
const outputText = document.getElementById('output-text');
const promptInput = document.getElementById('prompt-input');
const dropdownRadios = document.querySelectorAll('.dropdown-option input[type="radio"]');

async function loadButtonContexts() {
  try {
    const response = await fetch('static/prompt_library.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching button contexts:', error);
  }
}

loadButtonContexts().then((buttonContexts) => {
  // Use the loaded buttonContexts data here
  console.log(buttonContexts);

  // Call the generateButtonsAndDropdowns function with the loaded data
  generateButtonsAndDropdowns(buttonContexts);
  setupButtonEventListeners(buttonContexts);

 // Add the event listener for the generate button
  generateBtn.addEventListener("click", () => {
    generateOutput(buttonContexts);
    });
});


function deactivateOtherButtons(currentBtn) {
  contextBtns.forEach(btn => {
    if (btn !== currentBtn) {
      btn.classList.remove('active');
    }
  });
}



// Automatically generate buttons and dropdowns
function generateButtonsAndDropdowns(buttonContexts) {
  const buttonContainer = document.querySelector('.button-container');

  for (const buttonType in buttonContexts) {
    // Create the button element
    const button = document.createElement('button');
    button.classList.add('context-btn');
    button.dataset.type = buttonType;
    button.innerText = capitalizeFirstLetter(buttonType);
    buttonContainer.appendChild(button);

    // Create the dropdown element
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');
    dropdown.id = `${buttonType}-dropdown`;
    buttonContainer.appendChild(dropdown);

    // Create the dropdown options
    for (const option in buttonContexts[buttonType]) {
      const dropdownOption = document.createElement('div');
      dropdownOption.classList.add('dropdown-option');
      dropdown.appendChild(dropdownOption);

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = buttonType;
      input.id = option;
      dropdownOption.appendChild(input);

      const label = document.createElement('label');
      label.setAttribute('for', option);
      label.innerText = capitalizeFirstLetter(option.replace(/_/g, ' '));
      dropdownOption.appendChild(label);
    }
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}




function getSelectedOption(buttonType) {
  const selectedOption = document.querySelector(
    `.dropdown #${buttonType}-dropdown input[type="radio"]:checked`
  );
  if (selectedOption) {
    return selectedOption.id;
  }
  return "";
}

function setupButtonEventListeners(buttonContexts) {
  const contextBtns = document.querySelectorAll('.context-btn');
  const dropdowns = document.querySelectorAll('.dropdown');

  contextBtns.forEach(btn => {
    const dropdown = document.getElementById(`${btn.dataset.type}-dropdown`);

    btn.addEventListener('mouseover', () => {
      dropdown.style.display = 'block';
      dropdown.style.width = `${btn.clientWidth}px`;
      dropdown.style.top = `${btn.offsetTop + btn.offsetHeight}px`;
      dropdown.style.left = `${btn.offsetLeft}px`;
    });

    btn.addEventListener('mouseleave', () => {
      dropdown.style.display = 'none';
    });
  });

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseover', () => {
      dropdown.style.display = 'block';
    });

    dropdown.addEventListener('mouseleave', () => {
      dropdown.style.display = 'none';
    });
  });

  const dropdownRadios = document.querySelectorAll('.dropdown-option input[type="radio"]');

    dropdownRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          const btn = document.querySelector(`.context-btn[data-type="${radio.name}"]`);
          btn.classList.add('active');
          btn.textContent = radio.nextElementSibling.textContent.trim();
          // Add this line to set the 'active' class
          btn.classList.add('active');
        }
      });
    });
}



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



// Prepare output

function generateOutput(buttonContexts) {
  const promptText = promptInput.value;
  if (promptText.length === 0) {
    return;
  }

  let output = "";
  const contextBtns = document.querySelectorAll(".context-btn.active");

  contextBtns.forEach((btn) => {
    const buttonType = btn.dataset.type;
    const selectedOption = getSelectedOption(buttonType);
    if (selectedOption) {
      // Access the selected option's text correctly
      output += " " + buttonContexts[buttonType][selectedOption];
      output += " selected option " + promptText
    } else{
      output += selectedOption + promptText

    }

  });

//  if (output.includes("[PROMPT]")) {
//    output = output.replace(/\[PROMPT\]/g, promptText);
//  } else {
//    output += " " + promptText;
//  }

  outputText.innerText = output;
  outputText.classList.remove("output-placeholder");
}




// Badge and copy
const copyPromptBadge = document.querySelector('.copy-prompt-badge');

copyPromptBadge.addEventListener('click', () => {
  const textArea = document.createElement('textarea');
  textArea.value = outputText.innerText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
});

// Tick boxes
const tickBoxes = document.querySelectorAll('.tick-box');

tickBoxes.forEach((tickBox) => {
  tickBox.addEventListener('click', (event) => {
    event.stopPropagation();

    tickBoxes.forEach((box) => {
      box.classList.remove('checked');
    });

    tickBox.classList.add('checked');
  });
});




