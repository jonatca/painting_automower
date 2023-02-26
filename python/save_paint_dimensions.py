import json


def save_paint_dimensions(data):
    paint_dimensions = json.loads(data)

    with open("paint_dimensions.json", "w") as f:
        json.dump(paint_dimensions, f)
