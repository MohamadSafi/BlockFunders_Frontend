export const formatCampaignString = (text) => {
  const lastIndex = text.lastIndexOf(" with ");
  if (lastIndex !== -1) {
    return text.substring(0, lastIndex).trim();
  }
  return text;
};
