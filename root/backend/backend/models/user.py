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
    macros = me.DictField(default={
        'protein': 30,
        'carbs': 50,
        'fats': 20
    })
    # New fields for calories and water
    daily_calories = me.IntField(default=2000)  # Default daily calorie target
    daily_water = me.IntField(default=8)  # Default daily water target in cups
    
    meta = {
        'collection': 'users'  # The name of your MongoDB collection
    }
