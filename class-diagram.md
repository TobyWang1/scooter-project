```mermaid
classDiagram
    class Scooter {
        +String station
        +String user
        +Int serial
        +<< static >> Int nextSerial
        +Int charge
        +Boolean isBroken
        +rent(user)
        +dock(station)
        +recharge()
        +requestRepair()
    }

    class User {
        +String username
        +String password
        +Int age
        +Boolean loggedIn
        +login(passowrd)
        +logout()
    }

    class ScooterApp {
        +Scooter[] stations
        +User[] registeredUsers
        +registerUser(username, password, age)
        +loginUser(username, password)
        +logoutUser(username)
        +createScooter(station)
        +dockScooter(scooter, station)
        +rentScooter(scooter, user)
        +print()
    }

    ScooterApp "1" --> "*" Scooter : contains
    ScooterApp "1" --> "*" User : contains