import { useState, useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  ZoomControl,
  Popup,
  Polyline,
} from "react-leaflet";
import {
  Icon,
  type LatLngExpression,
  type Marker as LeafletMarker,
  type Map as LeafletMap,
} from "leaflet";
import {
  FaLocationArrow,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaArrowLeft,
  FaPhoneAlt,
  FaDirections,
  FaTimes,
  FaShippingFast,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";
import { STORE_LOCATIONS } from "../data/mockData";
import type { StoreLocation } from "../types";

const STORE_HOURS: Record<number, { open: number; close: number }> = {
  0: { open: 10, close: 22 },
  1: { open: 9, close: 21 },
  2: { open: 9, close: 21 },
  3: { open: 9, close: 21 },
  4: { open: 9, close: 21 },
  5: { open: 9, close: 22 },
  6: { open: 9, close: 22 },
};

const DEFAULT_CENTER: LatLngExpression = [10.776389, 106.701139];
const userIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const storeIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [35, 57],
  iconAnchor: [17, 57],
  popupAnchor: [1, -50],
  shadowSize: [50, 50],
});

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(3));
}

const generateTimeSlots = (dateString: string) => {
  if (!dateString) return [];
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  const { open, close } = STORE_HOURS[dayOfWeek] || { open: 9, close: 21 };

  const slots = [];
  const now = new Date();
  const isToday = now.toISOString().split("T")[0] === dateString;
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();

  for (let h = open; h < close; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (isToday) {
        if (h > currentHour + 1 || (h === currentHour + 1 && m > currentMin)) {
          slots.push(
            `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
          );
        }
      } else {
        slots.push(
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
        );
      }
    }
  }
  return slots;
};

function SetMap({ onMap }: { onMap: (map: LeafletMap) => void }) {
  const map = useMap();
  useEffect(() => {
    onMap(map);
  }, [map, onMap]);
  return null;
}

function MapController({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom?: number;
}) {
  const map = useMap();
  useEffect(() => {
    try {
      map.flyTo(center, zoom || 13, { duration: 1.5, animate: true });
    } catch (e) {} // Adjusted zoom for Canada view
    const t = setTimeout(() => {
      try {
        map.invalidateSize();
      } catch (e) {}
    }, 150);
    return () => clearTimeout(t);
  }, [center, zoom, map]);
  return null;
}

const PickupModal = ({
  store,
  onClose,
  onConfirm,
}: {
  store: StoreLocation;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const timeSlots = useMemo(() => generateTimeSlots(date), [date]);

  return (
    <div className="absolute inset-0 z-2000 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md rounded-xl overflow-hidden shadow-2xl relative text-black"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-black z-10"
        >
          <FaTimes />
        </button>
        <div className="bg-[#D4AF37] p-5 text-center">
          <h2 className="font-bold text-black uppercase tracking-widest text-lg">
            Schedule Pickup
          </h2>
          <p className="text-xs mt-1 text-black/80">{store.name}</p>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="mb-6">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              1. Select Date
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setDate(e.target.value);
                setSelectedSlot("");
              }}
              className="w-full border border-gray-200 p-3 rounded text-sm text-black bg-white focus:border-[#D4AF37] outline-none cursor-pointer"
              style={{ colorScheme: "light" }}
            />
          </div>
          <div className="mb-6">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              2. Time Slot (
              {date
                ? new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })
                : "..."}
              )
            </label>
            {!date ? (
              <p className="text-xs text-gray-400 italic">
                Please select a date first.
              </p>
            ) : timeSlots.length === 0 ? (
              <p className="text-xs text-red-500 font-bold">
                Store closed or no slots available today.
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 text-xs font-bold rounded border transition-all ${
                      selectedSlot === slot
                        ? "bg-black text-[#D4AF37] border-black shadow-md"
                        : "bg-white text-gray-600 border-gray-200 hover:border-black"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            disabled={!date || !selectedSlot}
            onClick={onConfirm}
            className="w-full bg-[#D4AF37] text-black py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-black hover:text-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded shadow-lg"
          >
            Confirm Pickup
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const StoreDetailModal = ({
  store,
  onClose,
}: {
  store: StoreLocation;
  onClose: () => void;
}) => {
  return (
    <div className="absolute inset-0 z-2000 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-2xl relative text-black"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black/50 hover:text-black bg-gray-100 p-2 rounded-full"
        >
          <FaTimes size={14} />
        </button>
        <div className="p-8">
          <h2 className="text-2xl font-serif font-bold text-[#D4AF37] mb-2">
            {store.name}
          </h2>
          <p className="text-gray-500 text-sm mb-6">{store.address}</p>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <strong className="block text-black text-xs uppercase tracking-wider mb-1">
                Hours
              </strong>
              09:00 - 22:00 (Mon - Sun)
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <button className="w-full border border-black/20 py-3 rounded font-bold text-sm hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2">
              <FaPhoneAlt size={12} /> Call: {store.phone}
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    store.address
                  )}`,
                  "_blank"
                )
              }
              className="w-full border border-black/20 py-3 rounded font-bold text-sm hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <FaDirections size={14} /> Get Directions
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN PAGE ---
export default function OrderPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!user) setShowLoginModal(true);
  }, [user]);
  const handleCloseLogin = () => {
    setShowLoginModal(false);
    if (!user) navigate("/");
  };
  useEffect(() => {
    const t = setTimeout(() => setIsMapReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  const THE_STORE = STORE_LOCATIONS[0];

  const [viewMode, setViewMode] = useState<"order" | "locations">("order");
  const [orderTab, setOrderTab] = useState<"delivery" | "pickup">("delivery");
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(13);

  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [addressInput, setAddressInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [routePolyline, setRoutePolyline] = useState<[number, number][]>([]);
  const [deliveryInfo, setDeliveryInfo] = useState<{
    km: number;
    minutes: number;
  } | null>(null);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showStoreDetail, setShowStoreDetail] = useState(false);
  const [modalStatus, setModalStatus] = useState<{
    show: boolean;
    type: "success" | "error" | "warning";
    title: string;
    message: string;
  }>({ show: false, type: "success", title: "", message: "" });

  const markerRef = useRef<LeafletMarker | null>(null);
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);

  const showStoreMarker =
    orderTab === "pickup" || (orderTab === "delivery" && userLocation !== null);

  const handleCheckout = () => {
    if (!deliveryInfo || !userLocation) {
      setModalStatus({
        show: true,
        type: "error",
        title: "Missing Information",
        message: "Please select a delivery location first.",
      });
      return;
    }
    const shippingFee = 15000 + deliveryInfo.km * 5000;
    const roundedFee = Math.round(shippingFee / 1000) * 1000;
    setModalStatus({
      show: true,
      type: "success",
      title: "Proceeding to Payment",
      message: `Shipping Fee: ${roundedFee.toLocaleString()}đ for ${
        deliveryInfo.km
      }km`,
    });
  };

  const handleSwitchToPickup = () => {
    setOrderTab("pickup");
    setMapCenter([THE_STORE.lat, THE_STORE.lng]);
    setMapZoom(17);
    setRoutePolyline([]);
    setDeliveryInfo(null);
    setUserLocation(null);
    setAddressInput("");
  };

  const handleSwitchToDelivery = () => {
    setOrderTab("delivery");
    setMapCenter(DEFAULT_CENTER);
    setMapZoom(13);
    setUserLocation(null);
    setAddressInput("");
    setRoutePolyline([]);
  };

  const handleConfirmPickup = () => {
    setShowPickupModal(false);
    setModalStatus({
      show: true,
      type: "success",
      title: "Success",
      message: "Pickup order confirmed!",
    });
  };

  const checkDeliveryLogic = async (lat: number, lng: number) => {
    const dist = calculateDistance(lat, lng, THE_STORE.lat, THE_STORE.lng);
    if (dist < 0.03) {
      setRoutePolyline([]);
      setDeliveryInfo({ km: 0, minutes: 0 });
      setModalStatus({
        show: true,
        type: "success",
        title: "At Store",
        message: "You are currently at the Store!",
      });
      return;
    }
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${lng},${lat};${THE_STORE.lng},${THE_STORE.lat}?overview=full&geometries=geojson`
      );
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        setRoutePolyline(
          route.geometry.coordinates.map(
            (c: number[]) => [c[1], c[0]] as [number, number]
          )
        );
        setDeliveryInfo({
          km: parseFloat((route.distance / 1000).toFixed(1)),
          minutes: Math.ceil(route.duration / 60) + 15,
        });
      }
    } catch {
      setDeliveryInfo({ km: dist, minutes: Math.ceil(dist * 3) + 15 });
    }
    if (dist > 15) {
      setModalStatus({
        show: true,
        type: "warning",
        title: "Over 15km",
        message: "Due to distance over 15km, special shipping fee applies.",
      });
    }
  };

  const handleManualSearch = async () => {
    if (!addressInput.trim()) return;
    setIsProcessing(true);
    setDeliveryInfo(null);
    setRoutePolyline([]);

    const searchOSM = async (query: string) => {
      // Logic thêm Vietnam/Canada tùy bạn chọn
      const q = query.toLowerCase().includes("vietnam")
        ? query
        : `${query}, Vietnam`;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            q
          )}&limit=1&addressdetails=1`
        );
        return await res.json();
      } catch {
        return [];
      }
    };

    try {
      let data = [];

      let searchLevel = "exact";

      const lowerInput = addressInput.toLowerCase();
      let cleanInput = lowerInput
        .replace(/\s+(phường|xã|thị trấn)\s+/g, ", ")
        .replace(/\s+(quận|huyện|thành phố|tỉnh|tp)\s+/g, ", ");
      const streetKeywords = [
        "đường",
        "phố",
        "đ.",
        "hẻm",
        "ngõ",
        "ngách",
        "tỉnh lộ",
        "quốc lộ",
      ];
      let streetPart = cleanInput;
      for (const kw of streetKeywords) {
        const idx = cleanInput.indexOf(kw);
        if (idx !== -1) {
          streetPart = cleanInput.substring(idx);
          break;
        }
      }

      data = await searchOSM(streetPart);
      if (data.length > 0) searchLevel = "optimized";

      if (!data || data.length === 0) {
        data = await searchOSM(addressInput);
        if (data.length > 0) searchLevel = "exact";
      }

      if (!data || data.length === 0) {
        const parts = streetPart
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p);
        if (parts.length >= 2) {
          const areaQuery = parts.slice(-2).join(", ");
          data = await searchOSM(areaQuery);
          if (data.length > 0) searchLevel = "administrative";
        }
      }

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        setUserLocation([latitude, longitude]);

        if (searchLevel === "administrative") {
          setAddressInput(addressInput);
          setModalStatus({
            show: true,
            type: "warning",
            title: "Vị trí tương đối",
            message: `Không tìm thấy số nhà chính xác. Đã ghim tại trung tâm ${
              display_name.split(",")[0]
            }. Vui lòng KÉO GHIM về đúng nhà.`,
          });
        } else if (searchLevel === "optimized") {
          setModalStatus({
            show: true,
            type: "warning",
            title: "Tìm thấy đường",
            message:
              "Đã tìm thấy con đường. Vui lòng KÉO GHIM ĐỎ về đúng số nhà của bạn.",
          });
        } else {
          setModalStatus({
            show: true,
            type: "warning",
            title: "Kiểm tra vị trí",
            message:
              "Đã ghim vị trí. Vui lòng kiểm tra và kéo ghim nếu chưa chính xác.",
          });
        }
        // ---------------------------------------------------------

        setMapCenter([latitude, longitude]);
        setMapZoom(16);
        await checkDeliveryLogic(latitude, longitude);
      } else {
        setModalStatus({
          show: true,
          type: "error",
          title: "Không tìm thấy",
          message: "Rất tiếc, không tìm thấy địa chỉ này.",
        });
      }
    } catch (e) {
      console.error(e);
      alert("Lỗi kết nối bản đồ.");
    }
    setIsProcessing(false);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return alert("Browser not supported");
    setIsProcessing(true);
    setDeliveryInfo(null);
    setRoutePolyline([]);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
        setMapCenter([latitude, longitude]);
        setMapZoom(18);
        setAddressInput("Current Location (Drag pin to adjust)");
        checkDeliveryLogic(latitude, longitude);
        setIsProcessing(false);
      },
      () => {
        setIsProcessing(false);
        alert("Unable to retrieve location.");
      },
      { enableHighAccuracy: true }
    );
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const { lat, lng } = marker.getLatLng();
          setUserLocation([lat, lng]);
          checkDeliveryLogic(lat, lng);
          setAddressInput(
            `Pin Adjusted (${lat.toFixed(4)}, ${lng.toFixed(4)})`
          );
        }
      },
    }),
    []
  );

  useEffect(() => {
    if (!mapInstance) return;
    const t = setTimeout(() => {
      try {
        mapInstance.invalidateSize();
      } catch (e) {}
    }, 150);
    return () => clearTimeout(t);
  }, [mapInstance, viewMode, isMapReady, orderTab, mapCenter]);

  return (
    <div className="flex flex-col h-screen bg-[#050505] font-sans overflow-hidden text-white selection:bg-[#D4AF37] selection:text-black">
      <header className="h-16 bg-[#0a0a0a] border-b border-[#D4AF37]/20 flex items-center px-6 justify-between z-40 relative shadow-lg shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-white/50 hover:text-[#D4AF37] transition-colors"
          >
            <FaArrowLeft size={16} />
          </button>
          <div className="h-4 w-px bg-white/10"></div>
          <h1 className="font-serif text-lg tracking-wider text-white">
            ORDER <span className="text-[#D4AF37] italic">FULFILLMENT</span>
          </h1>
        </div>
        {user && (
          <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-white/60">
              {user.name}
            </span>
            <div className="w-6 h-6 rounded-full overflow-hidden border border-[#D4AF37]">
              <img
                src={user.avatar}
                className="w-full h-full object-cover"
                alt="User"
              />
            </div>
          </div>
        )}
      </header>

      <div className="h-12 bg-[#0a0a0a] border-b border-white/5 z-30 flex justify-center gap-0 shrink-0">
        <button
          onClick={() => setViewMode("order")}
          className={`px-8 h-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative ${
            viewMode === "order"
              ? "text-[#D4AF37]"
              : "text-white/30 hover:text-white"
          }`}
        >
          Order
          {viewMode === "order" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
            />
          )}
        </button>
        <button
          onClick={() => {
            setViewMode("locations");
            setShowStoreDetail(true);
            setMapCenter([THE_STORE.lat, THE_STORE.lng]);
            setMapZoom(16);
          }}
          className={`px-8 h-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative ${
            viewMode === "locations"
              ? "text-[#D4AF37]"
              : "text-white/30 hover:text-white"
          }`}
        >
          Webie Cellarcations
          {viewMode === "locations" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
            />
          )}
        </button>
      </div>

      <div className="flex flex-1 md:flex-row h-full relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 bottom-0 w-full md:w-[400px] bg-[#0F0F0F] z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)] flex flex-col border-r border-[#D4AF37]/10 transition-transform duration-300 ${
            viewMode === "order" ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <div className="bg-black/40 p-1 rounded border border-white/10 flex mb-6 shrink-0">
              <button
                onClick={handleSwitchToDelivery}
                className={`flex-1 py-3 rounded text-[9px] font-bold uppercase tracking-widest transition-all ${
                  orderTab === "delivery"
                    ? "bg-[#D4AF37] text-black shadow-lg"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Delivery
              </button>
              <button
                onClick={handleSwitchToPickup}
                className={`flex-1 py-3 rounded text-[9px] font-bold uppercase tracking-widest transition-all ${
                  orderTab === "pickup"
                    ? "bg-[#D4AF37] text-black shadow-lg"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Pickup
              </button>
            </div>

            {orderTab === "delivery" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">
                    Delivery Address
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={addressInput}
                      onChange={(e) => setAddressInput(e.target.value)}
                      placeholder="Enter house number, street name..."
                      className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 focus:border-[#D4AF37] rounded outline-none transition text-white text-sm font-light"
                    />
                    <FaSearch className="absolute left-3 top-3.5 text-white/30 text-xs group-focus-within:text-[#D4AF37] transition-colors" />
                    {isProcessing && (
                      <div className="absolute right-3 top-3.5 w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                  <p className="text-[10px] text-[#D4AF37] italic mt-1 animate-pulse">
                    * Note: Drag the pin to adjust the exact location.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleManualSearch}
                    disabled={isProcessing}
                    className="flex-1 bg-white/10 text-white font-bold py-3 rounded hover:bg-white/20 transition tracking-widest text-[10px] uppercase"
                  >
                    Find Address
                  </button>
                  <button
                    onClick={handleUseCurrentLocation}
                    className="px-4 bg-[#D4AF37] text-black rounded hover:bg-white transition"
                    title="Use Current Location"
                  >
                    <FaLocationArrow />
                  </button>
                </div>
                {deliveryInfo && (
                  <div className="mt-4 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[#D4AF37] font-bold text-xs uppercase flex items-center gap-2">
                          <FaCheckCircle /> Route Found
                        </span>
                        <span className="text-white font-bold text-lg mt-1 block">
                          ~
                          {Math.round(
                            15000 + deliveryInfo.km * 5000
                          ).toLocaleString()}
                          đ
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-white/50 block">
                          Distance
                        </span>
                        <span className="text-sm font-bold">
                          {deliveryInfo.km} km
                        </span>
                        <span className="text-[10px] text-white/50 block mt-1">
                          Time
                        </span>
                        <span className="text-sm font-bold">
                          {deliveryInfo.minutes} mins
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] py-4 text-[10px] hover:bg-white hover:scale-[1.02] active:scale-95 transition-all shadow-lg rounded flex items-center justify-center gap-2"
                    >
                      <FaShippingFast size={14} /> Proceed to Payment
                    </button>
                  </div>
                )}
              </div>
            )}

            {orderTab === "pickup" && (
              <div className="flex-1 space-y-4 animate-fadeIn">
                <div className="p-4 border border-[#D4AF37] bg-[#D4AF37]/5 rounded-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 bg-[#D4AF37] text-black text-[9px] font-bold uppercase tracking-widest">
                    Main Store
                  </div>
                  <h4 className="font-bold text-lg text-white font-serif mb-1">
                    {THE_STORE.name}
                  </h4>
                  <p className="text-xs text-white/60 mb-3">
                    {THE_STORE.address}
                  </p>
                  <button
                    onClick={() => setShowPickupModal(true)}
                    className="w-full border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest py-3 rounded hover:bg-white hover:text-black transition-colors"
                  >
                    Schedule Pickup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 relative bg-[#050505] h-full w-full z-0">
          {isMapReady ? (
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              zoomControl={false}
              className="h-full w-full"
            >
              <SetMap onMap={(m) => setMapInstance(m)} />
              <TileLayer
                url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                attribution="Google Maps"
              />
              <ZoomControl position="bottomright" />
              <MapController center={mapCenter} zoom={mapZoom} />
              {routePolyline.length > 0 && orderTab === "delivery" && (
                <Polyline
                  positions={routePolyline}
                  pathOptions={{ color: "#D4AF37", weight: 6, opacity: 0.9 }}
                />
              )}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={userIcon}
                  draggable={true}
                  eventHandlers={eventHandlers}
                  ref={markerRef}
                  zIndexOffset={1000}
                >
                  <Popup>
                    <span className="text-black font-bold text-xs">
                      Deliver here <br /> (Drag to adjust)
                    </span>
                  </Popup>
                </Marker>
              )}
              {showStoreMarker && (
                <Marker
                  position={[THE_STORE.lat, THE_STORE.lng]}
                  icon={storeIcon}
                  eventHandlers={{
                    click: () => {
                      if (orderTab === "pickup") setShowPickupModal(true);
                      else setShowStoreDetail(true);
                    },
                  }}
                  zIndexOffset={0}
                >
                  {orderTab === "pickup" && (
                    <Popup autoClose={false} closeOnClick={false}>
                      <div className="text-center">
                        <span className="font-bold text-black block">
                          {THE_STORE.name}
                        </span>
                        <span className="text-[9px]">Pickup Point</span>
                      </div>
                    </Popup>
                  )}
                </Marker>
              )}
            </MapContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-[#050505]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                <div className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold">
                  Loading Map...
                </div>
              </div>
            </div>
          )}

          <AnimatePresence>
            {modalStatus.show && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-4 rounded shadow-xl z-[1000] flex items-center gap-4 border-l-4 border-yellow-500 max-w-md">
                {modalStatus.type === "error" ? (
                  <FaTimesCircle className="text-red-500 text-xl" />
                ) : modalStatus.type === "warning" ? (
                  <FaExclamationCircle className="text-yellow-500 text-xl" />
                ) : (
                  <FaCheckCircle className="text-green-500 text-xl" />
                )}
                <div>
                  <h4 className="font-bold text-sm uppercase">
                    {modalStatus.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {modalStatus.message}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setModalStatus((prev) => ({ ...prev, show: false }))
                  }
                  className="text-gray-400 hover:text-black font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showPickupModal && (
              <PickupModal
                store={THE_STORE}
                onClose={() => setShowPickupModal(false)}
                onConfirm={handleConfirmPickup}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showStoreDetail && (
              <StoreDetailModal
                store={THE_STORE}
                onClose={() => setShowStoreDetail(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={handleCloseLogin} />
    </div>
  );
}
