# Tooth Tracker API documentation
- This repository contains API documentation for Tooth-Tracker

## 1. Overview

Basic API endpoint = `localhost:4500/`.

## 2. Authentication
### User
- Registration
    - URL: `localhost:4500/register`
    - Parameters:
    ```
    {
        name: user_name,
        date_of_birth: YYYY-MM-DD,
        phone: 123456789,
        email: user_email,
        password: user_password(more than 5 characters or more),
        role: (admin or default user)
    }
    ```
    - Responses
        - 200 (success): `{msg: Registration successful as ${user.role}}`
        - 409 (account already exists): `{"msg": "Email is already registered"}`
        - 401 (missing credentails): `{"msg": "Please provide name, date_of_birth(YYYY-MM-DD) ,phone, e-mail & Password"}`
        - 411 (invalid credentails): `{"msg": "Password must be of length 5"}`
        - 422 (invalid credentails): `{"msg": "Please provide valid phone number"}`

- Login
    - URL: `localhost:4500/login`
    - Parameters:
    ```
    {
        email: user_email,
        password: user_password(5 characters or more)
    }
    ```
    - Responses
        - 200 (success): `{msg: Login successful as ${user.role}}`
        - 401 (account does not exists): `{"msg": "Account does not exists"}`
        - 401 (missing credentails): `{"msg": "Please provide, e-mail & Password"}`
        - 411 (invalid credentails): `{"msg": "Password must be of length 5"}`

- Check Providers
    - URL: `localhost:4500/doctors`
    - Parameters: none
    - Response: `[doctor's data...]`

- Check Slots
    - URL: `localhost:4500/slots`
    - Parameters:
    ```
    {
        date: YYYY-MM-DD
    }
    ```
    - Response: `[slot's data...]`

- Book Appointment
    - URL: `localhost:4500/book`
    - Parameters:
    ```
    {
        
    }
    ```

