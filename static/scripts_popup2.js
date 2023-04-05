document.addEventListener("DOMContentLoaded", function () {
  const submitPromptBtn = document.getElementById("submit-prompt-btn");
  const popup = document.getElementById("popup");
  const close = document.getElementById("close");
  const selectTopicButton = document.getElementById("selectTopicButton");
  const topicDropdown = document.getElementById("topicDropdown");
  const topicOptions = document.getElementsByClassName("topicOption");

  submitPromptBtn.addEventListener("click", function () {
    popup.classList.remove("hidden");
  });

  close.addEventListener("click", function () {
    popup.classList.add("hidden");
  });

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.classList.add("hidden");
    }
  });

  selectTopicButton.addEventListener("click", function () {
    topicDropdown.classList.toggle("hidden");
  });

async function loadTopicOptions() {
  try {
    const response = await fetch("http://localhost:3000/data");
    const data = await response.json();
    const uniqueTopics = [...new Set(data.map(item => item.topic))];

    uniqueTopics.forEach((topic) => {
      const option = document.createElement("a");
      option.href = "#";
      option.textContent = topic;
      option.classList.add("topicOption");
      topicDropdown.appendChild(option);
    });

    Array.from(topicOptions).forEach((option) => {
      option.addEventListener("click", (event) => {
        event.preventDefault();
        selectTopicButton.textContent = event.target.textContent;
        topicDropdown.classList.add("hidden");
      });
    });

  } catch (error) {
    console.error("Failed to fetch topics:", error);
  }
}

  const submitBtn = document.getElementById("submitBtn");
  const subtopicInput = document.getElementById("subtopicInput");
  const promptInput = document.getElementById("promptInput");

submitBtn.addEventListener("click", function () {
  const topic = selectTopicButton.textContent;
  const subtopic = subtopicInput.value.trim();
  const message = promptInput.value.trim();
   console.log(topic)
   console.log(subtopic)
   console.log(message)

  if (
    topic &&
    topic !== "Select Topic" &&
    subtopic &&
    message
  ) {
    submitData(topic, subtopic, message);
    popup.classList.add("hidden"); // Add this line to close the popup
  } else {
    alert("Please fill in all the fields before submitting.");
  }
});

  loadTopicOptions();
});


/* load topics from json */
async function loadTopicOptions() {
  try {
    const response = await fetch("http://localhost:3000/data");
    const data = await response.json();
    const keys = Object.keys(data);

    keys.forEach((key) => {
      const option = document.createElement("a");
      option.href = "#";
      option.textContent = key;
      option.classList.add("topicOption");
      topicDropdown.appendChild(option);
    });

    Array.from(topicOptions).forEach((option) => {
      option.addEventListener("click", (event) => {
        event.preventDefault();
        selectTopicButton.textContent = event.target.textContent;
        topicDropdown.classList.add("hidden");
      });
    });

  } catch (error) {
    console.error("Failed to fetch topics:", error);
  }
}

/* add new data */
async function submitData(topic, subtopic, message) {
  try {
    const response = await fetch("http://localhost:3000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, subtopic, message }),
    });

    if (response.ok) {
      console.log("Message submitted successfully");
    } else {
      console.error("Failed to submit message:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to submit message:", error);
  }
}
