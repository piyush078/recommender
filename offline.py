import sys
import pandas as pd
import numpy as np
r_cols = ['user_id', 'name']
ratings = pd.read_csv('process/offline.csv', sep='|', names=r_cols, usecols=range(2))

if ratings.name[ratings.name == sys.argv[1]].count() == 0 :
	print '{"empty":"empty"}'

else :
	ratings = pd.DataFrame({'count' : ratings.groupby( [ "user_id", "name" ] ).size()}).reset_index()
	pivotTable = ratings.pivot_table(index=['user_id'], columns=['name'], values='count')

	pivotTable = pivotTable[np.isfinite(pivotTable[sys.argv[1]])]
	pivotTable = pivotTable.drop(sys.argv[1], 1).fillna(0)

	finalTable = pivotTable.mean(axis=0)
	finalTable = finalTable.sort_values(ascending=False)[:4]

	finalTable = finalTable.to_frame().reset_index()
	finalTable.columns = ["name", "ratings"]
	finalTable = finalTable[finalTable.ratings != 0]
	returnTable = finalTable.drop("ratings", 1)

	print returnTable.reset_index().to_json(orient='records')
