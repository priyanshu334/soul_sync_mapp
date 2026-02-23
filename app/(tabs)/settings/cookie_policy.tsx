import PolicySection from "@/components/PolicySection";

const cookiePolicy = {
  title: "Cookie Policy",
  sections: [
    {
      title: "Transparency & Control",
      content:
        "We are committed to being transparent about how data is collected and used when you interact with our platform. This notice explains how cookies and similar technologies function, why they are used, and what choices you have to manage them. If you only want to adjust your preferences, you can do so at any time through your profile or account settings, where options are available to modify cookie and privacy controls directly. This policy focuses specifically on cookies and related technologies; for broader details about how personal information is handled, you should review the main Privacy Policy.",
    },
    {
      title: "What Are Cookies?",
      content:
        "Cookies are small text files that are stored on your browser or device when you visit a website or use an application. They usually contain information such as the domain they came from, how long they remain active, and a unique identifier. In some cases, they may also store device-related details, preferences, browsing activity, or usage patterns connected to the service.",
    },
    {
      title: "Types of Cookies",
      content:
        "There are different categories of cookies. Some are placed directly by the platform itself and are used, for example, to remember language settings or understand how visitors interact with pages. Others are set by partners or service providers who support features and functionality. Certain cookies exist only for the duration of a browsing session and disappear once the browser is closed, while others remain on the device for longer periods so that returning users can be recognized, preferences can be remembered, and performance can be analyzed over time.",
    },
    {
      title: "Similar Technologies",
      content:
        "In addition to cookies, similar technologies may be used, such as small graphic files or code elements that help determine whether a page was visited or an email was opened, specialized links that show where traffic originates, or embedded application code that performs tracking functions within apps. For simplicity, all of these technologies are referred to collectively as cookies in this notice.",
    },
    {
      title: "How We Use These Technologies",
      content:
        "These tools are used to operate, maintain, and enhance the service. They help remember user preferences, recognize returning visitors, analyze how the platform is used, measure the effectiveness of campaigns, improve performance, and tailor content or advertising to be more relevant. In some situations, information gathered through these technologies may be combined with other data already associated with you in order to support these purposes.",
    },
    {
      title: "Essential and Additional Cookies",
      content:
        "Certain cookies are essential for the platform to function properly, such as those that enable secure logins, maintain settings, or detect suspicious activity. Others provide insights into how features are used so that improvements can be made. Some support marketing and promotional efforts by helping determine how effective campaigns are and ensuring that content is displayed appropriately. Additional cookies may allow you to share content through social platforms or external services and may also assist with personalization.",
    },
    {
      title: "Managing Your Preferences",
      content:
        "You have multiple ways to manage these technologies. Tools built into the platform allow you to modify preferences at any time, while many web browsers and devices provide settings that let you block, delete, or receive alerts about cookies. The exact method depends on your browser or device, so you may need to check its help or settings section for instructions. Adjusting these preferences may affect how the service functions, and some features may not operate fully if certain cookies are disabled.",
    },
    {
      title: "Advertising and Opt-Out Options",
      content:
        "Advertising partners may also participate in industry programs that allow users to opt out of personalized advertising. Choosing to opt out does not remove advertisements entirely; instead, it limits the personalization of ads from participating providers. If cookies are cleared afterward, you may need to repeat the opt-out process.",
    },
    {
      title: "Third-Party Services",
      content:
        "Some features rely on technologies provided by third parties, such as mapping or analytics services, which may store their own cookies on your device when those features are used. These providers manage their own data practices and controls through their respective systems. Analytics tools may also be used to collect information about how the website or application is accessed and used so that usage trends can be analyzed and improvements can be made.",
    },
    {
      title: "Your Continued Use",
      content:
        "By continuing to use the service, you acknowledge that these technologies may be placed on your device and used as described. You remain free to adjust your preferences whenever you choose, giving you control over how these tools interact with your browsing or app experience.",
    },
  ],
};

export default function PrivacyPolicyScreen() {
  return (
    <PolicySection
      title={cookiePolicy.title}
      sections={cookiePolicy.sections}
    />
  );
}