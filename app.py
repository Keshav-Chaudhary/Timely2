from flask import Flask, render_template
import datetime
import pytz
import json

app = Flask(__name__)
with open('schedule.json', 'r') as f:
    schedule = json.load(f)

def convert_to_datetime(time_str):
    try:
        return datetime.datetime.strptime(time_str, '%I:%M %p')
    except ValueError:
        return None

def get_classes_for_today():
    tz = pytz.timezone('Asia/Kolkata')
    now = datetime.datetime.now(tz)
    current_day = now.strftime('%A')
    today_schedule = schedule.get(current_day, [])

    current_time = now.time()

    for cls in today_schedule:
        start_time_str, end_time_str = cls["time"].split(" - ")
        start_time = convert_to_datetime(start_time_str).time()
        end_time = convert_to_datetime(end_time_str).time()

        if current_time < start_time:
            cls["status"] = "upcoming"
        elif start_time <= current_time <= end_time:
            cls["status"] = "ongoing"
        else:
            cls["status"] = "completed"

    return current_day, today_schedule

@app.route('/')
def home():
    today, today_schedule = get_classes_for_today()
    return render_template('schedule.html', schedule=today_schedule, today=today)
@app.route('/developers')
def developers():
    return render_template('developers.html')
