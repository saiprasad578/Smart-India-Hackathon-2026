# KisanConnect — Logistics Specification

## Goal
Pool farmer pickups through collection points instead of creating a separate vehicle trip for every farmer.

## Flow
Farmers → Collection point → Pooled vehicle → Route optimizer → Buyers

## Required inputs
- Farmer/location
- Collection point
- Quantity
- Vehicle capacity
- Buyer location
- Delivery window

## Route optimization
Use OR-Tools for the prototype.

Routing data may use:
- OpenStreetMap
- OSRM

## Prototype behavior
Given sample data:
1. Create 3 farmer pickup points.
2. Assign them to a collection point.
3. Create one pooled vehicle.
4. Create multiple buyer destinations.
5. Generate an ordered route.
6. Display the route on a Leaflet map.

## Important state transitions
- planned
- pickup_assigned
- picked_up
- in_transit
- delivered
- delivery_confirmed
