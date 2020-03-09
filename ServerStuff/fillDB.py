import requests
import random
from datetime import datetime

currentDate = str(datetime.date(datetime.now())).split("-")
currentDate.reverse()

# This function *currently* wipes the database, then adds standard values to the database so that each user has

names = ['Harrison Poole', 'Freddie Dawson', 'Abbie Walsh', 'Louie Stewart', 'Tilly Fisher', 'Skye Moore', 'Alicia Harrison', 'Alexandra Wilkinson', 'David Johnston', 'Josh Burton']
usernames = [name.replace(" ","").lower() for name in names]

patientNames = names[:5]
receptionNames = names[5:]

patientUsernames = usernames[:5]
receptionUsernames = usernames[5:]
patientUsernames.append("patient")
receptionUsernames.append("reception")
patientNames.append("patient")
receptionNames.append("reception")

password = "pass"

req = requests.post("https://europe-west2-sustained-node-257616.cloudfunctions.net/WipeUsers", json={})
print(req.status_code)

for i in range(len(patientUsernames)):
    my_json = {
        "username": patientUsernames[i],
        "type": "patient",
        "name": patientNames[i],
        "password": "password"
    }
    req = requests.post("https://europe-west1-sustained-node-257616.cloudfunctions.net/CreateUser", json=my_json)

for i in range(len(receptionUsernames)):
    my_json = {
        "username": receptionUsernames[i],
        "type": "receptionist",
        "name": receptionNames[i],
        "password": "password"
    }
    req = requests.post("https://europe-west1-sustained-node-257616.cloudfunctions.net/CreateUser", json=my_json)

doctors = ["Dr Who", "Dr Watson", "Dr Seuss", "Dr Smith", "Dr Jones", "Dr Singh"]
clinics = ["Anaesthetics", "Cardiology", "Diagnostic imaging", "Ear nose and throat (ENT)", "Haematology", "Neurology", "Oncology", "Physiotherapy"]

for i in range(len(patientUsernames)):
    for j in range(random.randrange(3,10)):
        time = str(random.randrange(8, 20))+":"+str(random.choice(["00", "30"]))
        date = str(random.randrange(1,29)).rjust(2,"0")+"/"+str(random.randrange(int(currentDate[1]),13)).rjust(2,"0")+"/2020"
        my_json = {
            "username": patientUsernames[i],
            "time": time,
            "date": date,
            "doctor": random.choice(doctors),
            "clinic": random.choice(clinics)
        }
        req = requests.post("https://europe-west1-sustained-node-257616.cloudfunctions.net/CreateAppointment", json=my_json)



print("done")