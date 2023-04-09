import React, { useEffect, useState } from "react";
import { createClient } from "next-sanity";
import PortableText from "react-portable-text";
import client from "@sanity/client";

import { Product, FooterBanner, HeroBanner } from "../../components";

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

function Home() {
  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });

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

  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);

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
    <>
      {/* //@@@@@@@@@@@@@@ Hero Section is here..... */}
      <HeroBanner heroBanner={banners.length && banners[0]} />

      {/* // @@@@@@@@@@@@@ Product section is here.............. */}
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.slug}>
            <Product key={product._id} product={product} />
          </div>
        ))}
      </div>

      {/* @@@@@@@@@@@ Banner Image is Here............. */}
      {banners.map((banner) => (
        <div key={banner.slug}>
          {" "}
          <img
            src={urlFor(banner.image)}
            alt="headphones"
            className="hero-banner-image"
          />
        </div>
      ))}

      {/* @@@@@@@@@@@@@@@ Footer Banner section is here.............. */}

      <FooterBanner footerBanner={banners.length && banners[0]} />
    </>
  );
}

export default Home;
