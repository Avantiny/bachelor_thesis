# Basic Info

This bachelor thesis is a full-stack application which was finished circa May 2020. Unfortunately I cannot use the real database for which this app was built but you can see it in practice on this link: 

https://www.youtube.com/watch?v=NBAKnKCN348&ab_channel=DominikKure

You can also download the text and application from the official BUT archive: 

https://dspace.vutbr.cz/handle/11012/190433 

The whole application and its development is thoroughly described on 66 pages in the 'BP-Dominik-Kure.pdf' file in the root directory.

## Keywords
App, Axios, Bootstrap, CORS, CSS, Express, HTML, HTTP, JavaScript, MariaDB,
Node.js, React, Reactstrap, Recharts, Sequelize, TypeScript, Web

## Abstract of the thesis

This bachelor thesis focuses on development of a web application, which serves as an
archive for videos. Each video has a certain amount of keywords. The application uses
an already created database and a preinstalled server on which the videos are uploaded.
The database was given to the author by his supervisor. Searching through the archive
can be done by inputting an expression into a search bar or through a variation of
filters that are based on information about each video. The results and the database as
a whole are graphically represented by charts, which change their form based on given
data. Videos can be played in a video player and a list of similar videos is generated.
The list is based on keywords which the videos have in common. The main technologies
used in the application are Node.js, React and MariaDB. A good amount of libraries are
used for this application, allowing JavaScript to be the primary programming language
in all phases of development. The text of this bachelor thesis can be dividen in two parts: theoretical and practical. The first part describes all the technologies and libraries
used in the application. An in depth approach was taken especially on those parts of
each library which are actually being used in the practical. Apart from the necessary
technologies, the reader will be also introduced to libraries and systems which help
a programmer with his work such as automatic formatting of code and it???s backup,
saving different versions of the code or adding static datatypes into JavaScript through
TypeScript. The theoretical part should give the reader a summary of how browser
applications work and communicate with each other. In the practical part an entire
application will be built from scratch. The application will connect four different servers
- front-end, back-end, database server and a server storing the videos - and allow them
to communicate accordingly. The bachelor thesis also contains information about using
different controllers for manipulating the browser

## How to start the application (Czech)

P??ilo??en?? CD neobsahuje testovac?? datab??zi, nebo?? nen?? ve??ejn?? p????stupn??, dostupn?? je pouze na po????d??n?? u vedouc??ho pr??ce doc. Ing. Ji????ho Schimmela, Ph.D.

Postup spu??t??n?? aplikace (pro OS Windows):

1) St??hn??te programy Node.js a MariaDB ze str??nek v??robc??, tyto programy nainstalujte

2) V editoru k??du otev??ete slo??ky Back-end a Front-end a st??hn??te v ka??d?? z nich p????kazem ???npm i??? pot??ebn?? knihovny

3) V aplikaci MySQL Client (nainstalovan??m z??rove?? s MariaDB) se p??ihla??te a zadejte p????kaz: ???CREATE DATABASE (jm??no datab??ze)???

4) Pomoc?? p????kazu mysql -u root -p (jm??no datab??ze) < (dumpTestovac??Datab??ze).sql napl??te datab??zi daty (je mo??n??, ??e bude nejd????ve pot??eba p??idat program ???mysql.exe??? do prom??nn?? prost??ed?? ???path???)

5) Ve slo??ce Back-end dopl??te p??ihla??ovac?? ??daje do souboru env-config.ts

6) V obou slo??k??ch aplikaci spus??te p????kazem ???npm run start??? 
