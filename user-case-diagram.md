# Scooter Rental Use Case Diagram

```mermaid
graph TD;
    User -- "Register" --> UC1[Register User]
    User -- "Login" --> UC2[Login User]
    User -- "Rent Scooter" --> UC3[Rent Scooter]
    User -- "Dock Scooter" --> UC4[Dock Scooter]
    User -- "Request Repair" --> UC5[Request Scooter Repair]
    User -- "Logout" --> UC6[Logout User]

    Scooter -- "Be Rented" --> UC3
    Scooter -- "Be Docked" --> UC4
    Scooter -- "Be Repaired" --> UC5

    ScooterApp -- "Store Users" --> UC1
    ScooterApp -- "Handle Login" --> UC2
    ScooterApp -- "Manage Scooter Rental" --> UC3
    ScooterApp -- "Manage Scooter Docking" --> UC4
    ScooterApp -- "Manage Scooter Repair Requests" --> UC5
    ScooterApp -- "Handle Logout" --> UC6

    classDef user fill:#f9f,stroke:#333,stroke-width:2px;
    class User user;

