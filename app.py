import json

from flask import Flask, render_template, request, redirect, Response, jsonify
import pandas as pd
import numpy as np
from scipy.spatial.distance import cdist
from sklearn.cluster import KMeans
import math
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.metrics import pairwise_distances
from sklearn.manifold import MDS


#First of all you have to import it from the flask module:
app = Flask(__name__)

scree = None
feats = None
feat_names = None
top10_feats = None
top10_scree = None
top10_featnames = None
biplot_data = None
projected_data = None
map_data = None
std_data = None
mds1 = None
mds2 = None
year_mds = {}

def getScree(data):

    pca = PCA(n_components=data.shape[1]).fit(data)
    print(pca)
    y_vals = np.cumsum(pca.explained_variance_ratio_)
    print("No of explained variance: ", len(y_vals))
    scree = pd.DataFrame({"x":list(range(1,data.shape[1]+1)), "y":y_vals, "y2":pca.explained_variance_ratio_})

    feature_imp = getMaxPCALoadings(15,pca)
    features = []
    for i in np.argsort(feature_imp)[::-1]:
        features.append(data.columns[i])

    feature_imp.sort(reverse=True)
    feature_values = pd.DataFrame({"feature":features, "value":feature_imp})
    print("Computed scree!", scree)
    feat_names = features
    return (scree, feature_values, feat_names)

    feature_imp = getMaxPCALoadings(10,pca)
    features = []
    for i in np.argsort(feature_imp)[::-1]:
        features.append(num_cols[i])

    feature_imp.sort(reverse=True)
    feature_values = pd.DataFrame({"feature":features, "value":feature_imp})
    print("Computed scree!", scree)

    return (scree, feature_values, features)

def getMaxPCALoadings(num_c, pca):

    components = np.sum(pca.components_[:num_c,:]**2, axis=0)
    feature_imp = []
    for i in range(pca.components_.shape[1]):
        feature_imp.append(components[i])
    return feature_imp

def getMDS(data):



    D1 = pairwise_distances(data, metric='correlation')
    model = MDS(n_components=2, dissimilarity='precomputed', random_state=1)
    out1 = model.fit_transform(D1)
    mds_corr = pd.DataFrame({"x":out1[:,0], "y":out1[:, 1]})
    return mds_corr


#By default, a route only answers to GET requests. You can use the methods argument of the route() decorator to handle different HTTP methods.
@app.route("/", methods = ['POST', 'GET'])
def index():
    #df = pd.read_csv('data.csv').drop('Open', axis=1)
    print("INDEX!")


    #The current request method is available by using the method attribute
    if request.method == 'POST':
        print(projected_data)

        buttonVal =  request.form.get('function')
        print("Button val!", buttonVal)
        # chart_data = None
        # #print("BUTTON VAL: ", buttonVal)
        # if buttonVal.endswith("Scree"):
        #     #print("Got feat names", feat_names[int(buttonVal[0])])
        #     chart_data = scree[int(buttonVal[0])].to_dict(orient='records')
        # elif buttonVal.endswith("Feats"):
        #     chart_data = feats[int(buttonVal[0])].to_dict(orient='records')
        # elif "Scatter" in buttonVal:
        #     chart_data = scatterType(buttonVal)
        #
        # print("After to_dict: ", chart_data)
        # chart_data = json.dumps(chart_data, indent=2)
        # data = {'chart_data': chart_data}
        # print("Json dumps result: ", chart_data)
        # print("What is data? ", data)
        # print(jsonify(data))
        # return jsonify(data) # Should be a json string
        if buttonVal.endswith("slider"):

            year = int(buttonVal.replace("slider", ""))
            curr_mds = year_mds[year]
            mds_data = curr_mds.to_dict(orient='records')
            # print("CHART DATA AFTER TO DICT", chart_data)
            mds_data = json.dumps(mds_data, indent=2)
            # print("After jsoning: ", mds_data)
            curr_data = std_data[std_data['Year']==year][top10_featnames]
            sm_data = curr_data.to_dict(orient='records')
            sm_data = json.dumps(sm_data, indent=2)
            #projected_data = std_data[std_data['Year']==year][top10_featnames]
            bi_data = curr_data.to_dict(orient='records')
            # print("CHART DATA AFTER TO DICT", chart_data)
            bi_data = json.dumps(bi_data, indent=2)
            # print("After jsoning: ", mds_data)
            data = {'sm_data':sm_data, 'mds_data':mds_data, 'bi_data':bi_data}
            return jsonify(data)

        if buttonVal.startswith("dropdown"):
            print("BUTTON YAY, ", buttonVal)
            feat = buttonVal.split(";")[0].split(":")[1]
            year = int(buttonVal.split(";")[1].split(":")[1])
            print("Feature: ", feat)
            print("Year: ", year)
            cols = ['Entity', 'Code', 'Year']
            cols.append(feat)
            data = map_data[cols]
            chart_data = data.to_dict(orient='records')
            # print("CHART DATA AFTER TO DICT", chart_data)
            chart_data = json.dumps(chart_data, indent=2)
            # print("Current data for countries: ")
            # print(curr_data)
            curr_mds = year_mds[year]
            mds_data = curr_mds.to_dict(orient='records')
            # print("CHART DATA AFTER TO DICT", chart_data)
            mds_data = json.dumps(mds_data, indent=2)
            # print("After jsoning: ", mds_data)
            curr_data = std_data[std_data['Year']==year][top10_featnames]
            sm_data = curr_data.to_dict(orient='records')
            sm_data = json.dumps(sm_data, indent=2)
            # print("After jsoning: ", mds_data)
            bi_data = projected_data.to_dict(orient='records')
            # print("CHART DATA AFTER TO DICT", chart_data)
            bi_data = json.dumps(bi_data, indent=2)
            axes_data = biplot_data.to_dict(orient='records')
            # print("AXES DATA AFTER TO DICT", axes_data)
            axes_data = json.dumps(axes_data, indent=2)
            feat_data = top10_feats.to_dict(orient='records')
            feat_data = json.dumps(feat_data, indent=2)
            data = {'chart_data': chart_data, 'mds_data':mds_data, 'sm_data':sm_data, 'bi_data': bi_data, 'axes_data': axes_data, 'feat_data':feat_data}
            return jsonify(data)
    else:
        # print(map_data)
        data = map_data[['Entity', 'Code', 'Year', 'GDP per capita (current LCU)']]
        chart_data = data.to_dict(orient='records')
        # print("CHART DATA AFTER TO DICT", chart_data)
        chart_data = json.dumps(chart_data, indent=2)
        mds_data = mds1.to_dict(orient='records')
        # print("CHART DATA AFTER TO DICT", chart_data)
        mds_data = json.dumps(mds_data, indent=2)
        # print("After jsoning: ", mds_data)
        curr_data = std_data[std_data['Year']==2017][top10_featnames]
        sm_data = curr_data.to_dict(orient='records')
        sm_data = json.dumps(sm_data, indent=2)
        # print("After jsoning: ", mds_data)
        bi_data = projected_data.to_dict(orient='records')
        print("BI DATA TEST-----", bi_data)
        # print("CHART DATA AFTER TO DICT", chart_data)
        bi_data = json.dumps(bi_data, indent=2)
        axes_data = biplot_data.to_dict(orient='records')
        # print("AXES DATA AFTER TO DICT", axes_data)
        axes_data = json.dumps(axes_data, indent=2)
        feat_data = top10_feats.to_dict(orient='records')
        feat_data = json.dumps(feat_data, indent=2)
        data = {'chart_data': chart_data, 'mds_data':mds_data, 'sm_data':sm_data, 'bi_data': bi_data, 'axes_data': axes_data, 'feat_data':feat_data}
        return render_template("index.html", data=data)

