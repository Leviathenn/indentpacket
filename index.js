/**
 * @author Leviathenn
 */

const axios = require("axios").default;
const os = require("os")
const ini = require("ini");
const fs = require("fs");
const unzipper = require("unzipper");
const tmpdir = os.tmpdir();
const AdmZip = require('adm-zip');
const arrayBufferToBuffer = require('arraybuffer-to-buffer');
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const f = async () => {
    const url = 'https://github.com/Leviathenn/indentpacket/raw/main/pakd-en_us.zip';
    const body = await axios.get(url, {
        responseType: 'arraybuffer',
    });

    var zip = new AdmZip(body.data);
    var zipEntries = zip.getEntries();

    // search for "index.html" which should be there
    for (var i = 0; i < zipEntries.length; i++) {
     //   console.log(zip.readAsText(zipEntries[i]));
    }
    const idgen = makeid(5);
    const idgen2 = makeid(5);
    const dirwrite = `${tmpdir}/${idgen}.zip`
    const dirmight = `${tmpdir}/${idgen2}`
    // and to extract it into current working directory
    zip.extractAllTo(dirmight, true);
    var config = ini.parse(fs.readFileSync(`${dirmight}/en_us/installer.siui`, 'utf-8'))
    for (const prop in config.Base) {
        if(config.MessagePrefs[prop]){
            console.log(`Found preference: ${config.MessagePrefs[prop]} for base ${prop}.`);
        }else{
            console.log(`No preference was found for base ${prop}.`)
        }
      }
    

f();
