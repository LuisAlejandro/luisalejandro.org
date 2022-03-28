import anime from 'animejs';

import objectsOutro from './outro/objects';
import objectsReset from './reset/objects';


export default function contactEvents() {
  const anim = anime.timeline({
    duration: 250,
    autoplay: false,
    easing: 'easeOutQuint'
  }).add({
    targets: [
      '#home > .container-page-clients', '#home > .container-page-portfolio',
      '#home > .container-page-donations', '#home > .container-page-blog',
      '#home > .container-page-easter', '#home > .container-page-about',
      '#home > .container-page-home'
    ],
    translateY: [0, -400]
  }, 0).add({
    targets: '#home > .container-clients',
    translateX: [0, -20]
  }, 0).add({
    targets: '#home > .container-about',
    translateX: [0, 10],
    rotate: [10, 15]
  }, 0).add({
    targets: '#home > .container-portfolio',
    translateY: [0, 20],
    translateX: [0, 20]
  }, 0).add({
    targets: '#home > .container-donations',
    translateY: [0, -20],
    translateX: [0, 40]
  }, 0).add({
    targets: '#home > .container-contact',
    translateY: [0, -40],
    rotate: [-10, -15]
  }, 0).add({
    targets: '#home > .container-easter',
    translateY: [0, 5],
    translateX: [0, -40]
  }, 0).add({
    targets: '#home > .container-blog',
    translateY: [0, 5]
  }, 0);

  // const reset = objectsReset();
  // const outro = objectsOutro();

  // reset.finished.then(() => {
  //   anim.play();
  // });

  // outro.finished.then(() => {
  //   router.push('/contact');
  // });

  // document.querySelector('#home > .container-contact').addEventListener('click', reset.play);
  // document.querySelector('#home > .container-page-contact').addEventListener('click', outro.play);

  return anim;
};
