import anime from 'animejs';


export default function bgIntro() {
  const timeline = anime
    .timeline()
    .add({
      targets: 'body',
      easing: 'linear',
      backgroundColor: '#f8d983',
      duration: 1000,
      autoplay: false,
    });
  
    return timeline;
};
  