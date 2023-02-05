const path = require("path");
const {app , BrowserWindow , Menu} = require("electron") ;
const isMac = process.platform === "darwin" ; // will be true if is mac 
const isDev = process.env.NODE_ENV === "development";
const dotenv = require("dotenv");
dotenv.config();

// create the main window : 
function CreateMainWindow(){
    const MainWindow = new BrowserWindow({
        title :  "Image resize app",
        width : !isDev ?  1000 : 500 ,
        height : 600 ,
        webPreferences : {
            contextIsolation : true ,
            preload : path.join(__dirname , "preload.js")
        },
    });

    if (isDev){
        MainWindow.webContents.openDevTools(); 
        // run this if we are in dev mode 
        // get from webcontent object the devtools 
    }


    MainWindow.loadFile(
        path.join(__dirname,"./renderer/index.html")
    );
    
}
// create  a about window : 
function CreateAboutWindow(){
    const AboutWindow = new BrowserWindow({
        title : "about us",
        wdth : 500 ,
        height : 300
    });

    AboutWindow.loadFile(path.join(__dirname,'./renderer/about.html'));
}

// app is ready 
app.whenReady().then(() => {
    CreateMainWindow();
    
    // implement menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate' , () => {
        if (BrowserWindow.getAllWindows().length === 0){
            CreateMainWindow();
        }
    })
})
// create menu template or custuize the menu template : 
const menu = [
    {
        label : "File",
        submenu : [
            {
                label : "quit menu" ,
                click : () => app.quit(),
                accelerator : "ctrl+Q", 
            }
        ]
    },
    {
        label : "About",
        submenu : [
            {
                label : "about us",
                click : () => CreateAboutWindow(),
            }
        ]
    }
]

app.on("window-all-closed" , () => {
    if (!isMac){
        app.quit();
    }
})