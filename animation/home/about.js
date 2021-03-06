import anime from 'animejs';


export default function aboutEvents() {
  const anim = anime.timeline({
    duration: 250,
    autoplay: false,
    easing: 'easeOutQuint'
  }).add({
    targets: [
      '#home > .container-page-clients', '#home > .container-page-portfolio',
      '#home > .container-page-donations', '#home > .container-page-contact',
      '#home > .container-page-easter', '#home > .container-page-blog',
      '#home > .container-page-home'
    ],
    translateY: [0, -400]
  }, 0).add({
    targets: '#home > .container-clients',
    translateY: [0, -80],
    translateX: [0, -100],
    rotate: [-10, 5]
  }, 0).add({
    targets: '#home > .container-about',
    translateY: [0, 100],
    translateX: [0, -100],
    rotate: [10, 15]
  }, 0).add({
    targets: '#home > .container-portfolio',
    translateY: [0, 60],
    translateX: [0, -20],
    rotate: [30, -10]
  }, 0).add({
    targets: '#home > .container-donations',
    translateY: [0, 20],
    translateX: [0, -100],
    rotate: [0, -30]
  }, 0).add({
    targets: '#home > .container-contact',
    translateY: [0, 5],
    translateX: [0, -40],
    rotate: [-10, -65]
  }, 0).add({
    targets: '#home > .container-easter',
    translateY: [0, 5]
  }, 0).add({
    targets: '#home > .container-blog',
    translateY: [0, 5]
  }, 0);

  return anim;
};
