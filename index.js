document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault()
});

function btnclick() {
    var api="Replace-Your-Google-Search-Api"; // personal api key from the google
    if (api==="Replace-Your-Google-Search-Api") {
        alert("Check the console ..")
        throw new Error("You need to enter Your Google Search Api \n Reference Link : https://www.youtube.com/watch?v=b9G3DkCJCEg");
        
    }
    var search = "260102c500dd64dfa";
    var definedurlmp4 = "www.youtube.com";
    var url = "https://www.googleapis.com/customsearch/v1";

    var search_query = document.getElementById("exampleFormControlInput1").value; // input box
    var fileFormat = document.getElementById("selection").value; // dropdown box
    if (search_query == "") {
        alert("Enter the Details.");
        document.getElementById("output").hidden = true;
        throw new Error("Please Enter the Details");


    } else {
        document.getElementById("output").hidden = false;

    }

    if (fileFormat == "video") {
        var params = {
            'q': search_query,
            'key': api,
            'cx': search,
            'siteSearch': definedurlmp4
        };}
       else if (fileFormat == "stackoverflow") {
        var stackoverflowurl="https://stackoverflow.com/search?q="+encodeURIComponent(search_query)+"&s=9aa77439-240d-4fe2-862e-85b74cc5c8fb"
        errorflow(stackoverflowurl);

        throw new Error("!!!!!!!!!!!!!!!!! manually error !!!!!!!!!!!!!!!!");

    } else if (fileFormat == "picture") {
        var params = {
            'q': search_query,
            'key': api,
            'cx': search,
            'searchType': 'image',
        };

    } else if (fileFormat == "dictionary") {
        let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search_query
        dictionary(url);
        throw new Error("!!!!!!!!!!!!!!!!! manually error !!!!!!!!!!!!!!!!");
    }

    else {
        var params = {
            'q': search_query,
            'key': api,
            'cx': search,
            'fileType': fileFormat,
        };
    }

    url += "?";
    for (var key in params) {
        url += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    url = url.slice(0, -1);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    // document.getElementById("output").hidden=false;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var jsonResponse = JSON.parse(xhr.responseText);
            var data = jsonResponse["items"];
            var resultsContainer = document.getElementById("output");

            // Clear previous results
            resultsContainer.innerHTML = '';

            try {
                data.forEach(async (element, index) => {
                    var count = index + 1;
                    var title = element["title"];
                    var link = element["link"];

                    // Create a new 'a' tag
                    var anchor = document.createElement("a");
                    anchor.href = link;
                    anchor.target = "_blank"; // Open link in new tab
                    anchor.textContent = link;

                    // Append the 'a' tag to the container
                    resultsContainer.appendChild(anchor);

                    // Add a line break after each link
                    resultsContainer.appendChild(document.createElement("br"));
                });
            } catch (error) {
                console.error(error.message);
                var anchor = document.createElement("h1");
                anchor.textContent = "No Result Found ...";
                // Append the 'h1' tag to the container
                resultsContainer.appendChild(anchor);
                // Add a line break after each link
                resultsContainer.appendChild(document.createElement("br"));
            }
        }
    };
    xhr.send();
}
let dictionary = async (url) => {
    let result = document.getElementById("output");
    result.innerHTML = '';
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${document.getElementById("exampleFormControlInput1").value}</h3>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                </div>
                <p class="word-meaning">
                    <li>
                        ${data[0].meanings[0].definitions[0].definition}
                    </li>
                </p>
                <p class="word-meaning">
                   <li>
                    ${data[0].meanings[0].definitions[1].definition}
                   </li>
                </p>`;
                
            // sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
}
let errorflow=(url)=>{
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            // result.innerHTML = `
            // <div class="word">
            //         <h3>${document.getElementById("exampleFormControlInput1").value}</h3>
            //     </div>
            //     <div class="details">
            //         <p>${data[0].meanings[0].partOfSpeech}</p>
            //     </div>
            //     <p class="word-meaning">
            //         <li>
            //             ${data[0].meanings[0].definitions[0].definition}
            //         </li>
            //     </p>
            //     <p class="word-meaning">
            //        <li>
            //         ${data[0].meanings[0].definitions[1].definition}
            //        </li>
            //     </p>`;
                
            // sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            // result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
    
}