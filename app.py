from flask import Flask, render_template , request
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
# New
def get_classes_for_tomorrow():
    tz = pytz.timezone('Asia/Kolkata')
    now = datetime.datetime.now(tz)
    tomorrow = now + datetime.timedelta(days=1)
    tomorrow_day = tomorrow.strftime('%A')
    tomorrow_schedule = schedule.get(tomorrow_day, [])

    return tomorrow_day, tomorrow_schedule

@app.route('/')
def home():
    today, today_schedule = get_classes_for_today()
    tommorrow, tomorrow_schedule = get_classes_for_tomorrow() # Get classes for tomorrow New
    return render_template('schedule.html', schedule=today_schedule, today=today, tomorrow=tommorrow, tomorrow_schedule=tomorrow_schedule)#new 
@app.route('/developers')
def developers():
    return render_template('developers.html')

@app.route('/upcoming', methods=['GET', 'POST'])
def upcoming_classes():
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    selected_day = request.args.get('day', None)
    
    if not selected_day or selected_day not in days_of_week:
        selected_day = None
    selected_schedule = schedule.get(selected_day, []) if selected_day else []

    return render_template('upcoming.html', schedule=selected_schedule, day=selected_day, days_of_week=days_of_week)

@app.route('/scanner')
def scanner():
    return render_template('qr_scanner.html')
