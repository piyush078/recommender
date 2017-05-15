import sys
import pandas as pd
import numpy as np

r_cols = ['user_id', 'song_link']
dataFrame = pd.read_csv('process/online.csv', sep='|', names=r_cols, usecols=range(2))
dataFrame = pd.DataFrame({'count' : dataFrame.groupby( [ "user_id", "song_link" ] ).size()}).reset_index()

pivot = dataFrame.pivot_table(index=['user_id'], columns=['song_link'], values='count')
userTable = dataFrame[dataFrame.user_id == sys.argv[1]]

list = userTable["song_link"].tolist()
if len(list) == 0:
	print '{"empty":"empty"}'

else:
	ratings = pivot[list]
	similar = pivot.corrwith(ratings)
	similar = similar.dropna().sort_values(ascending = False)

	dataFrame = similar.to_frame().reset_index()
	dataFrame.columns = ["song_link", "ratings"]

	i_cols = ['user_id', 'song_link', 'name', 'artist', 'img']
	complete = pd.read_csv('process/online.csv', sep='|', names=i_cols, usecols=range(5))
	complete = complete.drop_duplicates(subset="song_link", keep="first")

	complete = complete.drop("user_id", 1)

	returnTable = pd.merge(dataFrame, complete)
	returnTable = returnTable.drop("ratings", 1)

	print returnTable.reset_index().to_json(orient='records')