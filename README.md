# Dungeon Master's Tracker

Current project [Angular CLI](https://github.com/angular/angular-cli) version: 13.2.4.

## About the project
This is a Dungeons & Dragons 5e tool, which's purpose is to be a kind of a **digital, interactive Dungeon Master's screen**. 
It is **NOT a graphical interface** containing info about every skill in the game, simulate rolls etc. - 
you've got other tools for that. It assumes that **the game action is on the table**, and handles repetitive tasks 
that otherwise would slow down the pace of the gameplay, so everyone can focus on the 
game itself instead of counting initiative order etc. 

## Current features
1. Battle tracking
    * Automatically loads protagonists
    * Adding other actors
        * Checkbox for death saving throws eligibility when adding an actor to battle
    * Setting initiative and automatic sorting by initiative after starting the battle
        * Resolving initiative conflicts with modal when some actors rolled the same initiative
    * Death
        * Removing non-magical conditions on death
    * Adding/removing conditions
    * Adding/subtracting Hit Points
        * Death saving throws counter when character becomes Unconscious by damage
        * Automatic setting/removing Unconscious condition when actor's HP reach 0 or gets healed
        * Automatic 'dead' state when actor's HP reaches opposite value of actor's max HP
    * Button to progress given actor's turn
    * Automatic next round when all actors participating in battle have progressed their turn
        * Automatic progressed turn for Unconscious/Dead actors
        * Automatic condition removal when its duration ends

## Upcoming features
1. Battle tracking
    * Modifying actors' HP before the battle
    * Adding/removing actors before the battle
    * Editing condition duration mid-fight
2. Persisting data after refresh
3. Time progress
    * Recording time spent in the campaign
    * Automatic passed time increasing on travel record
    * Adding recorded events on a timeline, time passed since that event
4. Imperial to SI/vice-versa calculator (simplified for DnD usage)
    * all needed units - feet to meters, miles to kilometers etc.
5. Notes/choices made by players
6. Cheat sheets

## Known issues
* no validation on inputs
