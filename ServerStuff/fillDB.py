import requests

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

req = requests.post("https://europe-west1-sustained-node-257616.cloudfunctions.net/WipeUsers", json={})
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

print("done")