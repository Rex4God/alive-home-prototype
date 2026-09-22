import { PropertyCard } from "@/components/cards/PropertyCard";
import { MapViewProps } from "@/types/property";

export const MapView = ({ property, isSelected, onClick }: MapViewProps) => (
  <div
    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
      isSelected ? "z-20" : "z-10"
    }`}
    style={{ top: property.mapPosition.top, left: property.mapPosition.left }}
    onClick={() => onClick(property)}
  >
    <div
      className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
        isSelected ? "bg-[#C77D01] scale-110" : "bg-[#C77D01]"
      }`}
    >
      <div className="w-2 h-2 bg-white rounded-full"></div>
    </div>
    {isSelected && (
      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2">
        <PropertyCard property={property} isMapView={true} />
      </div>
    )}
  </div>
);
