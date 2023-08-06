function getCompany(callback) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        try {
            //Get domain from page
            let url = tabs[0].url;
            //Get brand name from domain
            let domain = url.match(/\.([^./]+)\./)[1];
            callback(domain);
        } catch (error) {
            alert(error);
        }
    });
}

//Function to get brand name
function appendDomainToElement(elementId) {
    let domainAppended = false;

    //Make sure it is loaded before appending brand name to html file
    document.addEventListener("DOMContentLoaded", function() {
        getCompany(function(domain) {
            if (!domainAppended) {
                let brandNameDoc = document.getElementById(elementId);

                if (brandNameDoc) {
                    let brandNameText = document.createElement("b");
                    brandNameText.innerText = capitalizeFirstLetter(domain);
                    brandNameDoc.appendChild(brandNameText);

                    domainAppended = true;
                } 
            }
        });
    });
}

//Function call for each page
appendDomainToElement('brandName');
appendDomainToElement('brandName2');
appendDomainToElement('brandName3');

if (window.location.pathname.endsWith("second.html")) {
document.addEventListener("DOMContentLoaded", function() {
getCompany(function(domain) {
    detectScore(domain, 'theScore');
});
});
}

if (window.location.pathname.endsWith("third.html")) {
document.addEventListener("DOMContentLoaded", function() {
    getCompany(function(domain) {
        detectScore(domain, 'theScore2');

        getInfo(domain, 'info');
    });

    
    });
}


function getInfo(company, id) {

    fetch("./values.json")
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            if (data.hasOwnProperty(company)) {

                let safe = data[company][0].safe;
                let wage = data[company][0].wage;
                let discrimination = data[company][0].discrimination;
                let child = data[company][0].child;
                let forced = data[company][0].forced;
                let union = data[company][0].union;

                let infoText = document.createElement("b");
                let infoDoc = document.getElementById(id);

                infoText.innerText = "Here is some more information." +
                "\nSafe working conditions: " + safe + 
                "\nFair wages: " + wage +
                "\nWorkplace discrimination: " + discrimination +
                "\nChild labor: " + child +
                "\nForced labor: " + forced + 
                "\nAllows unions: " + union;

                infoDoc.appendChild(infoText);

            } else {
                alert('Sorry, but this website is not in our database');
            }
        })
        .catch(function(error) {
            alert('Error: ' + error.message);
        });
}



function detectScore(company, id) {
    let num = 0;

    fetch("./values.json")
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            if (data.hasOwnProperty(company)) {

                if (data[company][0].s == 1) {
                    num += 1;
                }
                
                if (data[company][0].w == 1) {
                    num += 1;
                }

                if (data[company][0].d == 1) {
                    num += 1;
                }

                if (data[company][0].c == 1) {
                    num += 1;
                }

                if (data[company][0].f == 1) {
                    num += 1;
                }

                if (data[company][0].u == 1) {
                    num += 1;
                }

                if(num <= 2){
                    
                }
                else if(num <= 4){

                }
                else if(num<=6)
                {

                }

                let resultText = document.createElement("b");
                let resultDoc = document.getElementById(id);

                resultText.innerText = String(num) + "/6";
                resultDoc.appendChild(resultText);



                const scoreRanges = [
                    { min: 0, max: 2, color: 'red' },
                    { min: 3, max: 4, color: 'orange' },
                    { min: 5, max: 6, color: 'green' }
                ];

                let color = 'black';
                for (const range of scoreRanges) {
                    if (num >= range.min && num <= range.max) {
                        color = range.color;
                        break;
                    }
                }

                let divElements = document.querySelectorAll('.color');
                for (const div of divElements) {
                div.style.color = color;
                }

            } else {
                alert('Sorry, but this website is not in our database');
            }
        })
        .catch(function(error) {
            alert('Error: ' + error.message);
        });


    
}
        
    

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    


