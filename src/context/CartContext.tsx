import React, { useEffect, Dispatch, SetStateAction } from "react";
import { useState, createContext } from "react";

interface Hotel {
  name: string;
  price: number;
  imageUrl: string;
  id: number;
  days: number;
}
interface CartContextType {
  selectedHotels: Hotel[];
  setSelectedHotels: Dispatch<SetStateAction<Hotel[]>>;
  totalPrice: number;
  loading: boolean;
  errorCode: number | null;
}

export const CartContext = createContext<CartContextType>({
  selectedHotels: [],
  setSelectedHotels: () => [],
  totalPrice: 0,
  loading: false,
  errorCode: null,
});

const CartContextProvider: React.FC = (props) => {
  const [availableHotels, setAvailableHotels] = useState([]);
  const [selectedHotels, setSelectedHotels] = useState<Hotel[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const defaultDaysCount = 2;
  const url =
    "https://hotels4.p.rapidapi.com/properties/list?destinationId=1506246&pageNumber=1&checkIn=2020-01-08&checkOut=2020-01-15&pageSize=10&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE";

  useEffect(() => {
    const LSAvailableHotels = localStorage.getItem("availableHotels");
    if (LSAvailableHotels) {
      setAvailableHotels(JSON.parse(LSAvailableHotels));
      return;
    }
    const getHotels = async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "ac57b197e1mshba6c9c955c16188p1ecdf7jsne1ee79e12ee3",
          "x-rapidapi-host": "hotels4.p.rapidapi.com",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const fullHotelsData = data.data.body.searchResults.results;
        setAvailableHotels(
          fullHotelsData.slice(0, 5).map((hotel: any) => ({
            name: hotel.name,
            price: hotel.ratePlan.price.exactCurrent,
            id: hotel.id,
            imageUrl: hotel.thumbnailUrl,
            days: defaultDaysCount,
          }))
        );
      } else {
        setErrorCode(response.status);
      }
    };
    getHotels();
  }, []);

  useEffect(() => {
    if (availableHotels.length > 0) {
      localStorage.setItem("availableHotels", JSON.stringify(availableHotels));
      setSelectedHotels(availableHotels);
      setLoading(false);
    }
  }, [availableHotels]);

  useEffect(() => {
    let sum = 0;
    selectedHotels.forEach(
      (hotel) => (sum += Number(hotel.price) * hotel.days)
    );
    setTotalPrice(sum);
  }, [selectedHotels]);

  return (
    <CartContext.Provider
      value={{
        selectedHotels,
        setSelectedHotels,
        totalPrice,
        loading,
        errorCode,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
