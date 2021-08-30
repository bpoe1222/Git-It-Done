var repo = "facebook/react"
var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
var limitWarning = document.querySelector("#limit-warning");
var issuesContainerEl = document.querySelector("#issues-container");

fetch(apiUrl).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            displayIssues(data);
        });
    } else {
        alert("There was a problem with your request!")
    }
});

var displayIssues = function (issues) {
    for (var i = 0; i < issues.length; i++) {
    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    var issueEl = document.createElement ("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    issueEl.appendChild(titleEl);

    var typeEl = document.createElement("span");

    if (issues[i].pull_request) {
        typeEl.textContent = "(Pull request)";
    } else {
        typeEl.textContent = "(Issue)";
    }

    issueEl.appendChild(typeEl);
    issuesContainerEl.appendChild(issueEl);
}
}

var getRepoIssues = function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            displayIssues(data);

            if (response.headers.get("Link")) {
                displayWarning(repo);
            }
        });
    }
};

var displayWarning = function(repo) {
    limitWarning.textContent = "To see more than 30 issues, visit ";
};

var linkEl = document.createElement("a");
linkEl.textContent = "See More Issues on GitHub.com";
linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
linkEl.setAttribute("target", "_blank");

limitWarning.appendChild(linkEl);

getRepoIssues("facebook/react");