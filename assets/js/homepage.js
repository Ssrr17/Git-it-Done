var getUserRepos = function (user) {
    //format github api url
    var apiUrl = "https://api.github.com/users/" + user +"/repos";

    //make a response to the URL

    fetch(apiUrl).then(function(response){
    response.json().then(function(data){
    console.log(data);
});
});
}
getUserRepos("facebook");