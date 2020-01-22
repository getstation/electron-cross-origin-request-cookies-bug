const { app, BrowserWindow } = require('electron');
const yargs = require('yargs');

const argv = yargs
  .option('endpoint', {
    description: 'the year to check for',
    alias: 'E',
    type: 'string',
  })
  .parse(process.argv.slice(1));

  const endpoint = argv.endpoint;
if (!endpoint) {
  throw new Error(`no endpoint in ${JSON.stringify(argv)}`);
}

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // @bx copy of generic window manager option
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: false,
    }
  })

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/test-page.html?endpoint=${endpoint}`);

}

app.on('ready', createWindow)