import PolicySection from "@/components/PolicySection";

const securityData = {
  title: "Security",
  sections: [
    {
      title: "Our Commitment to Security",
      content:
        "Lovitch� is dedicated to creating a safe and reliable environment where genuine human connections can flourish. The security team is driven by a clear purpose: to build a world-class security organization that protects members' privacy while preserving the authenticity of every interaction. When people choose Lovitch�, they place their trust in the platform with their personal information, and safeguarding that trust remains a fundamental priority. Maintaining a strong, transparent, and accountable security framework is therefore not just a goal, but a core promise to every member.",
    },
    {
      title: "Comprehensive Security Program",
      content:
        "To uphold this commitment, Lovitch� operates a comprehensive security program designed to protect both its internal environment and user data through advanced infrastructure, responsible data stewardship, and proven industry practices. Security is integrated into every layer of the organization's digital ecosystem, from carefully structured access controls to thoughtfully designed network architecture that restricts permissions according to necessity. Employees follow strict authentication measures, including multi-factor verification, ensuring that internal systems remain protected from unauthorized access.",
    },
    {
      title: "Development & Culture",
      content:
        "Security is also embedded throughout the development and engineering lifecycle so that every product, feature, and system is built with protection in mind from the outset. New code, configurations, and platform updates undergo detailed internal reviews and assessments, and many systems are regularly tested by independent security specialists to ensure resilience against potential threats. Alongside technical safeguards, Lovitch� promotes a culture of security awareness in which team members receive training from their first day and continue to build their knowledge through ongoing education. Physical, operational, and digital safeguards work together to protect systems and data, while third-party partners are carefully evaluated to ensure they meet the same rigorous standards.",
    },
    {
      title: "Proactive Threat Detection",
      content:
        "To strengthen defenses further, Lovitch� maintains dedicated specialists who actively simulate real-world attack scenarios in order to uncover hidden vulnerabilities before they can be exploited. By continuously testing systems in this proactive way, the organization gains valuable insight into possible risks and strengthens its ability to prevent breaches. At the same time, infrastructure activity is consistently logged and monitored, allowing potential threats to be detected, investigated, and addressed quickly through an established response process.",
    },
    {
      title: "Community Collaboration",
      content:
        "Lovitch� also values collaboration with the wider security community and welcomes responsible input from researchers who may identify areas for improvement. By encouraging this openness and maintaining an ongoing commitment to innovation and vigilance, Lovitch� works to ensure that its platform remains a secure, private, and trusted place where meaningful connections can thrive.",
    },
  ],
};

export default function SecurityScreen() {
  return (
    <PolicySection
      title={securityData.title}
      sections={securityData.sections}
    />
  );
}