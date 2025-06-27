import cn from "classnames";
import Imgix from "react-imgix";

export default function CoverImage({
  title,
  highResUrl,
  lowResUrl,
  extraClasses,
}: any) {
  if (!highResUrl) {
    return <></>;
  }

  return (
    // @ts-ignore
    <Imgix
      src={highResUrl}
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
        alt: title,
      }}
    />
  );
}
