import httpx

def test_api():
    base_url = "http://localhost:8000/api/v1"
    
    # 1. Test Voice Parse (Telugu)
    res = httpx.post(f"{base_url}/ai/voice/parse", json={
        "language": "te",
        "transcript": "నా దగ్గర 500 కిలోల టమాటాలు ఉన్నాయి."
    })
    print("1. Voice Parse Status:", res.status_code)
    print("   Response:", res.json())
    assert res.status_code == 200
    assert res.json()["crop"] == "tomato"
    assert res.json()["quantity"] == 500

    # 2. Test Listings
    res = httpx.get(f"{base_url}/listings")
    print("2. Listings Count:", len(res.json()))
    assert res.status_code == 200
    assert len(res.json()) >= 3

    # 3. Test Demand Forecast
    res = httpx.get(f"{base_url}/ai/demand/forecast")
    print("3. Demand Forecast Items:", len(res.json()["forecasts"]))
    assert res.status_code == 200

    # 4. Test Route Optimization
    res = httpx.post(f"{base_url}/routes/optimize", json={"vehicle_capacity": 1500.0})
    print("4. Route stops:", len(res.json()["stops"]))
    assert res.status_code == 200

    # 5. Test Orders
    res = httpx.get(f"{base_url}/orders")
    print("5. Orders Count:", len(res.json()))
    assert res.status_code == 200
    
    print("\nALL BACKEND API TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_api()
