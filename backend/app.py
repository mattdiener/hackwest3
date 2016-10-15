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
    name = request.form['name']
    id = b58encode(uuid.uuid4().bytes)[:4]
    chatToken = 'hw3_' + b58encode(uuid.uuid4().bytes)[:4]
    topics = []
    item = {'name':name, 'boardId': id, 'chatToken': chatToken, 'topics': topics}
    json = jsonify(**item)
    mongo.db.boards.insert_one(item)
    return json

@app.route('/boards/<boardId>')
def getBoardJSON(boardId):
    return jsonify(**getBoard(boardId))

def getBoard(boardId):
    board = mongo.db.boards.find_one_or_404({'boardId': boardId})
    for i in range(len(board['topics'])):
        board['topics'][i] = getBoardTopic(boardId,board['topics'][i])
    del board['_id']
    return board

@app.route('/boards/<boardId>/topics',methods=['POST'])
def createBoardTopic(boardId):
    name = request.form['name']
    id = b58encode(uuid.uuid4().bytes)[:4]
    suggestions = []
    item = {'name':name,'boardId':boardId,'topicId':id,'suggestions':suggestions}
    json = jsonify(**item)
    mongo.db.topics.insert_one(item)
    mongo.db.boards.update({'boardId':boardId},{'$push': {'topics':id}})
    return json

@app.route('/boards/<boardId>/topics/<topicId>')
def getBoardTopicJSON(boardId,topicId):
    return jsonify(**getBoardTopic(boardId,topicId))

def getBoardTopic(boardId,topicId):
    topic = mongo.db.topics.find_one_or_404({'topicId':topicId,'boardId': boardId})
    for i in range(len(topic['suggestions'])):
        topic['suggestions'][i] = getTopicSuggestion(boardId,topicId,topic['suggestions'][i])
    del topic['_id']
    return topic

@app.route('/boards/<boardId>/topics/<topicId>/suggestions',methods=['POST'])
def createTopicSuggestion(boardId,topicId):
    name = request.form['name']
    id = b58encode(uuid.uuid4().bytes)[:4]
    description = ''
    url = ''
    voteCount = 0
    item = {'name':name,'boardId':boardId,'topicId':topicId,'suggestionId':id,'description':description,'url':url,'voteCount':voteCount}
    json = jsonify(**item)
    mongo.db.suggestions.insert_one(item)
    mongo.db.topics.update({'boardId':boardId,'topicId':topicId},{'$push':{'suggestions':id}})
    return json

@app.route('/boards/<boardId>/topics/<topicId>/suggestions/<suggestionId>')
def getTopicSuggestionJSON(boardId,topicId,suggestionId):
    return jsonify(**getTopicSuggestion(boardId,topicId,suggestionId))

def getTopicSuggestion(boardId,topicId,suggestionId):
    suggestion = mongo.db.suggestions.find_one_or_404({'suggestionId':suggestionId,'topicId':topicId,'boardId': boardId})
    del suggestion['_id']
    return suggestion

@app.route('/boards/<boardId>/topics/<topicId>/suggestions/<suggestionId>/poll')
def pollTopicSuggestion(boardId,topicId,suggestionId):
    return mongo.db.suggestions.find_one_or_404({'suggestionId':suggestionId,'topicId':topicId,'boardId': boardId})['voteCount']

if __name__ == '__main__':
    app.run()#host='0.0.0.0')
