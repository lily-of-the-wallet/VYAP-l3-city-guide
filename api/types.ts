export type Sight = {
  id: number;
  title: string;
  category: string;
  categoryId: "architecture" | "museums" | "parks";
  image: string;
  description: string;
  address: string;
  openingHours: string;
  tip: string;
  rating: number | null;
  reviewCount: number;
};

export type Review = {
  id: number;
  placeId: number;
  placeTitle: string;
  rating: number;
  text: string;
  author: string;
  createdAt: string;
};
