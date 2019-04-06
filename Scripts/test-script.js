const quoteUrl = 'http://api.forismatic.com/api/1.0/?';
const quoteMethod = 'method=getQuote';
const quoteFormat = '&format=jsonp';
const quoteLang = '&lang=ru';
const quoteCallback = '&jsonp=renderQuote';
const quoteApi = `${quoteUrl}${quoteMethod}${quoteLang}${quoteFormat}${quoteCallback}`;

const unsplashUrl = 'https://api.unsplash.com/photos/random/?';
const unsplashKey = 'client_id=df5645cdbcc4e0eac51679ce54433f724057873d9bb802fdd22b094e2621e939';
const unsplashCount = '&count=4';
const unsplashApi = `${unsplashUrl}${unsplashKey}${unsplashCount}`;

let fullQuote = '';

let renderQuote = (response) => {
    fullQuote = response.quoteText;

    let collageCanvas = document.getElementById('collageCanvas');
    let ctx = collageCanvas.getContext('2d'); // Контекст
    collageCanvas.height = 1000;
    collageCanvas.width = 1000;
    ctx.font = '40px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.filter = 'brightness(50%) blur(1px)';
    const lineHeight = 55;
    let pic1 = new Image();
    let pic2 = new Image();
    let pic3 = new Image();
    let pic4 = new Image();
    let collage = [pic1, pic2, pic3, pic4];

    for (let i = 0; i < collage.length; i++) {
        collage[i].crossOrigin = 'Anonymous';
    }

    let picWidth = [];
    let picHeight = [];

    picWidth.push(getRndInteger(250, 750));
    picHeight.push(getRndInteger(250, 750));
    picWidth.push(1000 - picWidth[0]);
    picHeight.push(picHeight[0]);
    picWidth.push(picWidth[0]);
    picHeight.push(1000 - picHeight[0]);
    picWidth.push(picWidth[1]);
    picHeight.push(picHeight[2]);

    let Params = ['', '', '', ''];

    let picParams = Params.map((value, index) => {
        value = `&w=${picWidth[index]}&h=${picHeight[index]}&fit=crop&crop=left,right,top`;
        return value;
    });

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            for (let i = 0; i < collage.length; i++) {
                collage[i].src = xhr.response[i].urls.raw + picParams[i];
            }
        }
    };

    xhr.open('GET', unsplashApi);
    xhr.send();

    const slicedQuote = fullQuote.split(" ");

    const counter = 4;
    let readiness = 0;

    for (let i = 0; i < collage.length; i++) {
        collage[i].addEventListener('load', function () { //написать покороче?
            let line = 0;
            let quoteLine = "";
            readiness++;
            if (readiness === counter) {
                ctx.drawImage(pic1, 0, 0);
                ctx.drawImage(pic2, picWidth[0], 0);
                ctx.drawImage(pic3, 0, picHeight[0]);
                ctx.drawImage(pic4, picWidth[0], picHeight[0]);
                ctx.filter = 'brightness(100%)';
                for (let j = 0; j < slicedQuote.length; j += 4) {
                    quoteLine = '';
                    for (let k = j; k < j + 4; k++) {
                        if (slicedQuote[k] !== undefined) {
                            quoteLine = quoteLine + " " + slicedQuote[k];
                        }
                    }
                    ctx.fillText(quoteLine, collageCanvas.width / 2, collageCanvas.height * 2 / 5 + (lineHeight * line));
                    line += 1;
                }
            }


        }, false);
    }

    downloadContent.addEventListener('click', () => {
        downloadContent.href = collageCanvas.toDataURL();
        downloadContent.download = 'Collage.png';
    }, false)

};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const getQuote = document.createElement('script');
getQuote.src = quoteApi;
document.getElementsByTagName('head')[0].appendChild(getQuote);

const getCanvas = document.createElement('canvas');
getCanvas.id = 'collageCanvas';
getCanvas.setAttribute('style', 'display: block; margin: 10px auto');
document.body.appendChild(getCanvas);

let downloadContent = document.createElement('a');
downloadContent.id = 'downloadButton';
downloadContent.setAttribute('style', 'display: block; -webkit-appearance: button; cursor: pointer; width: 200px; margin: 20px auto 20px auto; padding: 10px; text-align: center;');
downloadContent.innerHTML = 'Download collage';
downloadContent.textDecoration = 'none';
document.body.appendChild(downloadContent);

