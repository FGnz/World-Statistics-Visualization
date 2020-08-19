import pandas as pd

#create dataframe
df_marks = pd.DataFrame({'name': ['Somu', 'Kiku', 'Amol', 'Lini'],
     'physics': [68, 74, 77, 78],
     'chemistry': [84, 56, 73, 69],
     'algebra': [78, 88, 82, 87]})

#render dataframe as html
html = df_marks.to_html()

#write html to file
text_file = open("index.html", "w")
text_file.write(html)
text_file.close()