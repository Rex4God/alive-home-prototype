export interface PropertyProps {
  id: number;
  price: number;
  monthlyPrice: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  pool: number;
  parking: number;
  wifi: boolean;
  rating: number;
  completionDate: string;
  tower: string;
  city: string;
  description: string;
  features: string[];
  images: string[];
  floorPlan: string;
  mapPosition: { top: string; left: string };
  type?: string;
  agent: {
    name: string;
    avatar: string;
    phone: string;
    email: string;
  };
}

export interface MapViewProps {
  property: PropertyProps;
  isSelected: boolean;
  onClick: (property: PropertyProps) => void;
}

export interface PropertyCardProps {
  property: PropertyProps;
  isMapView?: boolean;
}
