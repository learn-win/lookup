var api="Replace-Your-Google-Search-Api"; // personal api key from the google
var search = "260102c500dd64dfa";
var definedurlmp4 = "www.youtube.com";
var url = "https://www.googleapis.com/customsearch/v1";
var articleFinderOnline = "www.geeksforgeeks.org";



document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault()
});
var exampleFormControlInput1 = document.getElementById("exampleFormControlInput1");
exampleFormControlInput1.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        btnclick();
    }
});
function btnclick() {
    var resultsContainer = document.getElementById("output");
    // Clear previous results
    resultsContainer.innerHTML = '';
    if (api === "Replace-Your-Google-Search-Api") {
        alert("Check the console ..")
        throw new Error("You need to enter Your Google Search Api \n Reference Link : https://www.youtube.com/watch?v=b9G3DkCJCEg");
    }

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
        };
    }
    else if (fileFormat == "stackoverflow") {
        var stackoverflowurl = "https://stackoverflow.com/search?q=" + encodeURIComponent(search_query) + "&s=9aa77439-240d-4fe2-862e-85b74cc5c8fb"
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
        throw new Error("!!!!!!!!!!!!!!!!! manually error dictionaryapi checking !!!!!!!!!!!!!!!!");
    }
    else if (fileFormat == "fileReader") {
        document.getElementById("output").hidden = true;
        readerCheckerAndCaller();
        throw new Error("!!!!!!!!!!!!!!!!! manually error for File reader checking !!!!!!!!!!!!!!!!");
    }


    else {
        var params = {
            'q': search_query,
            'key': api,
            'cx': search,
            'fileType': fileFormat,
        };
    }

    var url0 = paramsConverter(params, url)
    ResultCustomSearchApi(url0)
}

let paramsConverter = (params, url) => {
    url += "?";
    for (var key in params) {
        url += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    url = url.slice(0, -1);
    return url
}

let ResultCustomSearchApi = (url) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    // document.getElementById("output").hidden=false;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var jsonResponse = JSON.parse(xhr.responseText);
            var data = jsonResponse["items"];
            var resultsContainer = document.getElementById("output");

            // Clear previous results
            // resultsContainer.innerHTML = '';

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
                var anchor = document.createElement("h6");
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

let errorflow = (url) => {
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
function readerCheckerAndCaller() {
    const input = document.getElementById('fileInput');
    const keywordInput = document.getElementById('exampleFormControlInput1');
    const output = document.getElementById('output');

    const file = input.files[0];
    const keyword = keywordInput.value.trim().toLowerCase(); // Convert keyword to lowercase

    if (file) {
        document.getElementById("output").hidden = false;
        commonReader(file, keyword, output);
    } else {
        alert('Please select a file and enter a keyword.');
        document.getElementById("output").hidden = true;
        throw new Error("!!!!!!!!!!!!!!!!! Please select a file and enter a keyword. !!!!!!!!!!!!!!!!");

    }
}

function commonReader(file, keyword, output) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const arrayBuffer = e.target.result;

        const fileType = file.name.split('.').pop().toLowerCase();

        if (fileType === 'pdf') {
            processPdf(arrayBuffer, keyword, output);
        } else if (fileType === 'docx' || fileType === 'doc') {
            processDocx(arrayBuffer, keyword, output);
        } else {
            document.getElementById("output").hidden = true;
            alert('Unsupported file type. Please select a PDF or Word document.');
            document.getElementById("output").hidden = true;
            throw new Error("!!!!!!!!!!!!!!!!! Unsupported file type. Please select a PDF or Word document. !!!!!!!!!!!!!!!!");


        }
    };

    reader.readAsArrayBuffer(file);
}

function processPdf(arrayBuffer, keyword, output) {
    // Initialize PDF.js
    pdfjsLib.getDocument(arrayBuffer).promise.then(function (pdf) {
        let results = [];

        // Loop through each page
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(function (page) {
                // Extract text from the page
                page.getTextContent().then(function (textContent) {
                    // Check each text item for the keyword (case-insensitive)
                    textContent.items.forEach(function (item, lineIndex) {
                        if (item.str.toLowerCase().includes(keyword)) {
                            results.push({
                                page: pageNum,
                                line: lineIndex + 1, // Line index starts from 0
                                text: item.str
                            });
                        }
                    });

                    // Display the results after processing all pages
                    if (pageNum === pdf.numPages) {
                        displayResultsReader(results, output, "pdf");
                    }
                });
            });
        }
    });
}

function processDocx(arrayBuffer, keyword, output) {
    const wordArray = new Uint8Array(arrayBuffer);
    const wordBlob = new Blob([wordArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

    const reader = new FileReader();
    reader.onload = function (e) {
        const wordArrayBuffer = e.target.result;

        // Convert Word document to HTML using mammoth.js
        mammoth.extractRawText({ arrayBuffer: wordArrayBuffer })
            .then(function (result) {
                const text = result.value;
                const lines = text.split('\n');

                const results = [];
                let currentLine = 1;

                lines.forEach(function (line, lineIndex) {
                    if (line.toLowerCase().includes(keyword)) {
                        results.push({
                            line: currentLine,
                            text: line
                        });
                    }
                    currentLine++;
                });

                displayResultsReader(results, output, "word");
            })
            .catch(function (error) {
                console.error('Error extracting text from Word document:', error);
                alert('Error extracting text from Word document. Please try again.');

                document.getElementById("output").hidden = true;
                throw new Error("!!!!!!!!!!!!!!!!! Error extracting text from Word document. Please try again. !!!!!!!!!!!!!!!!");


            });
    };

    reader.readAsArrayBuffer(wordBlob);
}


function displayResultsReader(results, output, format) {
    output.innerHTML = ''; // Clear previous results

    if (results.length > 0) {
        results.forEach(result => {
            const resultElement = document.createElement('h6');
            if (format == "word") {
                resultElement.textContent = `Line ${result.line}: ${result.text}`;
            } else {
                resultElement.textContent = `Page ${result.page}, Line ${result.line}: ${result.text}`;

            }
            output.appendChild(resultElement);
        });
    } else {
        var search_query = document.getElementById("exampleFormControlInput1").value; // input box
        const noResultsElement = document.createElement('h6');
        noResultsElement.textContent = 'Topic not found in the document.';
        output.appendChild(noResultsElement);
        var params = {
            'q': search_query,
            'key': api,
            'cx': search,
            'siteSearch': articleFinderOnline
        };
        var url0 = paramsConverter(params, url)
        ResultCustomSearchApi(url0)
    }
}

