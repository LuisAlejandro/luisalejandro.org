import { useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import Container from '@/components/container'
import Layout from '@/components/layout'
import { CMS_NAME } from '@/lib/constants'

import objectsIntro from './animation/home/intro/objects';
import objectsOutro from './animation/home/outro/objects';
import objectsReset from './animation/home/reset/objects';
import easterEgg from './animation/easter';
import bgIntro from './animation/home/intro/bg';
// import clientsEvents from './animation/home/clients';
import aboutEvents from './animation/home/about';
import portfolioEvents from './animation/home/portfolio';
// import donationsEvents from './animation/home/donations';
import contactEvents from './animation/home/contact';
import easterEvents from './animation/home/easter';
import blogEvents from './animation/home/blog';

import Portfolio from '../assets/images/portfolio.svg'
import About from '../assets/images/about.svg'
import Blog from '../assets/images/blog.svg'
// import Clients from '../assets/images/clients.svg'
import Contact from '../assets/images/contact.svg'
// import Donations from '../assets/images/donations.svg'
import Easter from '../assets/images/easter.svg'
import PageHome from '../assets/images/page-home.svg'
import PagePortfolio from '../assets/images/page-portfolio.svg'
import PageAbout from '../assets/images/page-about.svg'
import PageBlog from '../assets/images/page-blog.svg'
// import PageClients from '../assets/images/page-clients.svg'
import PageContact from '../assets/images/page-contact.svg'
// import PageDonations from '../assets/images/page-donations.svg'
import PageEaster from '../assets/images/page-easter.svg'
import Me from '../assets/images/me.svg'
import Cloud from '../assets/images/cloud.svg'
import Extinguisher from '../assets/images/extinguisher.svg'
import Fire from '../assets/images/fire.svg'
import Scooter from '../assets/images/scooter.svg'
import Stream from '../assets/images/stream.svg'
import WaterDrop from '../assets/images/water-drop.svg'


export default function Index() {

  const router = useRouter();

  useEffect(() => {
    const todayDate = new Date().toLocaleString('en');
    const texts = document.getElementsByClassName('deployment-date');
    for (var i = 0; i < texts.length; i++) {
      texts[i].innerHTML = 'Deployment date: ' + todayDate;
    }
  }, []);

  useEffect(() => {
    const bg = bgIntro();
    const intro = objectsIntro();
  
    document.querySelector('#home > .container-blog')
      .addEventListener('click', () => {
        const reset = objectsReset();
        const blog = blogEvents();
        reset.finished.then(() => {
          blog.play();
        });
        reset.play();
      });

    document.querySelector('#home > .container-page-blog')
      .addEventListener('click', () => {
        const outro = objectsOutro();
        outro.finished.then(() => {
          router.push('/blog');
        });
        outro.play();
      });

    // document.querySelector('#home > .container-clients')
    //   .addEventListener('click', () => {
    //     const reset = objectsReset();
    //     const clients = clientsEvents();
    //     reset.finished.then(() => {
    //       clients.play();
    //     });
    //     reset.play();
    //   });

    // document.querySelector('#home > .container-page-clients')
    //   .addEventListener('click', () => {
    //     const outro = objectsOutro();
    //     outro.finished.then(() => {
    //       router.push('/clients');
    //     });
    //     outro.play();
    //   });

    document.querySelector('#home > .container-contact')
      .addEventListener('click', () => {
        const reset = objectsReset();
        const contact = contactEvents();
        reset.finished.then(() => {
          contact.play();
        });
        reset.play();
      });

    document.querySelector('#home > .container-page-contact')
      .addEventListener('click', () => {
        const outro = objectsOutro();
        outro.finished.then(() => {
          router.push('/contact');
        });
        outro.play();
      });

    // document.querySelector('#home > .container-donations')
    //   .addEventListener('click', () => {
    //     const reset = objectsReset();
    //     const donations = donationsEvents();
    //     reset.finished.then(() => {
    //       donations.play();
    //     });
    //     reset.play();
    //   });

    // document.querySelector('#home > .container-page-donations')
    //   .addEventListener('click', () => {
    //     const outro = objectsOutro();
    //     outro.finished.then(() => {
    //       router.push('/donations');
    //     });
    //     outro.play();
    //   });

    document.querySelector('#home > .container-about')
      .addEventListener('click', () => {
        const reset = objectsReset();
        const about = aboutEvents();
        reset.finished.then(() => {
          about.play();
        });
        reset.play();
      });

    document.querySelector('#home > .container-page-about')
      .addEventListener('click', () => {
        const outro = objectsOutro();
        outro.finished.then(() => {
          router.push('/about');
        });
        outro.play();
      });

    document.querySelector('#home > .container-easter')
      .addEventListener('click', () => {
        const reset = objectsReset();
        const easter = easterEvents();
        reset.finished.then(() => {
          easter.play();
        });
        reset.play();
      });

    document.querySelector('#home > .container-page-easter')
      .addEventListener('click', () => {
        const intro = objectsIntro();
        const outro = objectsOutro();
        const e = easterEgg();

        e.finished.then(() => {
          intro.play();
        });

        outro.finished.then(() => {
          e.play();
        });
        outro.play();
      });

    document.querySelector('#home > .container-portfolio')
      .addEventListener('click', () => {
        const reset = objectsReset();
        const portfolio = portfolioEvents();
        reset.finished.then(() => {
          portfolio.play();
        });
        reset.play();
      });

    document.querySelector('#home > .container-page-portfolio')
      .addEventListener('click', () => {
        const outro = objectsOutro();
        outro.finished.then(() => {
          router.push('/portfolio');
        });
        outro.play();
      });

    bg.finished.then(() => {
      intro.play();
    });
  
    bg.play();
  }, [router]);

  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <div id="app">
            <div id="home">
              <Portfolio className="container-portfolio" />
              <About className="container-about" />
              <Blog className="container-blog" />
              {/* <Clients className="container-clients" /> */}
              <Contact className="container-contact" />
              {/* <Donations className="container-donations" /> */}
              <Easter className="container-easter" />
              <PageHome className="container-page-home" />
              <PagePortfolio className="container-page-portfolio" />
              <PageAbout className="container-page-about" />
              <PageBlog className="container-page-blog" />
              {/* <PageClients className="container-page-clients" /> */}
              <PageContact className="container-page-contact" />
              {/* <PageDonations className="container-page-donations" /> */}
              <PageEaster className="container-page-easter" />
            </div>
            <div id="easter">
              <Me className="container-me" />
              <Cloud className="container-cloud-1" />
              <Cloud className="container-cloud-2" />
              <Extinguisher className="container-extinguisher" />
              <Fire className="container-fire" />
              <Scooter className="container-scooter" />
              <Stream className="container-stream" />
              <WaterDrop className="container-water-drop" />
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}