# @app.route("/member", methods = ['POST', 'GET'])
# def index():
    ###
def biplot(data):
    # print("Got the data", data)
    global projected_data
    global biplot_data
    pca = PCA()
    score = pca.fit_transform(data)[:,0:2]
    projected_data = pd.DataFrame(data=score, columns=['PCA1', 'PCA2'])
    coeff = np.transpose(pca.components_[0:2,:])
    xs = score[:,0]
    ys = score[:,1]
    biplot_data = pd.DataFrame({"x1":0, "y1":0, "x2":coeff[:,0], "y2":coeff[:,1], "feat_name":data.columns})
    print("Completed setting biplot")
    print(biplot_data)

def getData():

    data = pd.read_csv(r'world_bank_relevant.csv')
    cols = data.columns
    std = data.copy()
    std[cols[3:]] = StandardScaler().fit_transform(std[cols[3:]])
    return data, std

if __name__ == "__main__":

    # data_scale, random_scale, strat_scale, elbow = getData()
    map_data, std_data = getData()
    print(map_data)
    print(std_data)
    scree, feats, feat_names= getScree(std_data[std_data.columns[3:]])
    # print("Scree: ", scree)
    # print("Features: ", feats)
    # print("Feat names: ", feat_names)
    # print(feats.shape)
    top10_feats = feats[:10][:]
    top10_scree = scree[:10][:]
    top10_featnames = feat_names[:10][:]
    print(top10_featnames)
    biplot(std_data[top10_featnames])

    # print("Current data for countries: ")
    # print(curr_data)
    years = std_data['Year'].unique()
    for year in years:
        curr_data = std_data[std_data['Year']==year][top10_featnames]
        year_mds[year] = getMDS(curr_data)
    mds1 = year_mds[2017]
    print("Finished setting up mds1")
    print(mds1)

    # scaled[0] = data_scale
    # scaled[1] = random_scale
    # scaled[2] = strat_scale
    # #print(data_scale[:20,:])
    # for i in range(3):
    #     getMDS(scaled[i], i)
    # for i in range(3):
    #     scree[i], feats[i], feat_names[i]= getScree(scaled[i])
    # for i in range(3):
    #     projected[i] = getPCA2(scaled[i])
    # for i in range(3):
    #     loaded[i] = scaled[i][feat_names[i]]
    # print("ORIGINAL! SCREE!", scree)
    #print(jsonify(elbow))
    app.config["CACHE_TYPE"] = "null"
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run("localhost", 7777)
