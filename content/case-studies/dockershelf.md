# Reliable docker images

Dockershelf

Dockershelf is a repository that serves as a collector for docker recipes that are universal, efficient and slim. We keep adding "shelves", which are holders for the different versions of a popular language or application. Images are updated, tested and published weekly via a Github Actions workflow.

**Year:** 2016

**Team:**

- Luis Martínez

**Deliverables:**

- Debian images
- Python images
- Node images
- Latex images

**Links:**

- [Github](https://github.com/Dockershelf/dockershelf)
- [Dockerhub](https://hub.docker.com/u/dockershelf)

## The Problem

As **software engineer**, I was always looking for a way to **be more efficient** with my time. One of the challenges that I faced was the need to have a reliable and fast way to build and deploy my applications. I started using **docker**, but at the time all docker images were based on debian stable or ubuntu. The first had legacy software, and the latter was too unstable to be used in production. I needed at least a **debian testing or sid** image, but there were none available. So I decided to build my own.

Soon, I started to unit test **python apps** and needed docker images for different versions. I also needed to build node apps, and latex documents. I started to build my own images for all of them, and I realized that I could share them with the community. That's how **Dockershelf** was born.

## The Challenge

I wanted the project to be **sustainable** and completely **open source**. This meant that I needed to use services that were free and publicly accessible. Also, I wanted it to be completely unmantained, or at least the mantainance to be as minimal as possible. This meant that I needed to **automate everything**, from the build process to the publishing of images.

The automation presented a problem, because I could inadvertently publish a broken image. I needed a way to **test the images** before publishing them.

I also wanted to use the debian packaging system to install the needed software, because for example official python and node images were built from source and that made them **prone to errors and inconsistencies**. This also meant that I needed to build the images from **scratch**, and not use any of the existing images as a base.

## The Product

I came up with a way to automate the build process using Travis CI. I created templates for the pipeline configuration, which would create the actual configuration containing the list of images to build. I could control the specific versions of python or node to build, depending on its popularity and availability of the software in the debian repositories. I experienced a setback when Travis CI became a paid service, so I had to migrate to Github Actions.

I decided to focus on the images I was going to need for my projects: Debian, Python and Node. I also added a Latex one to write my CV. I needed them to be based on debian sid for development purposes but I later added a Debian stable version for production. Initially they were all amd64 images but I later added arm64 for mac users.

I created a test suite for the images, which would run on every build. The test suite would check that the images were built correctly and that the software was installed and working. The builds are run weekly, and the images are published to Dockerhub if the tests pass.

_[Image: Product demo video — /images/case-studies/dockershelf-product.mov]_

## The Results

My intention with dockershelf was to be a personal project, but it turned out to be something more. Several people started using the images and I started to receive feedback and contributions. The project has also been featured in the awesome-docker repository, and it has been starred more than 60 times.

| Metric                     | Value |
| -------------------------- | ----- |
| Downloads on debian images | 220K  |
| Downloads on python images | 294K  |
| Downloads on node images   | 55K   |

The difference in size between the official images and the dockershelf ones are significant. The Python and Node images are 4 times smaller, making them faster to download and use. Although not as small as Alpine, they are still a good alternative for those who need a Debian based image.

**Node image size (MB)**

| Image            | Size (MB) |
| ---------------- | --------- |
| dockerhub node   | 367.93    |
| dockershelf node | 82.43     |

**Python image size (MB)**

| Image              | Size (MB) |
| ------------------ | --------- |
| dockerhub python   | 360.46    |
| dockershelf python | 100.09    |

The project is still active and I keep adding new images and arquitectures when possible. You can checkout the project on Github or contact me for more information.

**Links:**

- [Github](https://github.com/Dockershelf/dockershelf)
- [Dockerhub](https://hub.docker.com/u/dockershelf)
