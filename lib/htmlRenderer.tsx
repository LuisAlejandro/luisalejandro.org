import parse, { domToReact } from "html-react-parser";
import dynamic from "next/dynamic";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});

interface HtmlRendererOptions {
  excerptText: string;
  setIndex: (index: number) => void;
  index: number;
  CoverImage: any; // Component type
}

export const renderHtmlContent = (
  htmlString: any,
  { excerptText, setIndex, index, CoverImage }: HtmlRendererOptions
) => {
  const options = {
    replace: ({ attribs, children, name }: any) => {
      if (name === "pre") {
        return (
          <figure className="inline-block align-top w-full">
            <pre className="inline-block align-top w-[98%] my-0 mb-[30px] mx-0 px-[1%] rounded-[5px] post-highlight-pre overflow-auto">
              {domToReact(children, options)}
            </pre>
          </figure>
        );
      }
      if (name === "code") {
        return (
          <code className={`post-highlight-code ${attribs.class || ""}`}>
            {domToReact(children, options)}
          </code>
        );
      }
      if (name === "blockquote") {
        return (
          <blockquote className="post-blockquote">
            {domToReact(children, options)}
          </blockquote>
        );
      }
      if (name === "p") {
        let hasSpecialChildren = false;
        const specialChildren = [
          "figure",
          "picasa",
          "youtube",
          "soundcloud",
          "svgviewer",
          "pdfviewer",
        ];
        for (const element of children) {
          if (!element?.attribs?.class) continue;
          const classFlag = element.attribs.class.split(" ");
          if (!classFlag.length) continue;

          if (specialChildren.includes(classFlag[0])) {
            hasSpecialChildren = true;
            break;
          }
        }
        return hasSpecialChildren ? (
          <div className="special">{domToReact(children, options)}</div>
        ) : (
          <p className="my-0 mb-[30px]">{domToReact(children, options)}</p>
        );
      }

      if (!attribs?.class) {
        return null;
      }

      const classList = attribs.class.split(" ");

      if (classList.includes("picasa")) {
        if (!children.length || children[0].type !== "text") return <p></p>;
        const imageList = children[0].data.split("\n").filter(Boolean);
        return (
          <div className="inline-block align-top w-full my-[15px] mx-0">
            <PhotoAlbum
              photos={imageList.map((img: any) => ({
                src: img,
                width: 1080,
                height: 800,
              }))}
              layout="rows"
              targetRowHeight={150}
              onClick={({ index }) => setIndex(index)}
            />
            <Lightbox
              slides={imageList.map((img: any) => ({
                src: img,
                width: 1080,
                height: 800,
              }))}
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
            />
          </div>
        );
      }

      if (classList.includes("figure")) {
        const highResUrl = attribs["data-figure-href"];
        const lowResUrl = attribs["data-figure-src"];
        const altText = attribs["data-figure-alt"];
        return (
          <span
            className={`inline-block align-top post-figure cursor-pointer overflow-hidden rounded-[5px] ${
              classList.includes("figure-100")
                ? "w-full my-[15px] mx-0 mb-[60px]"
                : classList.includes("figure-right-40")
                  ? "lg:w-[40%] lg:float-right lg:m-[30px] w-full my-[15px] mx-0 mb-[60px]"
                  : classList.includes("figure-right-30")
                    ? "lg:w-[30%] lg:float-right lg:m-[30px] w-full my-[15px] mx-0 mb-[60px]"
                    : classList.includes("figure-right-20")
                      ? "lg:w-[20%] lg:float-right lg:m-[30px] w-full my-[15px] mx-0 mb-[60px]"
                      : classList.includes("figure-left-40")
                        ? "lg:w-[40%] lg:float-left lg:m-[30px] w-full my-[15px] mx-0 mb-[60px]"
                        : classList.includes("figure-left-30")
                          ? "lg:w-[30%] lg:float-left lg:m-[30px] w-full my-[15px] mx-0 mb-[60px]"
                          : classList.includes("figure-left-20")
                            ? "lg:w-[20%] lg:float-left lg:m-[30px] w-full my-[15px] mx-0 mb-[60px]"
                            : "w-full my-[15px] mx-0 mb-[60px]"
            }`}
            data-figure-src={lowResUrl}
            data-figure-href={highResUrl}
            data-figure-alt={altText}
          >
            <figure className="inline-block align-top relative w-full">
              <CoverImage
                extraClasses={
                  "inline-block align-top w-full h-auto my-0 mx-0 p-0"
                }
                title={excerptText}
                lowResUrl={lowResUrl}
                highResUrl={highResUrl}
              />
              <figcaption
                className="hidden lg:block absolute bottom-0 w-full px-[1%] py-[5px] text-base leading-4 text-left text-gray-600 post-figure-caption"
                dangerouslySetInnerHTML={{ __html: altText }}
              ></figcaption>
            </figure>
          </span>
        );
      }

      if (classList.includes("youtube")) {
        const youtubeId = attribs["data-youtube-id"];
        return (
          <span
            className="inline-block relative w-full h-0 pb-[56.25%] rounded-[10px] overflow-hidden"
            data-youtube-id={youtubeId}
          >
            <ReactPlayer
              className="inline-block align-middle absolute w-full h-full top-0 left-0 my-0 mx-0 p-0"
              url={`https://www.youtube.com/watch?v=${youtubeId}`}
              config={{
                youtube: {
                  playerVars: {
                    rel: 0,
                    autoplay: 0,
                    modestbranding: 1,
                    cc_lang_pref: "en",
                    cc_load_policy: 0,
                    iv_load_policy: 3,
                    controls: 1,
                  },
                  embedOptions: {
                    allowfullscreen: 1,
                    frameborder: 0,
                  },
                },
              }}
              title={excerptText}
              light={true}
              width="100%"
              height="100%"
            />
          </span>
        );
      }

      if (classList.includes("soundcloud")) {
        const soundcloudId = attribs["data-soundcloud-id"];
        const soundcloudUrl = `https://api.soundcloud.com/tracks/${soundcloudId}`;
        return (
          <span
            className="inline-block relative w-full h-0 pb-[16%]"
            data-soundcloud-url={soundcloudUrl}
          >
            <ReactPlayer
              className="inline-block align-middle absolute w-full h-full top-0 left-0 my-0 mx-0 p-0"
              url={soundcloudUrl}
              config={{
                soundcloud: {
                  options: {
                    color: "ff5500",
                    auto_play: "false",
                    hide_related: "true",
                    show_artwork: "true",
                    single_active: "false",
                    show_user: "false",
                    show_playcount: "false",
                    download: "false",
                    buying: "false",
                    sharing: "false",
                  },
                },
              }}
              title={excerptText}
              light={true}
              width="100%"
              height="100%"
            />
          </span>
        );
      }

      if (classList.includes("svgviewer")) {
        const svgUrl = attribs["data-svg-url"];

        return (
          <iframe
            className="inline-block align-top w-full h-[600px] my-0 mx-0 p-0"
            src={svgUrl}
          ></iframe>
        );
      }

      if (classList.includes("pdfviewer")) {
        const pdfUrl = attribs["data-pdf-url"];

        return (
          <iframe
            className="inline-block align-top w-full h-[600px] my-0 mx-0 p-0"
            src={pdfUrl}
          ></iframe>
        );
      }

      return null;
    },
  };
  return parse(htmlString, options);
};
