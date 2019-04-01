const url = 'http://api.forismatic.com/api/1.0/?';
const queryMethod = 'method=getQuote';
const queryType = '&format=json';
const queryLang = '&lang=ru';
const queryUrl = url + queryMethod + queryType + queryLang;

const xhr = new XMLHttpRequest();
xhr.responseType = 'json';
console.log('hi');
let paragraph1 = document.createElement('p');
paragraph1.innerHTML = queryUrl;
document.body.appendChild(paragraph1);

xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log(xhr.response.quoteText);
        let paragraph = document.createElement('p');
        paragraph.innerHTML = `<text>${JSON.stringify(xhr.response)}</text>`;
        document.body.appendChild(paragraph);
    }
}

xhr.open('GET', queryUrl);
xhr.send();