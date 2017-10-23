import rocjs from '../../files/rocjs.png';

function start() {
    var img = document.createElement('img');
    img.src = rocjs;

    document.body.appendChild(img);
    window.alert('Hello World');
}

if (process.env.NODE_ENV !== 'test') {
	start();
}
