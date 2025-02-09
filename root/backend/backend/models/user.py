# models.py

import mongoengine as me

class User(me.Document):
    username = me.StringField(required=True, unique=True)
    email = me.EmailField(required=True, unique=True)
    password = me.StringField(required=True)
    
    meta = {
        'collection': 'users'  # The name of your MongoDB collection
    }
