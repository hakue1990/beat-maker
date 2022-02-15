class Drumkit {
  constructor(pads) {
    this.pads = document.querySelectorAll('.pad');
    this.playBtn = document.querySelector('.play');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');

    this.currentKick = './sounds/kick-classic.wav';
    this.currentSnare = './sounds/snare-acustic01.wav';
    this.currentHihat = './sounds/hihat-acustic01.wav';
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll('select');
  }
  activePad() {
    console.log(this);
    this.classList.toggle('active');
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
      //Check if pads are active - and play a sound
      if (bar.classList.contains('active')) {
        //check each sound
        if (bar.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0;

          this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad')) {
          this.hihatAudio.currentTime = 0;

          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.textContent = 'Start';
    } else {
      this.playBtn.textContent = 'Stop';
    }
  }

  //cloase class
}

const drumKit = new Drumkit();

//Event Listeners

drumKit.playBtn.addEventListener('click', function () {
  drumKit.start();
  drumKit.updateBtn();
});

drumKit.pads.forEach((pad) => {
  pad.addEventListener('click', drumKit.activePad);
  pad.addEventListener('animationend', function () {
    this.style.animation = '';
  });
});

// Drumkit.selects.forEach((select) => {
//   select.addEventListener('change', function () {
//     drumKit.changeSound();
//   });
// });
