# Dungeon Master's Tracker

Current project [Angular CLI](https://github.com/angular/angular-cli) version: 13.2.4.

## About the project
This is a Dungeons & Dragons 5e tool, which's purpose is to be a kind of a **digital, interactive Dungeon Master's screen**. 
It is **NOT a graphical interface** containing info about every skill in the game, simulate rolls etc. - 
you've got other tools for that. It assumes that **the game action is on the table**, and handles repetitive tasks 
that otherwise would slow down the pace of the gameplay, so everyone can focus on the 
game itself instead of counting initiative order etc. 

## TO DO LIST
1. Battle tracking
    * Modifying actors' HP before the battle
    * Editing condition duration mid-fight
2. Persisting data
3. Time progress
    * Recording time spent in the campaign
    * Automatic passed time increasing on travel record
    * Adding recorded events on a timeline, time passed since that event
    * Short/long rest time tracking
4. Tools
    * Imperial to SI/vice-versa calculator (simplified for DnD usage)
    * Travel time calculator enhancements
        * Taking into account that e.g. day of traveling with slow pace doesn't add up to 8 hours etc.
    * Combat difficulty calculator
        * Calculating monster total XP based on actors, monster count and desired difficulty
        * Encounter builder based on desired actors and difficulty
            * Monster dropdown based on Monster Manual
            * Filtering available monsters from that dropdown
5. Custom notes
    * Creating, editing, deleting and editing
    * Displaying date when created and last edited
    * Title and optional description
6. Cheat sheets

## Known issues
* no validation on inputs
