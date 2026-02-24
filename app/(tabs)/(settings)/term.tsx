import PolicySection from "@/components/PolicySection";

const termsData = {
  title: "Terms of Use",
  sections: [
    {
      title: "Agreement to Terms",
      content:
        "These Terms of Use explain the rules and conditions that apply when you access or use the platform, whether through the website, mobile application, or any related services. By creating an account or using any part of the service, you agree to follow these terms as well as all related policies, including those concerning privacy, cookies, community standards, and safety guidance. If you do not agree with these conditions, you should not use the platform. The company may revise these terms from time to time, and continued use of the service after updates means you accept the revised version.",
    },
    {
      title: "Applicable Agreement",
      content:
        "Depending on where you live, your agreement may be with different affiliated entities that operate the service internationally, but throughout these terms, references to 'we,' 'us,' or 'the company' all refer to the organization responsible for providing the platform in your region. The agreement applies to anyone who accesses or uses the service, regardless of whether they have registered an account.",
    },
    {
      title: "Eligibility Requirements",
      content:
        "To use the service, you must be an individual who is legally allowed to enter into a binding agreement and at least eighteen years of age. You must not be prohibited from using the service under applicable laws, and you must not be located in a jurisdiction subject to restrictions that prevent such use. You also confirm that you have not been convicted of certain serious offenses or required to register as a sex offender, and that you have not previously been removed from the platform unless you have been given permission to return. If you no longer meet these requirements at any point, your authorization to use the service ends immediately.",
    },
    {
      title: "User Conduct and Responsibilities",
      content:
        "When using the platform, you agree to follow all applicable laws and platform guidelines, maintain accurate account information, safeguard your login credentials, and interact respectfully with others. You must not misrepresent your identity, interfere with the operation of the service, use it for unlawful or harmful purposes, or attempt to exploit it for fraud, harassment, or manipulation. Activities such as distributing malicious code, collecting other users' information without consent, impersonating others, reverse-engineering the platform, or using automated systems to access data are strictly prohibited. Any violation may result in suspension or termination of access.",
    },
    {
      title: "Prohibited Content",
      content:
        "The platform does not allow content that is offensive, abusive, threatening, deceptive, defamatory, discriminatory, unlawful, or harmful. Material that promotes violence, illegal activity, harassment, exploitation, or any form of harm to individuals or communities is forbidden. Content must respect the rights of others, including intellectual property and privacy rights, and must not include another person's likeness without permission. Sharing prohibited material may lead to immediate account removal.",
    },
    {
      title: "Your Content and Rights",
      content:
        "You are responsible for any content you upload or share. This includes text, images, audio, video, profile information, or messages. You confirm that anything you provide is accurate and that you have the legal right to share it. Your content may be visible to others, and you should only share information you are comfortable making accessible. By submitting content, you grant the platform permission to host, store, display, and use it in connection with operating and improving the service. Although you retain ownership of your content, you allow the company to process and display it as necessary to provide the service and maintain platform functionality.",
    },
    {
      title: "Other Users' Content",
      content:
        "You may also encounter content posted by other users. Such material belongs to the individuals who created it and may be inaccurate, misleading, or inappropriate. You should use independent judgment when reviewing or relying on anything shared by others. You may only use other users' content for purposes consistent with normal platform interaction and not for copying, commercial exploitation, harassment, or unlawful conduct.",
    },
    {
      title: "Platform Materials and Intellectual Property",
      content:
        "All remaining materials on the platform, including design elements, text, graphics, trademarks, and software, are owned or licensed by the company and protected by intellectual property laws. You receive a limited right to access and use these materials solely for normal use of the service, and this permission ends automatically if you violate the terms.",
    },
    {
      title: "Platform Monitoring and Safety",
      content:
        "The platform aims to maintain a respectful and safe environment, but it cannot guarantee the behavior or identity of any user. You are responsible for your interactions and should exercise caution when communicating with or meeting others. The company may monitor activity and take action, including restricting or terminating accounts, if it believes rules have been violated or users have acted inappropriately.",
    },
    {
      title: "Service Disclaimers",
      content:
        "The service is provided on an 'as is' and 'as available' basis without guarantees that it will always function without interruption, error, or security risks. The company does not promise that information on the platform will always be accurate, complete, or suitable for your purposes, and it is not responsible for the actions, content, or conduct of users or third parties. Any use of the service is at your own risk, including any potential technical issues or data loss.",
    },
    {
      title: "Intellectual Property Claims",
      content:
        "If you believe content infringes your intellectual property rights, you may submit a notice identifying the material and explaining the claim so it can be reviewed. The company may remove material or restrict accounts when necessary to address such concerns or to comply with legal obligations.",
    },
    {
      title: "Dispute Resolution",
      content:
        "Disputes between you and the company should first be addressed informally by contacting customer support so both sides have an opportunity to resolve the matter cooperatively. If a dispute cannot be resolved this way, it may be handled through legally recognized dispute-resolution procedures. Where permitted by law, disputes will generally be handled individually rather than as part of a group claim, and applicable law may determine the location and governing rules.",
    },
    {
      title: "Indemnification and Complete Agreement",
      content:
        "You agree to compensate and protect the company and its affiliates from claims arising out of your use of the service, your content, or your violation of these terms, to the extent allowed by law. These terms, together with referenced policies, form the complete agreement between you and the company regarding use of the service and replace any prior understandings. If any part of the agreement is found unenforceable, the remaining provisions will still apply.",
    },
    {
      title: "Acknowledgment",
      content:
        "By continuing to access or use the platform, you confirm that you understand and accept these conditions and agree to abide by them.",
    },
  ],
};

export default function TermsScreen() {
  return (
    <PolicySection
      title={termsData.title}
      sections={termsData.sections}
    />
  );
}