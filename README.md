# DataQuest frontend 💥
<p align="center">
  <img width=10% src="public/logo_dataQuest.ico">

</p>

Client pour le projet `dataquest` ayant pour but de fournir une application web de hub de formation en interne de Datafab permettant de :
- Partager des formations en interne
- Creer de nouvelles formations s'appuyant sur des étapes de vérifications pour avancer


## Dashboard
Visualisation de toutes les quetes en cours de l'utilisateur

![Screenshot from 2024-04-05 10-35-06](https://github.com/Jay-boo/dataQuestFront/assets/81867817/ce85ba5c-facc-4b4c-9ef0-82ddedddf8bc)


## Page de question des formations

Cette partie concerne le rendu des pages des questions d'une formation.
Les questions d'une formation doivent être données en `markdown` sur le coté serveur de l'application. Au delà du markdown commun certain bloc customisé sont utilisé pour pouvoir avoir un rendu à part : 
```markdown
<!-- jump -->
length
<!-- /jump -->

<!-- callout -->
callout text
<!-- /callout -->

<!-- hidden -->
hidden toggle text
<!-- /hidden-->
```
Ce markdown custom est ensuite parser et render en utilisant `react-markdown`.
![Screenshot from 2024-04-05 10-47-27](https://github.com/Jay-boo/dataQuestFront/assets/81867817/aa6d5f6f-8287-48ce-8203-7f77d49c9a87)

