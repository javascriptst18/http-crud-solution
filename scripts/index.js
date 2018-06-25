const snippetsContainer = document.querySelector('#snippets-container');
const submitNewSnippetForm = document.querySelector('#newSnippet');
// If we want to use the URL on multiple places
const baseURL = 'https://javascriptst18.herokuapp.com/snippets';

async function fetchAllSnippets() {
  const response = await fetch(baseURL);
  const allSnippets = await response.json();
  // allSnippets in this function will become 'snippets'
  // inside of 'displaySnippets'
  displaySnippets(allSnippets);
}

function displaySnippets(snippets) {
  for (let snippet of snippets) {
    let newSnippetElement = `
      <div class="snippet" id=${snippet.id}>
        <p> ${snippet.title} </p>
        <pre><code> ${snippet.code}</code></pre>
        <em> ${snippet.language} </em>
      </div>
    `;
    snippetsContainer.insertAdjacentHTML('afterbegin', newSnippetElement);
  }
}

submitNewSnippetForm.addEventListener('submit', function (event) {
  // Prevent the form from submitting, reloading the page
  event.preventDefault();

  /**
   * Grab every value from every input and create a new object
   * with these values. These will later be sent to the API with fetch
   */
  const newSnippet = {
    title: event.target.title.value,
    code: event.target.code.value,
    language: event.target.language.value
  }

  /**
   * Same URL as when fetching
   */
  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newSnippet)
  })
});

fetchAllSnippets();
