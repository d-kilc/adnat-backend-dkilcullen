puts "Creating organisations..."

org1 = Organisation.create name: "Joe's Pizza Shack", hourly_rate: 11.50
org2 = Organisation.create name: "Sushi City", hourly_rate: 14.00


puts "Creating users..."

user1 = User.create name: "Jane", email: "jane@example.com", password: "testing", organisation_id: org1.id
user2 = User.create name: "Bill", email: "bill@example.com", password: "testing", organisation_id: org2.id
user3 = User.create name: "Dan", email: "dan@example.com", password: "testing"
user4 = User.create name: "Amanda", email: "amanda@example.com", password: "testing", organisation_id: org1.id
user5 = User.create name: "Jeff", email: "jeff@example.com", password: "testing", organisation_id: org1.id
user6 = User.create name: "Suzie", email: "suzie@example.com", password: "testing", organisation_id: org2.id
user7 = User.create name: "Michael", email: "michael@example.com", password: "testing", organisation_id: org2.id

puts "Creating shifts..."

shift1 = Shift.create user_id: user1.id, start: Time.now + 4000, end: Time.now + 8000, break_length: 10
shift2 = Shift.create user_id: user1.id, start: Time.now + 2000, end: Time.now + 10000, break_length: 10
shift3 = Shift.create user_id: user1.id, start: Time.now + 4000, end: Time.now + 9000, break_length: 10
shift1 = Shift.create user_id: user5.id, start: Time.now + 4500, end: Time.now + 8500, break_length: 10
shift2 = Shift.create user_id: user5.id, start: Time.now + 2500, end: Time.now + 15000, break_length: 10
shift3 = Shift.create user_id: user5.id, start: Time.now + 4500, end: Time.now + 9500, break_length: 10

shift4 = Shift.create user_id: user2.id, start: Time.now + 5000, end: Time.now + 9000, break_length: 10
shift5 = Shift.create user_id: user2.id, start: Time.now + 4000, end: Time.now + 6000, break_length: 10
shift4 = Shift.create user_id: user6.id, start: Time.now + 5500, end: Time.now + 9500, break_length: 10
shift5 = Shift.create user_id: user6.id, start: Time.now + 4500, end: Time.now + 6500, break_length: 10

shift6 = Shift.create user_id: user4.id, start: Time.now + 2000, end: Time.now + 8000, break_length: 10
shift7 = Shift.create user_id: user4.id, start: Time.now + 5000, end: Time.now + 7000, break_length: 10
shift6 = Shift.create user_id: user7.id, start: Time.now + 2500, end: Time.now + 8500, break_length: 10
shift7 = Shift.create user_id: user7.id, start: Time.now + 5500, end: Time.now + 7500, break_length: 10

puts "Done!"