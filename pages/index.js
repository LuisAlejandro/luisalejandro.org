import { useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from 'components/Home/container'
import Layout from 'components/Home/layout'
import { CMS_NAME } from 'lib/constants'
import objectsIntro from 'animation/home/intro/objects';
import objectsOutro from 'animation/home/outro/objects';
import objectsReset from 'animation/home/reset/objects';
import easterEgg from 'animation/easter';
import bgIntro from 'animation/home/intro/bg';
import aboutEvents from 'animation/home/about';
import portfolioEvents from 'animation/home/portfolio';
import contactEvents from 'animation/home/contact';
import easterEvents from 'animation/home/easter';
import blogEvents from 'animation/home/blog';

import Portfolio from 'assets/images/portfolio.svg'
import About from 'assets/images/about.svg'
import Blog from 'assets/images/blog.svg'
import Contact from 'assets/images/contact.svg'
import Easter from 'assets/images/easter.svg'
import PageHome from 'assets/images/page-home.svg'
import PagePortfolio from 'assets/images/page-portfolio.svg'
import PageAbout from 'assets/images/page-about.svg'
import PageBlog from 'assets/images/page-blog.svg'
import PageContact from 'assets/images/page-contact.svg'
import PageEaster from 'assets/images/page-easter.svg'
import Me from 'assets/images/me.svg'
import Cloud from 'assets/images/cloud.svg'
import Extinguisher from 'assets/images/extinguisher.svg'
import Fire from 'assets/images/fire.svg'
import Scooter from 'assets/images/scooter.svg'
import Stream from 'assets/images/stream.svg'
import WaterDrop from 'assets/images/water-drop.svg'


export default function Index() {

  const router = useRouter();

  useEffect(() => {
    window.addEventListener("load", () => {
      const todayDate = new Date().toLocaleString('en');
      const texts = document.getElementsByClassName('deployment-date');
      for (var i = 0; i < texts.length; i++) {
        texts[i].innerHTML = 'Deployment date: ' + todayDate;
      }
    });
  }, []);

  useEffect(() => {
    const bg = bgIntro();
    const intro = objectsIntro();
    const blogCallback = () => {
      const reset = objectsReset();
      const blog = blogEvents();
      reset.finished.then(() => {
        blog.play();
      });
      reset.play();
    };
    const pageBlogCallback = () => {
      const outro = objectsOutro();
      // outro.finished.then(() => {
      //   router.push('/blog');
      // });
      outro.play();
    };
    const contactCallback = () => {
      const reset = objectsReset();
      const contact = contactEvents();
      reset.finished.then(() => {
        contact.play();
      });
      reset.play();
    };
    const pageContactCallback = () => {
      const outro = objectsOutro();
      outro.finished.then(() => {
        router.push('/portfolio#contact');
      });
      outro.play();
    };
    const aboutCallback = () => {
      const reset = objectsReset();
      const about = aboutEvents();
      reset.finished.then(() => {
        about.play();
      });
      reset.play();
    };
    const pageAboutCallback = () => {
      const outro = objectsOutro();
      outro.finished.then(() => {
        router.push('/portfolio#about');
      });
      outro.play();
    };
    const easterCallback = () => {
      const reset = objectsReset();
      const easter = easterEvents();
      reset.finished.then(() => {
        easter.play();
      });
      reset.play();
    };
    const pageEasterCallback = () => {
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
    };
    const portfolioCallback = () => {
      const reset = objectsReset();
      const portfolio = portfolioEvents();
      reset.finished.then(() => {
        portfolio.play();
      });
      reset.play();
    };
    const pagePortfolioCallback = () => {
      const outro = objectsOutro();
      outro.finished.then(() => {
        router.push('/portfolio');
      });
      outro.play();
    };
  
    document.querySelector('#home > .container-blog')
      .addEventListener('click', blogCallback);
    document.querySelector('#home > .container-page-blog')
      .addEventListener('click', pageBlogCallback);
    document.querySelector('#home > .container-contact')
      .addEventListener('click', contactCallback);
    document.querySelector('#home > .container-page-contact')
      .addEventListener('click', pageContactCallback);
    document.querySelector('#home > .container-about')
      .addEventListener('click', aboutCallback);
    document.querySelector('#home > .container-page-about')
      .addEventListener('click', pageAboutCallback);
    document.querySelector('#home > .container-easter')
      .addEventListener('click', easterCallback);
    document.querySelector('#home > .container-page-easter')
      .addEventListener('click', pageEasterCallback);
    document.querySelector('#home > .container-portfolio')
      .addEventListener('click', portfolioCallback);
    document.querySelector('#home > .container-page-portfolio')
      .addEventListener('click', pagePortfolioCallback);

    bg.finished.then(() => {
      intro.play();
    });
  
    bg.play();

    return () => {
      const blogEl = document.querySelector('#home > .container-blog');
      const pageBlogEl = document.querySelector('#home > .container-page-blog');
      const contactEl = document.querySelector('#home > .container-contact');
      const pageContactEl = document.querySelector('#home > .container-page-contact');
      const aboutEl = document.querySelector('#home > .container-about');
      const pageAboutEl = document.querySelector('#home > .container-page-about');
      const easterEl = document.querySelector('#home > .container-easter');
      const pageEasterEl = document.querySelector('#home > .container-page-easter');
      const portfolioEl = document.querySelector('#home > .container-portfolio');
      const pagePortfolioEl = document.querySelector('#home > .container-page-portfolio');
      blogEl && blogEl.removeEventListener('click', blogCallback);
      pageBlogEl && pageBlogEl.removeEventListener('click', pageBlogCallback);
      contactEl && contactEl.removeEventListener('click', contactCallback);
      pageContactEl && pageContactEl.removeEventListener('click', pageContactCallback);
      aboutEl && aboutEl.removeEventListener('click', aboutCallback);
      pageAboutEl && pageAboutEl.removeEventListener('click', pageAboutCallback);
      easterEl && easterEl.removeEventListener('click', easterCallback);
      pageEasterEl && pageEasterEl.removeEventListener('click', pageEasterCallback);
      portfolioEl && portfolioEl.removeEventListener('click', portfolioCallback);
      pagePortfolioEl && pagePortfolioEl.removeEventListener('click', pagePortfolioCallback);
    };

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
              <Contact className="container-contact" />
              <Easter className="container-easter" />
              <PageHome className="container-page-home" />
              <PagePortfolio className="container-page-portfolio" />
              <PageAbout className="container-page-about" />
              <PageBlog className="container-page-blog" />
              <PageContact className="container-page-contact" />
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
