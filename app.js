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
    this.muteBtns = document.querySelectorAll('.mute');
    this.tempoSlider = document.querySelector('.tempo-slider');
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
      this.playBtn.classList.remove('active');
    } else {
      this.playBtn.textContent = 'Stop';
      this.playBtn.classList.add('active');
    }
  }

  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    console.log(selectionValue);
    switch (selectionName) {
      case 'kick-select':
        this.kickAudio.src = selectionValue;
        break;
      case 'snare-select':
        this.snareAudio.src = selectionValue;
        break;
      case 'hihat-select':
        this.hihatAudio.src = selectionValue;
        break;

      default:
        break;
    }
  }
  mute(e) {
    console.log(e);
    const muteIndex = e.target.getAttribute('data-track');
    e.target.classList.toggle('active');
    if (e.target.classList.contains('active')) {
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 0;
          break;
        case '1':
          this.snoreAudio.volume = 0;
          break;
        case '2':
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 1;
          break;
        case '1':
          this.snoreAudio.volume = 1;
          break;
        case '2':
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    console.log(e.target.value);
    this.bpm = e.target.value;
    document.querySelector('.tempo-nr').textContent = this.bpm;
  }
  updateTempo(e) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector('.play');
    if (playBtn.classList.contains('active')) {
      this.start();
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

drumKit.selects.forEach((select) => {
  select.addEventListener('change', function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    drumKit.mute(e);
  });
});
drumKit.tempoSlider.addEventListener('input', function (e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('change', function (e) {
  drumKit.updateTempo(e);
});
