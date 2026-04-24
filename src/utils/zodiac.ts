export const getZodiacSign = (dateString?: string) => {
  if (!dateString) return "Unknown";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Unknown";

  const day = date.getDate();
  const month = date.getMonth() + 1; // 1-indexed

  const signs = [
    { name: "Capricorn", startDay: 20, emoji: "♑" },
    { name: "Aquarius", startDay: 19, emoji: "♒" },
    { name: "Pisces", startDay: 21, emoji: "♓" },
    { name: "Aries", startDay: 20, emoji: "♈" },
    { name: "Taurus", startDay: 21, emoji: "♉" },
    { name: "Gemini", startDay: 22, emoji: "♊" },
    { name: "Cancer", startDay: 22, emoji: "♋" },
    { name: "Leo", startDay: 23, emoji: "♌" },
    { name: "Virgo", startDay: 23, emoji: "♍" },
    { name: "Libra", startDay: 23, emoji: "♎" },
    { name: "Scorpio", startDay: 22, emoji: "♏" },
    { name: "Sagittarius", startDay: 22, emoji: "♐" }
  ];

  if ((month === 1 && day < 20) || (month === 12 && day >= 22)) {
    return "♑ Capricorn";
  }

  const sign = signs[month - 1];
  const previousSign = signs[month - 2] || signs[11];
  
  const result = day >= sign.startDay ? sign : previousSign;
  return `${result.emoji} ${result.name}`;
};
