import anime from 'animejs';

import objectsOutro from './outro/objects';
import objectsReset from './reset/objects';


export default function donationsEvents() {
  const anim = anime.timeline({
    duration: 250,
    autoplay: false,
    easing: 'easeOutQuint'
  }).add({
    targets: [
      '#home > .container-page-clients', '#home > .container-page-portfolio',
      '#home > .container-page-blog', '#home > .container-page-contact',
      '#home > .container-page-easter', '#home > .container-page-about',
      '#home > .container-page-home'
    ],
    translateY: [0, -400]
  }, 0).add({
    targets: '#home > .container-clients',
    translateY: [0, -20],
    rotate: [-10, 5]
  }, 0).add({
    targets: '#home > .container-about',
    translateX: [0, 10],
    rotate: [10, 15]
  }, 0).add({
    targets: '#home > .container-portfolio',
    translateY: [0, 20],
    translateX: [0, 20],
    rotate: [30, 40]
  }, 0).add({
    targets: '#home > .container-donations',
    translateY: [0, -20],
    translateX: [0, -20]
  }, 0).add({
    targets: '#home > .container-contact',
    translateY: [0, 15],
    rotate: [-10, -20]
  }, 0).add({
    targets: '#home > .container-easter',
    translateY: [0, 15],
    rotate: [-10, -15]
  }, 0).add({
    targets: '#home > .container-blog',
    translateY: [0, 10],
    rotate: [-10, -15]
  }, 0);

  // const reset = objectsReset();
  // const outro = objectsOutro();

  // reset.finished.then(() => {
  //   anim.play();
  // });

  // outro.finished.then(() => {
  //   router.push('/donations');
  // });

  // document.querySelector('#home > .container-donations').addEventListener('click', reset.play);
  // document.querySelector('#home > .container-page-donations').addEventListener('click', outro.play);

  return anim;
};
