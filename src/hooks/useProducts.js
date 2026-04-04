import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  formatPrice,
  formatRelativeDate,
  sortProductsUniqueFirst,
} from "../utils/format";

const CSV_URL = import.meta.env.VITE_SHEET_CSV_URL;

/**
 * Fetches and parses product data from the published Google Sheet CSV.
 *
 * Expected sheet columns: ID, Name, Variant, Category, Price, Image, Last Updated
 *
 * @returns {{ products: Product[], loading: boolean, error: string|null }}
 *
 * @typedef {{ id: string, name: string, variant: string, category: string, price: string, image: string, lastUpdated: string }} Product
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!CSV_URL) {
      setError("VITE_SHEET_CSV_URL is not set. Add it to your .env file.");
      setLoading(false);
      return;
    }

    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: ({ data, errors }) => {
        if (errors.length) {
          setError("Failed to parse sheet data.");
          setLoading(false);
          return;
        }

        const products = data.map((row) => ({
          id: row["ID"],
          name: row["Name"],
          variant: row["Variant"],
          category: row["Category"],
          price: formatPrice(row["Price"]),
          image: row["Image"],
          lastUpdated: formatRelativeDate(row["Last Updated"]),
          popular: row["Popular"],
        }));

        const popularProducts = products.filter(
          (p) => String(p.popular).trim().toLowerCase() === "yes",
        );

        setProducts(sortProductsUniqueFirst(popularProducts));
        setLoading(false);
      },
      error: () => {
        setError(
          "Failed to fetch sheet. Make sure the sheet is published as CSV.",
        );
        setLoading(false);
      },
    });
  }, []);

  return { products, loading, error };
}
