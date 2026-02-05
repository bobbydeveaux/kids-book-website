export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string | string[];
  images: {
    thumbnail: string;
    main: string;
    gallery: string[];
  };
  features: string[];
  specifications: Array<{
    key: string;
    value: string;
  }>;
  price?: {
    display: string;
  };
  metadata: {
    createdAt: string;
    featured: boolean;
    order: number;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
}
