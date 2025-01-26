
import Imgix from "react-imgix";
import cn from "classnames";

export default function CoverImage({
  title,
  highResUrl,
  lowResUrl,
  extraClasses
}: any) {
  return (
    
    <Imgix
      src={highResUrl}
      alt={title}
      className={cn("lazyload shadow-small w-full", {
        [extraClasses]: true,
      })}
      sizes="100vw"
      attributeConfig={{
        src: "data-src",
        srcSet: "data-srcset",
        sizes: "data-sizes",
      }}
      htmlAttributes={{
        src: `${lowResUrl}?auto=format,compress&q=1&blur=500&w=auto`,
      }}
    />
  );
}
