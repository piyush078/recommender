import sys
import pandas as pd
import numpy as np

r_cols = ['user_id', 'song_link']
ratings = pd.read_csv('process/online.csv', sep='|', names=r_cols, usecols=range(2))

ratings = pd.DataFrame({'count' : ratings.groupby( [ "user_id", "song_link" ] ).size()}).reset_index()
ratings = ratings[ratings.user_id != sys.argv[2]]

if len(ratings[ratings.song_link == sys.argv[1]]) == 0:
	print '{"empty":"empty"}'

else :
	pivotTable = ratings.pivot_table(index=['user_id'], columns=['song_link'], values='count')

	pivotTable = pivotTable[np.isfinite(pivotTable[sys.argv[1]])]
	pivotTable = pivotTable.drop(sys.argv[1], 1).fillna(0)

	finalTable = pivotTable.mean(axis=0)
	finalTable = finalTable.sort_values(ascending=False)[:10]

	finalTable = finalTable.to_frame().reset_index()
	finalTable.columns = ["song_link", "ratings"]

	i_cols = ['user_id', 'song_link', 'name', 'artist', 'img']
	complete = pd.read_csv('process/online.csv', sep='|', names=i_cols, usecols=range(5))
	complete = complete.drop_duplicates(subset="song_link", keep="first")

	complete = complete.drop("user_id", 1)

	returnTable = pd.merge(finalTable, complete)
	returnTable = returnTable[returnTable.ratings != 0]
	returnTable = returnTable.drop("ratings", 1)

	print returnTable.reset_index().to_json(orient='records')
