# models.py

import mongoengine as me

class User(me.Document):
    username = me.StringField(required=True, unique=True)
    email = me.EmailField(required=True, unique=True)
    password = me.StringField(required=True)
    name = me.StringField()
    gender = me.StringField()
    birth_date = me.DateField()
    height = me.IntField()
    weight = me.IntField()
    goal = me.StringField()
    timeframe = me.StringField()
    activity_level = me.StringField()
    
    meta = {
        'collection': 'users'  # The name of your MongoDB collection
    }
