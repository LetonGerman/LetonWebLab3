let readiness = 0;
const readinessCounter = 4;

const createCanvas = () => {
    const getCanvas = document.createElement('canvas');
    getCanvas.id = `collage-${Date.now().toString(32)}`;
    getCanvas.setAttribute('style', 'display: block; margin: 10px auto');
    getCanvas.height = 1000;
    getCanvas.width = 1000;
    document.body.appendChild(getCanvas);
    return getCanvas;
};

const setupCanvasContext = (canvas) => {
    let collageCanvas = document.getElementById(canvas.id);
    let ctx = collageCanvas.getContext('2d'); // Контекст
    ctx.font = '36px Helvetica';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.filter = 'brightness(50%) blur(1px)';
    return ctx;
};

const getUnsplashUrl = () => {
    const unsplashUrl = 'https://api.unsplash.com/photos/random/?';
    const unsplashKey = 'client_id=df5645cdbcc4e0eac51679ce54433f724057873d9bb802fdd22b094e2621e939';
    const unsplashCount = '&count=4';
    return `${unsplashUrl}${unsplashKey}${unsplashCount}`;
};

const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const createImages = (images) => {
    let img1 = new Image();
    let img2 = new Image();
    let img3 = new Image();
    let img4 = new Image();

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

    let collage = {
        images: [img1, img2, img3, img4],
        width: picWidth,
        height: picHeight
    };

    let Params = ['', '', '', ''];

    let picParams = Params.map((value, index) => {
        value = `&w=${picWidth[index]}&h=${picHeight[index]}&fit=crop&crop=left,right,top`;
        return value;
    });


    for (let i = 0; i < collage.images.length; i++) {
        collage.images[i].crossOrigin = 'Anonymous';
        collage.images[i].src = images[i].urls.raw + picParams[i];
    }

    return collage;
};

const renderCollage = (canvas, ctx, collage, slicedQuote) => {
    for (let i = 0; i < collage.images.length; i++) {
        collage.images[i].addEventListener('load', () => { //написать покороче?
            let line = 0;
            const lineHeight = 55;
            let quoteLine = "";
            readiness++;
            if (readiness === readinessCounter) {
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(collage.images[0], 0, 0);
                ctx.drawImage(collage.images[1], collage.width[0], 0);
                ctx.drawImage(collage.images[2], 0, collage.height[0]);
                ctx.drawImage(collage.images[3], collage.width[0], collage.height[0]);
                ctx.filter = 'brightness(100%)';
                for (let j = 0; j < slicedQuote.length; j += 4) {
                    quoteLine = '';
                    for (let k = j; k < j + 4; k++) {
                        if (slicedQuote[k] !== undefined) {
                            quoteLine = quoteLine + " " + slicedQuote[k];
                        }
                    }
                    ctx.fillText(quoteLine, canvas.width / 2, canvas.height * 2 / 5 + (lineHeight * line));
                    line += 1;
                }
            }

        }, false);
    }
};


const initCollage = () => {
    const quoteUrl = 'https://api.forismatic.com/api/1.0/?';
    const quoteMethod = 'method=getQuote';
    const quoteFormat = '&format=jsonp';
    const quoteLang = '&lang=ru';
    const quoteCallback = '&jsonp=renderCanvas';
    const quoteApi = `${quoteUrl}${quoteMethod}${quoteLang}${quoteFormat}${quoteCallback}`;
    const getQuote = document.createElement('script');

    getQuote.src = quoteApi;
    document.getElementsByTagName('head')[0].appendChild(getQuote);
};

const createDownloadButton = (canvas) => {
    let downloadContent = document.createElement('a');
    downloadContent.id = 'downloadButton';
    downloadContent.setAttribute('style', 'font-family: "Open Sans"; display: block; -webkit-appearance: button; cursor: pointer; width: 200px; margin: 20px auto 20px auto; padding: 10px; text-align: center;');
    downloadContent.innerHTML = 'Download collage';
    downloadContent.textDecoration = 'none';
    document.body.appendChild(downloadContent);

    downloadContent.addEventListener('click', () => {
        downloadContent.href = canvas.toDataURL();
        downloadContent.download = 'Collage.png';
    }, false)
};


const renderCanvas = (response) => {

    let fullQuote = response.quoteText;
    const slicedQuote = fullQuote.split(" ");

    let collageCanvas = createCanvas();
    let ctx = setupCanvasContext(collageCanvas);

    const url = getUnsplashUrl();
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let collage = createImages(xhr.response);
            createDownloadButton(collageCanvas);
            renderCollage(collageCanvas, ctx, collage, slicedQuote);
        }
    };
    xhr.open('GET', url);
    xhr.send();

};

initCollage();