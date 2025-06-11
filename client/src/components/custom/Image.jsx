import { BASE_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

const Image = ({ placename, className }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    if (!placename) return;
    setLoading(true);
    setFetching(true);
    axios
      .get(`${BASE_URL}/place-photo/${placename}`)
      .then((response) => {
        setImageUrl(response.data[0]?.urls?.regular || null);
        setFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setFetching(false);
      });
  }, []);

  const onImageLoad = () => {
    setLoading(false);
  };
  return (
    <>
      {fetching ? (
        <div className={`${className} bg-gray-200 animate-pulse`}></div>
      ) : (
        <img
          src={imageUrl}
          className={`${className} ${loading && `bg-gray-200 animate-pulse`}`}
          onLoad={onImageLoad}
          onError={onImageLoad}
        />
      )}
    </>
  );
};

export default Image;
