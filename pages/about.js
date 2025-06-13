import React from "react";
import { fetchDataFromApi } from "@/utils/api";

export default function About({ data }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
    );
}

export async function getStaticPaths() {
    const about = await fetchDataFromApi("/api/about?populate=*");
    const paths = about?.data?.map((c) => ({
      params: {
        slug: c.slug,
      },
    }));
  
    return {
      paths,
      fallback: false,
    };
  }

  export async function getStaticProps({ params: { slug } }) {
    const about = await fetchDataFromApi(
        `/api/about?filters[slug][$eq]=${slug}`
    );

    return {
        props: {
            about,
            slug,
        },
    };
}
