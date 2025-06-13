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

export async function getStaticProps({}) {
    const res = await fetchDataFromApi(
        `/api/about?populate=*&filters[slug][$eq]=${slug}`
    );
    const json = await res.json();

    //console.log('Résultat brut Strapi:', JSON.stringify(json, null, 2)); // 👈 log complet de la réponse
    console.log('Contenu de data[0]:', json.data?.[0]);

    if (!json.data || !json.data[0]) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            data: json.data[0].title,
        },
        revalidate: 60,
    };
}
