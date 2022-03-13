import { useEffect } from 'react';
import anime from 'animejs';
import Container from '@/components/container'
import Layout from '@/components/layout'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'


import objectsIntro from './animation/home/intro/objects';
// import clientsEvents from './animation/home/clients';
// import aboutEvents from './animation/home/about';
// import portfolioEvents from './animation/home/portfolio';
// import donationsEvents from './animation/home/donations';
// import contactEvents from './animation/home/contact';
// import easterEvents from './animation/home/easter';
// import blogEvents from './animation/home/blog';

import Portfolio from '../assets/images/portfolio.svg'
import About from '../assets/images/about.svg'
import Blog from '../assets/images/blog.svg'
import Clients from '../assets/images/clients.svg'
import Contact from '../assets/images/contact.svg'
import Donations from '../assets/images/donations.svg'
import Easter from '../assets/images/easter.svg'
import PageHome from '../assets/images/page-home.svg'
import PagePortfolio from '../assets/images/page-portfolio.svg'
import PageAbout from '../assets/images/page-about.svg'
import PageBlog from '../assets/images/page-blog.svg'
import PageClients from '../assets/images/page-clients.svg'
import PageContact from '../assets/images/page-contact.svg'
import PageDonations from '../assets/images/page-donations.svg'
import PageEaster from '../assets/images/page-easter.svg'


export default function Index() {


  useEffect(() => {
    const t1 = anime
      .timeline()
      .add({
        targets: 'body',
        easing: 'linear',
        backgroundColor: '#f8d983',
        duration: 1000,
        autoplay: false,
      });
  
    t1.finished.then(() => {
      const t2 = objectsIntro();
      t2.finished.then(() => {
        // clientsEvents(router);
        // aboutEvents(router);
        // portfolioEvents(router);
        // donationsEvents(router);
        // contactEvents(router);
        // easterEvents(router);
        // blogEvents(router);
      });
      t2.play();
    });
  
    t1.play();
  }, []);

  

  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <div id="home">
            <Portfolio class="container-portfolio" />
            <About class="container-about" />
            <Blog class="container-blog" />
            <Clients class="container-clients" />
            <Contact class="container-contact" />
            <Donations class="container-donations" />
            <Easter class="container-easter" />
            <PageHome class="container-page-home" />
            <PagePortfolio class="container-page-portfolio" />
            <PageAbout class="container-page-about" />
            <PageBlog class="container-page-blog" />
            <PageClients class="container-page-clients" />
            <PageContact class="container-page-contact" />
            <PageDonations class="container-page-donations" />
            <PageEaster class="container-page-easter" />
          </div>
        </Container>
      </Layout>
    </>
  )
}
