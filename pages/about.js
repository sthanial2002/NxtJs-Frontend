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
            body: about?.body || "🎯 Développeur Web & Mobile – Expert Full Stack avec +10 ans d'expérience. Ingénieur en Génie Logiciel passionné par les technologies du Web et du Mobile, je mets à disposition plus de 10 années d’expertise pour concevoir des solutions performantes, sur mesure et évolutives. Mon approche repose sur une compréhension fine des besoins métiers, une maîtrise technique avancée et une forte capacité d’adaptation. Je vous accompagne à chaque étape de votre projet : de l’analyse fonctionnelle à la mise en ligne, en passant par le développement, l’optimisation et le support."
        },
    };
}
