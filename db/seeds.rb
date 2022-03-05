puts "Creating organisations..."

org1 = Organisation.create name: "Joe's Pizza", hourly_rate: 11.50
org2 = Organisation.create name: "Sushi City", hourly_rate: 14.00
org3 = Organisation.create name: "Good Burger", hourly_rate: 9.50


puts "Creating users..."

user1 = User.create name: "Jane", email: "jane@example.com", password: "test", organisation_id: org1.id
user2 = User.create name: "Bill", email: "bill@example.com", password: "test", organisation_id: org2.id
user3 = User.create name: "Dan", email: "dan@example.com", password: "test"
user4 = User.create name: "Amanda", email: "amanda@example.com", password: "test", organisation_id: org3.id


puts "Creating shifts..."

shift1 = Shift.create user_id: user1.id, start: Time.now, end: Time.now, break_length: 10
shift2 = Shift.create user_id: user1.id, start: Time.now, end: Time.now, break_length: 10
shift3 = Shift.create user_id: user1.id, start: Time.now, end: Time.now, break_length: 10

shift4 = Shift.create user_id: user2.id, start: Time.now, end: Time.now, break_length: 10
shift5 = Shift.create user_id: user2.id, start: Time.now, end: Time.now, break_length: 10

shift6 = Shift.create user_id: user4.id, start: Time.now, end: Time.now, break_length: 10
shift7 = Shift.create user_id: user4.id, start: Time.now, end: Time.now, break_length: 10

puts "Done!"