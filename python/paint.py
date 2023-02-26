def lines(width, lenght):  # the lines on a soccer field
    longside1 = [(0, 0), (0, lenght)]
    longside2 = [(width, lenght), (width, 0)]
    shortside2 = [(0, 0), (width, 0)]
    shortside1 = [(0, lenght), (width, lenght)]
    midline = [(0, lenght/2), (width, lenght/2)]
    

    paint_order = [longside1, shortside1, longside2, shortside2, midline]
    lines_json = {
        "longside1": longside1,
        "shortside1": shortside1,
        "longside2": longside2,
        "shortside2": shortside2,
        "midline": midline,
    }
