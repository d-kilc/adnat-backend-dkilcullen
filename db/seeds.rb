puts "Creating organisations..."

org1 = Organisation.create name: "Joe's Pizza", hourly_rate: 11.50
org2 = Organisation.create name: "Sushi City", hourly_rate: 14.00
org3 = Organisation.create name: "Good Burger", hourly_rate: 9.50


puts "Creating users..."

user1 = User.create name: "Jane", email: "jane@example.com", password: "testttt", organisation_id: org1.id
user2 = User.create name: "Bill", email: "bill@example.com", password: "testttt", organisation_id: org2.id
user3 = User.create name: "Dan", email: "dan@example.com", password: "testttt"
user4 = User.create name: "Amanda", email: "amanda@example.com", password: "testttt", organisation_id: org3.id

puts "Creating shifts..."

shift1 = Shift.create user_id: user1.id, start: Time.now - 4000, end: Time.now + 8000, break_length: 10
shift2 = Shift.create user_id: user1.id, start: Time.now - 2000, end: Time.now + 10000, break_length: 10
shift3 = Shift.create user_id: user1.id, start: Time.now - 4000, end: Time.now + 9000, break_length: 10

shift4 = Shift.create user_id: user2.id, start: Time.now - 5000, end: Time.now + 9000, break_length: 10
shift5 = Shift.create user_id: user2.id, start: Time.now - 4000, end: Time.now + 6000, break_length: 10

shift6 = Shift.create user_id: user4.id, start: Time.now - 2000, end: Time.now - 8000, break_length: 10
shift7 = Shift.create user_id: user4.id, start: Time.now - 5000, end: Time.now + 7000, break_length: 10

puts "Done!"