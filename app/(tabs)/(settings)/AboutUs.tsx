import PolicySection from "@/components/PolicySection";

const aboutUsData = {
  title: "About Us � Lovitch�",
  sections: [
    {
      title: "Our Vision",
      content:
        "Lovitch� is an AI-powered astrology connection platform created to bring people together through deeper compatibility and meaningful understanding. We believe that genuine relationships start with self-awareness and alignment, which is why Lovitch� blends intelligent technology with astrological insight to help individuals discover connections that truly resonate.",
    },
    {
      title: "How We Work",
      content:
        "Our platform goes beyond traditional matching by analyzing personality patterns, zodiac compatibility, and relational dynamics to provide thoughtful suggestions and personalized insights. Instead of focusing on quick interactions, Lovitch� encourages intentional connections built on shared values, emotional harmony, and mutual understanding.",
    },
    {
      title: "For Authentic Seekers",
      content:
        "We designed Lovitch� for people who want more than surface-level matches�for those who value authenticity, curiosity, and emotional depth. Every feature is crafted to create a welcoming environment where users can explore compatibility, learn about themselves, and build real connections with confidence.",
    },
    {
      title: "Our Mission",
      content:
        "At Lovitch�, innovation meets intuition. Our mission is to redefine how people connect by aligning technology with the timeless wisdom of the stars�so every match feels natural, meaningful, and real.",
    },
    {
      title: "Our Promise",
      content:
        "Lovitch� � where compatibility begins with understanding.",
    },
  ],
};

export default function AboutUsScreen() {
  return (
    <PolicySection
      title={aboutUsData.title}
      sections={aboutUsData.sections}
    />
  );
}