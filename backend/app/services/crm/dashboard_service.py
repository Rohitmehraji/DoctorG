class DashboardService:
    async def metrics(self, clinic_id: int) -> dict:
        return {
            "conversion_rate": 31.4,
            "pipeline": {
                "new": 24,
                "contacted": 16,
                "qualified": 11,
                "booked": 7,
                "closed": 4,
            },
            "staff_performance": [
                {"name": "Aisha", "bookings": 12, "close_rate": 0.37},
                {"name": "Ravi", "bookings": 9, "close_rate": 0.31},
            ],
        }
