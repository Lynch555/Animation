document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const animateBrowser = document.querySelector(".animate-browser");
  const animateLeftSide = document.querySelector('.animate-left-side');
  const animateTopSide = document.querySelector('.animate-top-side');
  const animateRightSide = document.querySelector('.animate-right-side');
  const progressContainer = document.querySelector('.progress-container');
  const stackManets = document.querySelector('.animate-stack-manets');
  const manets = document.querySelectorAll('.animate-maneta');
  const bars = document.querySelectorAll('.bar');

  let browserBlock = {
    count: 86,
    speed: 2,
    startPos: 85,
    endPos: 0
  };
  let leftSideBlock = {
    count: -285,
    speed: 5,
    startPos: -285,
    endPos: 0
  };
  let topSideBlock = {
    count: -150,
    speed: 3,
    startPos: -150,
    endPos: 0
  };
  let rightSideBlock = {
    count: 440,
    speed: 8,
    startPos: 440,
    endPos: 0
  };
  let progressContainerBlock = {
    count: 185,
    speed: 3,
    startPos: 185,
    endPos: 0
  };
  let maneta = {
    count: -1275,
    speed: 75,
    startPos: -1275,
    endPos: 0
  };
  let stackManetsBlock = {
    count: 0,
    speed: 10,
    startPos: 0,
    endPos: 190
  };

  // Функция для роботы requestAnimationFrame в старых браузерах
  const regVariant = (() => { // Самовызывающаяся стрелочная функция
    return requestAnimationFrame ||
      webkitRequestAnimationFrame ||
      mozRequestAnimationFrame ||
      oRequestAnimationFrame ||
      msRequestAnimationFrame ||
      function (callback) {
        setTimeout(callback, 1000 / 60);
      };
  })();

  const firstAni = () => {
    browserBlock.count -= browserBlock.speed;
    animateBrowser.style.transform = `translateX(${browserBlock.count}%)`;
    if (browserBlock.count > 0) {
      regVariant(firstAni);
    } else {
      regVariant(secondAni);
      regVariant(thirdAni);
      regVariant(fourthAni);
      regVariant(fifthAni);

      // Вызов падения манет
      dropManets();
    }
  };
  requestAnimationFrame(firstAni); // Запуск анимаций

  const dropManets = () => {
    funcManets(manets[0]);
    setTimeout(() => {
      funcManets(manets[1]);
      setTimeout(() => {
        funcManets(manets[2]);
        setTimeout(() => {
          funcManets(manets[3]);
          setTimeout(() => {
            funcManets(manets[4]);
            setTimeout(() => {
              funcManets(manets[5]);
              setTimeout(() => {
                funcManets(manets[6]);
                setTimeout(() => {
                  funcManets(manets[7]);
                  setTimeout(() => {
                    dropManetsStack();
                  }, 1000);
                }, 500);
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  };
  // Вторая анимация
  const secondAni = () => {
    leftSideBlock.count += leftSideBlock.speed;
    animateLeftSide.style.transform = `translateX(${leftSideBlock.count}%)`;
    if (leftSideBlock.count < 0) {
      requestAnimationFrame(secondAni);
    }
  };
  // Третья анимация
  const thirdAni = () => {
    topSideBlock.count += topSideBlock.speed;
    animateTopSide.style.transform = `translateY(${topSideBlock.count}%)`;
    if (topSideBlock.count < leftSideBlock.endPos) {
      requestAnimationFrame(thirdAni);
    }
  };
  // Четвертая анимация справа
  const fourthAni = () => {
    rightSideBlock.count -= rightSideBlock.speed;
    animateRightSide.style.transform = `translateX(${rightSideBlock.count}%)`;
    if (rightSideBlock.count > leftSideBlock.endPos) {
      requestAnimationFrame(fourthAni);
    }
  };
  // Пятая анимация прогресс с низу
  const fifthAni = () => {
    progressContainerBlock.count -= progressContainerBlock.speed;
    progressContainer.style.transform = `translateY(${progressContainerBlock.count}%)skewY(26deg)`;
    if (progressContainerBlock.count > leftSideBlock.endPos) {
      requestAnimationFrame(fifthAni);
    } else {
      funcBars(bars[0], 30);
      setTimeout(() => {
        funcBars(bars[1], 55);
      }, 500);
      setTimeout(() => {
        funcBars(bars[2], 35);
      }, 1000);
      setTimeout(() => {
        funcBars(bars[3], 75);
      }, 1500);
      setTimeout(() => {
        randomizerFunck();
      }, 4000);
    }
  };
  // Скрипт падения манет
  const funcManets = (elem) => {
    const manetaAni = () => {
      maneta.count += maneta.speed;
      elem.style.transform = `translateY(${maneta.count}%)`;
      if (maneta.count < leftSideBlock.endPos) {
        requestAnimationFrame(manetaAni);
      } else {
        maneta.count = maneta.startPos;
      }
    };
    requestAnimationFrame(manetaAni);
  };
  const dropManetsStack = () => {
    const stackAni = () => {
      stackManetsBlock.count += stackManetsBlock.speed;
      stackManets.style.transform = `translateY(${stackManetsBlock.count}px)`;
      if (stackManetsBlock.count < stackManetsBlock.endPos) {
        requestAnimationFrame(stackAni);
      } else {
        stackManetsBlock.count = stackManetsBlock.startPos;
        setTimeout(() => {
          stackManets.style.transform = `translateY(${stackManetsBlock.startPos}px)`;
          manets.forEach(item => {
            item.style.transform = `translateY(${maneta.startPos}%)`;
          });
          setTimeout(() => {
            dropManets();
          }, 1000);
        }, 2000);
      }
    };
    requestAnimationFrame(stackAni);
  };

  // Работа с блоками
  const funcBars = (elem, height) => {
    let count = 0;
    const barsAni = () => {
      count++;
      elem.style.height = `${count}%`;
      if (count >= 5) {
        elem.querySelector('span').style.fontSize = '20px';
        elem.querySelector('span').textContent = count + '%';
      }
      if (count < height) {
        requestAnimationFrame(barsAni);
      }
    };
    requestAnimationFrame(barsAni);
  };

  const randomizerFunck = () => {
    let index = Math.floor(Math.random() * 4);
    let element = bars[index];
    let height = element.style.height;
    let heightNum = +height.substring(0, height.length - 1);
    let count = 0;
    let step = 1;

    const randBarAniPlus = () => {
      heightNum += step;
      element.style.height = heightNum + '%';
      count += step;
      element.querySelector('span').textContent = heightNum + '%';

      if (count < 25) {
        requestAnimationFrame(randBarAniPlus);
      } else {
        count = 0;
        requestAnimationFrame(randBarAniMinus);
      }
    };
    const randBarAniMinus = () => {
      heightNum -= step;
      element.style.height = heightNum + '%';
      count += step;
      element.querySelector('span').textContent = heightNum + '%';

      if (count < 25) {
        requestAnimationFrame(randBarAniMinus);
      } else {
        count = 0;
        randomizerFunck();
      }
    };
    requestAnimationFrame(randBarAniPlus);
  };
});