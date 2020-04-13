# LABEL-1-Frontend

This repository contains web server dedicated to run https://gitlab.informatika.org/if3250-labeling-project/labeling.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for public use purposes.

### Prerequisites

What things you need to install the software and how to install them

```
latest Docker

containerization tool, available for free at https://www.docker.com/
```

### Installing

A step by step series of examples that tell you how to get a development env running


0. Server can only be run in linux distro OS (for example: MacOS, Ubuntu, etc.)

1. Navigate to the directory of your choice.
2. In the directory, open the terminal, type this command and run it:
    ```
    git clone https://gitlab.informatika.org/if3250-labeling-project/labeling.git
    ```
    
3. Navigate to the 'labeling' directory by typing this command and run it in the terminal:
    ```
    cd labeling
    ```

4. Navigate to the 'frontend' directory by typing this command and run it in the terminal:
   
   ```
   cd frontend
   ```
   
5. Open 'config.js' file with the editor of your choice.
6. Change host variable with your computer IPv4 private IP in the 'config.js' below:

   To get private IP in MacOS, please see this website:
    https://www.wikihow.com/Find-Your-IP-Address-on-a-Mac

   To get private IP in Ubuntu, please see this website:
    https://opensource.com/article/18/5/how-find-ip-address-linux

7. Save the file, run 'install' script, then wait (make sure you have docker installed in your machine):
   ```
   ./install
   ```
8. Type your computer IPv4 private IP in the browser:

### How to use
1. Type this in the login page:
    - username: **adminone**
    - password: **password**

### Frequent Use Guide

1. After a successful installation you only need to run this command in the 'labeling/frontend' directory:
   
    ```
   ./run
   ``` 

## Built With

* [Nuxt.js](https://github.com/nuxt/nuxt.js) - The web framework used
* [Vue.js](https://github.com/vuejs) - The web framework used
* [Docker](https://www.docker.com/) - Containerization tool

## Authors

* **Rayza Mahendra** - *Backend Programmer* - [rayzamgh](https://github.com/rayzamgh)
* **Edward Alexander** - *Frontend Programmer* - [rayzamgh](https://github.com/EdwardAJ)
* **Ahmad Rizal Alifio** - *Backend Programmer* - [rayzamgh](https://github.com/rayzamgh)
* **Nurdin** - *Frontend Programmer* - [rayzamgh](https://github.com/rayzamgh)
* **Eka Sunandika** - *Frontend Programmer* - [rayzamgh](https://github.com/rayzamgh)

## License

This project is licensed under the MIT License 
MIT License

Copyright (c) [2020] [Label]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
