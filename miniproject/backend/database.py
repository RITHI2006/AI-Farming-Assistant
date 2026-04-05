from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)
db = client["ai_farming"]   # database name
def get_db():
    return db
users_collection = db["users"]