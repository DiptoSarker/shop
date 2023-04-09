import Link from "next/link";
import { createClient } from "next-sanity";
import React, { useEffect, useState } from "react";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(
  createClient({
    projectId: "lhwkfm9s",
    dataset: "production",
    apiVersion: "2023-04-06",
    useCdn: false,
  })
);
function urlFor(source) {
  return builder.image(source);
}

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}) => {
  const [bannerer, setBanner] = useState({
    banners: [],
    error: "",
    loading: true,
  });
  const client = createClient({
    projectId: "lhwkfm9s",
    dataset: "production",
    apiVersion: "2023-04-06",
    useCdn: true,
  });
  const { loadingg, errorr, banners } = bannerer;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const banners = await client.fetch(`*[_type == "banner"]`);
        setBanner({ banners, loading: false });
      } catch (err) {
        setBanner({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          {banners.map((banner) => (
            <div key={banner.slug}>
              {" "}
              <img
                src={urlFor(banner.image)}
                alt="headphones"
                className="footer-banner-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
