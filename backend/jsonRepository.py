import os
import json

class Jsonrepository:
    BASE_PATH = os.path.join(os.getcwd(), "JsonFiles")

    @staticmethod
    def _load_json(filename):
        filepath = os.path.join(Jsonrepository.BASE_PATH, filename)
        with open(filepath, "r") as f:
            return json.load(f)

    @staticmethod
    def prepareBeverageRequest(drinkId: int):
        # Load files
        beverages_data = Jsonrepository._load_json("beverages.json")
        config = Jsonrepository._load_json("configuration.json")
    def prepareBeverageRequest(drinkId: int):
        # Load JSON data
        beverages = Jsonrepository._load_json("beverages.json")["cocktails"]
        config = Jsonrepository._load_json("configuration.json")["configurations"][0]["bottle_arrangement"]

        # Find cocktail
        cocktail = next((c for c in beverages if c["id"] == drinkId), None)
        if not cocktail:
            raise ValueError(f"Cocktail with id {drinkId} not found")

        # Map bottle_id → position
        bottle_to_position = {item["bottle_id"]: item["position"] for item in config}

        # Expand ingredients into positions
        positions = []
        for ing in cocktail["ingredients"]:
            bottle_id = ing["bottle_id"]
            amount = ing["amount"]

            if bottle_id not in bottle_to_position:
                raise ValueError(f"bottle_id {bottle_id} not in configuration")

            pos = bottle_to_position[bottle_id]
            positions.extend([pos] * amount)

        print(f"Positions for {cocktail['name']}: {positions}")
        return positions

    def setConfig(configId):
        # Mock implementation for setting a configuration
        return {"configId": configId, "status": "set"}