import { FaAws } from "react-icons/fa";
import {
  SiDocker,
  SiGit,
  SiGithub,
  SiGo,
  SiIonic,
  SiNextdotjs,
  SiPython,
  SiTypescript,
} from "react-icons/si";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const RECAPTCHA_API_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY;

export const DISQUS_SHORTNAME = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;

export const ENV_NAME = process.env.NEXT_PUBLIC_ENV_NAME;

export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
// export const SENDGRID_WELCOME_SENDER_EMAIL = "luis@luisalejandro.org";
// export const SENDGRID_WELCOME_SENDER_NAME = "Luis Alejandro";
// export const SENDGRID_WELCOME_TEMPLATE_ID = "d-f8f86f9f4d1d4601b200d670af90f411";
// export const SENDGRID_COMPANY_LIST_EMAIL = "contact@luisalejandro.org";
// export const SENDGRID_COMPANY_SENDER_EMAIL = "no-reply@luisalejandro.org";
// export const SENDGRID_COMPANY_SENDER_NAME = "Website Contact Form";
// export const SENDGRID_COMPANY_TEMPLATE_ID = "d-83c08172e0a445c49cc5ac92eefe17ec";
// export const SENDGRID_API_BASE_URL = "https://api.sendgrid.com";
// export const MAILCHIMP_API_BASE_URL = "https://us14.api.mailchimp.com";

export const AWS_REGION = "us-east-1";
export const CONTACT_FORM_NAME = "luisalejandro-contactform";
export const SES_WELCOME_SENDER_EMAIL = "luis@luisalejandro.org";
export const SES_WELCOME_SENDER_NAME = "Luis Alejandro";
export const SES_WELCOME_TEMPLATE_ID = "luisalejandro-welcome";
export const SES_COMPANY_LIST_EMAIL = "contact@luisalejandro.org";
export const SES_COMPANY_SENDER_EMAIL = "no-reply@luisalejandro.org";
export const SES_COMPANY_SENDER_NAME = "Website Contact Form";
export const SES_COMPANY_TEMPLATE_ID = "luisalejandro-company";

export const canonicalHostnameUrl =
  ENV_NAME === "local" ? "http://localhost:3000" : "https://luisalejandro.org";

export const config = {
  name: "Luis Alejandro",
  app_name: "Luis Alejandro Blog",
  title: "A blog about this and that",
  description: "A blog about this and that.",
  keywords: [
    "gnu",
    "linux",
    "free software",
    "open source",
    "technology",
    "society",
  ],
  author: {
    name: "Luis Alejandro Martínez Faneyth",
    first_name: "Luis Alejandro",
    last_name: "Martínez Faneyth",
    email: "luis@luisalejandro.org",
    github: "LuisAlejandro",
    twitter: "LuisAlejandro",
    facebook: "martinez.faneyth",
    paypal: "martinezfaneyth",
    fb_profile_id: "870375116",
  },
  blog: {
    twitter: "LuisDevelops",
    facebook: "LuisDevelops",
    fb_app_id: "367517738636517",
  },
  url: canonicalHostnameUrl,
  generator: "Next.js",
};

export const experience = new Date().getFullYear() - 2009;

export const Stars = [
  { number: experience, text: "Years of experience" },
  { number: 60, text: "Open Source Projects" },
  { number: 20, text: "Clients" },
  { number: 190, text: "Github Stars" },
];

