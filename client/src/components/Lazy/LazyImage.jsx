import { useEffect, useRef, useState } from "react";

const LazyImage = ({ src, alt, ...rest }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (imgRef.current) {
            observer.unobserve(imgRef.current); // ✅ safe unobserve
          }
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current); // ✅ safe cleanup
      }
      observer.disconnect();
    };
  }, []);

  return <img ref={imgRef} src={isVisible ? src : ""} alt={alt} {...rest} />;
};

export default LazyImage;
