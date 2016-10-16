import requests
import json
import uuid
from flask import Flask
from flask import jsonify
from flask import render_template
from flask import request
from base58 import b58encode
from flask.ext.pymongo import PyMongo

app = Flask(__name__,static_url_path='')
app.debug = True

mongo = PyMongo(app)

@app.route('/')
def index():
    return render_template('index.html');

@app.route('/boards',methods=['POST'])
def createBoard():
    data = request.get_data()
    name = data['name']
    id = b58encode(uuid.uuid4().bytes)[:4]
    chatToken = 'hw3_' + b58encode(uuid.uuid4().bytes)[:4]
    topics = []
    item = {'name':name, 'boardId': id, 'chatToken': chatToken, 'topics': topics, 'status':200}
    json = jsonify(**{'status':200,'board':item,'boardId':id})
    mongo.db.boards.insert_one(item)
    return json

@app.route('/boards/<boardId>',methods=['GET','PUT'])
def handleBoard(boardId):
    if request.method == 'GET':
        return jsonify(**{'status':200,'board':getBoard(boardId),'boardId':boardId})
    fields = {}
    data = request.get_json();
    print(data)
    if 'name' in data:
        fields['name'] = data['name']
        print(fields)
    if len(fields) > 0:
        mongo.db.boards.update({'boardId':boardId},{'$set': fields})
    print("method complete")
    return jsonify(**{'status':200,'board':getBoard(boardId),'boardId':boardId})


def getBoard(boardId):
    board = mongo.db.boards.find_one_or_404({'boardId': boardId})
    for i in range(len(board['topics'])):
        board['topics'][i] = getBoardTopic(boardId,board['topics'][i])
    del board['_id']
    board['status'] = 200
    return board

@app.route('/boards/<boardId>/topics',methods=['POST'])
def createBoardTopic(boardId):
    datas = request.get_json()
    name = datas['name']
    id = b58encode(uuid.uuid4().bytes)[:4]
    suggestions = []
    item = {'name':name,'boardId':boardId,'topicId':id,'suggestions':suggestions,'status':200}
    json = jsonify(**item)
    mongo.db.topics.insert_one(item)
    mongo.db.boards.update({'boardId':boardId},{'$push': {'topics':id}})
    print("save completed")
    return json

@app.route('/boards/<boardId>/topics/<topicId>',methods=['GET','PUT'])
def handleBoardTopic(boardId,topicId):
    if request.method == 'GET':
        return jsonify(**getBoardTopic(boardId,topicId))
    fields = {}
    if 'name' in request.data:
        fields['name'] = request.data['name']
    if len(fields) > 0:
        mongo.db.topics.update({'boardId':boardId,'topicId':topicId},{'$set': fields})
    return jsonify(**getBoardTopic(boardId,topicId))

def getBoardTopic(boardId,topicId):
    topic = mongo.db.topics.find_one_or_404({'topicId':topicId,'boardId': boardId})
    for i in range(len(topic['suggestions'])):
        topic['suggestions'][i] = getTopicSuggestion(boardId,topicId,topic['suggestions'][i])
    del topic['_id']
    topic['status'] = 200
    return topic

@app.route('/boards/<boardId>/topics/<topicId>/suggestions',methods=['POST'])
def createTopicSuggestion(boardId,topicId):
    data = request.get_json()
    name = data['name']
    id = b58encode(uuid.uuid4().bytes)[:4]
    description = ''
    if 'description' in data:
        description = data['description']
    url = ''
    placeId = ''
    if 'url' in data:
        url = data['url']
    if 'placeId' in data:
        placeId = data['placeId']
    voteCount = 0
    item = {'placeId':placeId,'name':name,'boardId':boardId,'topicId':topicId,'suggestionId':id,'description':description,'url':url,'votes':[],'voteCount':voteCount,'status':200}
    json = jsonify(**item)
    mongo.db.suggestions.insert_one(item)
    mongo.db.topics.update({'boardId':boardId,'topicId':topicId},{'$push':{'suggestions':id}})
    return json

@app.route('/boards/<boardId>/topics/<topicId>/suggestions/<suggestionId>',methods=['GET','PUT'])
def getTopicSuggestionJSON(boardId,topicId,suggestionId):
    if request.method == 'GET':
        return jsonify(**getTopicSuggestion(boardId,topicId,suggestionId))
    fields = {'status':200}
    data = request.get_json()
    if 'name' in data:
        fields['name'] = data['name']
    if 'description' in data:
        fields['description'] = data['description']
    if 'url' in data:
        fields['url'] = data['url']
    if 'placeId' in data:
        fields['placeId'] = data['placeId']
    if len(fields) > 0:
        mongo.db.suggestions.update({'boardId':boardId,'topicId':topicId,'suggestionId':suggestionId},{'$set': fields})
    return jsonify(**getTopicSuggestion(boardId,topicId,suggestionId))

def getTopicSuggestion(boardId,topicId,suggestionId):
    suggestion = mongo.db.suggestions.find_one_or_404({'suggestionId':suggestionId,'topicId':topicId,'boardId': boardId})
    del suggestion['_id']
    suggestion['status'] = 200
    return suggestion

@app.route('/boards/<boardId>/topics/<topicId>/suggestions/<suggestionId>/vote',methods=['PUT'])
def handleSuggestionVote(boardId,topicId,suggestionId):
    fields = {}
    data = request.get_json()
    if not ('name' in data):
        return jsonify({'status':'400','error':''})
    if not ('vote' in data):
        return jsonify({'status':'400','error':''})
    fields['name'] = data['name']
    fields['vote'] = data['vote']

    suggestion = getTopicSuggestion(boardId,topicId,suggestionId)
    if not 'votes' in suggestion:
        suggestion['votes'] = []

    votes = suggestion['votes']
    voteCount = suggestion['voteCount']

    found = False
    for v in votes:
        if v['name'] == fields['name']:
            v['vote'] = fields['vote']
            found = True
            break

    if not found:
        votes.append(fields)

    print(votes)

    voteCount = 0
    for v in votes:
        if v['vote'] == 1:
            voteCount += 1
        else:
            voteCount -= 1

    print(voteCount)

    mongo.db.suggestions.update({'boardId':boardId,'topicId':topicId,'suggestionId':suggestionId},{'$set':{'votes':votes, 'voteCount':voteCount}})
    return jsonify(**getTopicSuggestion(boardId,topicId,suggestionId))


@app.route('/boards/<boardId>/topics/<topicId>/suggestions/<suggestionId>/poll')
def pollTopicSuggestion(boardId,topicId,suggestionId):
    return mongo.db.suggestions.find_one_or_404({'suggestionId':suggestionId,'topicId':topicId,'boardId': boardId})['voteCount']

@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html');

if __name__ == '__main__':
    app.run()#host='0.0.0.0')
