import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${searchTerm}`;

  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      try {
        const result = await axios.get(url);
        return result.data;
      } catch (error) {
        console.error("Error fetching data:", error.response);
        throw error;
      }
    },
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {results.map((item) => {
        const imageUrl = item?.urls?.regular;
        return (
          <img
            src={imageUrl}
            key={item.id}
            alt={item.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
