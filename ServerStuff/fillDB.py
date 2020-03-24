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

patientUsernames.append("alwaysAvailable")
patientNames.append("alwaysAvailable")

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
for i in doctors:
    my_json = {
        "username": i
    }
    req = requests.post("https://europe-west2-sustained-node-257616.cloudfunctions.net/CreateDoctor", json=my_json)

clinics = ["Anaesthetics", "Cardiology", "Diagnostic imaging", "Ear nose and throat (ENT)", "Haematology", "Neurology", "Oncology", "Physiotherapy"]

for i in range(len(patientUsernames)):
    for j in range(random.randrange(3,15)):
        sMins = str(random.choice(["00", "30"]))
        sHours = random.randrange(8, 20)
        eMins = ""
        eHours = sHours
        if sMins == "00":
            eMins = "30"
        else:
            eMins = "00"
            eHours +=1
        eHours = str(eHours)
        sHours = str(sHours)
        time = sHours+":"+sMins
        etime = eHours+":"+eMins
        date = str(random.randrange(1,29)).rjust(2,"0")+"/"+str(random.randrange(int(currentDate[1]),13)).rjust(2,"0")+"/2020"
        doc = random.choice(doctors)
        clinic = random.choice(clinics)

        my_json = {
            "username": patientUsernames[i],
            "time": time,
            "date": date,
            "doctor": doc,
            "clinic": clinic
        }
        doc_json = {
            "username": doc,
            "stime": time,
            "etime": etime,
            "date": date,
            "patient": patientUsernames[i]
        }
        dreq = requests.post("https://europe-west2-sustained-node-257616.cloudfunctions.net/CreateDocAppointment", json=doc_json)
        # add doctor appointment too
        req = requests.post("https://europe-west1-sustained-node-257616.cloudfunctions.net/CreateAppointment", json=my_json)

        if patientUsernames[i] == "alwaysAvailable":
            req = requests.post("https://europe-west2-sustained-node-257616.cloudfunctions.net/CreateAllAvailability", json={"username": "alwaysAvailable"})

print("done")