function handleSound(){
    console.log("handleSound");
    if (audioOn){
        //turn audio off
        audioOn = false;
        bgAudio.pause();
        //update img
        soundBtn.src = "./img/soundOff.png";
    } else{
        //turn audio on
        bgAudio.play();
        audioOn = true;
        //update img
        soundBtn.src = "./img/soundOn.png";
    }
}
function handleSE(){
    if (seOn){
        //turn off
        seOn = false;
        seBtn.src = "./img/seOff.png";
    } else{
        //turn on
        seOn = true;
        seBtn.src = "./img/seOn.png";
    }
}
function handleSoundStart(){
    if (audioOn){
        //turn audio off
        audioOn = false;
        bgAudio.pause();
        //update img
        soundStartBtn.src = "./img/sOffStart.png";
        soundBtn.src = "./img/soundOff.png";
    } else{
         //turn audio on
        bgAudio.play();
        audioOn = true;
        //update img
        soundStartBtn.src = "./img/sOnStart.png";
        soundBtn.src = "./img/soundOn.png";
    }
}
function handleSEStart(){
    if (seOn){
        //turn off
        seOn = false;
        seStartBtn.src = "./img/seOffStart.png";
        seBtn.src = "./img/seOff.png";
    } else{
        //turn on
        blingAudio.play();
        seOn = true;
        seStartBtn.src = "./img/seOnStart.png";
        seBtn.src = "./img/seOn.png";
    }
}