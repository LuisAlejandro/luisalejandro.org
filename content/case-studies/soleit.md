# A desktop app for kinesiology

Soleit

The first automated biomechanical design software. An easier, more accurate, faster process to generate motion analysis and personalized insole 3D model.

**Year:** 2021

**Team:**

- Luis Martínez
- Saraí Santiago
- Israel Lugo
- Sergi Prats

**Deliverables:**

- A REST api
- A desktop app
- A hardware driver

**Links:**

- [Client site](https://soleit.app/en/how-it-works/)

## The Problem

This client had plans for growing its current portfolio in Chile and expanding to the United States with a Series B round of investors. To achieve those important goals, they needed to get rid of many of their manual processes and automate them. Also, many of these algorithms were scattered in different places and needed to be unified in a single app.

As the diagnosis of feet is a very important part of the product, the client needed a way to connect the hardware to the app. The hardware was a 3D scanner that was connected to a computer via USB. The app needed to be able to communicate with the hardware and receive the data from the scanner.

The client had a very clear idea of what they wanted to achieve, but they needed help to make it happen. They needed a team that could help them with the architecture, the development, and the deployment of the app.

## The Challenge

The application needed to be a desktop app as part of the bussiness model was to sell the access as a subscription. The client wanted to avoid the possibility of the users to share their credentials with other people. To achieve this, the app needed to be a desktop app that could be installed in the user's computer. This way, the app could be used only by the person that bought the subscription.

The app needed to be able to communicate with the hardware. We only had a low level driver from the manufactirer that allowed us to make very basic operations on the scanner, so a lot of work was needed to make the scanner work as expected. The fact that it was a closed source driver made the process even harder.

## The Product

The app was developed using **Electron**, a framework that allows to create desktop apps using web technologies. As a frontend language we selected **Ionic React**, so that the client could build the application for mobile devices in the future. The backend was developed using **Node.js** and **Express.js**. The database was a **PostgreSQL database** hosted in **AWS**. It also had connections with the propietary software that made the diagnosis of the feet, which was accessed through **DynamoDB**, and it was also integrated with the S3 bucket where the auxiliary files were stored.

The hardware driver was embedded in the electron window and was written in python. It exposed a couple of endpoints that allowed the app to communicate with the hardware.

The app allows Soleit to make new foot diagnoses, but also, manage users, doctors, materials, directions and more.

_[Image: Product demo video — /images/case-studies/soleit-product.mov]_

## The Results

Soleit is now able to make diagnoses in a **more efficient way**, allowing them to grow their business and expand to new markets. They have made a **lot of sales** and are now looking to improve some of the features of the app.

| Metric             | Value          |
| ------------------ | -------------- |
| Diagnosed patients | more than 1000 |
| Sold subscriptions | more than 20   |

Here are some of the screenshots of the app:

_[Image: App screenshot 1 — /images/case-studies/soleit-gallery-1.png]_

_[Image: App screenshot 2 — /images/case-studies/soleit-gallery-2.png]_

_[Image: App screenshot 3 — /images/case-studies/soleit-gallery-3.png]_

_[Image: App screenshot 4 — /images/case-studies/soleit-gallery-4.png]_

_[Image: App screenshot 5 — /images/case-studies/soleit-gallery-5.png]_

_[Image: App screenshot 6 — /images/case-studies/soleit-gallery-6.png]_

_[Image: App screenshot 7 — /images/case-studies/soleit-gallery-7.png]_

_[Image: App screenshot 8 — /images/case-studies/soleit-gallery-8.png]_

_[Image: App screenshot 9 — /images/case-studies/soleit-gallery-9.png]_

**Links:**

- [Client site](https://soleit.app/en/how-it-works/)
