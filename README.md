# Dungeon Master's Tracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

## Current features
1. Battle tracking
    * Automatically loads protagonists
    * Adding other actors
    * Setting initiative and automatic sorting by initiative after starting the battle
    * Adding/removing conditions
    * Adding/subtracting Hit Points
        * Automatic setting/removing Unconscious condition when actor's HP reach 0 or gets healed
        * Automatic 'dead' state when actor's HP reaches opposite value of actor's max HP
    * Button to progress given actor's turn
    * Automatic next round when all actors participating in battle have progressed their turn
        * Automatic condition removal when its duration ends

## Upcoming features
1. Battle tracking
    * Modifying actors' HP before the battle
    * Adding/removing actors before the battle
    * Editing condition duration mid-fight
    * Death saving throw reminder on Unconscious player
    * Automatic progressed turn for Unconscious/Dead actors
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
