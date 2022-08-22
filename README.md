# olimexEEGNodeJS

## The Olimex EEG-SMT 
EEG-SMT is a two channel EEG device sold by Olimex at a quite low price. 
Unfortunately, the software recommended by Olimex are not maintened anymore and the very few library that allow to receive data from Electrodes aren't really satisfying.
In order to be able to use my old Olimex, I figured out I might as well build a library as well.

## How it works? 
EEG-SMT connect through USB but use it as a serial port. For Linux users that is not a problem, you can find the location of the virtual serial port with (for instance):
```
$>ls /dev/serial/by-id/
usb-FTDI_FT232R_USB_UART_A902ZSBS-if00-port0
```
It is then possible to read from this serial in the shell :
```
od -x < /dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A902ZSBS-if00-port0
```

This library uses NodeJS SerialReader in order to read the stream of packet comming from EEG-SMT. It then decode packets, which have a very specific format. Then it persists the packets to MongoDB.

## What's next?

The raw value of electrodes isn't really interesting. What we want to know is the frequency and intensenty of electromagnetic waves near the scalp.

I'm now adding a Fourier transform module taking channel values as input signal and persisting to mongo again. 
