from fastapi import APIRouter
from app.schemas.schemas import RouteOptimizeRequest, RouteOptimizeResponse
from app.services.routing_service import routing_service

router = APIRouter()

@router.post("/optimize", response_model=RouteOptimizeResponse)
def optimize_route(payload: RouteOptimizeRequest = RouteOptimizeRequest()):
    """
    POST /api/v1/routes/optimize
    Pools collection points into shared vehicle runs and sequences stops.
    """
    return routing_service.optimize_route(vehicle_capacity=payload.vehicle_capacity)

@router.get("/current", response_model=RouteOptimizeResponse)
def get_current_route():
    return routing_service.optimize_route()
