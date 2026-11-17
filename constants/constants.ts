export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const RECAPTCHA_API_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY;

export const ADSENSE_PUBLISHER_ID = "ca-pub-6592430305679345";

export const META_PIXEL_ID = "882829394312249";

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
export const SES_WELCOME_TEMPLATE_ID = "luisalejandro-welcome";
export const SES_COMPANY_LIST_EMAIL = "contact@luisalejandro.org";
export const SES_COMPANY_SENDER_EMAIL = "no-reply@luisalejandro.org";
export const SES_COMPANY_TEMPLATE_ID = "luisalejandro-company";

export const canonicalHostnameUrl =
  ENV_NAME === "local" ? "http://localhost:3101" : "https://luisalejandro.org";

export const SITE_PROFILE_DATE_CREATED = "2020-01-15T08:00:00+00:00";
// Drives `dateModified` in the home and portfolio JSON-LD, and the `/` entry
// in the sitemap. Bump it in the commit that changes public profile content.
export const SITE_PROFILE_DATE_MODIFIED = "2026-11-10T00:00:00+00:00";

export const config = {
  name: "Luis Alejandro",
  app_name: "Luis Alejandro",
  description: "A software engineer portfolio",
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

export const GalleryList = [
  {
    slug: "mash-website",
    name: "Mash website",
    year: 2026,
    shortDescription:
      "The product site and user guide for Mash, in English and Spanish",
    description:
      "Mash is a desktop workspace for AI-assisted coding, and it needed a place to explain itself without a manual. I built the site as a **Next.js** application that tells the product story with real captures of the app, and put the user guide beside it with **Fumadocs**: installation, first launch, workspaces, agents and sessions, the editor, terminal tools, keyboard reference and troubleshooting, with a static search index generated from the same content. Every page ships in **English and Spanish** from one set of components, and the brand marks are generated from the artwork in the app repository rather than drawn by hand, so the site cannot drift from the product. The optional blog runs on **Drizzle** with **better-auth** and is off unless the environment configures it, which keeps a marketing site from carrying an admin surface it does not need.",
    tags: ["next.js", "fumadocs", "typescript", "drizzle", "netlify"],
    sources: [
      {
        name: "website",
        url: "https://letsma.sh",
      },
      {
        name: "user guide",
        url: "https://letsma.sh/docs/",
      },
      {
        name: "source code",
        url: "https://github.com/LuisAlejandro/mash-website",
      },
    ],
    images: {
      thumbnail: "/images/other/mash-website-thumb.png",
      logo: "/images/other/logo-mash-website.png",
      hero: [
        "/images/other/mash-website-home.png",
        "/images/other/mash-website-docs.png",
      ],
    },
  },
  {
    slug: "listen-for-work",
    name: "Listen for Work",
    year: 2026,
    shortDescription:
      "An agent skill that hunts jobs weekly and tailors a LaTeX CV to the role",
    description:
      "Job hunting is the same search every week with a different answer, so I wrote it once as an **agent skill** in the Agent Skills format and let it run on a schedule. It reads a LinkedIn export, keeps a candidate profile, scans the job boards that do not hide behind a login, ranks each role against the profile, and writes a dated digest that lands in the chat the agent already talks to. For the roles that score high enough, it produces a **tailored LaTeX CV**: a XeLaTeX kit with fonts and a Docker image that compiles the PDF, so the output is a real document and not a rewritten paragraph. The skill ships a Monday morning schedule, and because it is plain `SKILL.md`, the same folder runs in **Hermes**, **Claude Code**, **Cursor**, **Codex** and **OpenCode** without a port. It does not invent experience and it does not write cover letters; that boundary is written into the skill.",
    tags: ["agent skill", "latex", "docker", "shell", "hermes"],
    sources: [
      {
        name: "source code",
        url: "https://github.com/LuisAlejandro/listen-for-work",
      },
    ],
    images: {
      thumbnail: "/images/other/listen-for-work.svg",
      logo: "/images/other/listen-for-work.svg",
      hero: ["/images/other/listen-for-work.svg"],
    },
  },
  {
    slug: "agoras",
    name: "Agoras",
    year: 2022,
    shortDescription:
      "A command line utility to publish and delete posts on ten social networks",
    description:
      "Agoras is a **Python CLI** that publishes and deletes posts on ten networks from one place: X, Facebook, Instagram, LinkedIn, Discord, YouTube, TikTok, Threads, Telegram and WhatsApp. The command surface is platform-first (`agoras <platform> <action>`), the content itself travels as **YAML** files, and the networks that support it go through an interactive **OAuth** flow with a local callback server while the rest use CLI credentials. The project grew into a modular architecture of **five packages** on PyPI, so a pipeline can install only the platform it needs, and it is accompanied by a [GitHub Actions](https://github.com/LuisAlejandro/agoras-actions) repository that drops the same tool into a workflow. It is documented, versioned and released like a library, because it is one: over 1,900 commits and nineteen releases since 2022.",
    tags: ["python", "cli", "pypi", "oauth", "yaml", "docker"],
    sources: [
      {
        name: "source code",
        url: "https://github.com/LuisAlejandro/agoras",
      },
      {
        name: "documentation",
        url: "https://agoras.luisalejandro.org",
      },
      {
        name: "pypi",
        url: "https://pypi.org/project/agoras/",
      },
    ],
    images: {
      thumbnail: "/images/other/agoras-thumb.png",
      logo: "/images/other/logo-agoras.png",
      hero: ["/images/other/agoras-docs.png", "/images/other/agoras-usage.png"],
    },
  },
  {
    slug: "leadbox-build-queue",
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
    slug: "aguilas-ldap-single-sign-on",
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
    slug: "howlermonkey-cve-indexer",
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
    slug: "hunting-bears-blog",
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
    slug: "marvin-video-generator",
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
    slug: "american-eagle-outfitters-panama",
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
  {
    slug: "gin-burdon",
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
    slug: "recetags",
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
    slug: "leadbox-website",
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
    slug: "btech-watches",
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

/**
 * The six newest case studies. They lead the portfolio's pinned stage; the
 * five above stay on the home page and follow them on the portfolio as a grid.
 * No thumbnails exist yet, so `image` is the site banner their pages share.
 */
export const RecentProjectList = [
  {
    title: "Mash",
    description:
      "A desktop workspace for AI-assisted coding: terminal, editor and agents in one app, every tool pinned. Built after the editor I relied on blocked my country.",
    image: "/images/banner.png",
    tags: ["Ghostty", "Herdr", "Pi", "Fresh", "Bash", "APT"],
    visit: "/case-studies/mash",
  },
  {
    title: "Whol Master",
    description:
      "Gym management that runs on the front desk's own computer, with biometric entrance and no cloud account. One gym has used it daily for over a year.",
    image: "/images/banner.png",
    tags: ["Electron", "Go", "SvelteKit", "SQLite", "C++"],
    visit: "/case-studies/wholmaster",
  },
  {
    title: "Shoky",
    description:
      "A forkable meta-workspace for multi-repo projects, with agent skills, per-repo memory and a local container stack. About 25 engineers work from it.",
    image: "/images/banner.png",
    tags: ["Agent skills", "Memory Bank", "Sentrux", "Docker", "Bash"],
    visit: "/case-studies/shoky",
  },
  {
    title: "Tetra",
    description:
      "A two-host agent incubator: 35 scheduled jobs research and build, Discord carries the work, and one person approves it.",
    image: "/images/banner.png",
    tags: ["Hermes", "Discord", "Cron", "YAML", "Git"],
    visit: "/case-studies/tetra",
  },
  {
    title: "The blog system",
    description:
      "Nine agents turn a one-line premise into a sourced, published article, checked against a claim pack, under one human byline.",
    image: "/images/banner.png",
    tags: ["TypeScript", "Multi-agent", "Cosmic CMS", "SEO"],
    visit: "/case-studies/blog-system",
  },
  {
    title: "Botanas",
    description:
      "A trading research loop over Freqtrade that refuses overfit strategies: five walk-forward passes, a drawdown-adjusted gate and nine stress regimes.",
    image: "/images/banner.png",
    tags: ["Python", "Freqtrade", "Hyperopt", "Walk-forward"],
    visit: "/case-studies/botanas",
  },
];
