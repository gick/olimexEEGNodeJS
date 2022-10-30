let fft = require("ezfft").fft;
let ifft = require("ezfft").ifft;
// import { fft, ifft } from "ezfft"; // Or import on ES5+

let signal = [];    // My awesome signal
let fs = 50;      // My awesome sample rate

let f = 20;         // My signal's awesome frequency
for(let t = 0; t < 1; t += 1/fs) {
    signal.push(5);   // Let's make some sin ;-) (oh yeah go with it)
}

let data = fft(signal, fs);    // OMG ITS EZ AS F*
console.dir(data)
