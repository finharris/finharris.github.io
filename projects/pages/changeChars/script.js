function changeWords() {
    var text = document.getElementById("text").value.split("");
    var replaceWith = document.getElementById("replaceWith").value;
    var replacedWord = document.getElementById("replacedWord").value;
    if (text == "" | replaceWith == "" | replacedWord == "") {
        alert("One or more of the fields are empty.");
    } else {
        var output = "";

        text.forEach(checkAndReplace);

        function checkAndReplace(word) {
            if (word.toLowerCase() == replaceWith.toLowerCase()) {
                output += replacedWord + ""
            } else {
                output += word + ""
            }
        }

        console.log(output);
        div = document.getElementById("output");
        div.innerHTML = "";
        div.innerHTML += "<hr>";
        div.innerHTML += output;
        div.innerHTML += "<hr>";
    }
}

function clearAll() {
    document.getElementById("text").value = "";
    document.getElementById("replaceWith").value = "";
    document.getElementById("replacedWord").value = "";
    document.getElementById("output").innerHTML = "";
}