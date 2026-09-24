import math
import uuid
from typing import List, Dict, Any
from app.schemas.schemas import RouteOptimizeResponse, StopInfo

class RoutingService:
    @staticmethod
    def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        R = 6371.0 # Earth radius in km
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2) ** 2 +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return round(R * c, 2)

    @classmethod
    def optimize_route(cls, vehicle_capacity: float = 1500.0) -> RouteOptimizeResponse:
        route_id = f"route-{uuid.uuid4().hex[:6]}"
        
        # 3 Farmer pickup locations + 1 Central FPO Collection Point + 1 Buyer Wholesale Drop
        stops_data = [
            {
                "stop_number": 1,
                "type": "pickup",
                "location_name": "Farmer Venkataiah (Shamshabad Village)",
                "lat": 17.2510,
                "lng": 78.4320,
                "quantity_kg": 300.0,
                "estimated_arrival": "06:30 AM",
                "status": "completed"
            },
            {
                "stop_number": 2,
                "type": "pickup",
                "location_name": "Farmer Ramulu (Chevella Hamlet)",
                "lat": 17.3120,
                "lng": 78.1340,
                "quantity_kg": 400.0,
                "estimated_arrival": "07:15 AM",
                "status": "completed"
            },
            {
                "stop_number": 3,
                "type": "pickup",
                "location_name": "Farmer Lakshmi (Maheshwaram Farm)",
                "lat": 17.1350,
                "lng": 78.4300,
                "quantity_kg": 300.0,
                "estimated_arrival": "08:00 AM",
                "status": "completed"
            },
            {
                "stop_number": 4,
                "type": "collection_point",
                "location_name": "Shamshabad FPO Central Hub (Grading & Consolidation)",
                "lat": 17.2450,
                "lng": 78.4280,
                "quantity_kg": 1000.0,
                "estimated_arrival": "08:45 AM",
                "status": "in_progress"
            },
            {
                "stop_number": 5,
                "type": "delivery",
                "location_name": "Kothapet Wholesale Market (Buyer Delivery)",
                "lat": 17.3688,
                "lng": 78.5398,
                "quantity_kg": 1000.0,
                "estimated_arrival": "09:45 AM",
                "status": "scheduled"
            }
        ]

        total_dist = 0.0
        for i in range(len(stops_data) - 1):
            s1 = stops_data[i]
            s2 = stops_data[i+1]
            total_dist += cls.haversine_distance(s1["lat"], s1["lng"], s2["lat"], s2["lng"])

        # Approx 42 km routing with stops
        total_dist = max(38.5, round(total_dist, 1))
        duration_minutes = int(total_dist * 2.2 + len(stops_data) * 15) # travel + stop buffer

        stops = [StopInfo(**s) for s in stops_data]

        return RouteOptimizeResponse(
            route_id=route_id,
            vehicle_id="TS-07-AGRI-1088 (E-Truck 2.5T)",
            vehicle_capacity=vehicle_capacity,
            loaded_weight_kg=1000.0,
            utilization_percent=round((1000.0 / vehicle_capacity) * 100, 1),
            stops=stops,
            total_distance_km=total_dist,
            total_duration_minutes=duration_minutes,
            co2_saved_kg=28.4
        )

routing_service = RoutingService()
