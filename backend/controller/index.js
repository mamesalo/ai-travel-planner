import axios from "axios";
import { genAI } from "../service/openAI.js";

export const autoComplete = async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }
  try {
    const apiKey = process.env.GEOAPIFY_API_KEY;

    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/autocomplete",
      {
        params: {
          text: query,
          type: "city",
          format: "json",
          apiKey: apiKey,
        },
      }
    );

    const suggestions = response.data.results.map((place) => ({
      city: place.city || place.name,
      state: place.state,
      country: place.country,
      place_id: place.place_id,
      formatted: place.formatted,
      lat: place.lat,
      lon: place.lon,
    }));

    res.json(suggestions);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error." });
  }
};
export const generateTravelPlan = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "prompt is required." });
  }
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return res.status(200).json(response.text);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error." });
  }
};
export const getPlacePhoto = async (req, res) => {
  const { placename } = req.params;

  if (!placename) {
    return res.status(400).json({ error: "placename is required." });
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    placename
  )}&per_page=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

  try {
    const result = await axios.get(url);
    return res.status(200).json(result.data.results);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error." });
  }
};