export const GalleryList = [
  {
    name: "Leadbox build queue",
    year: 2018,
    shortDescription:
      "Created a mechanism to build and deploy client websites with a courier-broker-worker architecture.",
    description:
      "As a <a href='https://web.archive.org/web/20230603232601/https://leadboxhq.com/' target='_blank'>Leadbox</a> employee, I was tasked with creating an automatization system to aid in the day-to-day deployment process of **Angular.js** based websites. The system I came up with had a command line interface that added jobs to a queue. A courier would then pick up the job and deliver it to a broker. The broker would then assign the job to a worker, which would build the website and deploy it to the server. The system was written in Python and Bash, managed as a systemd service and installed as an RPM package. This architecture allowed any developer to trigger multiple deploys at the same time **allowing the continuous improvement of more than 100 websites**.",
    tags: ["python", "bash", "multithread", "systemd", "rpm"],
    sources: [],
    images: {
      thumbnail: "/images/other/leadbox-build-queue.png",
      logo: "/images/other/logo-leadbox.svg",
      hero: [
        "/images/other/leadbox-build-queue.png",
        "/images/other/leadbox-build-queue-2.png",
      ],
    },
  },
  {
    name: "Marvin video generator",
    year: 2018,
    shortDescription:
      "Created a video editor capable of mass generating videos from simple configuration.",
    description:
      "As a <a href='https://web.archive.org/web/20230603232601/https://leadboxhq.com/' target='_blank'>Leadbox</a> employee, I was tasked with creating a video editor capable of mass generating videos. I created a **Python backend** that would receive a configuration file and a video template. The backend would then use **FFmpeg** to generate the videos. The frontend was built with **Angular** and allowed the user to create the configuration file and upload the video template. The frontend would then send the configuration file and the video template to the backend. The backend would then generate the videos and upload them to **Azure Blob Storage**. The frontend would then display the videos to the user. This system allowed the company to generate more than 1000 videos in a matter of minutes.",
    tags: ["python", "bottle", "ci/cd", "azure", "ffmpeg", "angular"],
    sources: [
      {
        name: "landing page",
        url: "https://youtu.be/YbZjNMUbZSs",
      },
      {
        name: "video preview",
        url: "https://web.archive.org/web/20230810195652/https://leadboxhq.com/leadbox-oem-video-service-ford/",
      },
    ],
    images: {
      thumbnail: "/images/other/leadbox-marvin.png",
      logo: "/images/other/logo-leadbox.svg",
      hero: [
        "/images/other/leadbox-marvin-ui.png",
        "/images/other/leadbox-marvin-example-1.png",
        "/images/other/leadbox-marvin-example-2.png",
      ],
    },
  },
  {
    name: "Aguilas LDAP Single Sign On",
    year: 2012,
    shortDescription: "A web-based LDAP user management system",
    description:
      "As a Canaima GNU/Linux developer, I worked with several platform applications on a day to day basis. A Mediawiki, a Plone site and a Trac ticket system were our main tools to work with the user community. Soon we had to deal with the problem of having to manage multiple user accounts for each of these applications. To solve this problem, I created a web-based LDAP user management system. This system allowed us to manage user accounts for all of our applications in a single place. The system was written in PHP and used a MySQL database to store user information. The system was also capable of creating user accounts in the LDAP server, which was the backbone of the SSO feature. This system was used by the Canaima GNU/Linux community for more than 5 years.",
    tags: ["php", "css", "js", "ldap", "mysql"],
    sources: [
      {
        name: "source code",
        url: "https://github.com/LuisAlejandro/aguilas",
      },
      {
        name: "website",
        url: "https://web.archive.org/web/20120921044410/https://registro.canaima.softwarelibre.gob.ve/",
      },
    ],
    images: {
      thumbnail: "/images/other/aguilas-1.png",
      logo: "/images/other/logo-cnti.webp",
      hero: ["/images/other/aguilas-2.png"],
    },
  },
  {
    name: "HowlerMonkey CVE indexer",
    year: 2020,
    shortDescription:
      "An application written in Flask to index and query various vulnerability databases",
    description:
      "As a Guayoyo employee, I was tasked with creating a vulnerability database indexer. The indexer would query various vulnerability databases (CVE, CPE, CWE, Snort, etc) and store the results in a MongoDB database. The indexer was written in Python using the Flask framework. The indexer was also capable of querying the database and returning the results in JSON format. The indexer was deployed in an Azure Kubernetes cluster using Docker containers. This system allowed the company to have a single source of truth for vulnerability information.",
    tags: ["python", "flask", "mongo", "azure", "docker"],
    sources: [
      {
        name: "website",
        url: "https://web.archive.org/web/20230314165631/https://howlermonkey.io/",
      },
    ],
    images: {
      thumbnail: "/images/other/howlermonkey-3.svg",
      logo: "/images/other/logo-guayoyo.jpg",
      hero: [
        "/images/other/howlermonkey-1.png",
        "/images/other/howlermonkey-2.jpg",
      ],
    },
  },
  {
    name: "Hunting Bears Blog",
    year: 2010,
    shortDescription: "My personal blog from 2010 to 2015",
    description:
      "This was my personal blog from 2010 to 2015. It was continuously improved using open source technologies. The blog was built using Jekyll, CSS and Javascript. The blog was hosted in Github Pages and was automatically deployed using Github Actions.",
    tags: ["jekyll", "css", "js", "python", "docker", "github actions"],
    sources: [
      {
        name: "source code",
        url: "https://github.com/HuntingBears/huntingbears.github.io",
      },
      {
        name: "banner draft",
        url: "https://www.behance.net/gallery/14167967/Banner-of-huntingbearscomve",
      },
    ],
    images: {
      thumbnail: "/images/other/huntingbears-1.png",
      logo: "/images/other/logo-huntingbears.png",
      hero: [
        "/images/other/huntingbears-1.png",
        "/images/other/huntingbears-3.png",
        "/images/other/huntingbears-2.png",
      ],
    },
  },
  {
    name: "Gin Burdon website",
    year: 2019,
    shortDescription: "A wordpress website for a local gin brand",
    description:
      "Working with the <a href='https://web.archive.org/web/20190121141846/https://webuzz.es/' target='_blank'>Webuzz agency</a>, I was tasked with creating a wordpress website for a local gin brand. The website was created using a custom theme and several plugins. I worked closely with an UX designer provided by the client to plan the layout of the website. I also hired a project manager and a junior frontend developer to help me with the project. The website has been online for more than 4 years and has been a complete success for the client.",
    tags: ["wordpress", "php", "css", "jquery", "docker"],
    sources: [
      {
        name: "website",
        url: "https://web.archive.org/web/20191206145303/https://www.ginburdon.com/",
      },
    ],
    images: {
      thumbnail: "/images/other/ginburdon-3.png",
      logo: "/images/other/logo-ginburdon.png",
      hero: ["/images/other/ginburdon-1.png"],
    },
  },
  {
    name: "Recetags website",
    year: 2020,
    shortDescription: "A wordpress website for a local recipe blog",
    description:
      "Working with the <a href='https://web.archive.org/web/20190121141846/https://webuzz.es/' target='_blank'>Webuzz agency</a>, I was tasked with creating a wordpress website for a local recipe blog. The website was created using a custom theme and several plugins. The website has been online for more than 3 years and has been a complete success for the client.",
    tags: ["wordpress", "php", "css", "jquery", "python", "docker"],
    sources: [
      {
        name: "website",
        url: "https://web.archive.org/web/20201101021046/https://www.recetags.com/",
      },
    ],
    images: {
      thumbnail: "/images/other/recetags-3.jpg",
      logo: "/images/other/logo-recetags.svg",
      hero: ["/images/other/recetags-1.png"],
    },
  },
  {
    name: "Leadbox website",
    year: 2019,
    shortDescription:
      "Developed the new website working with project managers and UX designers.",
    description:
      "As a <a href='https://web.archive.org/web/20230603232601/https://leadboxhq.com/' target='_blank'>Leadbox</a> employee, I was assigned the project of **building the layout and coding** of the new website. Collaborating closely with a project manager and a UX designer, we embarked on this exciting project. Leveraging the flexibility and user-friendly nature of WordPress, I utilized my expertise in CSS and JS to customize the website's appearance and functionality. Through meticulous coding and attention to detail, I transformed the design concepts provided by the UX designer into a fully functional and visually appealing website. This collaborative effort resulted in a seamless online experience that not only met but exceeded the company's expectations.",
    tags: ["wordpress", "css", "js"],
    sources: [
      {
        name: "Website",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail: "/images/other/leadbox-webpage-preview.png",
      logo: "/images/other/logo-leadbox.svg",
      hero: ["/images/other/leadbox-webpage-full.png"],
    },
  },
  {
    name: "Btech watches website",
    year: 2014,
    shortDescription: "An e-commerce website for a local watch brand",
    description:
      "Working with the <a href='https://web.archive.org/web/20150919135024/http://www.e2-361.com/' target='_blank'>e2-361 agency</a>, I was tasked with coding the website for a local watch brand. The website was built using HTML, CSS and JS. I worked closely with the designer to ensure the website was pixel perfect. The website was also integrated with the Adobe Business Catalyst e-commerce platform.",
    tags: ["adobe bussiness catalyst", "css", "js"],
    sources: [
      {
        name: "website",
        url: "https://web.archive.org/web/20160413233709/http://www.btechwatches.com/",
      },
    ],
    images: {
      thumbnail: "/images/other/btech-2.jpg",
      logo: "/images/other/logo-btech.png",
      hero: ["/images/other/btech-1.png", "/images/other/btech-3.png"],
    },
  },
  {
    name: "American Eagle Outfitters Panamá website",
    year: 2015,
    shortDescription: "An e-commerce website for a local clothing brand",
    description:
      "Working with the <a href='https://web.archive.org/web/20150919135024/http://www.e2-361.com/' target='_blank'>e2-361 agency</a>, I was tasked with coding the website for a local clothing brand. The website was built using HTML, CSS and JS. I worked closely with the designer to ensure the website was pixel perfect. The website was also integrated with the Adobe Business Catalyst e-commerce platform.",
    tags: ["adobe bussiness catalyst", "css", "js"],
    sources: [
      {
        name: "website",
        url: "https://web.archive.org/web/20160219152855/http://aeo.com.pa/",
      },
    ],
    images: {
      thumbnail: "/images/other/aeo-1.png",
      logo: "/images/other/logo-aeo.svg",
      hero: ["/images/other/aeo-1.png"],
    },
  },
];

export const Skills = [
  {
    slug: "typescript",
    Component: SiTypescript,
    title: "Typescript",
    description:
      "I've used typescript to develop Desktop/Mobile apps, web development and REST apis.",
  },
  {
    slug: "python",
    Component: SiPython,
    title: "Python",
    description:
      "I use python for scripting, cli interfaces and REST api development.",
  },
  {
    slug: "golang",
    Component: SiGo,
    title: "Golang",
    description:
      "Go is my go-to language when efficiency and speed 💨 is needed.",
  },
  {
    slug: "ionic",
    Component: SiIonic,
    title: "Ionic/React",
    description:
      "Ionic/React has allowed me to develop desktop, mobile and web applications.",
  },
  {
    slug: "nextjs",
    Component: SiNextdotjs,
    title: "Next.js",
    description:
      "Is so easy to develop static sites with Next.js, I always recommend it.",
  },
  {
    slug: "docker",
    Component: SiDocker,
    title: "Docker/k8s",
    description:
      "I use containerization in all my projects. I believe in reproducible development environments.",
  },
  {
    slug: "aws",
    Component: FaAws,
    title: "AWS/GCP",
    description:
      "I've used S3, EC2 and Beanstalk when lauching client apps, but my favourite is GCP.",
  },
  {
    slug: "ga",
    Component: SiGithub,
    title: "Github Actions",
    description:
      "I ❤️ (LOVE!) automation. I don't want to be doing manual stuff all the time.",
  },
  {
    slug: "git",
    Component: SiGit,
    title: "Git",
    description:
      "Team work and order is important to me, therefore I put almost everything I do into git.",
  },
];

export const ProjectList = [
  {
    title: "Expedia API Integration",
    description:
      "An end-to-end implementation of the shopping and booking engines for Wheel The World. It helped increase their bookings by 39% on Q1 2023.",
    image: "/images/case-studies/thumbnails/expedia.png",
    tags: ["Express.js", "Next.js", "Go", "Stripe", "MySQL", "Redis"],
    visit: "/case-studies/expedia",
  },
  {
    title: "Wheel The World CI/CD",
    description:
      "An optimization project to bring down costs and increase reliability of the CI/CD pipeline. It allowed startup to speed up their development process.",
    image: "/images/case-studies/thumbnails/wheeltheworld.png",
    tags: ["Docker", "Github Actions", "Google Cloud"],
    visit: "/case-studies/wheeltheworld",
  },
  {
    title: "Soleit desktop app",
    description:
      "An electron app made with Ionic React capable of aiding in the diagnosis of foot issues. It allowed the Soleit startup raise funding for its growth stage.",
    image: "/images/case-studies/thumbnails/soleit.png",
    tags: ["Ionic", "React", "Electron", "Express.js", "Sequelize", "Python"],
    visit: "/case-studies/soleit",
  },
  {
    title: "Dockershelf",
    description:
      "A collection of useful, lightweight and reliable dockerfiles. Based on debian sid and stable, images are built and tested weekly.",
    image: "/images/case-studies/thumbnails/dockershelf.png",
    tags: ["Docker", "CI/CD", "Python", "Bash", "Ruby", "Rspec"],
    visit: "/case-studies/dockershelf",
    id: 0,
  },
  {
    title: "Canaima GNU/Linux",
    description:
      "A Linux distribution developed to power several projects of the venezuelan government, among them the adoption of free software on the public administration.",
    image: "/images/case-studies/thumbnails/canaima.png",
    tags: ["Debian", "Packaging", "Python", "Django", "Bash"],
    visit: "/case-studies/canaima",
  },
];

export const TimeLineData = [
  {
    year: 2009,
    text: "Started working in a government agency (Venezuela) as a Linux distribution developer.",
  },
  {
    year: 2017,
    text: "Worked with Guayoyo cybersecurity experts (Uruguay) as a Python developer.",
  },
  {
    year: 2018,
    text: "Worked with Leadbox automotive dealership websites (Canada) as a Fullstack developer.",
  },
  {
    year: 2019,
    text: "Founded Collage Labs mobile & web solutions (Venezuela).",
  },
  {
    year: 2019,
    text: "Worked with Webuzz digital marketing (Spain) as Wordpress developer.",
  },
  {
    year: 2020,
    text: "Worked with Soleit startup (Chile) as Fullstack Developer.",
  },
  {
    year: 2022,
    text: "Worked with Wheel The World startup (Chile) as a Senior Sofware Engineer.",
  },
];
