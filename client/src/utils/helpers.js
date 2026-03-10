export const formatYear = (year) => year || "N/A";

export const formatRating = (rating) => (
  rating && rating !== "N/A" ? `* ${rating}` : "No rating"
);

export const getPoster = (poster, size = "300x450") => {
  if (!poster || poster === "N/A") {
    return `https://via.placeholder.com/${size}?text=No+Poster`;
  }

  return poster;
};
