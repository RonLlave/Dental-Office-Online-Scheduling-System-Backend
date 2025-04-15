See https://github.com/RonLlave/Dental-Office-Online-Scheduling-System-Frontend/edit/main/README.md for it's architecture.
# Components
Backend Structure
routes/: Express routers for auth, users, dentists, appointments.

controllers/: Handles business logic for each route.

models/: Mongoose schemas for User, Dentist, Appointment.

run server.js ("node server.js" in terminal) to run the project
Contact me roncymondllave25@gmail.com or call/text +639367372306 if having an issue to the mongoDB database.

# Database Schema
## Users
_id: ObjectId,
name: String,
email: String,
password: String,

## Dentists
_id: ObjectId,
name: String,

## Appointment
_id: ObjectId,
user: ObjectId (ref: User),
dentist: ObjectId (ref: Dentist),
date: String (YYYY-MM-DD),
time: String (HH:mm)

# Additional Notes
Remarks:
Didn't make to run it in the AWS Kurbenetes because I ran out of time for the submission. Kindly test this locally.
