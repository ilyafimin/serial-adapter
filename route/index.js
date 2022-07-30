const router = require('express').Router();
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

let data = []

const parser = new ReadlineParser();
const port = new SerialPort({ path: 'COM3', baudRate: 19200, autoOpen: false });
port.pipe(parser);

parser.on('data', (data_) => { data.push(data_.replace('\r', '')) })

router.post('/write', (request, response) => {
  const body = request.body;
  console.log(request);
  (!port.isOpen) && port.open();
  port.write(body.command);
  return response.json({
    comand: body.comand,
  });
});

router.get('/read', (_, response) => {
  (!port.isOpen) && port.open();
  return response.json({
    data,
    flags: {
      isClosed: !port.isOpen,
    }
  });
});

router.get('/clear', (_, response) => {
  data = [];
  return response.json({ isCleared: true });
});


router.get('/close', (_, response) => {
  (port.isOpen) && port.close();
  return response.json({ isClosed: !port.isOpen });
});

module.exports = router