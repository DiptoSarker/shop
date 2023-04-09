import Link from "next/link";
import React from "react";
import client from "../lib/client";
import { createClient } from "next-sanity";

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

function HeroBanner({ heroBanner }) {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        {/* <img
          src={urlFor(heroBanner.image)}
          alt="headphones"
          className="hero-banner-image"
        /> */}

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>

          <div className="desc">
            <h5>DESCRIPTION</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
