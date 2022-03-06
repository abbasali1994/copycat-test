
import html_to_json
import json
from flask import Flask, request
from flask_cors import cross_origin

app = Flask(__name__)

def traverse(htmlJson, output):
    if(type(htmlJson) is list):
        s = set()
        for d in htmlJson:
            if str(d) not in s:
                output[json.dumps(d)] = 1
                s.add(str(d))
            else:
                output[json.dumps(d)] += 1
        for d in htmlJson:
            if(output[json.dumps(d)] == 1):
                del output[json.dumps(d)]
                traverse(d, output)
    elif (type(htmlJson) is dict):
        for tag in htmlJson:
            if(tag not in ["_attributes", "_value", "class"]):
                output[tag] = {}
                traverse(htmlJson[tag], output[tag])

def parseHtml(parentTag, htmlCount,html):
    for tag in htmlCount:
        if(type(htmlCount[tag]) is int and htmlCount[tag] > 1):
            html.append(
                {"elem": {parentTag: [json.loads(tag)]}, "count": htmlCount[tag]})
        elif(type(htmlCount[tag]) is dict):
            parseHtml(tag, htmlCount[tag],html)

@app.post("/parsehtml")
@cross_origin()
def parseHTML():
    try:
        inputValue = request.get_json(force=True)
        result = {}
        html = []
        output_json = html_to_json.convert(inputValue["html"])
        traverse(output_json, result)
        parseHtml("", result,html)
        return {"html": html}, 200
    except:
        return {"error": "Request incorrect"}, 400
