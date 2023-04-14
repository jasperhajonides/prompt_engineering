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

  const submitBtn = document.getElementById("submitBtn");
  const subtopicInput = document.getElementById("subtopicInput");
  const promptInput = document.getElementById("promptInput");

  submitBtn.addEventListener("click", function () {
    const topic = selectTopicButton.textContent;
    const subtopic = subtopicInput.value.trim();
    const message = promptInput.value.trim();

    if (
      topic &&
      topic !== "Select Topic" &&
      subtopic &&
      message
    ) {
      submitData(topic, subtopic, message);
      popup.classList.add("hidden");
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
    const uniqueTopics = [...new Set(data.map(item => item.topic))];

    uniqueTopics.forEach((topic) => {
      const option = document.createElement("a");
      option.href = "#";
      option.textContent = topic;
      option.classList.add("topicOption");
      topicDropdown.appendChild(option);
    });

    const topicOptions = document.getElementsByClassName("topicOption"); // Move this line inside loadTopicOptions

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
    const newEntry = {
      topic,
      subtopic,
      message,
      score: 0,
      usage: 0,
    };

    console.log()
    const response = await fetch("http://localhost:3000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
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






