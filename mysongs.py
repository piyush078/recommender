import sys
import pandas as pd

r_cols = ['user_id', 'song_link', 'name', 'artist', 'img']
ratings = pd.read_csv('process/online.csv', sep='|', names=r_cols, usecols=range(5))

nonduplicate = ratings.drop_duplicates(subset=["song_link", "user_id"], keep="first")
result = nonduplicate[nonduplicate.user_id == sys.argv[1]]
result = result.drop('user_id', 1)

list = result["song_link"].tolist()
if len(list) == 0:
	print '{"empty":"empty"}'

else:
	print result.reset_index().to_json(orient='records')