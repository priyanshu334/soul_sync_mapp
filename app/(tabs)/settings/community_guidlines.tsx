import PolicySection from "@/components/PolicySection";

const communityGuidelinesData = {
  title: "Community Guidelines & Safety",
  sections: [
    {
      title: "Connecting Safely",
      content:
        "Connecting with new people can be enjoyable and rewarding, but it's important to remain thoughtful and aware whenever you interact with someone you don't know. Your well-being should always come first, whether you are chatting online or planning to meet face to face. Although you cannot control another person's behavior, there are practical steps you can take to protect yourself while using the platform.",
    },
    {
      title: "Online Communication Safety",
      content:
        "When communicating online, never transfer money or provide financial details to someone you've just met. Requests for funds�especially urgent or emotional ones�are a common tactic used in scams, and such transactions are often difficult to trace or recover. Likewise, avoid sharing sensitive personal details such as your home address, workplace, daily routines, or identifying numbers. If you have children, be especially cautious about revealing information about them, including names, schools, or photos. It's safest to continue conversations within the platform until you feel confident about the other person, since built-in safety systems can help detect suspicious activity. Be cautious if someone insists on moving communication elsewhere too quickly, avoids answering questions, refuses video or voice calls, or pressures you into emotional commitment early on�these can be warning signs. Any behavior that feels manipulative, fraudulent, threatening, or otherwise inappropriate should be reported and blocked immediately.",
    },
    {
      title: "In-Person Meetings",
      content:
        "If you decide to meet someone in person, take time to get to know them beforehand and trust your instincts throughout the process. Choosing a busy public place for the first meeting is strongly recommended, and it's best to avoid private locations until you feel completely comfortable. Let a trusted friend or family member know where you're going, who you're meeting, and when you expect to return. Keep your phone charged and accessible, and consider sharing your location with someone you trust during the outing. Arrange your own transportation so you can leave whenever you wish, and avoid relying on your date for rides.",
    },
    {
      title: "Personal Awareness and Limits",
      content:
        "Being mindful of your surroundings and personal limits is also essential. Alcohol or other substances can impair awareness and judgment, so stay within your comfort zone and leave if you feel pressured. Keep your drinks and belongings with you at all times, and only accept beverages directly from staff to reduce the risk of tampering. If at any point something doesn't feel right, it's perfectly okay to end the meeting early and remove yourself from the situation.",
    },
    {
      title: "Travel and Location Considerations",
      content:
        "Travel can present additional considerations, particularly in regions where laws or social attitudes may differ. People of diverse identities and orientations may face varying levels of risk depending on location, so researching local regulations and customs beforehand can help you make informed decisions. In certain areas, it may be wise to limit what information is visible on your profile and to exercise extra caution when connecting with new individuals.",
    },
    {
      title: "Health and Consent",
      content:
        "Health awareness and mutual respect are equally important in any relationship. Taking steps to protect yourself from sexually transmitted infections, such as practicing safer intimacy and staying informed about your health status, can help reduce risks. Honest conversations about health and boundaries before becoming physically involved are encouraged. Consent must always be clear, mutual, and ongoing, and it can be withdrawn at any time. If a partner appears unsure, uncomfortable, or unable to make decisions clearly, it's essential to pause and respect that boundary.",
    },
    {
      title: "Creating a Secure Experience",
      content:
        "By staying attentive, setting personal limits, and using available safety tools, you can help create a more secure and positive experience while meeting new people.",
    },
  ],
};

export default function CommunityGuidelinesScreen() {
  return (
    <PolicySection
      title={communityGuidelinesData.title}
      sections={communityGuidelinesData.sections}
    />
  );
}