import {
  SiTypescript,
  SiGo,
  SiIonic,
  SiNextdotjs,
  SiDocker,
  SiGit,
  SiAmazonaws,
  SiPython,
  SiGithub,
} from "react-icons/si";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const RECAPTCHA_API_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY;
export const DISQUS_SHORTNAME = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;
export const ENV_NAME = process.env.NEXT_PUBLIC_ENV_NAME;

export const canonicalHostnameUrl =
  ENV_NAME === "local" ? "http://localhost:3000" : "https://luisalejandro.org";

export const config = {
  name: "Luis Develops",
  app_name: "Luis Develops Blog",
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

export const Stars = [
  { number: 13, text: "Years of experience" },
  { number: 30, text: "Open Source Projects" },
  { number: 20, text: "Clients" },
  { number: 100, text: "Github Stars" },
];

export const GalleryList = [
  {
    name: "Venezuelan government agency",
    year: 2010,
    shortDescription:
      "Relaunching the UI/UX of several web components of the Canaima GNU/Linux national distribution.",
    description: "",
    sources: [
      {
        name: "home page",
        url: "https://web.archive.org/web/20120305185554/http://canaima.softwarelibre.gob.ve/",
      },
      {
        name: "register page",
        url: "https://web.archive.org/web/20120311073357/http://registro.canaima.softwarelibre.gob.ve/",
      },
      {
        name: "wiki",
        url: "https://web.archive.org/web/20120403032920/http://wiki.canaima.softwarelibre.gob.ve/wiki/Portada",
      },
    ],
    images: {
      thumbnail: "/images/hero-dockershelf.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Leadbox",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Btech watches",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20160413233709/http://www.btechwatches.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "American Eagle Outfitters Panamá",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20160219152855/http://aeo.com.pa/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Collage Labs",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20160409183237/http://www.pyugmao.com.ve/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Hunting Bears Blog",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Gin Burdon",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Recetags",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Aguilas",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Electron backend/frontend template",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Spices",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Agoras",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Buildbot Package Builder",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Django Package Index",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Simple Lead Registration",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Simple VPS Deploy",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
  {
    name: "Simple Script Queue",
    year: 1889,
    shortDescription: "Developed a new ",
    description:
      'Although The Starry Night was painted during the day in Van Gogh\'s ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."',
    sources: [
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://en.wikipedia.org/wiki/The_Starry_Night",
      },
      {
        name: "",
        url: "https://web.archive.org/web/20190223004411/http://leadboxhq.com/",
      },
    ],
    images: {
      thumbnail:
        "https://galleria-slideshow.vercel.app/assets/starry-night/thumbnail.jpg",
      logo: "https://galleria-slideshow.vercel.app/assets/starry-night/artist.jpg",
      hero: [
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
        "https://galleria-slideshow.vercel.app/assets/starry-night/hero-small.jpg",
      ],
    },
  },
];

export const Skills = [
  {
    slug: "typescript",
    Component: SiTypescript,
    title: "Typescript",
    Description: () => (
      <>
        I&apos;ve used typescript to develop Desktop/Mobile apps, web
        development and REST apis.
      </>
    ),
  },
  {
    slug: "python",
    Component: SiPython,
    title: "Python",
    Description: () => (
      <>I use python for scripting, cli interfaces and REST api development.</>
    ),
  },
  {
    slug: "golang",
    Component: SiGo,
    title: "Golang",
    Description: () => (
      <>Go is my go-to language when efficiency and speed 💨 is needed.</>
    ),
  },
  {
    slug: "ionic",
    Component: SiIonic,
    title: "Ionic/React",
    Description: () => (
      <>
        Ionic/React has allowed me to develop desktop, mobile and web
        applications.
      </>
    ),
  },
  {
    slug: "nextjs",
    Component: SiNextdotjs,
    title: "Next.js",
    Description: () => (
      <>
        Is so easy to develop static sites with Next.js, I always recommend it.
      </>
    ),
  },
  {
    slug: "docker",
    Component: SiDocker,
    title: "Docker/k8s",
    Description: () => (
      <>
        I use containerization in all my projects. I believe in reproducible
        development environments.
      </>
    ),
  },
  {
    slug: "aws",
    Component: SiAmazonaws,
    title: "AWS/GCP",
    Description: () => (
      <>
        I&apos;ve used S3, EC2 and Beanstalk when lauching client apps, but my
        favourite is GCP.
      </>
    ),
  },
  {
    slug: "ga",
    Component: SiGithub,
    title: "Github Actions",
    Description: () => (
      <>
        I ❤️ (LOVE!) automation. I don&apos;t want to be doing manual stuff all
        the time.
      </>
    ),
  },
  {
    slug: "git",
    Component: SiGit,
    title: "Git",
    Description: () => (
      <>
        Team work and order is important to me, therefore I put almost
        everything I do into git.
      </>
    ),
  },
];

export const ProjectList = [
  {
    title: "Dockershelf",
    description:
      "A collection of useful, lightweight and reliable docker images.",
    image: "/images/dockershelf.svg",
    tags: ["docker", "ci/cd", "python", "shell scripts"],
    visit: "/case-studies/dockershelf",
    id: 0,
  },
  {
    title: "Canaima",
    description:
      "A collection of useful, lightweight and reliable docker images.",
    image: "/images/dockershelf.svg",
    tags: ["docker", "ci/cd", "python", "shell scripts"],
    visit: "/case-studies/dockershelf",
    id: 1,
  },
  {
    title: "Soleit",
    description:
      "A collection of useful, lightweight and reliable docker images.",
    image: "/images/dockershelf.svg",
    tags: ["docker", "ci/cd", "python", "shell scripts"],
    visit: "/case-studies/dockershelf",
    id: 1,
  },
  {
    title: "Expedia API",
    description:
      "A collection of useful, lightweight and reliable docker images.",
    image: "/images/dockershelf.svg",
    tags: ["docker", "ci/cd", "python", "shell scripts"],
    visit: "/case-studies/dockershelf",
    id: 1,
  },
];

export const TimeLineData = [
  {
    year: 2009,
    text: "Started working in a government agency (Venezuela) as a Linux distribution developer.",
  },
  // { year: 2016, text: 'Worked with Vauxoo ERP solutions (Mexico) as a Python developer.', },
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
