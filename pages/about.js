import React from "react";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";

const About = ({ titre, body }) => {
    return (
        <div className="w-full md:py-20">
            <Wrapper>
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                        {titre}
                    </h1>

                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: body }}
                    />
                </div>
            </Wrapper>
        </div>
    );
};

export default About;

export async function getStaticProps() {
    const res = await fetchDataFromApi("/api/about");

    const about = res?.data;
    const richTextBlock = about?.blocks?.find(
        (block) => block.__component === "shared.rich-text"
      );

    return {
        props: {
            titre: about?.title || "À propos",
            body: richTextBlock?.body || "<p>Contenu indisponible.</p>",
        },
    };
}
