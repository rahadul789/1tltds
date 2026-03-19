import * as React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ fill, style, width, height, ...props }, ref) => {
    return (
      <img
        ref={ref}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        style={
          fill
            ? {
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: props.style?.objectFit ?? "cover",
                ...style,
              }
            : style
        }
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
