# A larger hotel database to book from

Expedia API integration

On 2022, Wheel the World pursued a commercial agreement with Expedia to integrate their hotel database booking and shopping features. I was in charge of developing several components to make this integration possible.

**Year:** 2022

**Team:**

- Luis Martínez

**Deliverables:**

- An expedia content indexer
- A booking module
- A shopping module
- A matching algorithm

## The Problem

Wheel the World needed to increase their sales significantly if they wanted to keep growing. They had a great product, but they needed to reach more people. One of the main problems was that they had a very limited hotel database, which made it difficult for users to find a hotel that suited their needs. They had an integration with Hotelbeds, but the available inventory was very limited.

The majority of hotels in the wheel The World inventory were bookable through a request to quote system, but this meant that users had to wait for a response from the Wheel the World team, which was not scalable. Also, pricing was not transparent or instant, which made it difficult for users to make a decision.

## The Challenge

There was already a request to quote system and a booking/pricing integration with Hotelbeds in place. One of the challenges was to integrate the Expedia hotel database with a new booking/pricing system, and to make it work with the existing request to quote system. Rewriting or moving components of the system design was not an option, so the new system had to be compatible with the existing one.

One of the components needed to index all of the Expedia content database and make it searchable. This component had to be able to index the content in a reasonable amount of time, and it had to be able to update the index on a weekly basis. What made this challenging was that there were more tha 600k records in the database, with a total of 28GB of data.

The matching system was also a headeache. It had to be able to match the Expedia content with the Wheel the World content, but also allowing to match with Hotelbeds content.

## The Product

The integration consisted first on a Golang application that downloaded, parsed and saved the Expedia content database (28GB of data) into a Postgres database and a Redis cache. This application was able to download and parse the whole database in less than 2 hours, and it was able to update the database on a weekly basis in less than 2 minutes.

The second part of the integration was a to add a Pricing and a Shopping provider for Expedia in the website backend. The backend was built with Express and TypeORM (Typescript), and it was deployed on Google Clour Run. The pricing provider was able to get the availability and price of a hotel room for a given date, and the booking provider was able to book a hotel room.

The third part of the integration was to add a matching algorithm that was able to match the Expedia content with the Wheel the World content, but also allowing to match with Hotelbeds content. This was a very complex algorithm that had to take into account the location, the accessibility features, the hotel amenities, the room amenities, the room type, the room accessibility features and other factors. It used the indexed data from the first part of the integration to make the matching process faster.

_[Image: Product demo video — /images/case-studies/expedia-product.mov]_

## The Results

The integration was a success. Expedia quickly certified the integration and allowed Wheel the World to increase their hotel database from a couple of thousand hotels to more than 600k hotels. This allowed Wheel the World to increase their sales by 39% on the first quarter of 2023.

| Metric                | Value |
| --------------------- | ----- |
| Hotels to choose from | 600K  |
| Increase in bookings  | 39%   |
