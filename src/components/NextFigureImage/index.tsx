import Image, { ImageProps } from "next/image";
import Link from "next/link";

export type NextFigureImageProps = Partial<
  Pick<ImageProps, "alt" | "blurDataURL" | "src">
> & {
  aspectRatio?: string;
  src?: string;
};

export default function NextFigureImage({
  alt = "",
  aspectRatio,
  blurDataURL,
  src = "",
}: NextFigureImageProps): JSX.Element {
  return (
    <figure>
      <Link href={src} scroll={false}>
        <div
          style={{
            aspectRatio,
            display: "flex",
            position: "relative",
          }}
        >
          <Image
            alt={alt}
            blurDataURL={blurDataURL}
            fill={true}
            placeholder="blur"
            src={src}
            style={{ objectFit: "contain" }}
          />
        </div>
      </Link>
      <figcaption>{alt}</figcaption>
    </figure>
  );
}
