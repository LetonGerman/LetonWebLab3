const url = 'http://api.forismatic.com/api/1.0/?';
const queryMethod = 'method=getQuote';
const queryFormat = '&format=jsonp';
const queryLang = '&lang=ru';
const queryFunc = '&jsonp=renderQuote';
const queryUrl = url + queryMethod + queryLang + queryFormat + queryFunc;

const unsplashApi = 'https://api.unsplash.com/photos/random/?client_id=df5645cdbcc4e0eac51679ce54433f724057873d9bb802fdd22b094e2621e939';
const unsplashCount = '&count=4';
const unsplashUrl = unsplashApi + unsplashCount;

let testQuote = '';

let renderQuote = (response) => {
    testQuote = response.quoteText;

    let collageCanvas = document.getElementById("collageCanvas");
    let ctx = collageCanvas.getContext('2d'); // Контекст
    collageCanvas.height = 1000;
    collageCanvas.width = 1000;
    ctx.font = "30px Arial";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.filter = 'brightness(50%) blur(4px)';
    const lineHeight = 50;
    let pic1       = new Image();
    let pic2 = new Image();
    let pic3 = new Image();
    let pic4 = new Image();

    const slicedQuote = testQuote.split(" ");
    let collage = [pic1, pic2, pic3, pic4];

    const counter = 4;
    let i = 0;

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            pic1.src = xhr.response[0].urls.regular; //поменять на цикл
            pic2.src = xhr.response[1].urls.regular;
            pic3.src = xhr.response[2].urls.regular;
            pic4.src = xhr.response[3].urls.regular;
        }
    }

    xhr.open('GET', unsplashUrl);
    xhr.send();

    pic1.addEventListener('load', function () { //написать покороче?
        let line = 0;
        let quoteLine = "";
        i++;
        if(i === counter) {
            ctx.drawImage(pic1, 0, 0);
            ctx.drawImage(pic2, 500, 0);
            ctx.drawImage(pic3, 0, 500);
            ctx.drawImage(pic4, 500, 500);
            ctx.filter = 'brightness(100%)';
            for(let j = 0; j < slicedQuote.length; j += 4){
                quoteLine = "";
                for(let k = j; k < j+4; k++){
                    if (slicedQuote[k] !== undefined) {
                        quoteLine = quoteLine + " " + slicedQuote[k];
                    }
                }
                ctx.fillText(quoteLine, collageCanvas.width/2, collageCanvas.height*2/5 + (lineHeight * line));
                line += 1;
            }
        }


    }, false);

    pic2.addEventListener('load', function () {
        let line = 0;
        let quoteLine = "";
        i++;
        if(i === counter) {
            ctx.drawImage(pic1, 0, 0);
            ctx.drawImage(pic2, 500, 0);
            ctx.drawImage(pic3, 0, 500);
            ctx.drawImage(pic4, 500, 500);
            ctx.filter = 'brightness(100%)';
            for(let j = 0; j < slicedQuote.length; j += 4){
                quoteLine = "";
                for(let k = j; k < j+4; k++){
                    if (slicedQuote[k] !== undefined) {
                        quoteLine = quoteLine + " " + slicedQuote[k];
                    }
                }
                ctx.fillText(quoteLine, collageCanvas.width/2, collageCanvas.height*2/5 + (lineHeight * line));
                line += 1;
            }
        }


    }, false);

    pic3.addEventListener('load', function () {
        let line = 0;
        let quoteLine = "";
        i++;
        if(i === counter) {
            ctx.drawImage(pic1, 0, 0);
            ctx.drawImage(pic2, 500, 0);
            ctx.drawImage(pic3, 0, 500);
            ctx.drawImage(pic4, 500, 500);
            ctx.filter = 'brightness(100%)';
            for(let j = 0; j < slicedQuote.length; j += 4){
                quoteLine = "";
                for(let k = j; k < j+4; k++){
                    if (slicedQuote[k] !== undefined) {
                        quoteLine = quoteLine + " " + slicedQuote[k];
                    }
                }
                ctx.fillText(quoteLine, collageCanvas.width/2, collageCanvas.height*2/5 + (lineHeight * line));
                line += 1;
            }
        }


    }, false);

    pic4.addEventListener('load', function () {
        let line = 0;
        let quoteLine = "";
        i++;
        if(i === counter) {
            ctx.drawImage(pic1, 0, 0);
            ctx.drawImage(pic2, 500, 0);
            ctx.drawImage(pic3, 0, 500);
            ctx.drawImage(pic4, 500, 500);
            ctx.filter = 'brightness(100%)';
            for(let j = 0; j < slicedQuote.length; j += 4){
                quoteLine = "";
                for(let k = j; k < j+4; k++){
                    if (slicedQuote[k] !== undefined) {
                        quoteLine = quoteLine + " " + slicedQuote[k];
                    }
                }
                ctx.fillText(quoteLine, collageCanvas.width/2, collageCanvas.height*2/5 + (lineHeight * line));
                line += 1;
            }
        }


    }, false);
}

const getQuote = document.createElement('script');
getQuote.src = queryUrl;
document.getElementsByTagName("head")[0].appendChild(getQuote);

const getCanvas = document.createElement('canvas');
getCanvas.id = 'collageCanvas';
document.body.appendChild(getCanvas);

