const url = 'http://api.forismatic.com/api/1.0/?';
const queryMethod = 'method=getQuote';
const queryType = '&format=jsonp';
const queryLang = '&lang=ru';
const queryFunc = '&jsonp=?';
const queryUrl = url + queryMethod + queryLang + queryType + queryFunc;

let renderQuote = (response) => {
    let quote = document.createElement("p");
    quote.innerHTML = response.quoteText;
    document.body.appendChild(quote);
}

const xhr = new XMLHttpRequest();
xhr.responseType = "json";
const getQuote = document.createElement('script');
getQuote.src = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=renderQuote';
document.getElementsByTagName("head")[0].appendChild(getQuote);

xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log(xhr.response.quoteText);
        let quote = document.createElement("script");
        quote.src = 'http://api.forismatic.com/api/jsonp/';
        document.querySelector('head').appendChild(quote);
        paragraph.innerHTML = `<text>${JSON.stringify(xhr.response)}</text>`;
    }
}

xhr.open('GET', queryUrl);
xhr.send();