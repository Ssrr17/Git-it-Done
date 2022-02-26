var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var languageButtonsEL = document.querySelector("#language-buttons")


var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

var getUserRepos = function (user) {
    //format github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a response to the URL

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to GitHub");

        });
    }
    var displayRepos = function (repos) {
        // check if api returned any repos
        if (repos.length === 0) {
            repoContainerEl.textContent = "No repositories found.";
            return;
        }
        console.log(repos);

        // clear old content
        repoContainerEl.textContent = "";


        // loop over repos
        for (var i = 0; i < repos.length; i++) {
            // format repo name
            var repoName = repos[i].owner.login + "/" + repos[i].name;

            // create a container for each repo
            var repoEl = document.createElement("a");
            repoEl.classList = "list-item flex-row justify-space-between align-center";
            repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

            // create a span element to hold repository name
            var titleEl = document.createElement("span");
            titleEl.textContent = repoName;

            // append to container
            repoEl.appendChild(titleEl);

            // append container to the dom
            repoContainerEl.appendChild(repoEl);
        }
    };

var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
  
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data.items, language);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    });
  };
var buttonClickHandler = function (event){
var language = event.target.getAttribute("data-language")
if (language) {
    getFeaturedRepos(language);
  
    // clear old content
    repoContainerEl.textContent = "";
  }
console.log(language);
}
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEL.addEventListener("click", buttonClickHandler);