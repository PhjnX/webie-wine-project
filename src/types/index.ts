export interface Product {
  id: number;
  name: string;
  subTitle?: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;

  specs?: { label: string; value: string }[];

  tastingNotes?: { title: string; text: string }[];
}

export interface StoreLocation {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  openHour: number;
  closeHour: number;
}
