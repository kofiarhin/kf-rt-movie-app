export const apiKey = import.meta.env.VITE_API_KEY;
export const baseurl = import.meta.env.VITE_BASE_URL;
export const env = import.meta.env.VITE_ENVIRONMENT;

export const formatMinutesToHours = (minutes) => {
  if (!minutes) {
    return "unavailable";
  }
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hrLabel = hrs > 0 ? `${hrs}hr` : "";
  const minLabel = mins > 0 ? `${mins}min` : "";

  return [hrLabel, minLabel].filter(Boolean).join(" ");
};
