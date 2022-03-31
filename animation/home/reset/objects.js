import anime from 'animejs';


export default function objectsIntro() {
  const timeline = anime.timeline({
    easing: 'easeOutElastic',
    autoplay: false,
  }).add({
    targets: '#home > .container-page-home',
    duration: 500,
    translateY: [-10, 0],
    translateX: [-10, 0]
  }, 0).add({
    targets: '#home > .container-page-portfolio',
    duration: 500,
    translateY: [-10, 0],
    translateX: [-10, 0]
  }, 0).add({
    targets: '#home > .container-page-about',
    duration: 500,
    translateY: [-10, 0],
    translateX: [-10, 0]
  }, 0).add({
    targets: '#home > .container-page-blog',
    duration: 500,
    translateY: [-10, 0],
    translateX: [10, 0]
  }, 0).add({
    targets: '#home > .container-page-clients',
    duration: 500,
    translateY: [-10, 0],
    translateX: [10, 0]
  }, 0).add({
    targets: '#home > .container-page-contact',
    duration: 500,
    translateY: [-10, 0],
    translateX: [10, 0]
  }, 0).add({
    targets: '#home > .container-page-donations ',
    duration: 500,
    translateY: [-10, 0],
    translateX: [10, 0]
  }, 0).add({
    targets: '#home > .container-page-easter',
    duration: 500,
    translateY: [-10, 0],
    translateX: [10, 0]
  }, 0).add({
    targets: '#home > .container-clients',
    duration: 500,
    translateY: [-10, 0],
    translateX: [10, 0]
  }, 0).add({
    targets: '#home > .container-about',
    duration: 500,
    translateY: [-10, 0],
    translateX: [10, 0]
  }, 0).add({
    targets: '#home > .container-portfolio',
    duration: 500,
    translateY: [10, 0],
    translateX: [10, 0]
  }, 0).add({
    targets: '#home > .container-contact',
    duration: 500,
    translateY: [10, 0],
    translateX: [10, 0]
  }, 0).add({
    targets: '#home > .container-donations',
    duration: 500,
    translateY: [10, 0],
    translateX: [10, 0]
  }, 0).add({
    targets: '#home > .container-easter',
    duration: 500,
    translateY: [10, 0],
    translateX: [-10, 0]
  }, 0).add({
    targets: '#home > .container-blog',
    duration: 500,
    translateY: [10, 0],
    translateX: [10, 0]
  }, 0);

  return timeline;
};
