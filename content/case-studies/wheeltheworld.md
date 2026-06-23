# A faster, stronger pipeline

Wheel The World

Wheel The World had a problem: their CI/CD pipeline was slow, unreproducible and unreliable. I helped them build a new one from scratch, using Github Actions and Docker.

**Year:** 2022

**Team:**

- Luis Martínez
- Fede Carossino
- Gonzalo Rodríguez
- Sebastián Vinci

**Deliverables:**

- Github Actions CI/CD

## The Problem

On 2022, I joined Wheel The World as a software engineer as part of a reestructuring of the company. They needed to scale up the team to deliver new features continuosly and reliably. I quickly noticed that the current CI/CD schema was going to be a bottleneck for the team, so I proposed to redesign it by dropping what wasnt working and build on top of that. Luckily, the CTO was thinking the same thing, so we started working on it right away.

## The Challenge

Wheel the world used to have a CI/CD pipeline based on Google Cloud Build. This pipeline was slow, unreliable and hard to maintain. It was also hard to reproduce locally, which made it hard to debug. Furthermore, the results of the testing were not connected to the deploy trigger, which meant that a failed test would not stop the deploy automatically. This led to a lot of manual work and a lot of time wasted.

To complicate things even more, wheel the world was not using Docker at all. This meant that the environment in which the code was tested was not the same as the one in which it was deployed. This led to a lot of bugs that were hard to reproduce and fix.

The Google Cloud Build pipeline wasnt able to provide parallelization, caching or more complex workflows, limiting the capacity to improve the overall CI/CD process.

## The Product

The first thing I did was to dockerize all the services and the tests of the most important applications. This allowed the team to have a consistent environment for testing and development, regardless of the operating system or local library versions. Next was to deprecate the old pipeline based on Google Cloud Build and replace it with a new one based on Github Actions. This allowed us to have a more flexible and powerful pipeline, with parallelization, caching and more complex workflows.

Implementing the branch and merge workflow proposed by the CTO, I was able to reduce the time to deploy significantly and do interesting things like automatically deploy the master branch to production when all the tests pass. On a second iteration, by reducing the size of the docker images using multistage builds and dividing the tests in different jobs, I was able to reduce the time to deploy even more.

## The Results

The new pipeline is faster, more reliable and easier to maintain. Taking only the website as an example, the total weight of the docker image went from 1.5GB to 200MB, the time to deploy went from 40 minutes to 10 minutes and the time to run the tests went from 20 minutes to 5 minutes.

**Image size (MB)**

| Pipeline | Image size (MB) |
| --- | --- |
| original pipeline | 1500 |
| first iteration | 400 |
| second iteration | 200 |

**Time to deploy (minutes)**

| Pipeline | Time to deploy (minutes) |
| --- | --- |
| original pipeline | 40 |
| first iteration | 20 |
| second iteration | 10 |

By reducing the aount of time it takes to deploy and the weight of the images, we were reducing the maintenance cost of the pipeline, which was a big win for the company. For example, for the website frontend, estimating a cost of 0.008 USD per minute of deployment, and 5 pipeline runs per day (which is a conservative estimation), we were able to reduce the cost of the pipeline from 32 USD per month to 8 USD per month (75% reduction), just for one application.

| Metric | Value |
| --- | --- |
| Reduction in costs for GitHub Actions | ~75% |
| Reduction in image size | ~86% |
