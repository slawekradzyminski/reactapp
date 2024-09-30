import books from "../data/books.json";
import tipsData from "../data/tipsData.json";

export type Book = typeof books[number];
export type Tip = typeof tipsData[number];
