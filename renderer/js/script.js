const form = document.getElementById("img-form");
const img = document.getElementById("img");
const fileName =  document.getElementById("filename");
const outputPath = document.getElementById("output-path");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");


function loadImage(e){
    const file = e.target.files[0];
    if (!imageValidity(file)){
        alert("enter avalid image");
        return ;
    }
   form.style.display = 'block';
   fileName.innerHTML = file.name;
   outputPath.innerHTML = path.join(os.homedir() , "imageresizer");
   
   // get orignale dimension : 
   const image = new Image();
   image.src = URL.createObjectURL(file);
   image.onload = function (){
    widthInput.value = this.width ;
    heightInput.value = this.height;
   }


}
// check image validity 

function imageValidity(file){
    const acceptedfiles = ['image/gif','image/png','image/jpeg'];
    return file && acceptedfiles.includes(file['type'])
}

img.addEventListener("change" , loadImage);

